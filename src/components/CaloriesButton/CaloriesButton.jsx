import { useState } from 'react'
import './style.css'

const CaloriesButton = () => {
	const [isCaloriesOpen, setIsCaloriesOpen] = useState(false)

	const handleButtonClick = () => {
		setIsCaloriesOpen(prev => !prev)
	}

	return (
		<>
			<div
				className={`calories-button ${
					isCaloriesOpen ? 'showing-calories-close' : 'showing-calories-btn'
				}`}
				onClick={handleButtonClick}
				style={{ zIndex: isCaloriesOpen ? 999999 : 9997 }}
			>
				<div className='calories-button-label'>calories</div>
			</div>

			<div
				className={`calories-overlay ${isCaloriesOpen ? 'active' : ''}`}
			></div>
		</>
	)
}

export default CaloriesButton
