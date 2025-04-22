import { useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { MeshLine, MeshLineMaterial } from 'three.meshline'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'

const EnergySegment = () => {
	const { scene } = useThree()

	const radius = 6
	const innerWidth = 0.45

	const textRadius = 5.5
	const textThetaStart = -Math.PI / 3.5
	const textThetaLength = Math.PI / 16

	const thetaStart = -Math.PI / 3.2
	const thetaLength = Math.PI / 3.5
	const segments = 30
	const textMaterialRef = useRef()
	const vitalityText = 'VIM'
	const textColor = 0xffffff
	const textSize = 0.55
	const textMeshesRef = useRef([])
	const textGeometriesRef = useRef([])

	useEffect(() => {
		const createBorderedRingPath = () => {
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
				lineWidth: 0.075, // Increase this for thicker line
				color: new THREE.Color(0xf1f1f1),
				transparent: false,
				depthTest: true,
				dashArray: 0,
			})

			const mesh = new THREE.Mesh(meshLine.geometry, material)
			mesh.position.y = 1
			scene.add(mesh)

			return { mesh, geometry: meshLine.geometry, material }
		}

		const path = createBorderedRingPath()

		const loadFontAndCreateText = async () => {
			const loader = new FontLoader()
			try {
				const font = await loader.loadAsync('/src/fonts/Rubik_Medium.json')

				const outerRadius = textRadius + innerWidth
				const numChars = vitalityText.length

				const initialRotationOffset = -Math.PI / 2

				const textMaterial = new THREE.MeshBasicMaterial({
					color: textColor,
					transparent: true,
					depthTest: true,
				})
				textMaterialRef.current = textMaterial

				for (let i = 0; i < numChars; i++) {
					const char = vitalityText[i]
					const angle = textThetaStart + (i / (numChars - 1)) * textThetaLength
					const x = outerRadius * Math.cos(angle)
					const z = outerRadius * Math.sin(angle)

					const textGeometry = new TextGeometry(char, {
						font: font,
						size: textSize,
						height: 0.05,
						curveSegments: 4,
						bevelEnabled: false,
					})

					textGeometry.center()

					const textMesh = new THREE.Mesh(textGeometry, textMaterial)

					textMesh.position.set(x, 1.1, z)

					textMesh.rotation.y = -angle + initialRotationOffset

					textMesh.rotateX(-Math.PI / 2)

					scene.add(textMesh)
					textMeshesRef.current.push(textMesh)
					textGeometriesRef.current.push(textGeometry)
				}
			} catch (error) {
				console.error('Error loading font:', error)
			}
		}

		loadFontAndCreateText()

		return () => {
			scene.remove(path.mesh)
			path.geometry.dispose()
			path.material.dispose()

			textMeshesRef.current.forEach(mesh => scene.remove(mesh))
			textGeometriesRef.current.forEach(geometry => geometry.dispose())
			if (textMaterialRef.current) {
				textMaterialRef.current.dispose()
			}
		}
	}, [])

	return null
}

export default EnergySegment
