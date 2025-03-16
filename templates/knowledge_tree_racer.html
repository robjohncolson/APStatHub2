<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>2D Top-Down Racer</title>
    <style>
        body { margin: 0; overflow: hidden; }
        canvas { display: block; }
        .info-panel {
            position: absolute;
            top: 10px;
            right: 10px;
            width: 250px;
            padding: 10px;
            background: rgba(0, 0, 0, 0.7);
            color: white;
            border-radius: 5px;
        }
    </style>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"></script>
</head>
<body>
    <div id="game-container"></div>
    <div class="info-panel">
        <h3>2D Top-Down Racer</h3>
        <p>Score: <span id="score">0</span></p>
        <p>Time: <span id="time">0.0</span> seconds</p>
        <h4>Controls:</h4>
        <p>Up/W: Accelerate</p>
        <p>Down/S: Brake/Reverse</p>
        <p>Left/A: Turn Left</p>
        <p>Right/D: Turn Right</p>
        <button id="start-game">Start Race</button>
    </div>

    <script>
        // Game variables
        let scene, camera, renderer;
        let player, playerSpeed = 0, playerRotation = 0;
        let trackSegments = [];
        let keyState = {};
        let score = 0;
        let gameTime = 0;
        let gameStarted = false;
        let clock;

        // Constants
        const MAX_SPEED = 5;
        const ACCELERATION = 0.1;
        const DECELERATION = 0.05;
        const ROTATION_SPEED = 0.05;
        const TRACK_WIDTH = 20;
        const PLAYER_WIDTH = 20;
        const PLAYER_HEIGHT = 10;

        // Initialize the game
        function init() {
            setupScene();
            createTrack();
            setupControls();
            document.getElementById('start-game').addEventListener('click', startGame);
            clock = new THREE.Clock();
            animate();
        }

        // Set up the Three.js scene, camera, and renderer
        function setupScene() {
            scene = new THREE.Scene();
            scene.background = new THREE.Color(0x333333); // Gray background

            // Orthographic camera for top-down view
            const aspect = window.innerWidth / window.innerHeight;
            const viewSize = 300;
            camera = new THREE.OrthographicCamera(
                -viewSize * aspect,
                viewSize * aspect,
                viewSize,
                -viewSize,
                1,
                1000
            );
            camera.position.set(0, 0, 500);
            camera.lookAt(0, 0, 0);

            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            document.getElementById('game-container').appendChild(renderer.domElement);

            window.addEventListener('resize', () => {
                const aspect = window.innerWidth / window.innerHeight;
                camera.left = -viewSize * aspect;
                camera.right = viewSize * aspect;
                camera.top = viewSize;
                camera.bottom = -viewSize;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            });
        }

        // Create a simple track layout
        function createTrack() {
            const trackPoints = [
                { x: -200, y: 100 },  // Start
                { x: -100, y: 100 },
                { x: 0, y: 50 },
                { x: 100, y: -50 },
                { x: 200, y: -100 },
                { x: 100, y: -150 },
                { x: -100, y: -150 },
                { x: -200, y: -100 },
                { x: -200, y: 100 }   // Loop back to start
            ];

            for (let i = 0; i < trackPoints.length - 1; i++) {
                const start = trackPoints[i];
                const end = trackPoints[i + 1];
                const material = new THREE.LineBasicMaterial({ color: 0x00ff00, linewidth: TRACK_WIDTH });
                const geometry = new THREE.BufferGeometry().setFromPoints([
                    new THREE.Vector3(start.x, start.y, 0),
                    new THREE.Vector3(end.x, end.y, 0)
                ]);
                const line = new THREE.Line(geometry, material);
                scene.add(line);

                trackSegments.push({
                    start: new THREE.Vector2(start.x, start.y),
                    end: new THREE.Vector2(end.x, end.y)
                });
            }

            // Add checkpoints (simple circles)
            trackPoints.forEach((point, index) => {
                const geometry = new THREE.CircleGeometry(10, 32);
                const material = new THREE.MeshBasicMaterial({ color: index === 0 ? 0xff0000 : 0xffff00 });
                const checkpoint = new THREE.Mesh(geometry, material);
                checkpoint.position.set(point.x, point.y, 0);
                checkpoint.userData = { index };
                scene.add(checkpoint);
            });
        }

        // Set up keyboard controls
        function setupControls() {
            window.addEventListener('keydown', (event) => keyState[event.key] = true);
            window.addEventListener('keyup', (event) => keyState[event.key] = false);
        }

        // Create the player
        function createPlayer() {
            const geometry = new THREE.PlaneGeometry(PLAYER_WIDTH, PLAYER_HEIGHT);
            const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
            player = new THREE.Mesh(geometry, material);
            player.position.set(-200, 100, 0); // Start position
            scene.add(player);
        }

        // Start the game
        function startGame() {
            if (!gameStarted) {
                createPlayer();
                gameStarted = true;
                document.getElementById('start-game').textContent = 'Racing!';
                document.getElementById('start-game').disabled = true;
            }
        }

        // Update player movement
        function updatePlayer() {
            if (!gameStarted || !player) return;

            // Acceleration
            if (keyState['ArrowUp'] || keyState['w']) {
                playerSpeed = Math.min(playerSpeed + ACCELERATION, MAX_SPEED);
            } else if (keyState['ArrowDown'] || keyState['s']) {
                playerSpeed = Math.max(playerSpeed - ACCELERATION, -MAX_SPEED / 2);
            } else {
                playerSpeed = playerSpeed > 0 ? Math.max(0, playerSpeed - DECELERATION) : Math.min(0, playerSpeed + DECELERATION);
            }

            // Rotation
            if (keyState['ArrowLeft'] || keyState['a']) {
                playerRotation += ROTATION_SPEED;
            } else if (keyState['ArrowRight'] || keyState['d']) {
                playerRotation -= ROTATION_SPEED;
            }

            player.rotation.z = playerRotation;

            // Move player
            const direction = new THREE.Vector3(0, 1, 0).applyAxisAngle(new THREE.Vector3(0, 0, 1), playerRotation);
            const newPosition = player.position.clone().add(direction.multiplyScalar(playerSpeed));

            // Collision detection
            if (isOnTrack(newPosition)) {
                player.position.copy(newPosition);
            } else {
                playerSpeed = 0; // Stop if off track
            }

            // Check for checkpoint collisions
            checkCheckpoints();

            // Camera follows player
            camera.position.set(player.position.x, player.position.y, 500);
        }

        // Check if player is on the track
        function isOnTrack(position) {
            const pos = new THREE.Vector2(position.x, position.y);
            for (const segment of trackSegments) {
                if (pointToLineDistance(pos, segment.start, segment.end) < TRACK_WIDTH / 2 + PLAYER_WIDTH / 2) {
                    return true;
                }
            }
            return false;
        }

        // Calculate distance from point to line segment
        function pointToLineDistance(point, start, end) {
            const lineVec = end.clone().sub(start);
            const pointVec = point.clone().sub(start);
            const lineLen = lineVec.length();
            const lineDir = lineVec.normalize();
            const projection = pointVec.dot(lineDir);
            if (projection < 0) return point.distanceTo(start);
            if (projection > lineLen) return point.distanceTo(end);
            const closestPoint = start.clone().add(lineDir.multiplyScalar(projection));
            return point.distanceTo(closestPoint);
        }

        // Check collisions with checkpoints
        function checkCheckpoints() {
            scene.children.forEach(obj => {
                if (obj.geometry instanceof THREE.CircleGeometry) {
                    const distance = player.position.distanceTo(obj.position);
                    if (distance < 15) { // Checkpoint radius + player size
                        if (obj.userData.index === 0 && score > 0) {
                            score += 100; // Lap completed
                        } else if (!obj.userData.visited) {
                            score += 10;
                            obj.userData.visited = true;
                        }
                        document.getElementById('score').textContent = score;
                    }
                }
            });
        }

        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            const delta = clock.getDelta();
            if (gameStarted) {
                gameTime += delta;
                document.getElementById('time').textContent = gameTime.toFixed(1);
                updatePlayer();
            }
            renderer.render(scene, camera);
        }

        // Start the game
        init();
    </script>
</body>
</html>