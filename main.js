import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

let xrotation = 0.01
let yrotation = 0.01
let zrotation = 0.01

const xSlider = document.querySelector("#xrotation")
const ySlider = document.querySelector("#yrotation")
const zSlider = document.querySelector("#zrotation")

const ambientLightColorSelector = document.querySelector("#alcolor")
const spotlightColorSelector = document.querySelector("#spcolor")
const wireframeSelector = document.querySelector("#wireframe")

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#rendercanvas')
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.set(5, 20, 30);

const geometry = new THREE.BoxGeometry(10, 10, 10)
const obamaTexture = new THREE.TextureLoader().load('obama.jpg')
const material = new THREE.MeshStandardMaterial(
  {
    map: obamaTexture
  }
)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,10,9)

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight)

const pointLightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 100)
scene.add(pointLightHelper, gridHelper)

const torus = new THREE.Mesh(geometry, material)

const controls = new OrbitControls(camera, renderer.domElement)

scene.add(torus)

function animate() {
  requestAnimationFrame(animate)

  torus.geometry.rotateX(xrotation)
  torus.geometry.rotateY(yrotation)
  torus.geometry.rotateZ(zrotation)

  controls.update()

  renderer.render(scene,camera)
}

animate()

xSlider.addEventListener("change", function() {
  xrotation = xSlider.value / 1000;
  document.querySelector("#xrotdisplay").innerHTML = xSlider.value
}, false);

ySlider.addEventListener("change", function() {
  yrotation = ySlider.value / 1000;
  document.querySelector("#yrotdisplay").innerHTML = ySlider.value
}, false);

zSlider.addEventListener("change", function() {
  zrotation = zSlider.value / 1000;
  document.querySelector("#zrotdisplay").innerHTML = zSlider.value
}, false);


ambientLightColorSelector.addEventListener("change", function() {
  ambientLight.color.set(ambientLightColorSelector.value)
}, false);

spotlightColorSelector.addEventListener("change", function() {
  pointLight.color.set(spotlightColorSelector.value)
}, false);

wireframeSelector.addEventListener("change", function() {
  if (!wireframeSelector.checked) {
    scene.remove(pointLightHelper, gridHelper)
  }else{
    scene.add(pointLightHelper, gridHelper)
  }
}, false);
