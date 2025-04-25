import { OrbitControls } from '@react-three/drei'
import { useLoader, useThree } from '@react-three/fiber'
import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js'

import gsap from 'gsap'
import { cameraFov, cameraPosition } from '../../../constants.js'
import resetCamera from '../../utils/resetCamera'
import BackButton from '../BackButton/BackButton'

import { useDispatch, useSelector } from 'react-redux'
import {
	setIsBackBtnVisible,
	setIsControlsBlocked,
} from '../../store/controls.slice.js'
import EnergyCapsule from '../EnergyCapsule/EnergyCapsule.jsx'
import EnergySegment from '../EnergySegment/EnergySegment.jsx'
import FloorRing from '../FloorRing/FloorRing'
import SideMainButtons from '../SideMainButtons/SideMainButtons.jsx'

const Avatar = () => {
	const { scene, camera, gl } = useThree()
	const controlsRef = useRef()

	const initialTarget = new THREE.Vector3(0, 10, 0)

	const initialFov = cameraFov

	const dispatch = useDispatch()

	const { isControlsBlocked, isBackBtnVisible, isControlsBtnVisible } =
		useSelector(state => state.controls)

	const [brainBtnClick, setBrainBtnClick] = useState(false)
	const [faceBtnClick, setFaceBtnClick] = useState(false)

	const [bodyBtnClick, setBodyBtnClick] = useState(false)

	const human = useLoader(OBJLoader, './models/Human.obj')

	const cameraToBodyPart = (
		targetPosition,
		targetLookAt,
		zoomLevel,
		targetFov
	) => {
		if (controlsRef.current) {
			controlsRef.current.enabled = false
		}
		dispatch(setIsBackBtnVisible(true))

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
				dispatch(setIsControlsBlocked(true))
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
			dispatch,
		})

	useEffect(() => {
		const skinMaterial = new THREE.MeshStandardMaterial({
			color: 0xffcc99,
			// transparent: true,
			// opacity: 0.5,
		})

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

	return (
		<>
			<OrbitControls
				ref={controlsRef}
				enabled={!isControlsBlocked}
				enableZoom={false}
				enablePan={false}
				minDistance={20}
				maxDistance={60}
				target={[0, 10, 0]}
				maxPolarAngle={Math.PI / 2.3}
				minPolarAngle={Math.PI / 4.5}
			/>

			{isBackBtnVisible && (
				<BackButton
					onReset={resetCameraFunc}
					setBrainBtnClick={setBrainBtnClick}
					setFaceBtnClick={setFaceBtnClick}
					setBodyBtnClick={setBodyBtnClick}
				/>
			)}

			{isControlsBtnVisible && (
				<SideMainButtons
					onButtonClick={cameraToBodyPart}
					setBrainBtnClick={setBrainBtnClick}
					setFaceBtnClick={setFaceBtnClick}
					setBodyBtnClick={setBodyBtnClick}
				/>
			)}
			<FloorRing />
			<EnergySegment />
			<EnergyCapsule />
		</>
	)
}

export default Avatar
