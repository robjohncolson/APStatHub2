// AP Statistics Knowledge Tree Racer
// A 3D racing game through the AP Statistics knowledge tree

// Global variables
let scene, camera, renderer, controls;
let nodeMap = {};
let player, playerSpeed = 0, playerRotation = 0;
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
const LEVEL_HEIGHT = 100;
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
    // Create UI elements
    createUI();
    
    // Set up Three.js scene
    setupScene();
    
    // Set up interaction
    setupInteraction();
    
    // Set up clock for game loop
    clock = new THREE.Clock();
    
    // Load data and build tree
    loadKnowledgeTreeData();
    
    // Start animation loop
    animate();
}

// Create UI elements
function createUI() {
    // Create tooltip div for hovering over nodes
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
    
    // Create info panel for game stats and instructions
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
        <button id="start-game" style="width: 100%; padding: 8px; margin-top: 10px; background: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer;">Start Game</button>
    `;
    document.body.appendChild(infoPanel);
    
    // Add event listener to start game button
    document.getElementById('start-game').addEventListener('click', startGame);
}

// Set up the Three.js scene, camera, renderer, and controls
function setupScene() {
    // Create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000033); // Dark blue background for space-like feel
    
    // Add fog for depth perception
    scene.fog = new THREE.FogExp2(0x000033, 0.001);
    
    // Create camera
    camera = new THREE.PerspectiveCamera(
        75, window.innerWidth / window.innerHeight, 1, 5000
    );
    camera.position.set(0, 50, 200);
    
    // Create renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.getElementById('tree-container').appendChild(renderer.domElement);
    
    // Add orbit controls for initial exploration
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enabled = true; // Will be disabled when game starts
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0x333333, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1).normalize();
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    
    // Add a grid for reference
    const gridHelper = new THREE.GridHelper(2000, 100, 0x444444, 0x222222);
    scene.add(gridHelper);
    
    // Handle window resize
    window.addEventListener('resize', onWindowResize, false);
}

// Set up interaction (keyboard, mouse)
function setupInteraction() {
    // Set up raycaster for node selection
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();
    
    // Add event listeners
    renderer.domElement.addEventListener('mousemove', onMouseMove, false);
    renderer.domElement.addEventListener('click', onMouseClick, false);
    
    // Keyboard controls
    window.addEventListener('keydown', function(event) {
        keyState[event.code] = true;
    });
    
    window.addEventListener('keyup', function(event) {
        keyState[event.code] = false;
        
        // Space bar to jump to next topic node
        if (event.code === 'Space' && gameStarted && currentNode) {
            jumpToNextTopic();
        }
    });
}

// Handle window resize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Handle mouse movement for hovering effects
function onMouseMove(event) {
    // Calculate mouse position in normalized device coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    // Update tooltip position
    tooltipDiv.style.left = event.clientX + 10 + 'px';
    tooltipDiv.style.top = event.clientY + 10 + 'px';
    
    // Check for intersections
    checkIntersections();
}

// Handle mouse clicks for node selection
function onMouseClick(event) {
    if (gameStarted) return; // Disable clicking during game
    
    // Calculate mouse position in normalized device coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    // Update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);
    
    // Calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects(scene.children, true);
    
    if (intersects.length > 0) {
        const object = intersects[0].object;
        
        // If the object has userData with an id, it's a tree node
        if (object.userData && object.userData.id) {
            // If it's a problem node, set it as the starting point
            if (object.userData.type === 'problem') {
                setStartingPoint(object);
            }
        }
    }
}

// Check for intersections with nodes for hover effects
function checkIntersections() {
    if (gameStarted) return; // Disable hovering during game
    
    // Update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);
    
    // Calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects(scene.children, true);
    
    // Reset all previously highlighted nodes
    for (const id in nodeMap) {
        if (nodeMap[id].isHighlighted && nodeMap[id] !== currentNode && nodeMap[id] !== targetNode) {
            const node = nodeMap[id];
            if (node.isActive) {
                node.material.color.setHex(ACTIVE_BRANCH_COLOR);
            } else {
                node.material.color.setHex(INACTIVE_BRANCH_COLOR);
            }
            node.isHighlighted = false;
        }
    }
    
    // Hide tooltip by default
    tooltipDiv.style.visibility = 'hidden';
    
    if (intersects.length > 0) {
        const object = intersects[0].object;
        
        // If the object has userData with an id, it's a tree node
        if (object.userData && object.userData.id && object !== currentNode && object !== targetNode) {
            // Highlight the node
            object.material.color.setHex(HIGHLIGHT_COLOR);
            object.isHighlighted = true;
            
            // Show tooltip with node information
            tooltipDiv.innerHTML = object.userData.tooltip;
            tooltipDiv.style.visibility = 'visible';
        }
    }
}

// Load knowledge tree data from the server
function loadKnowledgeTreeData() {
    fetch('/api/knowledge_tree_data')
        .then(response => response.json())
        .then(data => {
            buildTree(data);
            updateTotalProblems();
        })
        .catch(error => {
            console.error('Error loading knowledge tree data:', error);
        });
}

// Build the 3D tree from the data
function buildTree(data) {
    // Create unit nodes
    const units = data.units;
    const unitSpread = units.length * SIBLING_SPREAD / 2;
    
    units.forEach((unit, unitIndex) => {
        // Calculate position for this unit
        const unitX = (unitIndex * SIBLING_SPREAD) - unitSpread;
        const unitY = 0;
        
        // Create unit node
        const unitNode = createNode({
            id: unit.unit_id,
            name: `Unit ${unit.unit_number}: ${unit.unit_name}`,
            type: 'unit',
            hasProblems: unit.has_problems,
            tooltip: `Unit ${unit.unit_number}: ${unit.unit_name}`
        }, 1);
        unitNode.position.set(unitX, unitY, 0);
        scene.add(unitNode);
        
        // Create topic nodes for this unit
        const topics = unit.topics;
        const topicSpread = topics.length * SIBLING_SPREAD / 2;
        
        topics.forEach((topic, topicIndex) => {
            // Calculate position for this topic
            const topicX = unitX + ((topicIndex * SIBLING_SPREAD) - topicSpread);
            const topicY = -LEVEL_HEIGHT;
            
            // Create topic node
            const topicNode = createNode({
                id: topic.topic_id,
                name: `${topic.topic_number} ${topic.topic_name}`,
                type: 'topic',
                hasProblems: topic.has_problems,
                tooltip: `${topic.topic_number} ${topic.topic_name}`,
                connections: [] // Will store connections to other nodes
            }, 2);
            topicNode.position.set(topicX, topicY, 0);
            scene.add(topicNode);
            
            // Connect to unit
            createBranch(unitNode.position, topicNode.position, topic.has_problems);
            
            // Store connection in unit node
            if (!unitNode.userData.connections) unitNode.userData.connections = [];
            unitNode.userData.connections.push(topicNode);
            
            // If the topic has problems, create problem nodes
            if (topic.has_problems && topic.problems) {
                const problems = topic.problems;
                const problemSpread = problems.length * SIBLING_SPREAD / 2;
                
                problems.forEach((problem, problemIndex) => {
                    // Calculate position for this problem
                    const problemX = topicX + ((problemIndex * SIBLING_SPREAD) - problemSpread);
                    const problemY = -LEVEL_HEIGHT * 2;
                    
                    // Create problem node (with image texture)
                    const problemNode = createProblemNode({
                        id: problem.problem_id,
                        name: problem.display_name,
                        type: 'problem',
                        filename: problem.filename,
                        tooltip: problem.display_name,
                        connections: [] // Will store connections to other nodes
                    });
                    problemNode.position.set(problemX, problemY, 0);
                    scene.add(problemNode);
                    
                    // Connect to topic
                    createBranch(topicNode.position, problemNode.position, true);
                    
                    // Store connections
                    if (!topicNode.userData.connections) topicNode.userData.connections = [];
                    topicNode.userData.connections.push(problemNode);
                    
                    if (!problemNode.userData.connections) problemNode.userData.connections = [];
                    problemNode.userData.connections.push(topicNode);
                });
            }
        });
    });
    
    // Create connections between topics that share problems
    createTopicConnections();
    
    // Center camera on tree
    controls.target.set(0, -LEVEL_HEIGHT, 0);
    controls.update();
}

// Create connections between topics that share problems
function createTopicConnections() {
    // For each problem node
    for (const id in nodeMap) {
        const node = nodeMap[id];
        if (node.userData.type === 'problem') {
            // Get all topic connections
            const topicConnections = node.userData.connections.filter(n => n.userData.type === 'topic');
            
            // Create connections between topics
            for (let i = 0; i < topicConnections.length; i++) {
                for (let j = i + 1; j < topicConnections.length; j++) {
                    const topic1 = topicConnections[i];
                    const topic2 = topicConnections[j];
                    
                    // Add connection if not already present
                    if (!topic1.userData.connections.includes(topic2)) {
                        topic1.userData.connections.push(topic2);
                        topic2.userData.connections.push(topic1);
                        
                        // Create visual connection
                        createBranch(topic1.position, topic2.position, true);
                    }
                }
            }
        }
    }
}

// Create a node sphere with the given data
function createNode(data, level) {
    const geometry = new THREE.SphereGeometry(NODE_SIZE - level, 32, 32);
    const material = new THREE.MeshLambertMaterial({
        color: data.hasProblems ? ACTIVE_BRANCH_COLOR : INACTIVE_BRANCH_COLOR
    });
    
    const node = new THREE.Mesh(geometry, material);
    node.castShadow = true;
    node.receiveShadow = true;
    
    // Store node data
    node.userData = data;
    node.isActive = data.hasProblems;
    node.isHighlighted = false;
    
    // Add to node map for easy access
    nodeMap[data.id] = node;
    
    return node;
}

// Create a problem node with an image texture
function createProblemNode(data) {
    // Create a plane geometry for the problem image
    const geometry = new THREE.PlaneGeometry(NODE_SIZE * 3, NODE_SIZE * 3);
    
    // Load the problem image as a texture
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(`/images/${data.filename}`);
    
    // Create material with the image texture
    const material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide
    });
    
    const node = new THREE.Mesh(geometry, material);
    node.castShadow = true;
    node.receiveShadow = true;
    
    // Store node data
    node.userData = data;
    node.isActive = true;
    node.isHighlighted = false;
    
    // Add to node map for easy access
    nodeMap[data.id] = node;
    
    return node;
}

// Create a branch (line) between two points
function createBranch(startPoint, endPoint, isActive) {
    const material = new THREE.LineBasicMaterial({
        color: isActive ? ACTIVE_BRANCH_COLOR : INACTIVE_BRANCH_COLOR,
        linewidth: isActive ? 2 : 1
    });
    
    const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(startPoint.x, startPoint.y, startPoint.z),
        new THREE.Vector3(endPoint.x, endPoint.y, endPoint.z)
    ]);
    
    const line = new THREE.Line(geometry, material);
    scene.add(line);
    
    return line;
}

// Create player object
function createPlayer() {
    // Create a car-like shape for the player
    const carBody = new THREE.Group();
    
    // Main body
    const bodyGeometry = new THREE.BoxGeometry(4, 1.5, 8);
    const bodyMaterial = new THREE.MeshLambertMaterial({ color: PLAYER_COLOR });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.75;
    carBody.add(body);
    
    // Cockpit/windshield
    const cockpitGeometry = new THREE.BoxGeometry(3, 1, 3);
    const cockpitMaterial = new THREE.MeshLambertMaterial({ 
        color: 0x88ccff,
        transparent: true,
        opacity: 0.7
    });
    const cockpit = new THREE.Mesh(cockpitGeometry, cockpitMaterial);
    cockpit.position.set(0, 1.5, -1);
    carBody.add(cockpit);
    
    // Wheels
    const wheelGeometry = new THREE.CylinderGeometry(1, 1, 0.5, 16);
    const wheelMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 });
    
    const wheelPositions = [
        [-1.8, 0, -2.5], // front left
        [1.8, 0, -2.5],  // front right
        [-1.8, 0, 2.5],  // rear left
        [1.8, 0, 2.5]    // rear right
    ];
    
    wheelPositions.forEach(pos => {
        const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
        wheel.position.set(pos[0], pos[1], pos[2]);
        wheel.rotation.z = Math.PI / 2;
        carBody.add(wheel);
    });
    
    // Add headlights
    const headlightGeometry = new THREE.SphereGeometry(0.5, 16, 16);
    const headlightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffcc });
    
    const leftHeadlight = new THREE.Mesh(headlightGeometry, headlightMaterial);
    leftHeadlight.position.set(-1.5, 0.75, -4);
    carBody.add(leftHeadlight);
    
    const rightHeadlight = new THREE.Mesh(headlightGeometry, headlightMaterial);
    rightHeadlight.position.set(1.5, 0.75, -4);
    carBody.add(rightHeadlight);
    
    // Add spotlights for headlights
    const leftSpotlight = new THREE.SpotLight(0xffffcc, 1);
    leftSpotlight.position.set(-1.5, 0.75, -4);
    leftSpotlight.angle = Math.PI / 6;
    leftSpotlight.penumbra = 0.2;
    leftSpotlight.decay = 2;
    leftSpotlight.distance = 100;
    leftSpotlight.target.position.set(-1.5, 0, -10);
    carBody.add(leftSpotlight);
    carBody.add(leftSpotlight.target);
    
    const rightSpotlight = new THREE.SpotLight(0xffffcc, 1);
    rightSpotlight.position.set(1.5, 0.75, -4);
    rightSpotlight.angle = Math.PI / 6;
    rightSpotlight.penumbra = 0.2;
    rightSpotlight.decay = 2;
    rightSpotlight.distance = 100;
    rightSpotlight.target.position.set(1.5, 0, -10);
    carBody.add(rightSpotlight);
    carBody.add(rightSpotlight.target);
    
    // Add exhaust particles
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
            THREE.MathUtils.randFloatSpread(0.5),
            THREE.MathUtils.randFloat(0, 5)
        );
    }
    
    exhaustGeometry.setAttribute('position', new THREE.Float32BufferAttribute(exhaustParticles, 3));
    const exhaust = new THREE.Points(exhaustGeometry, exhaustMaterial);
    exhaust.position.set(0, 0.75, 4);
    carBody.add(exhaust);
    
    // Set up the player object
    player = carBody;
    player.castShadow = true;
    player.receiveShadow = true;
    
    // Initialize physics properties
    player.userData.velocity = new THREE.Vector3();
    player.userData.acceleration = new THREE.Vector3();
    player.userData.isGrounded = true;
    player.userData.isJumping = false;
    player.userData.isBoosting = false;
    player.userData.boostTimeRemaining = 0;
    player.userData.exhaust = exhaust;
    
    scene.add(player);
    
    // Position at starting node
    if (currentNode) {
        player.position.copy(currentNode.position);
        player.position.z += TRACK_HEIGHT;
    }
}

// Set a node as the starting point
function setStartingPoint(node) {
    // Reset previous starting point
    if (currentNode) {
        if (currentNode.isActive) {
            currentNode.material.color.setHex(ACTIVE_BRANCH_COLOR);
        } else {
            currentNode.material.color.setHex(INACTIVE_BRANCH_COLOR);
        }
    }
    
    // Set new starting point
    currentNode = node;
    currentNode.material.color.setHex(PLAYER_COLOR);
    
    // Update UI
    document.getElementById('current-node').textContent = currentNode.userData.name;
    
    // Find a random target node
    setRandomTarget();
}

// Set a random target node
function setRandomTarget() {
    // Reset previous target
    if (targetNode) {
        if (targetNode.isActive) {
            targetNode.material.color.setHex(ACTIVE_BRANCH_COLOR);
        } else {
            targetNode.material.color.setHex(INACTIVE_BRANCH_COLOR);
        }
    }
    
    // Find all problem nodes
    const problemNodes = Object.values(nodeMap).filter(node => 
        node.userData.type === 'problem' && node !== currentNode);
    
    // Select a random problem node
    if (problemNodes.length > 0) {
        const randomIndex = Math.floor(Math.random() * problemNodes.length);
        targetNode = problemNodes[randomIndex];
        targetNode.material.color.setHex(TARGET_COLOR);
        
        // Update UI
        document.getElementById('target-node').textContent = targetNode.userData.name;
        
        // Find path to target
        findPath();
    }
}

// Find path from current node to target node
function findPath() {
    // Reset previous path
    pathNodes.forEach(node => {
        if (node !== currentNode && node !== targetNode) {
            if (node.isActive) {
                node.material.color.setHex(ACTIVE_BRANCH_COLOR);
            } else {
                node.material.color.setHex(INACTIVE_BRANCH_COLOR);
            }
        }
    });
    pathNodes = [];
    
    // Simple breadth-first search
    const queue = [[currentNode]];
    const visited = new Set([currentNode.userData.id]);
    
    while (queue.length > 0) {
        const path = queue.shift();
        const node = path[path.length - 1];
        
        if (node === targetNode) {
            // Found path
            pathNodes = path;
            
            // Highlight path
            pathNodes.forEach(node => {
                if (node !== currentNode && node !== targetNode) {
                    node.material.color.setHex(PATH_COLOR);
                }
            });
            
            return;
        }
        
        // Add connections to queue
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
    
    // Disable orbit controls
    controls.enabled = false;
    
    // Create player
    createPlayer();
    
    // Update UI
    document.getElementById('start-game').textContent = 'Game Started!';
    document.getElementById('start-game').disabled = true;
    
    // Position camera behind player
    positionCameraBehindPlayer();
}

// Position camera behind player
function positionCameraBehindPlayer() {
    if (!player) return;
    
    // Calculate camera distance based on speed
    const cameraDistance = 30 + (playerSpeed * 3);
    const cameraHeight = 15 + (playerSpeed * 1);
    
    // Calculate direction vector (opposite of player's facing direction)
    const backward = new THREE.Vector3(0, 0, 1).applyAxisAngle(new THREE.Vector3(0, 1, 0), player.rotation.y);
    
    // Calculate target position
    const targetPosition = new THREE.Vector3(
        player.position.x + (backward.x * cameraDistance),
        player.position.y + (backward.y * cameraDistance),
        player.position.z + cameraHeight
    );
    
    // Smoothly move camera to target position
    camera.position.lerp(targetPosition, 0.1);
    
    // Look at player
    camera.lookAt(player.position);
    
    // Adjust FOV based on speed for a sense of speed
    camera.fov = 75 + (playerSpeed * 5);
    camera.updateProjectionMatrix();
}

// Update player movement based on keyboard input
function updatePlayerMovement() {
    if (!gameStarted || !player) return;
    
    const delta = clock.getDelta();
    
    // Get forward direction based on player's rotation
    const forward = new THREE.Vector3(0, 0, -1).applyAxisAngle(new THREE.Vector3(0, 1, 0), player.rotation.y);
    
    // Get velocity from player data or initialize it
    let velocity = player.userData.velocity;
    
    // Check if player is drifting
    isDrifting = keyState['ShiftLeft'] || keyState['ShiftRight'];
    
    // Handle acceleration/deceleration
    if (keyState['KeyW'] || keyState['ArrowUp']) {
        // Accelerate in the forward direction
        const acceleration = forward.clone().multiplyScalar(ACCELERATION);
        velocity.add(acceleration);
    } else if (keyState['KeyS'] || keyState['ArrowDown']) {
        // Brake/reverse
        const deceleration = forward.clone().multiplyScalar(-DECELERATION);
        velocity.add(deceleration);
    } else {
        // Apply friction to gradually slow down
        velocity.multiplyScalar(0.95);
    }
    
    // Apply boost if active
    if (player.userData.isBoosting) {
        player.userData.boostTimeRemaining -= delta;
        
        if (player.userData.boostTimeRemaining <= 0) {
            player.userData.isBoosting = false;
            // Reset boost visual effects
            player.userData.exhaust.material.color.setHex(0xffaa00);
        } else {
            // Boost is active, increase speed
            velocity.multiplyScalar(1.05);
        }
    }
    
    // Limit maximum speed
    const currentMaxSpeed = player.userData.isBoosting ? 
        MAX_SPEED * BOOST_MULTIPLIER : MAX_SPEED;
    
    if (velocity.length() > currentMaxSpeed) {
        velocity.normalize().multiplyScalar(currentMaxSpeed);
    }
    
    // Store current speed for effects
    playerSpeed = velocity.length();
    
    // Handle steering (rotation)
    const rotationAmount = ROTATION_SPEED * (playerSpeed / MAX_SPEED);
    const effectiveRotation = isDrifting ? 
        rotationAmount * DRIFT_ROTATION_MULTIPLIER : rotationAmount;
    
    if (keyState['KeyA'] || keyState['ArrowLeft']) {
        player.rotation.y += effectiveRotation;
    } else if (keyState['KeyD'] || keyState['ArrowRight']) {
        player.rotation.y -= effectiveRotation;
    }
    
    // Apply jumping
    if ((keyState['Space']) && player.userData.isGrounded && !player.userData.isJumping) {
        velocity.z = JUMP_FORCE;
        player.userData.isGrounded = false;
        player.userData.isJumping = true;
    }
    
    // Apply gravity
    if (!player.userData.isGrounded) {
        velocity.z -= GRAVITY;
    }
    
    // Move player based on velocity
    player.position.add(velocity);
    
    // Check ground collision
    if (player.position.z <= TRACK_HEIGHT && velocity.z <= 0) {
        player.position.z = TRACK_HEIGHT;
        velocity.z = 0;
        player.userData.isGrounded = true;
        player.userData.isJumping = false;
    }
    
    // Apply drift visual effect
    if (isDrifting && playerSpeed > MAX_SPEED / 2) {
        createDriftEffect();
    }
    
    // Update exhaust particles based on speed
    updateExhaustParticles();
    
    // Check for node collisions
    checkNodeCollisions();
    
    // Check for boost zone collisions
    checkBoostZoneCollisions();
    
    // Position camera behind player
    positionCameraBehindPlayer();
}

// Create drift effect (tire marks)
function createDriftEffect() {
    if (!player) return;
    
    // Create tire mark geometry
    const markGeometry = new THREE.PlaneGeometry(0.5, 2);
    const markMaterial = new THREE.MeshBasicMaterial({
        color: 0x333333,
        transparent: true,
        opacity: 0.7
    });
    
    // Create tire marks for left and right wheels
    const wheelOffsets = [
        new THREE.Vector3(-1.8, 0, 0), // left wheel
        new THREE.Vector3(1.8, 0, 0)   // right wheel
    ];
    
    wheelOffsets.forEach(offset => {
        const mark = new THREE.Mesh(markGeometry, markMaterial);
        
        // Position mark at wheel position
        const wheelPos = player.position.clone().add(
            offset.clone().applyAxisAngle(new THREE.Vector3(0, 0, 1), player.rotation.y)
        );
        mark.position.copy(wheelPos);
        mark.position.z = TRACK_HEIGHT + 0.1; // Slightly above ground
        
        // Rotate mark to match player direction
        mark.rotation.x = -Math.PI / 2; // Lay flat
        mark.rotation.z = player.rotation.y;
        
        scene.add(mark);
        
        // Fade out and remove after a short time
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

// Update exhaust particles based on speed
function updateExhaustParticles() {
    if (!player || !player.userData.exhaust) return;
    
    const exhaust = player.userData.exhaust;
    const positions = exhaust.geometry.attributes.position.array;
    
    // Update particle positions based on speed
    for (let i = 0; i < positions.length; i += 3) {
        // Move particles backward
        positions[i + 2] += 0.2 * playerSpeed;
        
        // Reset particles that go too far
        if (positions[i + 2] > 5) {
            positions[i] = THREE.MathUtils.randFloatSpread(0.5);
            positions[i + 1] = THREE.MathUtils.randFloatSpread(0.5);
            positions[i + 2] = 0;
        }
    }
    
    // Update the particles
    exhaust.geometry.attributes.position.needsUpdate = true;
    
    // Adjust particle size based on speed
    exhaust.material.size = 0.3 + (playerSpeed / MAX_SPEED) * 0.7;
    
    // Make exhaust more visible when accelerating
    if (keyState['KeyW'] || keyState['ArrowUp']) {
        exhaust.material.opacity = 0.8;
    } else {
        exhaust.material.opacity = 0.4;
    }
}

// Check for boost zone collisions
function checkBoostZoneCollisions() {
    if (!player) return;
    
    for (const boostZone of boostZones) {
        const distance = player.position.distanceTo(boostZone.position);
        
        if (distance < 5 && !player.userData.isBoosting) {
            activateBoost();
            
            // Hide the boost zone temporarily
            boostZone.visible = false;
            setTimeout(() => {
                boostZone.visible = true;
            }, BOOST_DURATION * 1000);
            
            break;
        }
    }
}

// Activate boost effect
function activateBoost() {
    if (!player) return;
    
    player.userData.isBoosting = true;
    player.userData.boostTimeRemaining = BOOST_DURATION;
    
    // Visual effect for boost
    player.userData.exhaust.material.color.setHex(BOOST_COLOR);
    
    // Add a boost sound effect here if you have audio
}

// Handle collision with a node
function handleNodeCollision(node) {
    // If it's the target node, we've reached our destination
    if (node === targetNode) {
        // Add score based on time (faster = more points)
        const timeBonus = Math.max(1000 - (raceTime * 10), 100);
        score += timeBonus;
        
        // Mark problem as visited
        if (node.userData.type === 'problem') {
            problemsVisited.add(node.userData.id);
        }
        
        // Update UI
        document.getElementById('score').textContent = score;
        document.getElementById('problems-visited').textContent = problemsVisited.size;
        
        // Set current node to target
        currentNode = targetNode;
        document.getElementById('current-node').textContent = currentNode.userData.name;
        
        // Reset race timer
        raceTime = 0;
        
        // Find new target
        setRandomTarget();
    }
    // If it's a node on our path, update current node
    else if (pathNodes.includes(node)) {
        // Add score
        score += 10;
        
        // Mark problem as visited
        if (node.userData.type === 'problem') {
            problemsVisited.add(node.userData.id);
        }
        
        // Update UI
        document.getElementById('score').textContent = score;
        document.getElementById('problems-visited').textContent = problemsVisited.size;
        
        // Set current node
        currentNode = node;
        document.getElementById('current-node').textContent = currentNode.userData.name;
        
        // Update path
        findPath();
    }
}

// Jump to the next topic node in the path
function jumpToNextTopic() {
    if (!gameStarted || !currentNode || !targetNode || pathNodes.length <= 1) return;
    
    // Find the next topic node in the path
    let nextTopicIndex = -1;
    for (let i = 1; i < pathNodes.length; i++) {
        if (pathNodes[i].userData.type === 'topic') {
            nextTopicIndex = i;
            break;
        }
    }
    
    if (nextTopicIndex !== -1) {
        // Move player to the next topic node
        const nextTopic = pathNodes[nextTopicIndex];
        player.position.copy(nextTopic.position);
        
        // Update current node
        currentNode = nextTopic;
        document.getElementById('current-node').textContent = currentNode.userData.name;
        
        // Update path
        findPath();
        
        // Subtract score for using a shortcut
        score = Math.max(0, score - 5);
        document.getElementById('score').textContent = score;
    }
}

// Update total problems count in UI
function updateTotalProblems() {
    const totalProblems = Object.values(nodeMap).filter(node => node.userData.type === 'problem').length;
    document.getElementById('total-problems').textContent = totalProblems;
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    const delta = clock ? clock.getDelta() : 0;
    
    // Update race time if game is started
    if (gameStarted) {
        raceTime += delta;
        document.getElementById('race-time').textContent = raceTime.toFixed(1);
    }
    
    // Update player movement
    updatePlayerMovement();
    
    // Update controls if enabled
    if (controls.enabled) {
        controls.update();
    }
    
    renderer.render(scene, camera);
}

// Create a visible path between two points with road-like appearance
function createVisiblePath(startPoint, endPoint, isActive) {
    // Create a curve between the points
    const curve = new THREE.LineCurve3(
        new THREE.Vector3(startPoint.x, startPoint.y, startPoint.z),
        new THREE.Vector3(endPoint.x, endPoint.y, endPoint.z)
    );
    
    // Create tube geometry along the curve
    const tubeGeometry = new THREE.TubeGeometry(curve, 20, 3, 8, false);
    const tubeMaterial = new THREE.MeshLambertMaterial({
        color: isActive ? ACTIVE_BRANCH_COLOR : INACTIVE_BRANCH_COLOR,
        transparent: true,
        opacity: 0.7
    });
    
    const tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
    tube.castShadow = true;
    tube.receiveShadow = true;
    scene.add(tube);
    
    // Add to track segments for collision detection
    trackSegments.push({
        start: startPoint.clone(),
        end: endPoint.clone(),
        mesh: tube
    });
    
    // Add boost zones along the path
    if (isActive && Math.random() < 0.3) { // 30% chance for a boost on active paths
        const t = Math.random() * 0.6 + 0.2; // Position between 20% and 80% along the path
        const boostPosition = new THREE.Vector3().lerpVectors(startPoint, endPoint, t);
        
        // Create boost zone
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
        
        // Orient the ring perpendicular to the path
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

// Check if player has collided with any nodes
function checkNodeCollisions() {
    if (!player) return;
    
    // Check distance to all nodes
    for (const id in nodeMap) {
        const node = nodeMap[id];
        const distance = player.position.distanceTo(node.position);
        
        // If close enough, consider it a collision
        if (distance < NODE_SIZE * 2) {
            handleNodeCollision(node);
            break;
        }
    }
}

// Initialize when the DOM is ready
document.addEventListener('DOMContentLoaded', init); 
document.addEventListener('DOMContentLoaded', init); 