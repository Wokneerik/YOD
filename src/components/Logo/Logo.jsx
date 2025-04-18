import { Text3D } from '@react-three/drei'
import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import font from '/src/fonts/Inter_Bold.json'

const Logo = () => {
	const textRef = useRef()
	const material = new THREE.MeshNormalMaterial()

	useEffect(() => {
		if (textRef.current) {
			const bbox = new THREE.Box3().setFromObject(textRef.current)
			const width = bbox.max.x - bbox.min.x

			const centerPosition = -width / 2
			textRef.current.position.x = centerPosition
		}
	}, [])

	return (
		<>
			<ambientLight intensity={0.5} />
			<directionalLight position={[10, 10, 10]} intensity={1} />
			<group rotation={[-0.5, -0.2, 0]}>
				<Text3D
					ref={textRef}
					font={font}
					size={0.7}
					height={0.2}
					curveSegments={12}
					bevelEnabled={true}
					bevelThickness={0.03}
					bevelSize={0.02}
					bevelSegments={5}
					material={material}
				>
					{'YOD'}
				</Text3D>
			</group>
		</>
	)
}

export default Logo
