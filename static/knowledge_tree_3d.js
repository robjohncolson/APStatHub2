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

// Initialize the visualization
function init() {
    createTooltip();
    setupScene();
    setupInteraction();
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
    camera.position.set(0, 100, 500);
    
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('tree-container').appendChild(renderer.domElement);
    
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    
    const ambientLight = new THREE.AmbientLight(0xcccccc, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);
    
    window.addEventListener('resize', onWindowResize, false);
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
        highlightedObjects.forEach(obj => {
            if (obj.userData.type) { // Node
                obj.material.color.setHex(obj.userData.isActive ? ACTIVE_BRANCH_COLOR : INACTIVE_BRANCH_COLOR);
            } else { // Branch
                obj.material.color.setHex(obj.userData.isActive ? ACTIVE_BRANCH_COLOR : INACTIVE_BRANCH_COLOR);
            }
        });
        highlightedObjects = [];
        tooltipDiv.style.visibility = 'hidden';
    }
}

// Highlight the node, its parent, and the connecting branch
function highlightImmediatePath(node) {
    highlightedObjects.forEach(obj => {
        if (obj.userData.type) { // Node
            obj.material.color.setHex(obj.userData.isActive ? ACTIVE_BRANCH_COLOR : INACTIVE_BRANCH_COLOR);
        } else { // Branch
            obj.material.color.setHex(obj.userData.isActive ? ACTIVE_BRANCH_COLOR : INACTIVE_BRANCH_COLOR);
        }
    });
    highlightedObjects = [];
    
    node.material.color.setHex(HIGHLIGHT_COLOR);
    highlightedObjects.push(node);
    
    if (node.userData.parent) {
        const parent = node.userData.parent;
        const branch = node.userData.incomingBranch;
        
        if (branch) {
            branch.material.color.setHex(HIGHLIGHT_COLOR);
            highlightedObjects.push(branch);
        }
        
        parent.material.color.setHex(HIGHLIGHT_COLOR);
        highlightedObjects.push(parent);
    }
}

// Load knowledge tree data from the server
function loadKnowledgeTreeData() {
    fetch('/api/knowledge_tree_data')
        .then(response => response.json())
        .then(data => {
            buildTree(data);
        })
        .catch(error => {
            console.error('Error loading knowledge tree data:', error);
        });
}

// Build the 3D tree from the data
function buildTree(data) {
    treeRoot = createNode({
        id: 'root',
        name: 'AP Statistics',
        type: 'root',
        hasProblems: false,
        tooltip: '<b>AP Statistics Curriculum</b>'
    }, 0);
    treeRoot.position.set(0, 0, 0);
    scene.add(treeRoot);
    allNodes.push(treeRoot);
    
    const units = data.units;
    const unitSpread = units.length * SIBLING_SPREAD / 2;
    
    units.forEach((unit, unitIndex) => {
        const unitX = (unitIndex * SIBLING_SPREAD) - unitSpread;
        const unitY = -LEVEL_HEIGHT;
        
        const numProblems = unit.topics.reduce((sum, topic) => sum + (topic.problems ? topic.problems.length : 0), 0);
        const unitNode = createNode({
            id: unit.unit_id,
            name: `Unit ${unit.unit_number}: ${unit.unit_name}`,
            type: 'unit',
            hasProblems: unit.has_problems,
            tooltip: `<b>Unit ${unit.unit_number}:</b> ${unit.unit_name}<br>Topics: ${unit.topics.length}<br>Problems: ${numProblems}`
        }, 1);
        unitNode.position.set(unitX, unitY, 0);
        scene.add(unitNode);
        allNodes.push(unitNode);
        
        const branch = createBranch(treeRoot, unitNode, unit.has_problems);
        branches.push(branch);
        const restLength = treeRoot.position.distanceTo(unitNode.position);
        springs.push({nodeA: treeRoot, nodeB: unitNode, restLength});
        
        const topics = unit.topics;
        const topicSpread = topics.length * SIBLING_SPREAD / 2;
        
        topics.forEach((topic, topicIndex) => {
            const topicX = unitX + ((topicIndex * SIBLING_SPREAD) - topicSpread);
            const topicY = -LEVEL_HEIGHT * 2;
            
            const topicNode = createNode({
                id: topic.topic_id,
                name: `${topic.topic_number} ${topic.topic_name}`,
                type: 'topic',
                hasProblems: topic.has_problems,
                tooltip: `<b>Topic ${topic.topic_number}:</b> ${topic.topic_name}<br><b>Unit:</b> ${unit.unit_number} - ${unit.unit_name}`
            }, 2);
            topicNode.position.set(topicX, topicY, 0);
            scene.add(topicNode);
            allNodes.push(topicNode);
            
            const branch = createBranch(unitNode, topicNode, topic.has_problems);
            branches.push(branch);
            const restLength = unitNode.position.distanceTo(topicNode.position);
            springs.push({nodeA: unitNode, nodeB: topicNode, restLength});
            
            if (topic.has_problems && topic.problems) {
                const problems = topic.problems;
                const problemSpread = problems.length * SIBLING_SPREAD / 2;
                
                problems.forEach((problem, problemIndex) => {
                    const problemX = topicX + ((problemIndex * SIBLING_SPREAD) - problemSpread);
                    const problemY = -LEVEL_HEIGHT * 3;
                    
                    const problemNode = createProblemNode({
                        id: problem.problem_id,
                        name: problem.display_name,
                        type: 'problem',
                        filename: problem.filename,
                        tooltip: `<b>${problem.display_name}</b><br><b>Topic:</b> ${topic.topic_number} - ${topic.topic_name}`
                    });
                    problemNode.position.set(problemX, problemY, 0);
                    scene.add(problemNode);
                    allNodes.push(problemNode);
                    
                    const branch = createBranch(topicNode, problemNode, true);
                    branches.push(branch);
                    const restLength = topicNode.position.distanceTo(problemNode.position);
                    springs.push({nodeA: topicNode, nodeB: problemNode, restLength});
                });
            }
        });
    });
    
    // Create uncategorized problem nodes
    if (data.uncategorized_problems) {
        data.uncategorized_problems.forEach(problem => {
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
    }
    
    // Initialize DragControls for all nodes
    const dragControls = new THREE.DragControls(allNodes, camera, renderer.domElement);
    dragControls.addEventListener('dragstart', function(event) {
        event.object.userData.isDragging = true;
    });
    dragControls.addEventListener('dragend', function(event) {
        event.object.userData.isDragging = false;
        event.object.userData.velocity.set(0, 0, 0); // Reset velocity on release
    });
    
    // Initialize clock for physics timing
    clock = new THREE.Clock();
    
    controls.target.set(0, -LEVEL_HEIGHT, 0);
    controls.update();
}

// Create a node sphere with the given data
function createNode(data, level) {
    const geometry = new THREE.SphereGeometry(NODE_SIZE - level, 32, 32);
    const material = new THREE.MeshLambertMaterial({
        color: data.hasProblems ? ACTIVE_BRANCH_COLOR : INACTIVE_BRANCH_COLOR
    });
    
    const node = new THREE.Mesh(geometry, material);
    
    node.userData = data;
    node.userData.isActive = data.hasProblems;
    node.userData.velocity = new THREE.Vector3(0, 0, 0);
    node.userData.mass = 1;
    node.userData.isDragging = false;
    nodeMap[data.id] = node;
    
    return node;
}

// Create a problem node with an image texture
function createProblemNode(data) {
    const geometry = new THREE.PlaneGeometry(NODE_SIZE * 3, NODE_SIZE * 3);
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(`/images/${data.filename}`);
    
    const material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide
    });
    
    const node = new THREE.Mesh(geometry, material);
    
    node.userData = data;
    node.userData.isActive = true;
    node.userData.velocity = new THREE.Vector3(0, 0, 0);
    node.userData.mass = 1;
    node.userData.isDragging = false;
    nodeMap[data.id] = node;
    
    return node;
}

// Create a branch (line) between two nodes
function createBranch(parentNode, childNode, isActive) {
    const material = new THREE.LineBasicMaterial({
        color: isActive ? ACTIVE_BRANCH_COLOR : INACTIVE_BRANCH_COLOR,
        linewidth: isActive ? 2 : 1
    });
    
    const geometry = new THREE.BufferGeometry().setFromPoints([
        parentNode.position,
        childNode.position
    ]);
    
    const line = new THREE.Line(geometry, material);
    line.userData.parentNode = parentNode;
    line.userData.childNode = childNode;
    line.userData.isActive = isActive;
    scene.add(line);
    
    return line;
}

// Animation loop with physics simulation
function animate() {
    requestAnimationFrame(animate);
    
    const deltaTime = clock.getDelta();
    
    // Physics step
    allNodes.forEach(node => {
        node.userData.totalForce = new THREE.Vector3(0, 0, 0);
    });
    
    // Apply spring forces
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
    
    // Apply random forces to uncategorized nodes
    uncategorizedNodes.forEach(node => {
        const randomForce = new THREE.Vector3(
            (Math.random() - 0.5) * 0.2,
            (Math.random() - 0.5) * 0.2,
            (Math.random() - 0.5) * 0.2
        );
        node.userData.totalForce.add(randomForce);
    });
    
    // Update velocities and positions
    allNodes.forEach(node => {
        if (!node.userData.isDragging) {
            const acceleration = node.userData.totalForce.clone().divideScalar(node.userData.mass);
            node.userData.velocity.add(acceleration.multiplyScalar(deltaTime));
            node.userData.velocity.multiplyScalar(DAMPING);
            node.position.add(node.userData.velocity.clone().multiplyScalar(deltaTime));
        }
    });
    
    // Update branch geometries
    branches.forEach(branch => {
        const nodeA = branch.userData.parentNode;
        const nodeB = branch.userData.childNode;
        const positions = branch.geometry.attributes.position.array;
        positions[0] = nodeA.position.x;
        positions[1] = nodeA.position.y;
        positions[2] = nodeA.position.z;
        positions[3] = nodeB.position.x;
        positions[4] = nodeB.position.y;
        positions[5] = nodeB.position.z;
        branch.geometry.attributes.position.needsUpdate = true;
    });
    
    controls.update();
    renderer.render(scene, camera);
}

// Initialize when the DOM is ready
document.addEventListener('DOMContentLoaded', init);