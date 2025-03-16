// AP Statistics Knowledge Tree 3D Visualization
// Uses Three.js to create an interactive 3D visualization of the knowledge tree

// Global variables
let scene, camera, renderer, controls;
let treeRoot, nodeMap = {};
let raycaster, mouse;
let tooltipDiv;

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
    // Create tooltip div for hovering over nodes
    createTooltip();
    
    // Set up Three.js scene
    setupScene();
    
    // Set up interaction
    setupInteraction();
    
    // Load data and build tree
    loadKnowledgeTreeData();
    
    // Start animation loop
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
    document.body.appendChild(tooltipDiv);
}

// Set up the Three.js scene, camera, renderer, and controls
function setupScene() {
    // Create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    
    // Create camera
    camera = new THREE.PerspectiveCamera(
        60, window.innerWidth / window.innerHeight, 1, 5000
    );
    camera.position.set(0, 100, 500);
    
    // Create renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('tree-container').appendChild(renderer.domElement);
    
    // Add orbit controls for navigation
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xcccccc, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);
    
    // Handle window resize
    window.addEventListener('resize', onWindowResize, false);
}

// Set up interaction (raycasting for node selection)
function setupInteraction() {
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();
    
    // Add event listeners
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
    // Calculate mouse position in normalized device coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    // Update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);
    
    // Calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects(scene.children, true);
    
    if (intersects.length > 0) {
        const object = intersects[0].object;
        
        // If the object has userData with a nodeId, it's a tree node
        if (object.userData && object.userData.id) {
            const nodeId = object.userData.id;
            
            // If it's a topic node with problems, navigate to the topic detail page
            if (object.userData.type === 'topic' && object.userData.hasProblems) {
                window.location.href = `/topic/${nodeId}`;
            }
            // If it's a problem node, navigate to the problem detail page
            else if (object.userData.type === 'problem') {
                window.location.href = `/problem/${object.userData.filename}`;
            }
        }
    }
}

// Check for intersections with nodes for hover effects
function checkIntersections() {
    // Update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);
    
    // Calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects(scene.children, true);
    
    // Reset all previously highlighted nodes
    for (const id in nodeMap) {
        if (nodeMap[id].isHighlighted) {
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
        
        // If the object has userData with a nodeId, it's a tree node
        if (object.userData && object.userData.id) {
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
        })
        .catch(error => {
            console.error('Error loading knowledge tree data:', error);
        });
}

// Build the 3D tree from the data
function buildTree(data) {
    // Create root node (AP Statistics)
    treeRoot = createNode({
        id: 'root',
        name: 'AP Statistics',
        type: 'root',
        hasProblems: false,
        tooltip: 'AP Statistics Curriculum'
    }, 0);
    treeRoot.position.set(0, 0, 0);
    scene.add(treeRoot);
    
    // Create unit nodes
    const units = data.units;
    const unitSpread = units.length * SIBLING_SPREAD / 2;
    
    units.forEach((unit, unitIndex) => {
        // Calculate position for this unit
        const unitX = (unitIndex * SIBLING_SPREAD) - unitSpread;
        const unitY = -LEVEL_HEIGHT;
        
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
        
        // Connect to root
        createBranch(treeRoot.position, unitNode.position, unit.has_problems);
        
        // Create topic nodes for this unit
        const topics = unit.topics;
        const topicSpread = topics.length * SIBLING_SPREAD / 2;
        
        topics.forEach((topic, topicIndex) => {
            // Calculate position for this topic
            const topicX = unitX + ((topicIndex * SIBLING_SPREAD) - topicSpread);
            const topicY = -LEVEL_HEIGHT * 2;
            
            // Create topic node
            const topicNode = createNode({
                id: topic.topic_id,
                name: `${topic.topic_number} ${topic.topic_name}`,
                type: 'topic',
                hasProblems: topic.has_problems,
                tooltip: `${topic.topic_number} ${topic.topic_name}`
            }, 2);
            topicNode.position.set(topicX, topicY, 0);
            scene.add(topicNode);
            
            // Connect to unit
            createBranch(unitNode.position, topicNode.position, topic.has_problems);
            
            // If the topic has problems, create problem nodes
            if (topic.has_problems && topic.problems) {
                const problems = topic.problems;
                const problemSpread = problems.length * SIBLING_SPREAD / 2;
                
                problems.forEach((problem, problemIndex) => {
                    // Calculate position for this problem
                    const problemX = topicX + ((problemIndex * SIBLING_SPREAD) - problemSpread);
                    const problemY = -LEVEL_HEIGHT * 3;
                    
                    // Create problem node (with image texture)
                    const problemNode = createProblemNode({
                        id: problem.problem_id,
                        name: problem.display_name,
                        type: 'problem',
                        filename: problem.filename,
                        tooltip: problem.display_name
                    });
                    problemNode.position.set(problemX, problemY, 0);
                    scene.add(problemNode);
                    
                    // Connect to topic
                    createBranch(topicNode.position, problemNode.position, true);
                });
            }
        });
    });
    
    // Center camera on tree
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

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

// Initialize when the DOM is ready
document.addEventListener('DOMContentLoaded', init); 