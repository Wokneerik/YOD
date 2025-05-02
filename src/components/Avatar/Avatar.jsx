import { OrbitControls, useGLTF } from '@react-three/drei'
import React, { useEffect, useRef, useState } from 'react'

import BackButton from '../BackButton/BackButton'

import { useDispatch, useSelector } from 'react-redux'
import { UserAuth } from '../../context/AuthContext.jsx'
import { loadUserDataFromFirestore } from '../../store/user-data.slice.js'

import { defaultSkinColor } from '../../../constants.js'
import SideMainButtons from '../SideMainButtons/SideMainButtons.jsx'

const Avatar = ({ ...props }) => {
	const controlsRef = useRef()

	const dispatch = useDispatch()

	const { isControlsBlocked, isBackBtnVisible, isControlsBtnVisible } =
		useSelector(state => state.controls)

	const { user } = UserAuth()
	const uid = user?.uid

	const [isAuthenticated, setIsAuthenticated] = useState(!!uid)

	useEffect(() => {
		setIsAuthenticated(!!uid)
		if (uid) {
			dispatch(loadUserDataFromFirestore(uid))
		}
	}, [uid])

	const userData = useSelector(state => state.userData)

	const sex = isAuthenticated ? userData.sex : 'male'
	const skinColor = isAuthenticated ? userData.skinColor : null

	const { nodes } = useGLTF(
		sex === 'male' ? './models/Male.glb' : './models/Female.glb'
	)

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

			{isBackBtnVisible && <BackButton controlsRef={controlsRef} />}

			{isControlsBtnVisible && <SideMainButtons controlsRef={controlsRef} />}
			{sex && (
				<group {...props} dispose={null}>
					<mesh
						castShadow
						receiveShadow
						geometry={nodes.Node1.geometry}
						scale={sex === 'male' ? 1 : 11}
						position={[0, 1, 0]}
					>
						<meshStandardMaterial
							color={skinColor ? skinColor : defaultSkinColor}
							roughness={0.9}
							metalness={0.1}
							envMapIntensity={0.4}
						/>
					</mesh>
				</group>
			)}
		</>
	)
}

export default Avatar
