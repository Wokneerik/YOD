import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import * as THREE from 'three'

const FloorRing = () => {
	const { scene } = useThree()

	useEffect(() => {
		// Create the original ring
		const floorRingGeometry = new THREE.RingGeometry(4, 5, 64)
		const floorRingMaterial = new THREE.MeshBasicMaterial({
			color: 0xffffff,
			side: THREE.DoubleSide,
		})
		const floorRingMesh = new THREE.Mesh(floorRingGeometry, floorRingMaterial)

		floorRingMesh.position.set(0, 1, 0)
		floorRingMesh.rotateX(Math.PI / 2)

		scene.add(floorRingMesh)

		return () => {
			scene.remove(floorRingMesh)
			floorRingGeometry.dispose()
			floorRingMaterial.dispose()
		}
	}, [])

	return null
}

export default FloorRing
