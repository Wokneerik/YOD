import React from 'react'
import './styles.css'

const NumericInputForm = ({
	title,
	measuredAs,
	icon: Icon,
	name,
	min = 0,
	max = 999,
	formik,
}) => {
	const handleChange = e => {
		const value = e.target.value

		if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
			if (
				value === '' ||
				(parseFloat(value) >= min && parseFloat(value) <= max)
			) {
				formik.setFieldValue(name, value)
			}
		}
	}

	return (
		<div className='numeric-input-wrapper'>
			<div className='input-field-container'>
				{Icon && (
					<Icon className='input-icon' color='#454545' strokeWidth={1.75} />
				)}
				<input
					type='text'
					name={name}
					placeholder={title}
					value={formik.values[name]}
					onChange={handleChange}
					onBlur={formik.handleBlur}
					className={`ui-input ${
						formik.touched[name] && formik.errors[name] ? 'input-error' : ''
					}`}
					inputMode='decimal'
				/>
				{measuredAs && <span className='measured-as'>{measuredAs}</span>}
			</div>
			{formik.touched[name] && formik.errors[name] && (
				<div className='input-error-message'>{formik.errors[name]}</div>
			)}
		</div>
	)
}

export default NumericInputForm
