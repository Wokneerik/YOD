import { Preload } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { Suspense } from 'react'
import * as THREE from 'three'
import { cameraFov, cameraPosition } from '../../../constants.js'
import Avatar from '../Avatar/Avatar.jsx'
import EnergyCapsule from '../EnergyCapsule/EnergyCapsule.jsx'
import EnergySegment from '../EnergySegment/EnergySegment.jsx'
import FloorRing from '../FloorRing/FloorRing'

// UI Lazy Loading
const Account = React.lazy(() => import('../Account/Account.jsx'))
const StoreButton = React.lazy(() => import('../StoreButton/StoreButton.jsx'))
const StateCheck = React.lazy(() => import('../StateCheck/StateCheck.jsx'))
const CaloriesButton = React.lazy(() =>
	import('../CaloriesButton/CaloriesButton.jsx')
)

const Logo = React.lazy(() => import('../Logo/Logo.jsx'))

const SceneCanvas = () => {
	const near = 0.1
	const far = 5000
	const width = window.innerWidth
	const height = window.innerHeight

	const camera = new THREE.PerspectiveCamera(
		cameraFov,
		width / height,
		near,
		far
	)

	camera.position.copy(cameraPosition)

	return (
		<div
			style={{
				position: 'relative',
				width: '100%',
				height: '100%',
			}}
		>
			<Canvas
				style={{
					position: 'absolute',
					top: '-35px',
					left: '50%',
					transform: 'translateX(-50%)',
					width: '20%',
					height: '200px',
					// zIndex: 99999,
				}}
			>
				<Suspense fallback={null}>
					<Logo />
				</Suspense>
			</Canvas>

			<Suspense fallback={null}>
				<Account />
				<StateCheck />

				<CaloriesButton />
				<StoreButton />
			</Suspense>

			<Canvas camera={camera} style={{ zIndex: 100 }}>
				<Preload all />
				<ambientLight color={0x404040} intensity={1} />
				<directionalLight
					color={0xffffff}
					intensity={0.6}
					position={[0, 3, 5]}
					castShadow
				/>

				<directionalLight
					position={[3, 3, -5]}
					intensity={1.3}
					color={'#ed92ed'}
				/>
				<directionalLight
					position={[-3, 3, -5]}
					intensity={1.3}
					color={'#5adbec'}
				/>
				<hemisphereLight
					skyColor={0xffffff}
					groundColor={0x080820}
					intensity={0.7}
				/>

				<Avatar />
				<FloorRing />
				<EnergySegment />
				<EnergyCapsule />
			</Canvas>
		</div>
	)
}

export default SceneCanvas
