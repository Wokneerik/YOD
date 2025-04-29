import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import * as THREE from 'three'

const EnergyCapsule = ({ count = 5 }) => {
	const { scene } = useThree()

	useEffect(() => {
		const capsuleMeshes = []

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

		const material = new THREE.MeshLambertMaterial({
			color: 0xffdb1c,

			emissive: 0xffdb1c,
			emissiveIntensity: 1.5,
		})

		const radius = 6
		const thetaStart = -Math.PI / 5.35

		const capsuleSpacing = 0.085

		for (let i = 0; i < count; i++) {
			const theta = thetaStart + i * capsuleSpacing
			const x = radius * Math.cos(theta)
			const z = radius * Math.sin(theta)

			const capsuleMesh = new THREE.Mesh(capsuleGeom, material)
			capsuleMesh.position.set(x, 1, z)
			capsuleMesh.rotateX(Math.PI / 2)

			const angleToCenter = Math.atan2(z, x)
			capsuleMesh.rotateZ(angleToCenter)

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
