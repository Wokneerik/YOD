import React, { useEffect, useState } from 'react'

const SideButton = ({
	config,
	onButtonClick,
	setIsControlsBtnVisible,
	setFaceBtnClick,
	setBrainBtnClick,
	setBodyBtnClick,
}) => {
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		const timer = setTimeout(() => setIsVisible(true), 200)
		return () => clearTimeout(timer)
	}, [])

	const handleClick = () => {
		onButtonClick(config.position, config.lookAt, config.zoom, config.targetFov)
		setIsControlsBtnVisible(false)

		if (config.index === 0) {
			setFaceBtnClick(true)
		} else if (config.index === 1) {
			setBrainBtnClick(true)
		} else if (config.index === 2) {
			setBodyBtnClick(true)
		}
	}

	return (
		<div
			className={`control-button-container ${isVisible ? 'show' : ''}`}
			style={{
				left: '20px',
				alignItems: 'center',
				zIndex: 9997,
			}}
			onClick={handleClick}
		>
			<div
				className='control-button'
				style={{
					width: '50px',
					height: '50px',
					border: '7px solid white',
					borderRadius: '50%',
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
					cursor: 'pointer',
					backgroundImage: `url(${config.imagePath})`,
				}}
			/>
			<div
				className='control-button-label'
				style={{
					fontSize: '11px',
					color: 'white',
					textAlign: 'center',
				}}
			>
				{config.label}
			</div>
		</div>
	)
}

export default SideButton
