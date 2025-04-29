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
import { UserAuth } from '../../context/AuthContext.jsx'
import {
	setIsBackBtnVisible,
	setIsControlsBlocked,
} from '../../store/controls.slice.js'
import { loadUserDataFromFirestore } from '../../store/user-data.slice.js'

import EnergyCapsule from '../EnergyCapsule/EnergyCapsule.jsx'
import EnergySegment from '../EnergySegment/EnergySegment.jsx'
import FloorRing from '../FloorRing/FloorRing'
import SideMainButtons from '../SideMainButtons/SideMainButtons.jsx'

const Avatar = () => {
	const { scene, camera } = useThree()
	const controlsRef = useRef()

	const initialTarget = new THREE.Vector3(0, 10, 0)

	const initialFov = cameraFov

	const dispatch = useDispatch()

	const { isControlsBlocked, isBackBtnVisible, isControlsBtnVisible } =
		useSelector(state => state.controls)

	const [breathBtnClick, setBreathBtnClick] = useState(false)
	const [faceBtnClick, setFaceBtnClick] = useState(false)

	const [bodyBtnClick, setBodyBtnClick] = useState(false)

	const human = useLoader(OBJLoader, './models/Human.obj')

	const { user } = UserAuth()
	const uid = user?.uid

	useEffect(() => {
		// Load user data when the component mounts and when the user ID changes
		if (uid) {
			dispatch(loadUserDataFromFirestore(uid))
		}
	}, [uid])

	const { skinColor } = useSelector(state => state.userData)

	const defaultSkinColor = '#F5C6A5'

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
		human.traverse(child => {
			if (child.isMesh) {
				child.material = new THREE.MeshStandardMaterial({
					color: skinColor ? skinColor : defaultSkinColor,
					roughness: 0.9, // More skin-like roughness
					metalness: 0.1, // Very slight sheen
					envMapIntensity: 0.4,
				})
			}
		})

		human.position.set(0, 1, 0)
		scene.add(human)

		return () => {
			scene.remove(human)
		}
	}, [skinColor])

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
					setBreathBtnClick={setBreathBtnClick}
					setFaceBtnClick={setFaceBtnClick}
					setBodyBtnClick={setBodyBtnClick}
				/>
			)}

			{isControlsBtnVisible && (
				<SideMainButtons
					onButtonClick={cameraToBodyPart}
					setBreathBtnClick={setBreathBtnClick}
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
