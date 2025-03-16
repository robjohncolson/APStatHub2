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
let problemsVisited = new Set();
let gameStarted = false;

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
const MAX_SPEED = 2;
const ACCELERATION = 0.05;
const DECELERATION = 0.03;
const ROTATION_SPEED = 0.05;

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
        </div>
        <div id="game-controls">
            <h4>Controls:</h4>
            <p>W/Up Arrow: Accelerate</p>
            <p>S/Down Arrow: Brake/Reverse</p>
            <p>A/Left Arrow: Turn Left</p>
            <p>D/Right Arrow: Turn Right</p>
            <p>Space: Jump to Next Topic</p>
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
    // Create a cone for the player (like a spaceship)
    const geometry = new THREE.ConeGeometry(2, 8, 16);
    const material = new THREE.MeshLambertMaterial({ color: PLAYER_COLOR });
    player = new THREE.Mesh(geometry, material);
    player.castShadow = true;
    player.receiveShadow = true;
    
    // Rotate to point forward
    player.rotation.x = Math.PI / 2;
    
    scene.add(player);
    
    // Position at starting node
    if (currentNode) {
        player.position.copy(currentNode.position);
        player.position.y += 5; // Slightly above the node
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
    
    // Calculate position behind player
    const offset = new THREE.Vector3(0, 10, 30);
    offset.applyQuaternion(player.quaternion);
    
    camera.position.copy(player.position).add(offset);
    camera.lookAt(player.position);
}

// Update player movement based on keyboard input
function updatePlayerMovement() {
    if (!gameStarted || !player) return;
    
    // Handle acceleration/deceleration
    if (keyState['KeyW'] || keyState['ArrowUp']) {
        playerSpeed = Math.min(playerSpeed + ACCELERATION, MAX_SPEED);
    } else if (keyState['KeyS'] || keyState['ArrowDown']) {
        playerSpeed = Math.max(playerSpeed - ACCELERATION, -MAX_SPEED / 2);
    } else {
        // Gradually slow down
        if (playerSpeed > 0) {
            playerSpeed = Math.max(0, playerSpeed - DECELERATION);
        } else if (playerSpeed < 0) {
            playerSpeed = Math.min(0, playerSpeed + DECELERATION);
        }
    }
    
    // Handle rotation
    if (keyState['KeyA'] || keyState['ArrowLeft']) {
        playerRotation += ROTATION_SPEED;
    } else if (keyState['KeyD'] || keyState['ArrowRight']) {
        playerRotation -= ROTATION_SPEED;
    }
    
    // Apply rotation
    player.rotation.z = playerRotation;
    
    // Calculate movement direction
    const direction = new THREE.Vector3(0, 0, -1);
    direction.applyAxisAngle(new THREE.Vector3(1, 0, 0), playerRotation);
    
    // Move player
    player.position.x += direction.x * playerSpeed;
    player.position.z += direction.z * playerSpeed;
    
    // Check for node collisions
    checkNodeCollisions();
    
    // Position camera behind player
    positionCameraBehindPlayer();
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

// Handle collision with a node
function handleNodeCollision(node) {
    // If it's the target node, we've reached our destination
    if (node === targetNode) {
        // Add score
        score += 100;
        
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
    
    // Update player movement
    updatePlayerMovement();
    
    // Update controls if enabled
    if (controls.enabled) {
        controls.update();
    }
    
    renderer.render(scene, camera);
}

// Initialize when the DOM is ready
document.addEventListener('DOMContentLoaded', init); 