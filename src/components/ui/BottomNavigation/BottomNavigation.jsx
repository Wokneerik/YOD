import React from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

const BottomNavigation = ({ link }) => {
	return (
		<div className='bottom-nav'>
			<Link to={link} className='next-button'>
				NEXT
			</Link>
		</div>
	)
}

export default BottomNavigation
