import * as THREE from 'three'

export const cameraPosition = new THREE.Vector3(-10, 32, 40)

export const cameraFov = 40

export const initialTarget = new THREE.Vector3(0, 10, 0)

export const defaultSkinColor = '#F5C6A5'

export const sideMainButtonConfig = [
	{
		index: 0,
		imagePath: '/img/buttons/brain.png',
		position: new THREE.Vector3(0, 31.1, 9),
		lookAt: new THREE.Vector3(0, 20.1, 0),
		zoom: 3,
		targetFov: 16.3,
		label: 'mental',
	},
	{
		index: 1,
		imagePath: '/img/buttons/breath.png',
		position: new THREE.Vector3(0, 16.5, 10),
		lookAt: new THREE.Vector3(0, 16.5, 0),
		zoom: 2.8,
		targetFov: 23,
		label: 'breath',
	},
	{
		index: 2,
		imagePath: '/img/buttons/body.png',
		position: new THREE.Vector3(0, 11, 10),
		lookAt: new THREE.Vector3(0, 11, 0),
		zoom: 0.5,
		targetFov: 74,
		label: 'body',
	},
]

export const svgSmilesStatus = [
	`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
	<path d="M8 15c2-2 6-2 8 0" stroke="red" fill="none" stroke-width="2.5" stroke-linecap="round" />
	</svg>`,
	`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
	<path d="M8 15h8" stroke="yellow" fill="none" stroke-width="2.5" stroke-linecap="round" />
	</svg>`,
	`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
	<path d="M8 15c2 2 6 2 8 0" stroke="green" fill="none" stroke-width="2.5" stroke-linecap="round" />
	</svg>`,
]
