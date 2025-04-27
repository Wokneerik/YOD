import { ChevronLeft } from 'lucide-react'
import React from 'react'
import './styles.css'

const BackButton = () => {
	return (
		<button className='ui-back-button' onClick={() => {}}>
			<ChevronLeft
				color='#454545'
				strokeWidth={1.75}
				className='chevron-left'
			/>
		</button>
	)
}

export default BackButton
