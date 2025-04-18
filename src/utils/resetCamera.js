import { gsap } from 'gsap'

const resetCamera = ({
	camera,
	cameraPosition,
	initialTarget,
	initialFov,
	controlsRef,
	setControlsBlocked,
}) => {
	// Создаем временный вектор для анимации target
	const currentTarget = controlsRef.current.target.clone()

	// Анимируем target отдельно
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

	// Анимируем position камеры
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
			setControlsBlocked(false)
		},
	})

	// Анимируем FOV если это перспективная камера
	if (camera.isPerspectiveCamera) {
		gsap.to(camera, {
			fov: initialFov,
			duration: 1,
			ease: 'power1.out',
			onUpdate: () => camera.updateProjectionMatrix(),
		})
	}
}

export default resetCamera
