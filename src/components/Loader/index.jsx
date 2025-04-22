import { Center, Text3D } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import gsap from 'gsap'
import React, { useEffect, useRef } from 'react'
import font from '/src/fonts/Inter_Bold.json'

const Loader = () => {
	const centerRef = useRef()

	useEffect(() => {
		const timer = setTimeout(() => {
			gsap.to(centerRef.current.rotation, {
				y: Math.PI * 2,
				duration: 0.9,
				ease: 'power2.inOut',
			})
		}, 200)

		return () => clearTimeout(timer)
	}, [])

	return (
		<Canvas
			style={{
				position: 'absolute',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)',
				width: '100vw',
				height: '100vh',
				zIndex: 999991,
				background: 'linear-gradient(0deg, #d9afd9 0%, #97d9e1 100%)',
			}}
			camera={{ position: [0, 0, 5], fov: 50 }}
		>
			<ambientLight intensity={0.8} />
			<directionalLight position={[5, 5, 5]} intensity={1} />

			<Center ref={centerRef} rotation={[-0.5, -0.2, 0]}>
				<Text3D
					font={font}
					size={0.5}
					height={0.2}
					curveSegments={12}
					bevelEnabled={true}
					bevelThickness={0.03}
					bevelSize={0.02}
					bevelSegments={5}
				>
					{'YOD'}
					<meshNormalMaterial />
				</Text3D>
			</Center>
		</Canvas>
	)
}

export default Loader
