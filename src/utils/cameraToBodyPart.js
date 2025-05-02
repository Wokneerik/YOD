import gsap from 'gsap'
import {
	setIsBackBtnVisible,
	setIsControlsBlocked,
} from '../store/controls.slice'

const cameraToBodyPart = (
	camera,
	controlsRef,
	dispatch,
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

export default cameraToBodyPart
