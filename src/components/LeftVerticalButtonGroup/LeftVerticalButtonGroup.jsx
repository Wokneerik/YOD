// LeftVerticalButtonGroup.jsx
import React from 'react'

const LeftVerticalButtonGroup = ({ children }) => {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'flex-start', // Align items to the left horizontally
				justifyContent: 'center', // Center items vertically in the container
				height: '100vh', // Or any other desired container height
				position: 'fixed', // To keep it on the left side during scrolling, if needed
				left: 0,
				top: 0,
				width: 'auto', // Adjust width as needed
				padding: '20px', // Optional padding
			}}
		>
			{children}
		</div>
	)
}

export default LeftVerticalButtonGroup
