import * as THREE from "three";
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js'

gsap.registerPlugin(ScrollTrigger);

// CRIANDO CENÁRIO
const cena = new THREE.Scene()

console.log(window.innerWidth)

// CÂMERA
const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10;

// RENDERIZADOR
const renderizador = new THREE.WebGLRenderer({alpha: true});
renderizador.setSize(window.innerWidth, window.innerHeight);
document.querySelector(".abelha").appendChild(renderizador.domElement)

// ILUMINAÇÃO
const luzAmbiente = new THREE.AmbientLight("white", .5);
const luzDirecional = new THREE.DirectionalLight("white", 2);
luzDirecional.position.x = -3;
luzDirecional.position.z = 3;
cena.add(luzAmbiente, luzDirecional);

// IMPORTAR 3D
let abelha;
let mixer;
const loader = new GLTFLoader();
loader.load("assets/bee_minecraft.glb", (abelhaObjeto) => {
    console.log(abelhaObjeto);
    abelha = abelhaObjeto.scene;
    const abelhaAnimacao = abelhaObjeto.animations[0];

    // MIXER -> Controlador de reprodução
    mixer = new THREE.AnimationMixer(abelha);
    mixer.clipAction(abelhaAnimacao).play();

    abelha.position.z = -50;
    abelha.position.x = 15;
    abelha.rotation.y = 2.5;
    abelha.rotation.x = .5;
    cena.add(abelha);
    rotacionar();
})

function rotacionar() {
    gsap.to(abelha.position, {
        x: -9,
        z: -5,
        scrollTrigger: {
            start: "0% 0%",
            end: "50% 50%",
            markers: true,
            scrub: 2
        }
    })
    gsap.to(abelha.rotation, {
        x: 0,
        y: 2.3,
        scrollTrigger: {
            start: "0% 0%",
            end: "50% 50%",
            markers: true,
            scrub: 3
        }
    })
}

// ANIMAR
function animate() {
    if (mixer) {
        mixer.update(0.005); 
    }
    requestAnimationFrame(animate);
    renderizador.render(cena, camera);
}

animate();