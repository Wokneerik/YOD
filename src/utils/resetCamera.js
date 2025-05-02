import { gsap } from 'gsap'
import { cameraFov, cameraPosition, initialTarget } from '../../constants'
import { setIsControlsBlocked } from '../store/controls.slice'

const resetCamera = (camera, controlsRef, dispatch) => {
	const currentTarget = controlsRef.current.target.clone()

	gsap.to(currentTarget, {
		x: initialTarget.x,
		y: initialTarget.y,
		z: initialTarget.z,
		duration: 1,
		ease: 'power1.out',
		onUpdate: () => {
			if (controlsRef.current) {
				controlsRef.current.target.copy(currentTarget)
				controlsRef.current.update()
			}
		},
	})

	gsap.to(camera.position, {
		x: cameraPosition.x,
		y: cameraPosition.y,
		z: cameraPosition.z,
		duration: 1,
		ease: 'power1.out',
		onUpdate: () => {
			if (controlsRef.current) {
				controlsRef.current.update()
			}
		},
		onComplete: () => {
			dispatch(setIsControlsBlocked(false))
		},
	})

	if (camera.isPerspectiveCamera) {
		gsap.to(camera, {
			fov: cameraFov,
			duration: 1,
			ease: 'power1.out',
			onUpdate: () => camera.updateProjectionMatrix(),
		})
	}
}

export default resetCamera
