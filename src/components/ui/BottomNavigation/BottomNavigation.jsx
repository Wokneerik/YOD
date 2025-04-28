import React from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

const BottomNavigation = ({ link, disabled = false }) => {
	return (
		<div className='bottom-nav'>
			{disabled ? (
				<button className='next-button disabled' disabled>
					NEXT
				</button>
			) : (
				<Link to={link} className='next-button'>
					NEXT
				</Link>
			)}
		</div>
	)
}

export default BottomNavigation
