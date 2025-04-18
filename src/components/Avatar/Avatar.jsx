import { OrbitControls } from '@react-three/drei'
import { useLoader, useThree } from '@react-three/fiber'
import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js'

import FloorRing from '../FloorRing/FloorRing'

const Avatar = () => {
	const { scene, camera, gl } = useThree()
	const controlsRef = useRef()

	const [controlsBlocked, setControlsBlocked] = useState(false)

	const human = useLoader(OBJLoader, '/public/models/Human.obj')

	useEffect(() => {
		const skinMaterial = new THREE.MeshStandardMaterial({ color: 0xffcc99 })

		human.traverse(child => {
			if (child.isMesh) {
				child.material = skinMaterial
			}
		})

		human.position.set(0, 1, 0)
		scene.add(human)

		return () => {
			scene.remove(human)
		}
	}, [])

	return (
		<>
			<OrbitControls
				ref={controlsRef}
				enabled={!controlsBlocked}
				enableZoom={false}
				enablePan={false}
				minDistance={20}
				maxDistance={60}
				target={[0, 10, 0]}
				maxPolarAngle={Math.PI / 2}
				minPolarAngle={Math.PI / 4.5}
			/>

			<FloorRing />
		</>
	)
}

export default Avatar
