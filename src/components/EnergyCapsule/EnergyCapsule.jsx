import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import * as THREE from 'three'

const EnergyCapsule = ({ count = 6 }) => {
	const { scene } = useThree()

	useEffect(() => {
		const capsuleMeshes = []

		// Capsule shape (rounded rectangle)
		const generateRecShape = () => {
			const shape = new THREE.Shape()
			const width = 0.65
			const height = 0.25
			const radius = Math.min(width, height) * 0.3

			shape.moveTo(-width / 2 + radius, -height / 2)
			shape.lineTo(width / 2 - radius, -height / 2)
			shape.quadraticCurveTo(
				width / 2,
				-height / 2,
				width / 2,
				-height / 2 + radius
			)
			shape.lineTo(width / 2, height / 2 - radius)
			shape.quadraticCurveTo(
				width / 2,
				height / 2,
				width / 2 - radius,
				height / 2
			)
			shape.lineTo(-width / 2 + radius, height / 2)
			shape.quadraticCurveTo(
				-width / 2,
				height / 2,
				-width / 2,
				height / 2 - radius
			)
			shape.lineTo(-width / 2, -height / 2 + radius)
			shape.quadraticCurveTo(
				-width / 2,
				-height / 2,
				-width / 2 + radius,
				-height / 2
			)

			return shape
		}

		const shape = generateRecShape()
		const extrudeSettings = {
			depth: 0.05,
			bevelEnabled: true,
			bevelThickness: 0.02,
			bevelSize: 0.02,
			bevelSegments: 4,
		}

		const capsuleGeom = new THREE.ExtrudeGeometry(shape, extrudeSettings)

		const material = new THREE.MeshStandardMaterial({
			color: 0xffe27c,
			transparent: true,
			opacity: 0.8,
			emissive: 0xffe27c,
			emissiveIntensity: 0.2,
		})

		const radius = 6
		const thetaStart = -Math.PI / 3.2

		const capsuleSpacing = 0.09

		for (let i = 0; i < count; i++) {
			const theta = thetaStart + i * capsuleSpacing
			const x = radius * Math.cos(theta)
			const z = radius * Math.sin(theta)

			const capsuleMesh = new THREE.Mesh(capsuleGeom, material)
			capsuleMesh.position.set(x, 1.01, z)
			capsuleMesh.rotateX(Math.PI / 2)

			scene.add(capsuleMesh)
			capsuleMeshes.push(capsuleMesh)
		}

		return () => {
			capsuleMeshes.forEach(mesh => {
				scene.remove(mesh)
				mesh.geometry.dispose()
				mesh.material.dispose()
			})
		}
	}, [scene, count])

	return null
}

export default EnergyCapsule
