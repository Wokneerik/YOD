import { Center, Text3D } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import gsap from 'gsap'
import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './styles.css'
import font from '/src/fonts/Inter_Bold.json'

const Welcome = () => {
	const centerRef = useRef()

	useEffect(() => {
		const timer = setTimeout(() => {
			if (centerRef.current) {
				const tl = gsap.timeline({
					repeat: -1,
					repeatDelay: 2.5,
				})

				tl.to(centerRef.current.rotation, {
					y: Math.PI * 2,
					duration: 1.1,
					ease: 'power2.inOut',
				})

				return () => {
					tl.kill()
				}
			}
		}, 200)

		return () => clearTimeout(timer)
	}, [])

	return (
		<div className='welcome-container'>
			<h1 className='welcome-text'>Welcome to</h1>
			<div className='canvas-container'>
				<Canvas
					style={{
						width: '100vw',
						height: '250px',
						background: 'linear-gradient(0deg, #d9afd9 0%, #97d9e1 100%)',
					}}
					camera={{ position: [0, 0, 5], fov: 50 }}
				>
					<ambientLight intensity={0.8} />
					<directionalLight position={[5, 5, 5]} intensity={1} />

					<Center
						ref={centerRef}
						position={[-0.2, 0, 0]}
						rotation={[-0.5, -0.2, 0]}
					>
						<Text3D
							font={font}
							size={2}
							height={0.35}
							curveSegments={12}
							bevelEnabled={true}
							bevelThickness={0.18}
							bevelSize={0.02}
							bevelSegments={5}
						>
							{'YOD'}
							<meshNormalMaterial />
						</Text3D>
					</Center>
				</Canvas>
			</div>
			<p className='personalize-text'>Let's personalize your plan</p>
			<p className='description-text'>
				To personalize your health journey with YOD, we'll need some information
				like your gender, weight, height, and goals. This data is key to
				tailoring your experience and is integral to our services. You can
				manage your preferences in your profile.
			</p>
			<Link to='/' className='start-button'>
				Get started
			</Link>
		</div>
	)
}

export default Welcome
