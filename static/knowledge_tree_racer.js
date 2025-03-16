// AP Statistics Knowledge Tree Racer
// A 3D racing game through the AP Statistics knowledge tree

// Global variables
let scene, camera, renderer, controls;
let nodeMap = {};
let player, playerSpeed = 0;
let currentNode = null;
let targetNode = null;
let pathNodes = [];
let keyState = {};
let raycaster, mouse;
let tooltipDiv, infoPanel;
let clock;
let score = 0;
let raceTime = 0;
let problemsVisited = new Set();
let gameStarted = false;
let trackSegments = [];
let boostZones = [];
let isDrifting = false;

// Constants for game
const NODE_SIZE = 5;
const SIBLING_SPREAD = 80;
const ACTIVE_BRANCH_COLOR = 0x00aa00;
const INACTIVE_BRANCH_COLOR = 0xaaaaaa;
const HIGHLIGHT_COLOR = 0xff9900;
const PLAYER_COLOR = 0x0066ff;
const TARGET_COLOR = 0xff0000;
const PATH_COLOR = 0xffcc00;
const BOOST_COLOR = 0x00ffff;
const MAX_SPEED = 3;
const ACCELERATION = 0.05;
const DECELERATION = 0.03;
const ROTATION_SPEED = 0.03;
const DRIFT_ROTATION_MULTIPLIER = 2.0;
const GRAVITY = 0.1;
const TRACK_HEIGHT = 5;
const JUMP_FORCE = 1.5;
const BOOST_MULTIPLIER = 1.5;
const BOOST_DURATION = 3; // seconds

// Initialize the game
function init() {
    createUI();
    setupScene();
    setupInteraction();
    clock = new THREE.Clock();
    loadKnowledgeTreeData();
    animate();
}

// Create UI elements
function createUI() {
    tooltipDiv = document.createElement('div');
    tooltipDiv.className = 'tooltip';
    tooltipDiv.style.position = 'absolute';
    tooltipDiv.style.padding = '10px';
    tooltipDiv.style.background = 'rgba(0,0,0,0.7)';
    tooltipDiv.style.color = 'white';
    tooltipDiv.style.borderRadius = '5px';
    tooltipDiv.style.pointerEvents = 'none';
    tooltipDiv.style.zIndex = '999';
    tooltipDiv.style.visibility = 'hidden';
    document.body.appendChild(tooltipDiv);

    infoPanel = document.createElement('div');
    infoPanel.className = 'info-panel';
    infoPanel.style.position = 'absolute';
    infoPanel.style.top = '10px';
    infoPanel.style.right = '10px';
    infoPanel.style.width = '300px';
    infoPanel.style.padding = '15px';
    infoPanel.style.background = 'rgba(0,0,0,0.7)';
    infoPanel.style.color = 'white';
    infoPanel.style.borderRadius = '5px';
    infoPanel.style.zIndex = '998';
    infoPanel.innerHTML = `
        <h3>AP Stats Knowledge Racer</h3>
        <div id="game-stats">
            <p>Score: <span id="score">0</span></p>
            <p>Problems Visited: <span id="problems-visited">0</span>/<span id="total-problems">0</span></p>
            <p>Current Node: <span id="current-node">None</span></p>
            <p>Target Node: <span id="target-node">None</span></p>
            <p>Race Time: <span id="race-time">0.0</span> seconds</p>
        </div>
        <div id="game-controls">
            <h4>Controls:</h4>
            <p>W/Up Arrow: Accelerate</p>
            <p>S/Down Arrow: Brake/Reverse</p>
            <p>A/Left Arrow: Turn Left</p>
            <p>D/Right Arrow: Turn Right</p>
            <p>Space: Jump</p>
            <p>Shift: Drift (for sharper turns)</p>
        </div>
        <div id="game-instructions">
            <h4>Racing Instructions:</h4>
            <p>1. Click on a problem node to start</p>
            <p>2. Race to the target node (red)</p>
            <p>3. Drive through blue boost rings for speed boosts</p>
            <p>4. Faster completion = higher score!</p>
            <p>5. Follow the yellow path for guidance</p>
        </div>
        <button id="start-game" style="width: 100%; padding: 8px; margin-top: 10px; background: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 16px; font-weight: bold;">START GAME</button>
    `;
    document.body.appendChild(infoPanel);

    document.getElementById('start-game').addEventListener('click', startGame);

    const centerStartButton = document.createElement('div');
    centerStartButton.style.position = 'absolute';
    centerStartButton.style.top = '50%';
    centerStartButton.style.left = '50%';
    centerStartButton.style.transform = 'translate(-50%, -50%)';
    centerStartButton.style.zIndex = '1000';
    centerStartButton.style.padding = '20px 40px';
    centerStartButton.style.background = '#4CAF50';
    centerStartButton.style.color = 'white';
    centerStartButton.style.fontSize = '24px';
    centerStartButton.style.fontWeight = 'bold';
    centerStartButton.style.borderRadius = '10px';
    centerStartButton.style.cursor = 'pointer';
    centerStartButton.style.boxShadow = '0 0 20px rgba(0, 255, 0, 0.5)';
    centerStartButton.style.textAlign = 'center';
    centerStartButton.innerHTML = 'START RACING!<br><small style="font-size: 14px;">First click a problem node, then click this button</small>';
    centerStartButton.id = 'center-start-button';
    document.body.appendChild(centerStartButton);

    centerStartButton.addEventListener('click', () => {
        if (!currentNode) {
            alert('Please select a starting problem by clicking on it first!');
            return;
        }
        startGame();
        centerStartButton.style.display = 'none';
    });
}

// Set up Three.js scene
function setupScene() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000033);
    scene.fog = new THREE.FogExp2(0x000033, 0.001);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 5000);
    camera.position.set(0, 50, 200);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.getElementById('tree-container').appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enabled = true;

    const ambientLight = new THREE.AmbientLight(0x333333, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1).normalize();
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const gridHelper = new THREE.GridHelper(2000, 100, 0x444444, 0x222222);
    scene.add(gridHelper);

    window.addEventListener('resize', onWindowResize, false);
}

// Set up interaction
function setupInteraction() {
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    renderer.domElement.addEventListener('mousemove', onMouseMove, false);
    renderer.domElement.addEventListener('click', onMouseClick, false);

    window.addEventListener('keydown', (event) => keyState[event.code] = true);
    window.addEventListener('keyup', (event) => {
        keyState[event.code] = false;
        if (event.code === 'Space' && gameStarted && currentNode) jumpToNextTopic();
    });
}

// Handle window resize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Handle mouse movement
function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    tooltipDiv.style.left = event.clientX + 10 + 'px';
    tooltipDiv.style.top = event.clientY + 10 + 'px';
    checkIntersections();
}

// Handle mouse clicks
function onMouseClick(event) {
    if (gameStarted) return;
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    if (intersects.length > 0) {
        const object = intersects[0].object;
        if (object.userData && object.userData.id && object.userData.type === 'problem') {
            setStartingPoint(object);
        }
    }
}

// Check intersections for hover
function checkIntersections() {
    if (gameStarted) return;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    for (const id in nodeMap) {
        const node = nodeMap[id];
        if (node.isHighlighted && node !== currentNode && node !== targetNode) {
            node.material.color.setHex(node.isActive ? ACTIVE_BRANCH_COLOR : INACTIVE_BRANCH_COLOR);
            node.isHighlighted = false;
        }
    }
    tooltipDiv.style.visibility = 'hidden';
    if (intersects.length > 0) {
        const object = intersects[0].object;
        if (object.userData && object.userData.id && object !== currentNode && object !== targetNode) {
            object.material.color.setHex(HIGHLIGHT_COLOR);
            object.isHighlighted = true;
            tooltipDiv.innerHTML = object.userData.tooltip;
            tooltipDiv.style.visibility = 'visible';
        }
    }
}

// Load knowledge tree data
function loadKnowledgeTreeData() {
    fetch('/api/knowledge_tree_data')
        .then(response => response.json())
        .then(data => {
            buildTree(data);
            updateTotalProblems();
        })
        .catch(error => console.error('Error loading knowledge tree data:', error));
}

// Build the 3D tree with nodes laid out in X-Y plane
function buildTree(data) {
    const units = data.units;
    const unitSpread = units.length * SIBLING_SPREAD * 2;
    let currentX = -unitSpread / 2;

    units.forEach((unit, unitIndex) => {
        const unitX = currentX;
        const unitY = 0;
        const unitZ = Math.sin(unitIndex * 0.5) * 10;

        const unitNode = createNode({
            id: unit.unit_id,
            name: `Unit ${unit.unit_number}: ${unit.unit_name}`,
            type: 'unit',
            hasProblems: unit.has_problems,
            tooltip: `Unit ${unit.unit_number}: ${unit.unit_name}`
        }, 1);
        unitNode.position.set(unitX, unitY, unitZ);
        scene.add(unitNode);

        const topics = unit.topics;
        let topicStartX = unitX + SIBLING_SPREAD;

        topics.forEach((topic, topicIndex) => {
            const topicX = topicStartX + (topicIndex * SIBLING_SPREAD);
            const topicY = (topicIndex % 2 === 0 ? 50 : -50);
            const topicZ = unitZ + Math.sin((unitIndex + topicIndex) * 0.5) * 10;

            const topicNode = createNode({
                id: topic.topic_id,
                name: `${topic.topic_number} ${topic.topic_name}`,
                type: 'topic',
                hasProblems: topic.has_problems,
                tooltip: `${topic.topic_number} ${topic.topic_name}`,
                connections: []
            }, 2);
            topicNode.position.set(topicX, topicY, topicZ);
            scene.add(topicNode);

            createVisiblePath(unitNode.position, topicNode.position, topic.has_problems);
            if (!unitNode.userData.connections) unitNode.userData.connections = [];
            unitNode.userData.connections.push(topicNode);

            if (topic.has_problems && topic.problems) {
                const problems = topic.problems;
                const problemStartX = topicX + SIBLING_SPREAD;

                problems.forEach((problem, problemIndex) => {
                    const problemX = problemStartX + (problemIndex * SIBLING_SPREAD);
                    const problemY = topicY + (problemIndex % 2 === 0 ? 30 : -30);
                    const problemZ = topicZ + Math.sin((unitIndex + topicIndex + problemIndex) * 0.5) * 5;

                    const problemNode = createProblemNode({
                        id: problem.problem_id,
                        name: problem.display_name,
                        type: 'problem',
                        filename: problem.filename,
                        tooltip: problem.display_name,
                        connections: []
                    });
                    problemNode.position.set(problemX, problemY, problemZ);
                    scene.add(problemNode);

                    createVisiblePath(topicNode.position, problemNode.position, true);
                    if (!topicNode.userData.connections) topicNode.userData.connections = [];
                    topicNode.userData.connections.push(problemNode);
                    if (!problemNode.userData.connections) problemNode.userData.connections = [];
                    problemNode.userData.connections.push(topicNode);
                });
            }
        });

        currentX += SIBLING_SPREAD * (topics.length + 1);
    });

    createTopicConnections();
    controls.target.set(0, 0, 0);
    controls.update();
}

// Create connections between topics
function createTopicConnections() {
    for (const id in nodeMap) {
        const node = nodeMap[id];
        if (node.userData.type === 'problem') {
            const topicConnections = node.userData.connections.filter(n => n.userData.type === 'topic');
            for (let i = 0; i < topicConnections.length; i++) {
                for (let j = i + 1; j < topicConnections.length; j++) {
                    const topic1 = topicConnections[i];
                    const topic2 = topicConnections[j];
                    if (!topic1.userData.connections.includes(topic2)) {
                        topic1.userData.connections.push(topic2);
                        topic2.userData.connections.push(topic1);
                        createVisiblePath(topic1.position, topic2.position, true);
                    }
                }
            }
        }
    }
}

// Create a node sphere
function createNode(data, level) {
    const geometry = new THREE.SphereGeometry(NODE_SIZE - level, 32, 32);
    const material = new THREE.MeshLambertMaterial({
        color: data.hasProblems ? ACTIVE_BRANCH_COLOR : INACTIVE_BRANCH_COLOR
    });
    const node = new THREE.Mesh(geometry, material);
    node.castShadow = true;
    node.receiveShadow = true;
    node.userData = data;
    node.isActive = data.hasProblems;
    node.isHighlighted = false;
    nodeMap[data.id] = node;
    return node;
}

// Create a problem node with image texture
function createProblemNode(data) {
    const geometry = new THREE.PlaneGeometry(NODE_SIZE * 3, NODE_SIZE * 3);
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(`/images/${data.filename}`);
    const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
    const node = new THREE.Mesh(geometry, material);
    node.castShadow = true;
    node.receiveShadow = true;
    node.userData = data;
    node.isActive = true;
    node.isHighlighted = false;
    nodeMap[data.id] = node;
    return node;
}

// Create visible path (road)
function createVisiblePath(startPoint, endPoint, isActive) {
    const curve = new THREE.LineCurve3(startPoint, endPoint);
    const tubeGeometry = new THREE.TubeGeometry(curve, 20, 5, 8, false); // Wider tube for road
    const tubeMaterial = new THREE.MeshLambertMaterial({
        color: isActive ? ACTIVE_BRANCH_COLOR : INACTIVE_BRANCH_COLOR,
        transparent: true,
        opacity: 0.7
    });
    const tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
    tube.castShadow = true;
    tube.receiveShadow = true;
    scene.add(tube);
    trackSegments.push({ start: startPoint.clone(), end: endPoint.clone(), mesh: tube });

    if (isActive && Math.random() < 0.3) {
        const t = Math.random() * 0.6 + 0.2;
        const boostPosition = new THREE.Vector3().lerpVectors(startPoint, endPoint, t);
        boostPosition.z += 2; // Slightly above track

        const boostGeometry = new THREE.TorusGeometry(5, 1, 16, 32);
        const boostMaterial = new THREE.MeshLambertMaterial({
            color: BOOST_COLOR,
            emissive: BOOST_COLOR,
            emissiveIntensity: 0.5,
            transparent: true,
            opacity: 0.7
        });
        const boostZone = new THREE.Mesh(boostGeometry, boostMaterial);
        boostZone.position.copy(boostPosition);

        const direction = new THREE.Vector3().subVectors(endPoint, startPoint).normalize();
        const up = new THREE.Vector3(0, 0, 1);
        const axis = new THREE.Vector3().crossVectors(up, direction).normalize();
        const angle = Math.acos(up.dot(direction));
        boostZone.setRotationFromAxisAngle(axis, angle);
        scene.add(boostZone);
        boostZones.push(boostZone);
    }
    return tube;
}

// Create player (car)
function createPlayer() {
    const carBody = new THREE.Group();

    const bodyGeometry = new THREE.BoxGeometry(4, 8, 1.5); // Adjusted for new orientation
    const bodyMaterial = new THREE.MeshLambertMaterial({ color: PLAYER_COLOR });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    carBody.add(body);

    const cockpitGeometry = new THREE.BoxGeometry(3, 3, 1);
    const cockpitMaterial = new THREE.MeshLambertMaterial({
        color: 0x88ccff,
        transparent: true,
        opacity: 0.7
    });
    const cockpit = new THREE.Mesh(cockpitGeometry, cockpitMaterial);
    cockpit.position.set(0, -1, 0.5);
    carBody.add(cockpit);

    const wheelGeometry = new THREE.CylinderGeometry(1, 1, 0.5, 16);
    const wheelMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 });

    const wheelPositions = [
        [-1.8, -2.5, 0], // front left
        [1.8, -2.5, 0],  // front right
        [-1.8, 2.5, 0],  // rear left
        [1.8, 2.5, 0]    // rear right
    ];

    wheelPositions.forEach(pos => {
        const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
        wheel.position.set(pos[0], pos[1], pos[2]);
        wheel.rotation.x = Math.PI / 2;
        carBody.add(wheel);
    });

    const headlightGeometry = new THREE.SphereGeometry(0.5, 16, 16);
    const headlightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffcc });

    const leftHeadlight = new THREE.Mesh(headlightGeometry, headlightMaterial);
    leftHeadlight.position.set(-1.5, -4, 0);
    carBody.add(leftHeadlight);

    const rightHeadlight = new THREE.Mesh(headlightGeometry, headlightMaterial);
    rightHeadlight.position.set(1.5, -4, 0);
    carBody.add(rightHeadlight);

    const leftSpotlight = new THREE.SpotLight(0xffffcc, 1);
    leftSpotlight.position.set(-1.5, -4, 0);
    leftSpotlight.angle = Math.PI / 6;
    leftSpotlight.penumbra = 0.2;
    leftSpotlight.decay = 2;
    leftSpotlight.distance = 100;
    leftSpotlight.target.position.set(-1.5, -10, 0);
    carBody.add(leftSpotlight);
    carBody.add(leftSpotlight.target);

    const rightSpotlight = new THREE.SpotLight(0xffffcc, 1);
    rightSpotlight.position.set(1.5, -4, 0);
    rightSpotlight.angle = Math.PI / 6;
    rightSpotlight.penumbra = 0.2;
    rightSpotlight.decay = 2;
    rightSpotlight.distance = 100;
    rightSpotlight.target.position.set(1.5, -10, 0);
    carBody.add(rightSpotlight);
    carBody.add(rightSpotlight.target);

    const exhaustGeometry = new THREE.BufferGeometry();
    const exhaustMaterial = new THREE.PointsMaterial({
        color: 0xffaa00,
        size: 0.5,
        transparent: true,
        opacity: 0.8
    });

    const exhaustParticles = [];
    for (let i = 0; i < 50; i++) {
        exhaustParticles.push(
            THREE.MathUtils.randFloatSpread(0.5),
            THREE.MathUtils.randFloat(0, 5),
            THREE.MathUtils.randFloatSpread(0.5)
        );
    }

    exhaustGeometry.setAttribute('position', new THREE.Float32BufferAttribute(exhaustParticles, 3));
    const exhaust = new THREE.Points(exhaustGeometry, exhaustMaterial);
    exhaust.position.set(0, 4, 0); // Rear of the car
    carBody.add(exhaust);

    player = carBody;
    player.castShadow = true;
    player.receiveShadow = true;

    player.userData.velocity = new THREE.Vector3();
    player.userData.isGrounded = true;
    player.userData.isJumping = false;
    player.userData.isBoosting = false;
    player.userData.boostTimeRemaining = 0;
    player.userData.exhaust = exhaust;

    scene.add(player);

    if (currentNode) {
        player.position.copy(currentNode.position);
        player.position.z = currentNode.position.z + TRACK_HEIGHT;
    }
}

// Set starting point
function setStartingPoint(node) {
    if (currentNode) {
        currentNode.material.color.setHex(currentNode.isActive ? ACTIVE_BRANCH_COLOR : INACTIVE_BRANCH_COLOR);
    }
    currentNode = node;
    currentNode.material.color.setHex(PLAYER_COLOR);
    document.getElementById('current-node').textContent = currentNode.userData.name;
    setRandomTarget();
}

// Set random target node
function setRandomTarget() {
    if (targetNode) {
        targetNode.material.color.setHex(targetNode.isActive ? ACTIVE_BRANCH_COLOR : INACTIVE_BRANCH_COLOR);
    }
    const problemNodes = Object.values(nodeMap).filter(node => node.userData.type === 'problem' && node !== currentNode);
    if (problemNodes.length > 0) {
        const randomIndex = Math.floor(Math.random() * problemNodes.length);
        targetNode = problemNodes[randomIndex];
        targetNode.material.color.setHex(TARGET_COLOR);
        document.getElementById('target-node').textContent = targetNode.userData.name;
        findPath();
    }
}

// Find path to target
function findPath() {
    pathNodes.forEach(node => {
        if (node !== currentNode && node !== targetNode) {
            node.material.color.setHex(node.isActive ? ACTIVE_BRANCH_COLOR : INACTIVE_BRANCH_COLOR);
        }
    });
    pathNodes = [];
    const queue = [[currentNode]];
    const visited = new Set([currentNode.userData.id]);

    while (queue.length > 0) {
        const path = queue.shift();
        const node = path[path.length - 1];
        if (node === targetNode) {
            pathNodes = path;
            pathNodes.forEach(node => {
                if (node !== currentNode && node !== targetNode) {
                    node.material.color.setHex(PATH_COLOR);
                }
            });
            return;
        }
        if (node.userData.connections) {
            for (const connection of node.userData.connections) {
                if (!visited.has(connection.userData.id)) {
                    visited.add(connection.userData.id);
                    queue.push([...path, connection]);
                }
            }
        }
    }
}

// Start the game
function startGame() {
    if (!currentNode) {
        alert('Please select a starting problem by clicking on it first!');
        return;
    }
    gameStarted = true;
    controls.enabled = false;
    createPlayer();
    document.getElementById('start-game').textContent = 'GAME STARTED!';
    document.getElementById('start-game').disabled = true;
    document.getElementById('start-game').style.background = '#888888';
    const centerButton = document.getElementById('center-start-button');
    if (centerButton) centerButton.style.display = 'none';

    const countdownOverlay = document.createElement('div');
    countdownOverlay.style.position = 'absolute';
    countdownOverlay.style.top = '50%';
    countdownOverlay.style.left = '50%';
    countdownOverlay.style.transform = 'translate(-50%, -50%)';
    countdownOverlay.style.zIndex = '1001';
    countdownOverlay.style.color = 'white';
    countdownOverlay.style.fontSize = '100px';
    countdownOverlay.style.fontWeight = 'bold';
    countdownOverlay.style.textShadow = '0 0 20px rgba(255, 255, 255, 0.7)';
    document.body.appendChild(countdownOverlay);

    let countdown = 3;
    countdownOverlay.textContent = countdown;
    const countdownInterval = setInterval(() => {
        countdown--;
        if (countdown > 0) {
            countdownOverlay.textContent = countdown;
        } else if (countdown === 0) {
            countdownOverlay.textContent = 'GO!';
        } else {
            clearInterval(countdownInterval);
            document.body.removeChild(countdownOverlay);
            positionCameraBehindPlayer();
            raceTime = 0;
        }
    }, 1000);
}

// Position camera behind player
function positionCameraBehindPlayer() {
    if (!player) return;
    const cameraDistance = 30 + (playerSpeed * 3);
    const cameraHeight = 10;
    const backward = new THREE.Vector3(0, -1, 0).applyAxisAngle(new THREE.Vector3(0, 0, 1), player.rotation.z);
    const targetPosition = new THREE.Vector3(
        player.position.x + (backward.x * cameraDistance),
        player.position.y + (backward.y * cameraDistance),
        player.position.z + cameraHeight
    );
    camera.position.lerp(targetPosition, 0.1);
    camera.lookAt(player.position);
    camera.fov = 75 + (playerSpeed * 5);
    camera.updateProjectionMatrix();
}

// Update player movement
function updatePlayerMovement() {
    if (!gameStarted || !player) return;
    const delta = clock.getDelta();
    const forward = new THREE.Vector3(0, 1, 0).applyAxisAngle(new THREE.Vector3(0, 0, 1), player.rotation.z);
    let velocity = player.userData.velocity;
    isDrifting = keyState['ShiftLeft'] || keyState['ShiftRight'];

    if (keyState['KeyW'] || keyState['ArrowUp']) {
        const acceleration = forward.clone().multiplyScalar(ACCELERATION);
        velocity.x += acceleration.x;
        velocity.y += acceleration.y;
    } else if (keyState['KeyS'] || keyState['ArrowDown']) {
        const deceleration = forward.clone().multiplyScalar(-DECELERATION);
        velocity.x += deceleration.x;
        velocity.y += deceleration.y;
    } else {
        const friction = velocity.clone().multiplyScalar(-0.05);
        velocity.add(friction);
    }

    if (player.userData.isBoosting) {
        player.userData.boostTimeRemaining -= delta;
        if (player.userData.boostTimeRemaining <= 0) {
            player.userData.isBoosting = false;
            player.userData.exhaust.material.color.setHex(0xffaa00);
        } else {
            velocity.multiplyScalar(1.05);
        }
    }

    const currentMaxSpeed = player.userData.isBoosting ? MAX_SPEED * BOOST_MULTIPLIER : MAX_SPEED;
    const speedXY = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);
    if (speedXY > currentMaxSpeed) {
        const scale = currentMaxSpeed / speedXY;
        velocity.x *= scale;
        velocity.y *= scale;
    }
    playerSpeed = speedXY;

    const rotationAmount = ROTATION_SPEED * (playerSpeed / MAX_SPEED);
    const effectiveRotation = isDrifting ? rotationAmount * DRIFT_ROTATION_MULTIPLIER : rotationAmount;

    if (keyState['KeyA'] || keyState['ArrowLeft']) {
        player.rotation.z += effectiveRotation;
    } else if (keyState['KeyD'] || keyState['ArrowRight']) {
        player.rotation.z -= effectiveRotation;
    }

    if ((keyState['Space']) && player.userData.isGrounded && !player.userData.isJumping) {
        velocity.z = JUMP_FORCE;
        player.userData.isGrounded = false;
        player.userData.isJumping = true;
    }

    if (!player.userData.isGrounded) {
        velocity.z -= GRAVITY;
    }

    let closestTrackHeight = TRACK_HEIGHT;
    let onTrack = false;

    for (const segment of trackSegments) {
        const closestPoint = closestPointOnSegment(player.position, segment.start, segment.end);
        const distance = player.position.distanceTo(closestPoint);
        if (distance < 10) { // Within track width
            closestTrackHeight = closestPoint.z;
            onTrack = true;
            break;
        }
    }

    if (player.userData.isGrounded || player.position.z <= closestTrackHeight) {
        player.position.z = closestTrackHeight;
        velocity.z = 0;
        player.userData.isGrounded = true;
        player.userData.isJumping = false;
    }

    if (!onTrack) {
        velocity.multiplyScalar(0.9); // Slow down off track
        if (player.position.z <= TRACK_HEIGHT) {
            player.position.z = TRACK_HEIGHT;
            velocity.z = 0;
            player.userData.isGrounded = true;
            player.userData.isJumping = false;
        }
    }

    player.position.x += velocity.x;
    player.position.y += velocity.y;
    player.position.z += velocity.z;

    if (isDrifting && playerSpeed > MAX_SPEED / 2) {
        createDriftEffect();
    }

    updateExhaustParticles();
    checkNodeCollisions();
    checkBoostZoneCollisions();
    positionCameraBehindPlayer();
}

// Closest point on segment
function closestPointOnSegment(point, start, end) {
    const startToPoint = point.clone().sub(start);
    const startToEnd = end.clone().sub(start);
    const lengthSquared = startToEnd.lengthSq();
    if (lengthSquared === 0) return start.clone();
    let t = startToPoint.dot(startToEnd) / lengthSquared;
    t = Math.max(0, Math.min(1, t));
    return start.clone().lerp(end, t);
}

// Create drift effect
function createDriftEffect() {
    if (!player) return;
    const markGeometry = new THREE.PlaneGeometry(0.5, 2);
    const markMaterial = new THREE.MeshBasicMaterial({
        color: 0x333333,
        transparent: true,
        opacity: 0.7
    });
    const wheelOffsets = [new THREE.Vector3(-1.8, 0, 0), new THREE.Vector3(1.8, 0, 0)];
    wheelOffsets.forEach(offset => {
        const mark = new THREE.Mesh(markGeometry, markMaterial);
        const wheelPos = player.position.clone().add(offset.clone().applyAxisAngle(new THREE.Vector3(0, 0, 1), player.rotation.z));
        mark.position.copy(wheelPos);
        mark.position.z = player.position.z + 0.1;
        mark.rotation.x = -Math.PI / 2;
        mark.rotation.z = player.rotation.z;
        scene.add(mark);
        setTimeout(() => {
            const fadeInterval = setInterval(() => {
                mark.material.opacity -= 0.05;
                if (mark.material.opacity <= 0) {
                    scene.remove(mark);
                    clearInterval(fadeInterval);
                }
            }, 100);
        }, 1000);
    });
}

// Update exhaust particles
function updateExhaustParticles() {
    if (!player || !player.userData.exhaust) return;
    const exhaust = player.userData.exhaust;
    const positions = exhaust.geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += 0.2 * playerSpeed; // Move along Y-axis
        if (positions[i + 1] > 5) {
            positions[i] = THREE.MathUtils.randFloatSpread(0.5);
            positions[i + 1] = 0;
            positions[i + 2] = THREE.MathUtils.randFloatSpread(0.5);
        }
    }
    exhaust.geometry.attributes.position.needsUpdate = true;
    exhaust.material.size = 0.3 + (playerSpeed / MAX_SPEED) * 0.7;
    if (keyState['KeyW'] || keyState['ArrowUp']) {
        exhaust.material.opacity = 0.8;
    } else {
        exhaust.material.opacity = 0.4;
    }
}

// Check for node collisions
function checkNodeCollisions() {
    if (!player) return;
    for (const id in nodeMap) {
        const node = nodeMap[id];
        const distance = player.position.distanceTo(node.position);
        if (distance < NODE_SIZE * 2) {
            handleNodeCollision(node);
            break;
        }
    }
}

// Handle node collision
function handleNodeCollision(node) {
    if (node === targetNode) {
        const timeBonus = Math.max(1000 - (raceTime * 10), 100);
        score += timeBonus;
        if (node.userData.type === 'problem') problemsVisited.add(node.userData.id);
        document.getElementById('score').textContent = score;
        document.getElementById('problems-visited').textContent = problemsVisited.size;
        currentNode = targetNode;
        document.getElementById('current-node').textContent = currentNode.userData.name;
        raceTime = 0;
        setRandomTarget();
    } else if (pathNodes.includes(node)) {
        score += 10;
        if (node.userData.type === 'problem') problemsVisited.add(node.userData.id);
        document.getElementById('score').textContent = score;
        document.getElementById('problems-visited').textContent = problemsVisited.size;
        currentNode = node;
        document.getElementById('current-node').textContent = currentNode.userData.name;
        findPath();
    }
}

// Jump to next topic node
function jumpToNextTopic() {
    if (!gameStarted || !currentNode || !targetNode || pathNodes.length <= 1) return;
    let nextTopicIndex = -1;
    for (let i = 1; i < pathNodes.length; i++) {
        if (pathNodes[i].userData.type === 'topic') {
            nextTopicIndex = i;
            break;
        }
    }
    if (nextTopicIndex !== -1) {
        const nextTopic = pathNodes[nextTopicIndex];
        player.position.copy(nextTopic.position);
        currentNode = nextTopic;
        document.getElementById('current-node').textContent = currentNode.userData.name;
        findPath();
        score = Math.max(0, score - 5);
        document.getElementById('score').textContent = score;
    }
}

// Update total problems
function updateTotalProblems() {
    const totalProblems = Object.values(nodeMap).filter(node => node.userData.type === 'problem').length;
    document.getElementById('total-problems').textContent = totalProblems;
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    if (gameStarted) {
        raceTime += delta;
        document.getElementById('race-time').textContent = raceTime.toFixed(1);
    }
    updatePlayerMovement();
    if (controls.enabled) controls.update();
    renderer.render(scene, camera);
}

// Check for boost zone collisions
function checkBoostZoneCollisions() {
    if (!player) return;
    for (const boostZone of boostZones) {
        const distance = player.position.distanceTo(boostZone.position);
        if (distance < 5 && !player.userData.isBoosting) {
            activateBoost();
            boostZone.visible = false;
            setTimeout(() => boostZone.visible = true, BOOST_DURATION * 1000);
            break;
        }
    }
}

// Activate boost
function activateBoost() {
    if (!player) return;
    player.userData.isBoosting = true;
    player.userData.boostTimeRemaining = BOOST_DURATION;
    player.userData.exhaust.material.color.setHex(BOOST_COLOR);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', init);