import { useState } from 'react'
import './style.css'

const Account = () => {
	const [openAccPage, setOpenAccPage] = useState(false)

	const handleButtonClick = () => {
		setOpenAccPage(prev => !prev)
	}

	return (
		<>
			<div
				className={`acc-button ${
					openAccPage ? 'showing-close' : 'showing-user'
				}`}
				onClick={handleButtonClick}
				style={{ zIndex: openAccPage ? 999999 : 9997 }}
			></div>

			<div
				className={`acc-button-left ${openAccPage ? 'active' : ''}`}
				style={{ zIndex: openAccPage ? 999999 : 9989 }}
			></div>

			<div className={`acc-overlay ${openAccPage ? 'active' : ''}`}></div>
		</>
	)
}

export default Account
