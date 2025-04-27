import React from 'react'
import BackButton from '../../components/ui/BackButton/BackButton'
import ProgressBar from '../../components/ui/ProgressBar/ProgressBar'

import { Ruler, Weight } from 'lucide-react'
import { Link } from 'react-router-dom'
import InputForm from '../../components/ui/InputForm/InputForm'
import './styles.css'

const HeightWeight = () => {
	return (
		<div className='height-weight-container'>
			{/* Header */}
			<div className='height-weight-header'>
				<div>
					<BackButton />
				</div>
				<ProgressBar progress={50} />
			</div>

			{/* Main Content */}
			<div className='height-weight-main-content'>
				<h1 className='height-weight-title'>What is your height and weight?</h1>

				<div className='height-weight-input-container'>
					<InputForm title={'Height'} measuredAs={'ft'} icon={Ruler} />
					<InputForm title={'Weight'} measuredAs={'lbs'} icon={Weight} />
				</div>

				<p className='sex-text'>We need this to calculate your BMI</p>
			</div>

			{/* Bottom Navigation */}
			<div className='height-weight-bottom-nav'>
				<div className='flex justify-center'>
					<Link to='/goal' className='next-button'>
						NEXT
					</Link>
				</div>
			</div>
		</div>
	)
}

export default HeightWeight
