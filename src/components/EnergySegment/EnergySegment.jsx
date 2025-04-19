import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import * as THREE from 'three'
import { MeshLine, MeshLineMaterial } from 'three.meshline'

const EnergySegment = () => {
	const { scene } = useThree()

	useEffect(() => {
		const createBorderedRingPath = () => {
			const radius = 6
			const innerWidth = 0.45
			const thetaStart = -Math.PI / 3.2
			const thetaLength = Math.PI / 3.9
			const segments = 30

			const points = []

			// Add inner arc
			for (let i = 0; i <= segments; i++) {
				const theta = thetaStart + (i / segments) * thetaLength
				const x = (radius - innerWidth) * Math.cos(theta)
				const z = (radius - innerWidth) * Math.sin(theta)
				points.push(x, 0, z)
			}

			// Add outer arc (reverse)
			for (let i = segments; i >= 0; i--) {
				const theta = thetaStart + (i / segments) * thetaLength
				const x = (radius + innerWidth) * Math.cos(theta)
				const z = (radius + innerWidth) * Math.sin(theta)
				points.push(x, 0, z)
			}

			// Close the loop by adding the first point again
			points.push(points[0], points[1], points[2])

			// MeshLine requires a flat array, not Vector3s
			const meshLine = new MeshLine()
			meshLine.setPoints(points)

			const material = new MeshLineMaterial({
				lineWidth: 0.07, // Increase this for thicker line
				color: new THREE.Color(0xf1f1f1),
				transparent: false,
				depthTest: false,
				dashArray: 0,
			})

			const mesh = new THREE.Mesh(meshLine.geometry, material)
			mesh.position.y = 1
			scene.add(mesh)

			return { mesh, geometry: meshLine.geometry, material }
		}

		const path = createBorderedRingPath()

		return () => {
			scene.remove(path.mesh)
			path.geometry.dispose()
			path.material.dispose()
		}
	}, [])

	return null
}

export default EnergySegment
