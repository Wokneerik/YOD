import { ChevronLeft } from 'lucide-react'
import React from 'react'
import './styles.css'

const BackButton = () => {
	const handleGoBack = () => {
		window.history.back()
	}

	return (
		<button className='ui-back-button' onClick={handleGoBack}>
			<ChevronLeft
				color='#454545'
				strokeWidth={1.75}
				className='chevron-left'
			/>
		</button>
	)
}

export default BackButton
