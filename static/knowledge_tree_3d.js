<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AP Statistics Knowledge Tree</title>
    <style>
        body { margin: 0; overflow: hidden; }
        .tooltip {
            position: absolute;
            padding: 10px;
            background: rgba(0, 0, 0, 0.7);
            color: white;
            border-radius: 5px;
            pointer-events: none;
            z-index: 999;
            font-family: Arial, sans-serif;
            font-size: 14px;
        }
        .keyboard-controls-help {
            position: absolute;
            bottom: 10px;
            right: 10px;
            background: rgba(255, 255, 255, 0.7);
            padding: 10px;
            border-radius: 5px;
            z-index: 100;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div id="tree-container"></div>

    <!-- Load Three.js and its controls -->
    <script src="https://cdn.jsdelivr.net/npm/three@0.132.2/build/three.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/three@0.132.2/examples/js/controls/OrbitControls.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/three@0.132.2/examples/js/controls/DragControls.js"></script>

    <script>
        // AP Statistics Knowledge Tree 3D Visualization

        // Global variables
        let scene, camera, renderer, controls;
        let treeRoot, nodeMap = {};
        let raycaster, mouse;
        let tooltipDiv;
        let highlightedObjects = [];
        let allNodes = [];
        let springs = [];
        let branches = [];
        let uncategorizedNodes = [];
        let clock;
        let dragControls;
        let keyboardControls = { enabled: true };

        // Constants
        const NODE_SIZE = 5;
        const LEVEL_HEIGHT = 100;
        const SIBLING_SPREAD = 80;
        const BRANCH_COLOR = 0x555555;
        const ACTIVE_BRANCH_COLOR = 0x00aa00;
        const INACTIVE_BRANCH_COLOR = 0xaaaaaa;
        const HIGHLIGHT_COLOR = 0xff9900;
        const SPRING_CONSTANT = 0.1;
        const DAMPING = 0.99;
        const KEYBOARD_MOVE_SPEED = 10;
        const KEYBOARD_ZOOM_SPEED = 50;
        const UNIT_HEIGHT_MIN = -400;
        const UNIT_HEIGHT_MAX = 400;
        const Z_DEPTH_ROOT = -300;
        const Z_DEPTH_UNITS = -200;
        const Z_DEPTH_TOPICS = -100;
        const Z_DEPTH_PROBLEMS = 0;

        // Initialize the visualization
        function init() {
            console.log('Initializing 3D Knowledge Tree...');
            createTooltip();
            setupScene();
            setupInteraction();
            setupKeyboardControls();
            loadKnowledgeTreeData();
            animate();
        }

        // Create tooltip div
        function createTooltip() {
            tooltipDiv = document.createElement('div');
            tooltipDiv.className = 'tooltip';
            tooltipDiv.style.visibility = 'hidden';
            document.body.appendChild(tooltipDiv);
            console.log('Tooltip created');
        }

        // Set up scene, camera, renderer, and controls
        function setupScene() {
            scene = new THREE.Scene();
            scene.background = new THREE.Color(0xf0f0f0);

            camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 5000);
            camera.position.set(0, 0, 500);

            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setSize(window.innerWidth, window.innerHeight);

            const container = document.getElementById('tree-container');
            container.appendChild(renderer.domElement);

            controls = new THREE.OrbitControls(camera, renderer.domElement);
            controls.target.set(0, 0, -150);
            controls.enableDamping = true;
            controls.dampingFactor = 0.25;

            const ambientLight = new THREE.AmbientLight(0xcccccc, 0.5);
            scene.add(ambientLight);

            const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
            directionalLight.position.set(1, 1, 1).normalize();
            scene.add(directionalLight);

            const pointLight = new THREE.PointLight(0xffffff, 1, 1000);
            pointLight.position.set(0, 0, 200);
            scene.add(pointLight);

            window.addEventListener('resize', onWindowResize, false);
            console.log('Scene setup complete');
        }

        // Set up keyboard controls
        function setupKeyboardControls() {
            const helpDiv = document.createElement('div');
            helpDiv.className = 'keyboard-controls-help';
            helpDiv.innerHTML = `
                <h5>Keyboard Controls</h5>
                <ul style="padding-left: 20px; margin-bottom: 5px;">
                    <li>W/S: Move forward/backward</li>
                    <li>A/D: Move left/right</li>
                    <li>Q/E: Move up/down</li>
                    <li>+/-: Zoom in/out</li>
                    <li>R: Reset view</li>
                    <li>K: Toggle controls</li>
                </ul>
            `;
            document.body.appendChild(helpDiv);

            window.addEventListener('keydown', handleKeyDown);
            console.log('Keyboard controls setup complete');
        }

        // Handle keyboard input
        function handleKeyDown(event) {
            if (!keyboardControls.enabled) return;
            const key = event.key.toLowerCase();
            switch (key) {
                case 'w': camera.position.z -= KEYBOARD_MOVE_SPEED; break;
                case 's': camera.position.z += KEYBOARD_MOVE_SPEED; break;
                case 'a': camera.position.x -= KEYBOARD_MOVE_SPEED; break;
                case 'd': camera.position.x += KEYBOARD_MOVE_SPEED; break;
                case 'q': camera.position.y += KEYBOARD_MOVE_SPEED; break;
                case 'e': camera.position.y -= KEYBOARD_MOVE_SPEED; break;
                case '+':
                case '=': camera.position.z -= KEYBOARD_ZOOM_SPEED; break;
                case '-':
                case '_': camera.position.z += KEYBOARD_ZOOM_SPEED; break;
                case 'r': resetCamera(); break;
                case 'k': toggleKeyboardControls(); break;
            }
            controls.update();
        }

        // Reset camera position
        function resetCamera() {
            camera.position.set(0, 0, 500);
            controls.target.set(0, 0, -150);
            controls.update();
            console.log('Camera reset');
        }

        // Toggle keyboard controls
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
            console.log(`Keyboard controls ${status}`);
        }

        // Set up interaction
        function setupInteraction() {
            raycaster = new THREE.Raycaster();
            mouse = new THREE.Vector2();

            renderer.domElement.addEventListener('mousemove', onMouseMove, false);
            renderer.domElement.addEventListener('click', onMouseClick, false);
            console.log('Interaction setup complete');
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

        // Check intersections for hover
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

        // Highlight node and its immediate path
        function highlightImmediatePath(node) {
            resetHighlights();
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

        // Reset highlights
        function resetHighlights() {
            highlightedObjects.forEach(obj => {
                if (obj.userData.type) {
                    obj.material.color.setHex(obj.userData.isActive ? ACTIVE_BRANCH_COLOR : INACTIVE_BRANCH