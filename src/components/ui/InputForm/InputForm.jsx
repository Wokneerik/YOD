import React from 'react'
import './styles.css'

const InputForm = ({ title, measuredAs, icon: Icon }) => {
	return (
		<div className='input-wrapper'>
			{Icon && (
				<Icon className='input-icon' color='#454545' strokeWidth={1.75} />
			)}
			<input className='ui-input' placeholder={title} />
			{measuredAs && <span className='measured-as'>{measuredAs}</span>}
		</div>
	)
}

export default InputForm
