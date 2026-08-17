/**
 * HASHIM BAJWA PORTFOLIO — 3D ARCHITECTURAL HERO SCULPTURE
 * Theme: "The Architecture of Educational Standards, Quality Assurance & Progression"
 * Built with Three.js (Pure WebGL, zero bloated templates, precision geometry)
 */

(function initHero3D() {
  const container = document.getElementById('hero-3d-canvas-container');
  if (!container) return;

  // Check if THREE is available
  if (typeof THREE === 'undefined') {
    // Dynamic load Three.js from unpkg/cdnjs if not already loaded
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.onload = () => buildScene(container);
    document.head.appendChild(script);
  } else {
    buildScene(container);
  }

  function buildScene(mountPoint) {
    const width = mountPoint.clientWidth || 500;
    const height = mountPoint.clientHeight || 560;

    // 1. Scene & Renderer Setup
    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    camera.position.set(0, 2.2, 7.5);
    camera.lookAt(0, 0, 0);

    // Renderer with antialiasing and high pixel ratio
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    // Clear previous canvas if any
    mountPoint.innerHTML = '';
    mountPoint.appendChild(renderer.domElement);
    renderer.domElement.classList.add('canvas-3d');
    renderer.domElement.setAttribute('aria-label', 'Interactive 3D architectural model representing educational standards and quality assurance');

    // 2. Lighting System (Warm British Bronze & Architectural Studio)
    const ambientLight = new THREE.AmbientLight(0x1a2130, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff5e6, 2.6);
    keyLight.position.set(5, 8, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const rimGoldLight = new THREE.DirectionalLight(0xc5a880, 2.2);
    rimGoldLight.position.set(-6, 4, -4);
    scene.add(rimGoldLight);

    const bottomFill = new THREE.PointLight(0x8a7050, 1.0, 10);
    bottomFill.position.set(0, -3, 2);
    scene.add(bottomFill);

    // 3. Materials Palette
    const brassMaterial = new THREE.MeshStandardMaterial({
      color: 0xc5a880,
      metalness: 0.88,
      roughness: 0.22,
      wireframe: false
    });

    const brassWireMaterial = new THREE.LineBasicMaterial({
      color: 0xe2ceb5,
      linewidth: 1.5,
      transparent: true,
      opacity: 0.85
    });

    const slateMaterial = new THREE.MeshStandardMaterial({
      color: 0x111622,
      metalness: 0.4,
      roughness: 0.6
    });

    const glassPlaneMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x1a2233,
      metalness: 0.1,
      roughness: 0.15,
      transmission: 0.65,
      transparent: true,
      opacity: 0.75,
      reflectivity: 0.7
    });

    const goldGlowMaterial = new THREE.MeshBasicMaterial({
      color: 0xf3e5d0
    });

    // 4. Constructing "The Architectural System of Standards" Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Foundation Base Plinth (Dark Monolith)
    const baseGeo = new THREE.CylinderGeometry(2.4, 2.6, 0.2, 8);
    const baseMesh = new THREE.Mesh(baseGeo, slateMaterial);
    baseMesh.position.y = -2.0;
    baseMesh.receiveShadow = true;
    rootGroup.add(baseMesh);

    // Gold rim for base
    const baseEdgeGeo = new THREE.EdgesGeometry(baseGeo);
    const baseEdgeLine = new THREE.LineSegments(baseEdgeGeo, brassWireMaterial);
    baseEdgeLine.position.y = -2.0;
    rootGroup.add(baseEdgeLine);

    // Stepped Progression Planes (Representing Levels 3, 4, 5 & Doctoral Progression)
    const tiers = [
      { y: -1.2, size: 2.2, label: 'Level 3 Vocational Standard' },
      { y: -0.4, size: 1.8, label: 'Level 4 Lead IQA Calibration' },
      { y: 0.4,  size: 1.4, label: 'Level 5 Pedagogical Framework' },
      { y: 1.2,  size: 1.0, label: 'Doctoral Academic Rigour' }
    ];

    const tierPlanes = [];

    tiers.forEach((tier, index) => {
      const tierGroup = new THREE.Group();
      tierGroup.position.y = tier.y;

      // Architectural Glass Tablet
      const planeGeo = new THREE.BoxGeometry(tier.size, 0.04, tier.size);
      const planeMesh = new THREE.Mesh(planeGeo, glassPlaneMaterial);
      planeMesh.castShadow = true;
      planeMesh.receiveShadow = true;
      tierGroup.add(planeMesh);

      // Brass Wireframe Outer Border
      const edgesGeo = new THREE.EdgesGeometry(planeGeo);
      const edgeLines = new THREE.LineSegments(edgesGeo, brassWireMaterial);
      tierGroup.add(edgeLines);

      // Corner Calibration Pins (Quality Assurance markers)
      const pinGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.25, 6);
      const offset = tier.size / 2 - 0.06;
      [
        [-offset, -offset],
        [offset, -offset],
        [offset, offset],
        [-offset, offset]
      ].forEach(([cx, cz]) => {
        const pin = new THREE.Mesh(pinGeo, brassMaterial);
        pin.position.set(cx, 0, cz);
        tierGroup.add(pin);
      });

      rootGroup.add(tierGroup);
      tierPlanes.push(tierGroup);
    });

    // Vertical Central Alignment Axis (The Standard Line)
    const axisGeo = new THREE.CylinderGeometry(0.015, 0.015, 4.4, 8);
    const axisMesh = new THREE.Mesh(axisGeo, brassMaterial);
    rootGroup.add(axisMesh);

    // Rotating Core Verification Gyroscope (The Academic Quality Core)
    const coreGroup = new THREE.Group();
    coreGroup.position.y = 0.0;

    // Geometric Octahedron Cage
    const octaGeo = new THREE.OctahedronGeometry(0.65, 0);
    const octaEdges = new THREE.EdgesGeometry(octaGeo);
    const octaLines = new THREE.LineSegments(octaEdges, brassWireMaterial);
    coreGroup.add(octaLines);

    // Inner Polished Brass Cube
    const innerCubeGeo = new THREE.BoxGeometry(0.35, 0.35, 0.35);
    const innerCubeMesh = new THREE.Mesh(innerCubeGeo, brassMaterial);
    coreGroup.add(innerCubeMesh);

    // Surrounding Delicate Standardisation Rings
    const ring1Geo = new THREE.TorusGeometry(1.6, 0.01, 8, 64);
    const ring1 = new THREE.Mesh(ring1Geo, brassMaterial);
    ring1.rotation.x = Math.PI / 2;
    coreGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(2.0, 0.01, 8, 64);
    const ring2 = new THREE.Mesh(ring2Geo, brassMaterial);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = Math.PI / 3;
    coreGroup.add(ring2);

    rootGroup.add(coreGroup);

    // Subtle Node Crystals at Key Vertices
    const nodes = [];
    const nodeCoords = [
      [1.1, -1.2, 1.1],
      [-1.1, -1.2, -1.1],
      [0.9, -0.4, -0.9],
      [-0.9, -0.4, 0.9],
      [0.7, 0.4, 0.7],
      [-0.5, 1.2, 0.5]
    ];

    const nodeSphereGeo = new THREE.SphereGeometry(0.045, 12, 12);
    nodeCoords.forEach(pos => {
      const node = new THREE.Mesh(nodeSphereGeo, goldGlowMaterial);
      node.position.set(pos[0], pos[1], pos[2]);
      rootGroup.add(node);
      nodes.push(node);
    });

    // 5. Interaction & Physics Damping
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let isDragging = false;
    let previousPointerX = 0;
    let previousPointerY = 0;
    let scrollYOffset = 0;

    // Track mouse position over container or window
    window.addEventListener('mousemove', (e) => {
      const rect = mountPoint.getBoundingClientRect();
      if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
        mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      }
    });

    // Touch & Drag controls for direct manipulation
    mountPoint.addEventListener('mousedown', (e) => {
      isDragging = true;
      previousPointerX = e.clientX;
      previousPointerY = e.clientY;
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (isDragging) {
        const deltaX = e.clientX - previousPointerX;
        const deltaY = e.clientY - previousPointerY;
        rootGroup.rotation.y += deltaX * 0.008;
        rootGroup.rotation.x += deltaY * 0.008;
        previousPointerX = e.clientX;
        previousPointerY = e.clientY;
      }
    });

    // Touch events for mobile
    mountPoint.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousPointerX = e.touches[0].clientX;
        previousPointerY = e.touches[0].clientY;
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });

    window.addEventListener('touchmove', (e) => {
      if (isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - previousPointerX;
        const deltaY = e.touches[0].clientY - previousPointerY;
        rootGroup.rotation.y += deltaX * 0.008;
        rootGroup.rotation.x += deltaY * 0.008;
        previousPointerX = e.touches[0].clientX;
        previousPointerY = e.touches[0].clientY;
      }
    }, { passive: true });

    // Scroll-driven camera parallax
    window.addEventListener('scroll', () => {
      scrollYOffset = window.scrollY * 0.0012;
    }, { passive: true });

    // Window Resize Handler
    function onResize() {
      const newW = mountPoint.clientWidth;
      const newH = mountPoint.clientHeight;
      if (!newW || !newH) return;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    }
    window.addEventListener('resize', onResize);

    // 6. Animation Loop (Smooth 60FPS)
    let clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Continuous subtle harmonic respiration
      if (!isDragging) {
        // Smooth target rotation based on cursor
        targetX = mouseY * 0.35;
        targetY = mouseX * 0.65;

        rootGroup.rotation.y += (targetY - rootGroup.rotation.y) * 0.04 + 0.0018;
        rootGroup.rotation.x += (targetX - rootGroup.rotation.x) * 0.04;
      }

      // Gyroscope subtle counter-rotation
      coreGroup.rotation.y += 0.008;
      coreGroup.rotation.x = Math.sin(elapsedTime * 0.8) * 0.15;
      ring1.rotation.z += 0.004;
      ring2.rotation.y -= 0.006;

      // Harmonic breathing in the stepped tier planes
      tierPlanes.forEach((tp, i) => {
        tp.position.y = tiers[i].y + Math.sin(elapsedTime * 1.2 + i * 0.8) * 0.035;
        tp.rotation.y = Math.sin(elapsedTime * 0.5 + i * 0.5) * 0.05;
      });

      // Scroll camera elevation reaction
      camera.position.y = 2.2 + scrollYOffset * 0.8;
      camera.lookAt(0, scrollYOffset * 0.4, 0);

      renderer.render(scene, camera);
    }

    animate();
  }
})();
