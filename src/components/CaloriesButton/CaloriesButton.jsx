import { useState } from 'react'
import { useSelector } from 'react-redux'
import './style.css'

const CaloriesButton = () => {
	const [isCaloriesOpen, setIsCaloriesOpen] = useState(false)

	const handleButtonClick = () => {
		setIsCaloriesOpen(prev => !prev)
	}

	const { showHealthConditionButton } = useSelector(state => state.stateCheck)

	return (
		<>
			{showHealthConditionButton && (
				<div
					className={`calories-button ${
						isCaloriesOpen ? 'showing-calories-close' : 'showing-calories-btn'
					}`}
					onClick={handleButtonClick}
					style={{ zIndex: isCaloriesOpen ? 999999 : 9997 }}
				>
					<div className='calories-button-label'>calories</div>
				</div>
			)}

			<div
				className={`calories-overlay ${isCaloriesOpen ? 'active' : ''}`}
			></div>
		</>
	)
}

export default CaloriesButton
