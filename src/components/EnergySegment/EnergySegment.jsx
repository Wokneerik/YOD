import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'
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

	const vitalityText = 'VIM'
	const textColor = 0xffffff
	const textSize = 0.55

	useEffect(() => {
		const createdTextMeshes = []

		const createBorderedRingPath = () => {
			const points = []

			for (let i = 0; i <= segments; i++) {
				const theta = thetaStart + (i / segments) * thetaLength
				const x = (radius - innerWidth) * Math.cos(theta)
				const z = (radius - innerWidth) * Math.sin(theta)
				points.push(x, 0, z)
			}

			for (let i = segments; i >= 0; i--) {
				const theta = thetaStart + (i / segments) * thetaLength
				const x = (radius + innerWidth) * Math.cos(theta)
				const z = (radius + innerWidth) * Math.sin(theta)
				points.push(x, 0, z)
			}

			points.push(points[0], points[1], points[2])

			const meshLine = new MeshLine()
			meshLine.setPoints(points)

			const material = new MeshLineMaterial({
				lineWidth: 0.075,
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

		const loadFontAndCreateText = () => {
			const loader = new FontLoader()

			loader.load('/fonts/Rubik_Medium.json', function (font) {
				const outerRadius = textRadius + innerWidth
				const numChars = vitalityText.length

				const initialRotationOffset = -Math.PI / 2

				const textMaterial = new THREE.MeshBasicMaterial({
					color: textColor,
					transparent: true,
					depthTest: true,
				})

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
					createdTextMeshes.push({
						mesh: textMesh,
						geometry: textGeometry,
						material: textMaterial,
					})
				}
			})
		}

		loadFontAndCreateText()

		return () => {
			scene.remove(path.mesh)
			path.geometry.dispose()
			path.material.dispose()

			createdTextMeshes.forEach(({ mesh, geometry, material }) => {
				scene.remove(mesh)
				geometry.dispose()
				material.dispose()
			})
		}
	}, [])

	return null
}

export default EnergySegment
