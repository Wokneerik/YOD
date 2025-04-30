import React, { useEffect, useState } from 'react'
import './styles.css'

const InputForm = ({
	title,
	icon: Icon,
	onChange,
	error,
	value: initialValue = '',
}) => {
	const [value, setValue] = useState(initialValue)

	useEffect(() => {
		setValue(initialValue)
	}, [initialValue])

	const handleChange = event => {
		setValue(event.target.value)

		if (onChange) {
			onChange(event)
		}
	}

	return (
		<div className='input-wrapper'>
			{Icon && (
				<Icon className='input-icon' color='#454545' strokeWidth={1.75} />
			)}
			<input
				className='ui-input'
				placeholder={title}
				value={value}
				onChange={handleChange}
			/>
			{error && <div className='error-message-input'>{error}</div>}{' '}
		</div>
	)
}

export default InputForm
