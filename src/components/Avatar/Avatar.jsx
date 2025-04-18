import { OrbitControls } from '@react-three/drei'
import { useLoader, useThree } from '@react-three/fiber'
import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js'

import gsap from 'gsap'
import { cameraFov, cameraPosition } from '../../../constants.js'
import resetCamera from '../../utils/resetCamera'
import BackButton from '../BackButton/BackButton'
import FloorRing from '../FloorRing/FloorRing'
import SideMainButtons from '../SideMainButtons/SideMainButtons.jsx'

const Avatar = () => {
	const { scene, camera, gl } = useThree()
	const controlsRef = useRef()

	const initialTarget = new THREE.Vector3(0, 10, 0)

	const initialFov = cameraFov

	const [controlsBlocked, setControlsBlocked] = useState(false)

	const [isBackBtnVisible, setIsBackBtnVisible] = useState(false)

	const [isControlsBtnVisible, setIsControlsBtnVisible] = useState(true)

	const [brainBtnClick, setBrainBtnClick] = useState(false)
	const [faceBtnClick, setFaceBtnClick] = useState(false)

	const [bodyBtnClick, setBodyBtnClick] = useState(false)

	const human = useLoader(OBJLoader, '/public/models/Human.obj')

	useEffect(() => {
		const skinMaterial = new THREE.MeshStandardMaterial({ color: 0xffcc99 })

		human.traverse(child => {
			if (child.isMesh) {
				child.material = skinMaterial
			}
		})

		human.position.set(0, 1, 0)
		scene.add(human)

		return () => {
			scene.remove(human)
		}
	}, [])

	const cameraToFace = (targetPosition, targetLookAt, zoomLevel, targetFov) => {
		if (controlsRef.current) {
			controlsRef.current.enabled = false
		}
		setIsBackBtnVisible(true)

		gsap.killTweensOf(camera.position)
		gsap.killTweensOf(camera)

		gsap.to(camera.position, {
			x: targetPosition.x,
			y: targetPosition.y,
			z: targetPosition.z,
			duration: 1.2,
			ease: 'power1.out',
			onUpdate: () => {
				if (controlsRef.current) {
					controlsRef.current.target.lerp(targetLookAt, 0.1)
					controlsRef.current.update()
				}
			},
			onComplete: () => {
				setControlsBlocked(true)
			},
		})

		if (camera.isPerspectiveCamera) {
			gsap.to(camera, {
				fov: targetFov,
				duration: 1.2,
				ease: 'power1.out',
				onUpdate: () => camera.updateProjectionMatrix(),
			})
		} else if (camera.isOrthographicCamera) {
			gsap.to(camera, {
				zoom: zoomLevel,
				duration: 1.2,
				ease: 'power1.out',
				onUpdate: () => camera.updateProjectionMatrix(),
			})
		}
	}

	const resetCameraFunc = () =>
		resetCamera({
			camera,
			cameraPosition,
			initialTarget,
			initialFov,
			controlsRef,
			setControlsBlocked,
		})

	return (
		<>
			<OrbitControls
				ref={controlsRef}
				enabled={!controlsBlocked}
				enableZoom={false}
				enablePan={false}
				minDistance={20}
				maxDistance={60}
				target={[0, 10, 0]}
				maxPolarAngle={Math.PI / 2}
				minPolarAngle={Math.PI / 4.5}
			/>

			{isBackBtnVisible && (
				<BackButton
					setIsBackBtnVisible={setIsBackBtnVisible}
					setIsControlsBtnVisible={setIsControlsBtnVisible}
					onReset={resetCameraFunc}
					setBrainBtnClick={setBrainBtnClick}
					setFaceBtnClick={setFaceBtnClick}
					setBodyBtnClick={setBodyBtnClick}
				/>
			)}

			{isControlsBtnVisible && (
				<SideMainButtons
					onButtonClick={cameraToFace}
					setIsControlsBtnVisible={setIsControlsBtnVisible}
					setBrainBtnClick={setBrainBtnClick}
					setFaceBtnClick={setFaceBtnClick}
					setBodyBtnClick={setBodyBtnClick}
				/>
			)}
			<FloorRing />
		</>
	)
}

export default Avatar
