// AP Statistics Knowledge Tree 3D Visualization
// Uses Three.js to create an interactive 3D visualization of the knowledge tree

// Global variables
let scene, camera, renderer, controls;
let treeRoot, nodeMap = {};
let raycaster, mouse;
let tooltipDiv;
let highlightedObjects = []; // Track highlighted nodes and branches

// Constants for tree layout
const NODE_SIZE = 5;
const LEVEL_HEIGHT = 100;
const SIBLING_SPREAD = 80;
const BRANCH_COLOR = 0x555555;
const ACTIVE_BRANCH_COLOR = 0x00aa00;
const INACTIVE_BRANCH_COLOR = 0xaaaaaa;
const HIGHLIGHT_COLOR = 0xff9900;

// Initialize the visualization
function init() {
    createTooltip();
    setupScene();
    setupInteraction();
    loadKnowledgeTreeData();
    animate();

    // Add reset view keyboard shortcut
    window.addEventListener('keydown', (event) => {
        if (event.key === 'r' || event.key === 'R') {
            camera.position.set(0, 100, 500);
            controls.target.set(0, -LEVEL_HEIGHT, 0);
            controls.update();
        }
    });
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
    tooltipDiv.style.lineHeight = '1.5';
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
    // Reset previous highlights
    highlightedObjects.forEach(obj => {
        if (obj.userData.type) { // Node
            obj.material.color.setHex(obj.userData.isActive ? ACTIVE_BRANCH_COLOR : INACTIVE_BRANCH_COLOR);
        } else { // Branch
            obj.material.color.setHex(obj.userData.isActive ? ACTIVE_BRANCH_COLOR : INACTIVE_BRANCH_COLOR);
        }
    });
    highlightedObjects = [];
    
    // Highlight the node itself
    node.material.color.setHex(HIGHLIGHT_COLOR);
    highlightedObjects.push(node);
    
    // Highlight parent and incoming branch, if they exist
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
            numTopics: unit.topics.length,
            numProblems: numProblems,
            tooltip: `<b>Unit ${unit.unit_number}: ${unit.unit_name}</b><br>Topics: ${unit.topics.length}<br>Problems: ${numProblems}`
        }, 1);
        unitNode.position.set(unitX, unitY, 0);
        scene.add(unitNode);
        
        createBranch(treeRoot, unitNode, unit.has_problems);
        
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
                numProblems: topic.problems ? topic.problems.length : 0,
                tooltip: `<b>${topic.topic_number} ${topic.topic_name}</b><br>Problems: ${topic.problems ? topic.problems.length : 0}`
            }, 2);
            topicNode.position.set(topicX, topicY, 0);
            scene.add(topicNode);
            
            createBranch(unitNode, topicNode, topic.has_problems);
            
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
                        tooltip: problem.display_name
                    });
                    problemNode.position.set(problemX, problemY, 0);
                    scene.add(problemNode);
                    
                    createBranch(topicNode, problemNode, true);
                });
            }
        });
    });
    
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
    
    parentNode.userData.outgoingBranches = parentNode.userData.outgoingBranches || [];
    parentNode.userData.outgoingBranches.push(line);
    childNode.userData.incomingBranch = line;
    childNode.userData.parent = parentNode;
    
    return line;
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

// Initialize when the DOM is ready
document.addEventListener('DOMContentLoaded', init);