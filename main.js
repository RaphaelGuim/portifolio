

const orbitingSatellites = []; // Armazena satélites com curva e tempo





// Configuração básica do Three.js
const scene = new THREE.Scene();

// Câmera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 30;

// Renderizador
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg"),
    antialias: true,
    alpha: true,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// Redimensionar automaticamente
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});


const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);

scene.add(ambientLight);



// -------- Terra com textura, rotação e órbita de esferas --------

// Luz direcionada para dar destaque à Terra
const sunLight = new THREE.DirectionalLight(0xffffff, 1);

sunLight.position.set(-30, 20, 40);
scene.add(sunLight);



// Carrega textura da Terra
const textureLoader = new THREE.TextureLoader();
const earthTexture = textureLoader.load(
    'earth.jpg',
    (texture) => {
        const earthMaterial = new THREE.MeshStandardMaterial({ map: texture });
        const earthGeometry = new THREE.SphereGeometry(6, 64, 64);
        earth = new THREE.Mesh(earthGeometry, earthMaterial);
        earthPivot.add(earth);
    },
    undefined,
    (err) => {
        console.error('❌ Erro ao carregar a textura da Terra:', err);
    }
);


const earthSize = 9;

// Cria geometria e material da Terra
const earthGeometry = new THREE.SphereGeometry(earthSize, 64, 64);
const earthMaterial = new THREE.MeshStandardMaterial({
    map: earthTexture,
});

let earth = new THREE.Mesh(earthGeometry, earthMaterial);
const circleLineList = []







// Pivot para permitir órbita
const earthPivot = new THREE.Object3D();
earthPivot.add(earth);
earthPivot.position.set(20, 0, 0);
earthPivot.rotation.y = Math.PI / 2;

scene.add(earthPivot);



// Posição atual do torus (será interpolada)
let currentEarthPosition = new THREE.Vector3(20, 0, 0)
createAnimateEarthRings();




function createAnimateLine(option) {

    const l = [];
    option.pointList.forEach((e) =>
        l.push(new THREE.Vector3(e[0], e[1], e[2]))
    );
    const curve = new THREE.CatmullRomCurve3(l);


    const tubeGeometry = new THREE.TubeGeometry(
        curve,
        option.number || 50,
        option.radius || 1,
        option.radialSegments
    );
    return new THREE.Mesh(tubeGeometry, option.material);
}
function getCirclePoints(option) {
    const list = [];
    for (
        let j = 0;
        j < 2 * Math.PI - 0.1;
        j += (2 * Math.PI) / (option.number || 100)
    ) {
        list.push([
            parseFloat((Math.cos(j) * (option.radius || 10)).toFixed(2)),
            0,
            parseFloat((Math.sin(j) * (option.radius || 10)).toFixed(2)),
        ]);
    }
    if (option.closed) list.push(list[0]);
    return list;
}


function createAnimateEarthRings() {
    // Gera os pontos do círculo
    const points = getCirclePoints({
        radius: earthSize + 3, // raio da Terra (6) + distância do anel
        number: 150,
        closed: true,
    });

    // Material base
    const baseMaterial = new THREE.MeshBasicMaterial({
        color: "#0c3172",
        transparent: true,
        opacity: 1,
        // side: THREE.DoubleSide,
    });

    // Linha 1 (principal)
    const line1 = createAnimateLine({
        pointList: points,
        material: baseMaterial,
        number: 100,
        radius: 0.02,
    });
    earthPivot.add(line1);

    // Linha 2 (escala e rotação)
    const line2 = line1.clone();
    line2.scale.set(1.2, 1.2, 1.2);
    line2.rotation.z = Math.PI / 6;
    earthPivot.add(line2);

    // Linha 3 (escala e rotação oposta)
    const line3 = line1.clone();
    line3.scale.set(0.8, 0.8, 0.8);
    line3.rotation.z = -Math.PI / 6;
    earthPivot.add(line3);

    const satelliteGeometry = new THREE.SphereGeometry(0.2, 16, 16);
    const materials = [
        new THREE.MeshBasicMaterial({ color: "#e0b187", depthTest: true }),
        new THREE.MeshBasicMaterial({ color: "#628fbb", depthTest: true }),
        new THREE.MeshBasicMaterial({ color: "#806bdf", depthTest: true }),
    ];

    const satelliteCount = 2;

    // Convertendo lista para pontos válidos THREE.Vector3
    const pointsVec = points.map(p => new THREE.Vector3(p[0], p[1], p[2]));

    // Curvas Catmull-Rom corretas
    const curve1 = new THREE.CatmullRomCurve3(pointsVec, true);
    const curve2 = new THREE.CatmullRomCurve3(
        pointsVec.map(v => v.clone().multiplyScalar(1.2).applyAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI / 6)),
        true
    );
    const curve3 = new THREE.CatmullRomCurve3(
        pointsVec.map(v => v.clone().multiplyScalar(0.8).applyAxisAngle(new THREE.Vector3(0, 0, 1), -Math.PI / 6)),
        true
    );

    const t = 0;

    const sat1 = new THREE.Mesh(satelliteGeometry, materials[0]);
    const sat2 = new THREE.Mesh(satelliteGeometry, materials[1]);
    const sat3 = new THREE.Mesh(satelliteGeometry, materials[2]);

    orbitingSatellites.push({ mesh: sat1, curve: curve1, t });
    orbitingSatellites.push({ mesh: sat2, curve: curve2, t });
    orbitingSatellites.push({ mesh: sat3, curve: curve3, t });

    earthPivot.add(sat1);
    earthPivot.add(sat2);
    earthPivot.add(sat3);

}




// Função para criar uma textura circular mais brilhante
function createCircleTexture() {
    const canvas = document.createElement('canvas');
    const size = 64; // Aumentar o tamanho para melhor qualidade
    canvas.width = size;
    canvas.height = size;

    const context = canvas.getContext('2d');

    // Criar um gradiente radial mais intenso
    const gradient = context.createRadialGradient(
        size / 2, size / 2, 0,    // Círculo interno
        size / 2, size / 2, size / 2 // Círculo externo
    );

    // Definir gradiente com mais intensidade
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');     // Centro branco intenso
    gradient.addColorStop(0.15, 'rgba(230, 230, 255, 1)');  // Quase branco próximo ao centro
    gradient.addColorStop(0.20, 'rgba(180, 180, 255, 0.5)'); // Azul claro médio
    gradient.addColorStop(0.55, 'rgba(120, 120, 255, 0.3)'); // Brilho estendido
    gradient.addColorStop(1, 'rgba(70, 70, 255, 0)');       // Bordas transparentes

    // Criar um fundo preto para o canvas
    context.fillStyle = 'rgba(0, 0, 0, 0)';
    context.fillRect(0, 0, size, size);

    // Aplicar o gradiente
    context.fillStyle = gradient;
    context.fillRect(0, 0, size, size);

    // Criar a textura do Three.js a partir do canvas
    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
}


function createStarField() {
    const geometry = new THREE.BufferGeometry();
    const starCount = 800;

    // Arrays para armazenar posições e tamanhos
    const positions = new Float32Array(starCount * 3);
    const sizes = new Float32Array(starCount);

    // Armazenar os tamanhos originais como um array JavaScript separado
    const originalSizes = [];

    // Preencher os arrays com valores aleatórios
    for (let i = 0; i < starCount; i++) {
        positions[i * 3] = THREE.MathUtils.randFloatSpread(150);
        positions[i * 3 + 1] = THREE.MathUtils.randFloatSpread(150);
        positions[i * 3 + 2] = THREE.MathUtils.randFloatSpread(150);

        // Definir tamanhos com categorias mais distintas
        let size;
        if (i < starCount * 0.05) { // 5% super brilhantes
            size = THREE.MathUtils.randFloat(1.5, 3.0);
        } else if (i < starCount * 0.25) { // 20% médias
            size = THREE.MathUtils.randFloat(0.8, 1.4);
        } else { // 75% pequenas
            size = THREE.MathUtils.randFloat(0.1, 0.7);
        }

        sizes[i] = size;
        originalSizes.push(size); // Guardar uma cópia
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Criar a textura
    const starTexture = createCircleTexture();

    // Material com brilho intenso
    const material = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 1.0,
        map: starTexture,
        transparent: true,
        opacity: 1.0,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    const starField = new THREE.Points(geometry, material);

    // Armazenar os tamanhos originais no userData
    starField.userData = {
        originalSizes: originalSizes
    };

    scene.add(starField);
    return starField;
}

const starField = createStarField();




const dodecahedronGeometry = new THREE.IcosahedronGeometry(7, 1);
const dodecahedronMaterial = new THREE.MeshStandardMaterial({
    color: 0x5a67d8,
    wireframe: true,

    transparent: true,
    opacity: 0.7
});
const dodecahedron = new THREE.Mesh(
    dodecahedronGeometry,
    dodecahedronMaterial
);
dodecahedron.position.set(-15, 10, 10);
scene.add(dodecahedron);

// Após a declaração do dodecahedron, adicione:
const sectionColors = {
    home: new THREE.Color("rgb(48, 47, 124)"),
    about: new THREE.Color("rgb(35, 68, 55)"),
    projects: new THREE.Color("rgb(150, 65, 65)"),
    skills: new THREE.Color("rgb(61, 161, 52)"),
    contact: new THREE.Color(0x6464ff),
};

let targetColor = sectionColors.home;



let currentCameraPosition = new THREE.Vector3(0, 0, 30);

// Posição atual do dodecahedron (será interpolada)
let currentDodecahedronPosition = new THREE.Vector3(-15, 10, 10);

// Posição alvo do dodecahedron
let targetDodecahedronPosition = new THREE.Vector3(-15, 10, 10);

// Animação de rolagem
function moveCamera() {

    // Verificar qual seção está visível
    const sections = ["home", "about", "projects", "skills", "contact"];
    let activeSection = document.querySelector("section")
    if (!activeSection) return

    targetColor = sectionColors[activeSection.id];

    // Atualizar as posições alvo baseadas na seção ativa
    // Calcula valores dinâmicos para o tempo atual

    switch (activeSection.id) {
        case "home":

            currentEarthPosition = new THREE.Vector3(20, 0, 0)
            targetDodecahedronPosition.set(-15, 10, 10);
            currentCameraPosition = new THREE.Vector3(0, 0, 30)
            break;
        case "about":

            currentEarthPosition = new THREE.Vector3(25, 0, 0)
            targetDodecahedronPosition.set(-40, -10, 5);
            currentCameraPosition = new THREE.Vector3(0, 0, 35)
            break;
        case "projects":

            currentEarthPosition = new THREE.Vector3(35, 0, 0)
            targetDodecahedronPosition.set(-10, -5, 20);
            currentCameraPosition = new THREE.Vector3(0, 0, 45)
            break;
        case "skills":

            currentEarthPosition = new THREE.Vector3(25, 0, 0)
            targetDodecahedronPosition.set(-5, 20, 0);
            currentCameraPosition = new THREE.Vector3(0, 0, 30)
            break;
        case "contact":

            currentEarthPosition = new THREE.Vector3(15, 0, 0)
            targetDodecahedronPosition.set(-15, -10, 8);
            currentCameraPosition = new THREE.Vector3(0, 0, 20)
            break;
        default:
            // currentEarthPosition = EarthTargetPositions.home;
            // targetDodecahedronPosition.set(-15, 10, 10);
            currentCameraPosition = new THREE.Vector3(0, 0, 30)
    }







}
moveCamera();

// Sistema de estrelas cadentes
let shootingStars = [];

function createShootingStar() {
    // Criar uma geometria de linha para a estrela cadente
    const geometry = new THREE.BufferGeometry();

    // Comprimento da cauda da estrela cadente
    const tailLength = 8; // Aumentar o comprimento para dar melhor efeito

    // Criar pontos para a linha (que formará a cauda)
    const points = [];
    for (let i = 0; i < tailLength; i++) {
        points.push(new THREE.Vector3(0, 0, 0));
    }

    geometry.setFromPoints(points);

    // Material mais fino para a estrela cadente
    const material = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.3 // Reduzir a opacidade para parecer mais fina
    });

    const shootingStar = new THREE.Line(geometry, material);

    // Posição inicial garantidamente nas bordas da tela
    // Calcular dimensões da cena visível na posição da câmera
    const distance = Math.abs(camera.position.z);
    const vFov = camera.fov * Math.PI / 180;
    const visibleHeight = 2 * Math.tan(vFov / 2) * distance;
    const visibleWidth = visibleHeight * camera.aspect;

    // Valores ajustados para garantir que estão fora da tela
    const edgeX = (visibleWidth / 2) * 1.2; // 20% além da borda
    const edgeY = (visibleHeight / 2) * 1.2; // 20% além da borda

    // Profundidade da estrela (para estar no fundo)
    const z = THREE.MathUtils.randFloat(-150, -30);

    // Escolha um lado aleatório para começar
    const side = Math.floor(Math.random() * 2); // 0: topo, 1: direita, 2: base, 3: esquerda
    let x, y;
    let dirX, dirY;

    switch (side) {

        case 0: // direita
            x = edgeX;
            y = THREE.MathUtils.randFloatSpread(visibleHeight) * 0.8;
            // Direção: para a esquerda com alguma variação vertical
            dirX = -THREE.MathUtils.randFloat(1, 2);
            dirY = THREE.MathUtils.randFloatSpread(1);
            break;

        case 1: // esquerda
            x = -edgeX;
            y = THREE.MathUtils.randFloatSpread(visibleHeight) * 0.8;
            // Direção: para a direita com alguma variação vertical
            dirX = THREE.MathUtils.randFloat(1, 2);
            dirY = THREE.MathUtils.randFloatSpread(1);
            break;
    }

    // Definir direção normalizada
    const direction = new THREE.Vector3(dirX, dirY, 0).normalize();

    // Velocidade aleatória - um pouco mais rápida
    const speed = THREE.MathUtils.randFloat(2, 6);

    // Tempo de vida
    const lifeTime = THREE.MathUtils.randInt(40, 80);
    let age = 0;

    // Atualizar todos os pontos da geometria para a posição inicial
    const positions = shootingStar.geometry.attributes.position.array;
    for (let i = 0; i < tailLength; i++) {
        positions[i * 3] = x - (i * direction.x * 0.5); // Espalhar a cauda inicialmente
        positions[i * 3 + 1] = y - (i * direction.y * 0.5);
        positions[i * 3 + 2] = z;
    }

    // Marcar que a geometria precisa de atualização
    shootingStar.geometry.attributes.position.needsUpdate = true;

    scene.add(shootingStar);

    return {
        line: shootingStar,
        direction: direction,
        speed: speed,
        lifeTime: lifeTime,
        age: age,
        positions: positions,
        tailLength: tailLength,
        headPosition: { x, y, z }
    };
}

// Verificar se devemos criar uma nova estrela cadente
function checkCreateShootingStar() {

    if (Math.random() < 0.001) {
        shootingStars.push(createShootingStar());
    }
}

// Atualizar as estrelas cadentes
function updateShootingStars() {
    // Para cada estrela cadente ativa
    for (let i = shootingStars.length - 1; i >= 0; i--) {
        const star = shootingStars[i];
        star.age++;

        // Atualizar a posição da "cabeça" da estrela cadente
        star.headPosition.x += star.direction.x * star.speed;
        star.headPosition.y += star.direction.y * star.speed;

        // Atualizar as posições dos pontos da cauda
        for (let j = star.tailLength - 1; j > 0; j--) {
            // Copiar a posição do ponto anterior para criar o efeito de cauda
            star.positions[j * 3] = star.positions[(j - 1) * 3];
            star.positions[j * 3 + 1] = star.positions[(j - 1) * 3 + 1];
            star.positions[j * 3 + 2] = star.positions[(j - 1) * 3 + 2];
        }

        // Atualizar a posição da cabeça da cauda
        star.positions[0] = star.headPosition.x;
        star.positions[1] = star.headPosition.y;
        star.positions[2] = star.headPosition.z;

        // Marcar que a geometria precisa de atualização
        star.line.geometry.attributes.position.needsUpdate = true;

        // Desvanecer com o tempo e gradualmente ao longo da cauda
        const baseOpacity = 1 - (star.age / star.lifeTime);
        star.line.material.opacity = baseOpacity * 0.7; // Manter mais fina com opacidade reduzida

        // Remover a estrela cadente se ultrapassou o tempo de vida ou saiu da vista
        const visibleWidth = window.innerWidth * 1.5; // Margem extra
        const visibleHeight = window.innerHeight * 1.5;

        if (star.age >= star.lifeTime ||
            Math.abs(star.headPosition.x) > visibleWidth ||
            Math.abs(star.headPosition.y) > visibleHeight) {
            scene.remove(star.line);
            shootingStars.splice(i, 1);
        }
    }
}




function animate(time) {
    requestAnimationFrame(animate);

    moveCamera();


    dodecahedron.material.color.lerp(targetColor, 0.025);
    dodecahedron.position.lerp(targetDodecahedronPosition, 0.02);
    dodecahedron.rotation.x -= 0.001;
    dodecahedron.rotation.y -= 0.002;
    dodecahedron.rotation.z -= 0.001;

    earthPivot.position.lerp(currentEarthPosition, 0.02);

    camera.position.lerp(currentCameraPosition, 0.005)




    // Estrelas
    starField.rotation.x += 0.0001;
    starField.rotation.y += 0.0002;
    starField.rotation.z += 0.0002;

    // Estrelas cadentes
    checkCreateShootingStar();
    updateShootingStars();

    // Rotação da Terra
    earthPivot.rotation.y += 0.0015;



    orbitingSatellites.forEach((satellite, index) => {
        satellite.t += 0.002 * (1 + index / 2) // velocidade da órbita
        if (satellite.t > 1) satellite.t -= 1

        const pos = satellite.curve.getPointAt(satellite.t);
        satellite.mesh.position.copy(pos);
    });


    renderer.render(scene, camera);
}

animate();
