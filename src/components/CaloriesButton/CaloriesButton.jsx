import { useState } from 'react'
import { useSelector } from 'react-redux'
import './style.css'

const CaloriesButton = () => {
	const [isCaloriesOpen, setIsCaloriesOpen] = useState(false)

	const [isShutterPressed, setIsShutterPressed] = useState(false)

	const handleButtonClick = () => {
		setIsCaloriesOpen(prev => !prev)
	}

	const handleShutterPress = () => {
		setIsShutterPressed(true)
		setTimeout(() => {
			setIsShutterPressed(false)
		}, 100)
	}

	const { showHealthConditionButton } = useSelector(state => state.stateCheck)

	const { isControlsBtnVisible } = useSelector(state => state.controls)

	const nutrientButtons = [
		{ name: 'carbs', image: '/img/calories/carbs.png' },
		{ name: 'fat', image: '/img/calories/fat.png' },
		{ name: 'protein', image: '/img/calories/protein.png' },
	]

	return (
		<>
			{showHealthConditionButton && isControlsBtnVisible && (
				<div
					className={`calories-button ${
						isCaloriesOpen ? 'showing-calories-close' : 'showing-calories-btn'
					}`}
					onClick={handleButtonClick}
					style={{ zIndex: isCaloriesOpen ? 109 : 102 }}
				>
					<div className='calories-button-label'>calories</div>
				</div>
			)}

			<div className={`calories-overlay ${isCaloriesOpen ? 'active' : ''}`}>
				{isCaloriesOpen && (
					<>
						<div className='nutrient-buttons-container-top'>
							{nutrientButtons.map(button => (
								<div className='nutrient-button' key={button.name}>
									<div className='nutrient-button-outer'>
										<div
											className='nutrient-button-inner'
											style={{ backgroundImage: `url(${button.image})` }}
										></div>
									</div>
									<div className='nutrient-label'>{button.name}</div>
								</div>
							))}
						</div>
						<div className={'camera-shutter-button'}>
							<div
								className={`camera-shutter-button-inner ${
									isShutterPressed ? 'pressed' : ''
								}`}
								onClick={handleShutterPress}
							></div>
						</div>
						<div className='focus-rectangle'></div>
					</>
				)}
			</div>
		</>
	)
}

export default CaloriesButton
