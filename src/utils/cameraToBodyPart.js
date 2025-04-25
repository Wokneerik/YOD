import { useThree } from '@react-three/fiber'
import gsap from 'gsap'

const cameraToBodyPart = (
	targetPosition,
	targetLookAt,
	zoomLevel,
	targetFov
) => {
	const { camera } = useThree()

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

export default cameraToBodyPart
