// AP Statistics Knowledge Tree 3D Visualization
// Uses Three.js to create an interactive 3D visualization with draggable nodes, springy connections, and floating uncategorized problems

// Global variables
let scene, camera, renderer, controls;
let treeRoot, nodeMap = {};
let raycaster, mouse;
let tooltipDiv;
let highlightedObjects = []; // Track highlighted nodes and branches
let allNodes = []; // All draggable nodes
let springs = []; // Spring connections between nodes
let branches = []; // Visual branches (lines)
let uncategorizedNodes = []; // Nodes without connections
let clock; // For physics timing
let dragControls; // Drag controls for nodes
let keyboardControls = { enabled: true }; // Keyboard controls state

// Constants for tree layout and physics
const NODE_SIZE = 5;
const LEVEL_HEIGHT = 100;
const SIBLING_SPREAD = 80;
const BRANCH_COLOR = 0x555555;
const ACTIVE_BRANCH_COLOR = 0x00aa00;
const INACTIVE_BRANCH_COLOR = 0xaaaaaa;
const HIGHLIGHT_COLOR = 0xff9900;
const SPRING_CONSTANT = 0.1; // Stiffness of springs
const DAMPING = 0.99; // Damping factor for physics
const KEYBOARD_MOVE_SPEED = 10; // Speed for keyboard movement
const KEYBOARD_ZOOM_SPEED = 50; // Speed for keyboard zooming
const PAN_SPEED = 50; // Increased from 20 to 50 for more noticeable panning
const UNIT_HEIGHT_MIN = -400; // Lowest height for Unit 1
const UNIT_HEIGHT_MAX = 400;  // Highest height for Unit 9
const Z_DEPTH_ROOT = -300;    // Root furthest back
const Z_DEPTH_UNITS = -200;   // Units second furthest
const Z_DEPTH_TOPICS = -100;  // Topics third furthest
const Z_DEPTH_PROBLEMS = 0;   // Problems nearest

// Initialize the visualization
function init() {
    createTooltip();
    setupScene();
    setupInteraction();
    setupKeyboardControls();
    // Ensure keyboard controls are enabled by default
    keyboardControls.enabled = true;
    console.log('Keyboard controls initialized and enabled');
    loadKnowledgeTreeData();
    animate();
}

// Create tooltip div for displaying node information on hover
function createTooltip() {
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
    tooltipDiv.style.fontFamily = 'Arial, sans-serif';
    tooltipDiv.style.fontSize = '14px';
    document.body.appendChild(tooltipDiv);
}

// Set up the Three.js scene, camera, renderer, and controls
function setupScene() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 5000);
    camera.position.set(0, 0, 500);
    
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    const container = document.getElementById('tree-container');
    if (!container) {
        console.error('Container element #tree-container not found!');
        return;
    }
    container.appendChild(renderer.domElement);
    
    console.log('THREE.OrbitControls defined:', typeof THREE.OrbitControls !== 'undefined');
    
    if (typeof THREE.OrbitControls === 'undefined') {
        console.error('THREE.OrbitControls is not defined! Make sure you include the OrbitControls.js script.');
        controls = { update: function() {} };
    } else {
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.target.set(0, 0, -150);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        console.log('OrbitControls initialized:', controls);
        console.log('OrbitControls pan method exists:', typeof controls.pan === 'function');
    }
    
    const ambientLight = new THREE.AmbientLight(0xcccccc, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 1, 1000);
    pointLight.position.set(0, 0, 200);
    scene.add(pointLight);
    
    window.addEventListener('resize', onWindowResize, false);
}

// Set up keyboard controls for navigation
function setupKeyboardControls() {
    const helpDiv = document.createElement('div');
    helpDiv.className = 'keyboard-controls-help';
    helpDiv.style.position = 'absolute';
    helpDiv.style.bottom = '10px';
    helpDiv.style.right = '10px';
    helpDiv.style.background = 'rgba(255,255,255,0.7)';
    helpDiv.style.padding = '10px';
    helpDiv.style.borderRadius = '5px';
    helpDiv.style.zIndex = '100';
    helpDiv.style.fontSize = '14px';
    helpDiv.innerHTML = `
        <h5>Keyboard Controls</h5>
        <ul style="padding-left: 20px; margin-bottom: 5px;">
            <li>W/S: Move forward/backward</li>
            <li>A/D: Move left/right</li>
            <li>Q/E: Move up/down</li>
            <li>+/-: Zoom in/out</li>
            <li>Arrow Keys: Pan view</li>
            <li>Shift + Any Movement Key: Fine control (1/5 speed)</li>
            <li>Ctrl+Shift + Any Movement Key: Super fine control (1/25 speed)</li>
            <li>R: Reset view</li>
            <li>K: Toggle controls</li>
        </ul>
    `;
    document.body.appendChild(helpDiv);
    
    window.addEventListener('keydown', handleKeyDown);
}

// Custom pan function as a fallback if OrbitControls.pan is not available
function customPan(direction, amount) {
    // Create a vector in the camera's local space
    const vector = new THREE.Vector3();
    
    // Set the vector based on the direction
    switch(direction) {
        case 'left':
            vector.setFromMatrixColumn(camera.matrix, 0).negate();
            break;
        case 'right':
            vector.setFromMatrixColumn(camera.matrix, 0);
            break;
        case 'up':
            vector.setFromMatrixColumn(camera.matrix, 1);
            break;
        case 'down':
            vector.setFromMatrixColumn(camera.matrix, 1).negate();
            break;
    }
    
    // Scale the vector by the amount
    vector.multiplyScalar(amount);
    
    // Move the camera
    camera.position.add(vector);
    
    // Also move the controls target to maintain the same view direction
    if (controls.target) {
        controls.target.add(vector);
    }
    
    console.log(`Custom panning ${direction} by ${amount} units. Camera position:`, camera.position);
}

// Handle keyboard input for navigation
function handleKeyDown(event) {
    console.log('Key pressed:', event.key, 'Keyboard controls enabled:', keyboardControls.enabled);
    
    if (!keyboardControls.enabled) return;
    const key = event.key.toLowerCase();
    let panVector = new THREE.Vector3();
    
    // Check if modifier keys are pressed for fine control
    const isShiftPressed = event.shiftKey;
    const isCtrlPressed = event.ctrlKey;
    
    // Determine speed multiplier based on modifier keys
    let speedMultiplier = 1.0;
    if (isShiftPressed && isCtrlPressed) {
        // Super fine control (1/25 speed)
        speedMultiplier = 1/25;
        console.log('Ctrl+Shift pressed - using super fine control mode (1/25 speed)');
    } else if (isShiftPressed) {
        // Fine control (1/5 speed)
        speedMultiplier = 1/5;
        console.log('Shift pressed - using fine control mode (1/5 speed)');
    }
    
    // Apply speed multiplier to all movement speeds
    const currentPanSpeed = PAN_SPEED * speedMultiplier;
    const currentMoveSpeed = KEYBOARD_MOVE_SPEED * speedMultiplier;
    const currentZoomSpeed = KEYBOARD_ZOOM_SPEED * speedMultiplier;

    switch (key) {
        case 'w':
            camera.position.z -= currentMoveSpeed;
            break;
        case 's':
            camera.position.z += currentMoveSpeed;
            break;
        case 'a':
            camera.position.x -= currentMoveSpeed;
            break;
        case 'd':
            camera.position.x += currentMoveSpeed;
            break;
        case 'q':
            camera.position.y += currentMoveSpeed;
            break;
        case 'e':
            camera.position.y -= currentMoveSpeed;
            break;
        case '+':
        case '=':
            camera.position.z -= currentZoomSpeed;
            break;
        case '-':
        case '_':
            camera.position.z += currentZoomSpeed;
            break;
        case 'arrowleft':
            // Pan left: negative right vector
            panVector.setFromMatrixColumn(camera.matrix, 0).negate().multiplyScalar(currentPanSpeed);
            console.log('Panning left with vector:', panVector);
            if (typeof controls.pan === 'function') {
                controls.pan(panVector);
            } else {
                console.log('Using custom pan function for left arrow');
                customPan('left', currentPanSpeed);
            }
            event.preventDefault();
            break;
        case 'arrowright':
            // Pan right: positive right vector
            panVector.setFromMatrixColumn(camera.matrix, 0).multiplyScalar(currentPanSpeed);
            console.log('Panning right with vector:', panVector);
            if (typeof controls.pan === 'function') {
                controls.pan(panVector);
            } else {
                console.log('Using custom pan function for right arrow');
                customPan('right', currentPanSpeed);
            }
            event.preventDefault();
            break;
        case 'arrowup':
            // Pan up: positive up vector
            panVector.setFromMatrixColumn(camera.matrix, 1).multiplyScalar(currentPanSpeed);
            console.log('Panning up with vector:', panVector);
            if (typeof controls.pan === 'function') {
                controls.pan(panVector);
            } else {
                console.log('Using custom pan function for up arrow');
                customPan('up', currentPanSpeed);
            }
            event.preventDefault();
            break;
        case 'arrowdown':
            // Pan down: negative up vector
            panVector.setFromMatrixColumn(camera.matrix, 1).negate().multiplyScalar(currentPanSpeed);
            console.log('Panning down with vector:', panVector);
            if (typeof controls.pan === 'function') {
                controls.pan(panVector);
            } else {
                console.log('Using custom pan function for down arrow');
                customPan('down', currentPanSpeed);
            }
            event.preventDefault();
            break;
        case 'r':
            resetCamera();
            break;
        case 'k':
            toggleKeyboardControls();
            break;
    }
    controls.update();
}

// Reset camera to initial position
function resetCamera() {
    camera.position.set(0, 0, 500);
    controls.target.set(0, 0, -150);
    controls.update();
}

// Toggle keyboard controls on/off
function toggleKeyboardControls() {
    keyboardControls.enabled = !keyboardControls.enabled;
    const status = keyboardControls.enabled ? 'enabled' : 'disabled';
    const notification = document.createElement('div');
    notification.style.position = 'absolute';
    notification.style.top = '50%';
    notification.style.left = '50%';
    notification.style.transform = 'translate(-50%, -50%)';
    notification.style.background = 'rgba(0,0,0,0.7)';
    notification.style.color = 'white';
    notification.style.padding = '15px';
    notification.style.borderRadius = '5px';
    notification.style.zIndex = '1000';
    notification.style.pointerEvents = 'none';
    notification.textContent = `Keyboard controls ${status}`;
    document.body.appendChild(notification);
    setTimeout(() => document.body.removeChild(notification), 2000);
}

// Set up interaction (raycasting for node selection)
function setupInteraction() {
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();
    renderer.domElement.addEventListener('mousemove', onMouseMove, false);
    renderer.domElement.addEventListener('click', onMouseClick, false);
}

// Handle window resize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Handle mouse movement for hovering effects
function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    tooltipDiv.style.left = event.clientX + 10 + 'px';
    tooltipDiv.style.top = event.clientY + 10 + 'px';
    checkIntersections();
}

// Handle mouse clicks for node selection
function onMouseClick(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    if (intersects.length > 0) {
        const object = intersects[0].object;
        if (object.userData && object.userData.id) {
            const nodeId = object.userData.id;
            if (object.userData.type === 'topic' && object.userData.hasProblems) {
                window.location.href = `/topic/${nodeId}`;
            } else if (object.userData.type === 'problem') {
                window.location.href = `/problem/${object.userData.filename}`;
            }
        }
    }
}

// Check for intersections with nodes for hover effects
function checkIntersections() {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    if (intersects.length > 0) {
        const object = intersects[0].object;
        if (object.userData && object.userData.id) {
            highlightImmediatePath(object);
            tooltipDiv.innerHTML = object.userData.tooltip;
            tooltipDiv.style.visibility = 'visible';
        }
    } else {
        resetHighlights();
        tooltipDiv.style.visibility = 'hidden';
    }
}

// Highlight the node, its parents, and the connecting branches
function highlightImmediatePath(node) {
    resetHighlights();
    node.material.color.setHex(HIGHLIGHT_COLOR);
    highlightedObjects.push(node);
    if (node.userData.incomingBranches) {
        node.userData.incomingBranches.forEach(branch => {
            branch.material.color.setHex(HIGHLIGHT_COLOR);
            highlightedObjects.push(branch);
        });
    }
    if (node.userData.parents) {
        node.userData.parents.forEach(parent => {
            parent.material.color.setHex(HIGHLIGHT_COLOR);
            highlightedObjects.push(parent);
        });
    }
}

// Reset highlights
function resetHighlights() {
    highlightedObjects.forEach(obj => {
        if (obj.userData.type) {
            obj.material.color.setHex(obj.userData.isActive ? ACTIVE_BRANCH_COLOR : INACTIVE_BRANCH_COLOR);
        } else {
            obj.material.color.setHex(obj.userData.isActive ? ACTIVE_BRANCH_COLOR : INACTIVE_BRANCH_COLOR);
        }
    });
    highlightedObjects = [];
}

// Load knowledge tree data from the server
function loadKnowledgeTreeData() {
    fetch('/api/knowledge_tree_data')
        .then(response => {
            if (!response.ok) throw new Error(`API request failed with status ${response.status}`);
            return response.json();
        })
        .then(data => {
            buildTree(data);
        })
        .catch(error => {
            console.error('Error:', error);
            const container = document.getElementById('tree-container');
            const errorMsg = document.createElement('div');
            errorMsg.style.position = 'absolute';
            errorMsg.style.top = '50%';
            errorMsg.style.left = '50%';
            errorMsg.style.transform = 'translate(-50%, -50%)';
            errorMsg.style.background = 'rgba(255,0,0,0.7)';
            errorMsg.style.color = 'white';
            errorMsg.style.padding = '20px';
            errorMsg.style.borderRadius = '5px';
            errorMsg.innerHTML = `<h3>Error Loading Data</h3><p>${error.message}</p>`;
            container.appendChild(errorMsg);
        });
}

// Build the 3D tree from the data
function buildTree(data) {
    treeRoot = createNode({ id: 'root', name: 'AP Statistics', type: 'root', hasProblems: false, tooltip: '<b>AP Statistics Curriculum</b>' }, 0);
    treeRoot.position.set(0, 0, Z_DEPTH_ROOT);
    scene.add(treeRoot);
    allNodes.push(treeRoot);

    let problemToTopics = {}; // problemId -> { data, topics: [] }

    const units = data.units || [];
    const numUnits = units.length;
    const unitHeightStep = numUnits > 1 ? (UNIT_HEIGHT_MAX - UNIT_HEIGHT_MIN) / (numUnits - 1) : 0;
    const unitSpread = numUnits * SIBLING_SPREAD / 2;

    units.forEach((unit, unitIndex) => {
        const unitX = (unitIndex * SIBLING_SPREAD) - unitSpread;
        const unitY = UNIT_HEIGHT_MIN + unitIndex * unitHeightStep;
        const unitNode = createNode({
            id: unit.unit_id,
            name: `Unit ${unit.unit_number}: ${unit.unit_name}`,
            type: 'unit',
            hasProblems: unit.has_problems,
            tooltip: `<b>Unit ${unit.unit_number}:</b> ${unit.unit_name}`
        }, 1);
        unitNode.position.set(unitX, unitY, Z_DEPTH_UNITS);
        scene.add(unitNode);
        allNodes.push(unitNode);

        const branch = createBranch(treeRoot, unitNode, unit.has_problems);
        branches.push(branch);
        springs.push({ nodeA: treeRoot, nodeB: unitNode, restLength: treeRoot.position.distanceTo(unitNode.position) });

        const topics = unit.topics || [];
        const topicSpread = topics.length * SIBLING_SPREAD / 2;
        const topicBaseY = unitY - LEVEL_HEIGHT / 2;

        topics.forEach((topic, topicIndex) => {
            const topicX = unitX + ((topicIndex * SIBLING_SPREAD) - topicSpread);
            const topicY = topicBaseY - topicIndex * (LEVEL_HEIGHT / topics.length);
            const topicNode = createNode({
                id: topic.topic_id,
                name: topic.topic_name,
                type: 'topic',
                hasProblems: topic.has_problems,
                tooltip: `<b>${topic.topic_name}</b><br><b>Unit:</b> ${unit.unit_name}`
            }, 2);
            topicNode.position.set(topicX, topicY, Z_DEPTH_TOPICS);
            scene.add(topicNode);
            allNodes.push(topicNode);

            const branch = createBranch(unitNode, topicNode, topic.has_problems);
            branches.push(branch);
            springs.push({ nodeA: unitNode, nodeB: topicNode, restLength: unitNode.position.distanceTo(topicNode.position) });

            const problems = topic.problems || [];
            problems.forEach(problem => {
                if (!problemToTopics[problem.problem_id]) {
                    problemToTopics[problem.problem_id] = { data: problem, topics: [] };
                }
                problemToTopics[problem.problem_id].topics.push(topicNode);
            });
        });
    });

    // Create problem nodes and connect to all associated topics
    Object.keys(problemToTopics).forEach(problemId => {
        const { data, topics } = problemToTopics[problemId];
        const problemNode = createProblemNode(data);
        
        // Set initial position as average of connected topics' positions
        let sumX = 0, sumY = 0;
        topics.forEach(topic => {
            sumX += topic.position.x;
            sumY += topic.position.y;
        });
        const avgX = sumX / topics.length;
        const avgY = sumY / topics.length;
        problemNode.position.set(avgX, avgY, Z_DEPTH_PROBLEMS);
        scene.add(problemNode);
        allNodes.push(problemNode);

        // Connect to each topic with branches and springs
        topics.forEach(topicNode => {
            const branch = createBranch(topicNode, problemNode, true);
            branches.push(branch);
            const restLength = topicNode.position.distanceTo(problemNode.position);
            springs.push({ nodeA: topicNode, nodeB: problemNode, restLength });
        });
    });

    // Uncategorized problems
    (data.uncategorized_problems || []).forEach(problem => {
        const problemNode = createProblemNode({
            id: problem.problem_id,
            name: problem.display_name,
            type: 'problem',
            filename: problem.filename,
            tooltip: `<b>${problem.display_name}</b> (Uncategorized)`
        });
        problemNode.position.set(
            (Math.random() - 0.5) * 1000,
            (Math.random() - 0.5) * 1000,
            (Math.random() - 0.5) * 1000
        );
        scene.add(problemNode);
        allNodes.push(problemNode);
        uncategorizedNodes.push(problemNode);
    });

    if (typeof THREE.DragControls !== 'undefined') {
        dragControls = new THREE.DragControls(allNodes, camera, renderer.domElement);
        dragControls.addEventListener('dragstart', event => event.object.userData.isDragging = true);
        dragControls.addEventListener('dragend', event => {
            event.object.userData.isDragging = false;
            event.object.userData.velocity.set(0, 0, 0);
        });
    } else {
        console.warn('THREE.DragControls is not defined.');
    }

    clock = new THREE.Clock();
    controls.update();
}

// Create a node sphere with the given data
function createNode(data, level) {
    const geometry = new THREE.SphereGeometry(NODE_SIZE - level, 32, 32);
    const material = new THREE.MeshLambertMaterial({ color: data.hasProblems ? ACTIVE_BRANCH_COLOR : INACTIVE_BRANCH_COLOR });
    const node = new THREE.Mesh(geometry, material);
    node.userData = {
        ...data,
        isActive: data.hasProblems,
        velocity: new THREE.Vector3(0, 0, 0),
        mass: 1,
        isDragging: false,
        parents: [],
        incomingBranches: []
    };
    nodeMap[data.id] = node;
    return node;
}

// Create a problem node with an image texture
function createProblemNode(data) {
    const geometry = new THREE.PlaneGeometry(NODE_SIZE * 3, NODE_SIZE * 3);
    const textureLoader = new THREE.TextureLoader();
    const node = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0x3366cc, side: THREE.DoubleSide }));
    textureLoader.load(
        `/images/${data.filename}`,
        texture => node.material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide }),
        undefined,
        error => console.warn(`Texture load failed for ${data.filename}:`, error)
    );
    node.userData = {
        ...data,
        isActive: true,
        velocity: new THREE.Vector3(0, 0, 0),
        mass: 1,
        isDragging: false,
        parents: [],
        incomingBranches: []
    };
    nodeMap[data.id] = node;
    return node;
}

// Create a branch (line) between two nodes
function createBranch(parentNode, childNode, isActive) {
    const material = new THREE.LineBasicMaterial({ color: isActive ? ACTIVE_BRANCH_COLOR : INACTIVE_BRANCH_COLOR, linewidth: isActive ? 2 : 1 });
    const geometry = new THREE.BufferGeometry().setFromPoints([parentNode.position, childNode.position]);
    const line = new THREE.Line(geometry, material);
    line.userData = { parentNode, childNode, isActive };
    scene.add(line);
    childNode.userData.parents.push(parentNode);
    childNode.userData.incomingBranches.push(line);
    return line;
}

// Animation loop with physics simulation
function animate() {
    requestAnimationFrame(animate);
    const deltaTime = clock.getDelta();
    
    allNodes.forEach(node => node.userData.totalForce = new THREE.Vector3(0, 0, 0));
    
    springs.forEach(spring => {
        const nodeA = spring.nodeA;
        const nodeB = spring.nodeB;
        const currentLength = nodeA.position.distanceTo(nodeB.position);
        if (currentLength > 0) {
            const displacement = currentLength - spring.restLength;
            const forceMagnitude = SPRING_CONSTANT * displacement;
            const direction = new THREE.Vector3().subVectors(nodeB.position, nodeA.position).normalize();
            const force = direction.multiplyScalar(forceMagnitude);
            nodeA.userData.totalForce.add(force);
            nodeB.userData.totalForce.sub(force);
        }
    });
    
    uncategorizedNodes.forEach(node => {
        const randomForce = new THREE.Vector3(
            (Math.random() - 0.5) * 0.2,
            (Math.random() - 0.5) * 0.2,
            (Math.random() - 0.5) * 0.2
        );
        node.userData.totalForce.add(randomForce);
    });
    
    allNodes.forEach(node => {
        if (!node.userData.isDragging) {
            const acceleration = node.userData.totalForce.clone().divideScalar(node.userData.mass);
            node.userData.velocity.add(acceleration.multiplyScalar(deltaTime));
            node.userData.velocity.multiplyScalar(DAMPING);
            node.position.add(node.userData.velocity.clone().multiplyScalar(deltaTime));
        }
    });
    
    branches.forEach(branch => {
        const positions = branch.geometry.attributes.position.array;
        positions[0] = branch.userData.parentNode.position.x;
        positions[1] = branch.userData.parentNode.position.y;
        positions[2] = branch.userData.parentNode.position.z;
        positions[3] = branch.userData.childNode.position.x;
        positions[4] = branch.userData.childNode.position.y;
        positions[5] = branch.userData.childNode.position.z;
        branch.geometry.attributes.position.needsUpdate = true;
    });
    
    controls.update();
    renderer.render(scene, camera);
}

// Start the visualization when the DOM is ready
document.addEventListener('DOMContentLoaded', init);