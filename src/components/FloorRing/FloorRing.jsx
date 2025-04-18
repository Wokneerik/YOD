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

		// Create bordered path for 1/8 of the ring
		const createBorderedRingPath = () => {
			// Define parameters for 1/8 of a ring
			const radius = 6 // Position outside the original ring
			const innerWidth = 0.41 // Half the width of the path
			const thetaStart = 0
			const thetaLength = Math.PI / 3.9
			const segments = 30 // More segments for smoother outline

			// Array to store all points
			const points = []

			// Add points for inner arc
			for (let i = 0; i <= segments; i++) {
				const theta = thetaStart + (i / segments) * thetaLength
				const x = (radius - innerWidth) * Math.cos(theta)
				const z = (radius - innerWidth) * Math.sin(theta)
				points.push(new THREE.Vector3(x, 0, z))
			}

			// Add points for outer arc (going backward)
			for (let i = segments; i >= 0; i--) {
				const theta = thetaStart + (i / segments) * thetaLength
				const x = (radius + innerWidth) * Math.cos(theta)
				const z = (radius + innerWidth) * Math.sin(theta)
				points.push(new THREE.Vector3(x, 0, z))
			}

			// Close the shape by connecting back to first point
			points.push(points[0].clone())

			// Create buffer geometry from points
			const geometry = new THREE.BufferGeometry().setFromPoints(points)

			// Create line material
			const material = new THREE.LineBasicMaterial({
				color: 0x00ff00, // Green color
				linewidth: 2, // Note: WebGL may limit this to 1px on many platforms
			})

			// Create line
			const line = new THREE.Line(geometry, material)

			// Position and rotate
			line.position.y = 1

			scene.add(line)

			return { geometry, material, line }
		}

		// Create the bordered path
		const path = createBorderedRingPath()

		return () => {
			scene.remove(floorRingMesh)
			floorRingGeometry.dispose()
			floorRingMaterial.dispose()

			scene.remove(path.line)
			path.geometry.dispose()
			path.material.dispose()
		}
	}, [])

	return null
}

export default FloorRing
