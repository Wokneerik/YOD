import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import React, { useRef, useState } from 'react'

import * as THREE from 'three'
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js'
import ProgressBar from '../../components/ui/ProgressBar/ProgressBar'

import { Environment, OrbitControls } from '@react-three/drei'
import BackButton from '../../components/ui/BackButton/BackButton'
import BottomNavigation from '../../components/ui/BottomNavigation/BottomNavigation'
import './styles.css'

const SkinColor = () => {
	const [skinColor, setSkinColor] = useState('#F2C48F')

	const handleColorChange = color => {
		setSkinColor(color)
	}

	const skinColors = [
		'#F4D4BB',
		'#F2C48F',
		'#D19554',
		'#AE703A',
		'#845225',
		'#2F1E11',
	]

	return (
		<div className='skin-color-container'>
			{/* Header */}
			<div className='skin-color-header'>
				<div>
					<BackButton />
				</div>
				<ProgressBar progress={100} />
			</div>

			{/* Main Content */}
			<div className='skin-color-main-content'>
				<h1 className='skin-color-title'>Let's customize your avatar</h1>

				<Canvas
					style={{
						width: '100%',
						height: '250px',
					}}
					camera={{ position: [0, 28, 7], fov: 45 }}
				>
					<ambientLight intensity={0.1} />
					<directionalLight
						position={[10, 40, 10]}
						intensity={0.8}
						color='#ffffff'
					/>
					<directionalLight
						position={[-10, 40, -10]}
						intensity={0.4}
						color='#ffffee'
					/>

					{/* Add environment lighting for better realism */}
					<Environment preset='studio' />
					<SceneContent skinColor={skinColor} />

					<OrbitControls
						minPolarAngle={Math.PI / 3}
						target={[0, 16, 0]}
						maxPolarAngle={Math.PI / 3}
						enableZoom={false}
						enablePan={false}
					/>
				</Canvas>

				<p className='skin-color-text'>Pick a color.</p>

				{/* Color Palette */}
				<div className='color-palette'>
					{skinColors.map(color => (
						<button
							key={color}
							onClick={() => handleColorChange(color)}
							className='color-button'
							style={{
								backgroundColor: color,
							}}
						/>
					))}
				</div>
			</div>

			{/* Bottom Navigation */}

			<BottomNavigation link={'/'} />
		</div>
	)
}

const SceneContent = ({ skinColor }) => {
	const humanObj = useLoader(OBJLoader, '/models/Human.obj')
	const groupRef = useRef()

	useFrame(() => {
		if (groupRef.current) {
			groupRef.current.traverse(child => {
				if (child.isMesh) {
					if (
						!child.material ||
						!(child.material instanceof THREE.MeshStandardMaterial)
					) {
						child.material = new THREE.MeshStandardMaterial({
							color: skinColor,
							roughness: 0.9, // More skin-like roughness
							metalness: 0.1, // Very slight sheen
							envMapIntensity: 0.4,
						})
					} else {
						child.material.color.set(skinColor)
					}
				}
			})
		}
	})

	return (
		<>
			<group ref={groupRef} position={[0, 0, 0]} rotation={[0, 0, 0]}>
				<primitive object={humanObj.clone()} />
			</group>
		</>
	)
}

export default SkinColor
