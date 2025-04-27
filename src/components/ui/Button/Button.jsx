import React from 'react'
import './styles.css'

const Button = ({ color, text, onClick }) => {
	const buttonStyle = {
		backgroundColor: color,
	}

	return (
		<button className='ui-button' style={buttonStyle} onClick={onClick}>
			{text}
		</button>
	)
}

export default Button
