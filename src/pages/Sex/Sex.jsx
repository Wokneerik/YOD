import { Mars, Venus } from 'lucide-react'
import React, { useState } from 'react'
import BackButton from '../../components/ui/BackButton/BackButton'
import BottomNavigation from '../../components/ui/BottomNavigation/BottomNavigation'
import Button from '../../components/ui/Button/Button'
import ProgressBar from '../../components/ui/ProgressBar/ProgressBar'
import './styles.css'

const Sex = () => {
	const [selectedSex, setSelectedSex] = useState('')

	const isFormValid = selectedSex !== ''

	return (
		<div className='sex-container'>
			{/* Header */}
			<div className='sex-header'>
				<div>
					<BackButton />
				</div>
				<ProgressBar progress={25} />
			</div>

			{/* Main Content */}
			<div className='sex-main-content'>
				<h1 className='sex-title'>What is your sex?</h1>

				<div className='sex-button-container'>
					<Button
						color={selectedSex === 'male' ? '#c2f2f8' : 'white'}
						text={
							<>
								<Mars color='#454545' strokeWidth={1.75} className='icon-sex' />
								Male
							</>
						}
						onClick={() => setSelectedSex('male')}
						className={selectedSex === 'male' ? 'selected-male-button' : ''}
					/>
					<Button
						color={selectedSex === 'female' ? '#c2f2f8' : 'white'}
						text={
							<>
								<Venus
									color='#454545'
									strokeWidth={1.75}
									className='icon-sex'
								/>
								Female
							</>
						}
						onClick={() => setSelectedSex('female')}
						className={selectedSex === 'female' ? 'selected-female-button' : ''}
					/>
				</div>

				<p className='sex-text'>
					Your sex impacts key body metrics. We use this data to provide content
					tailored to you.
				</p>
			</div>

			{/* Bottom Navigation */}
			<BottomNavigation link={'/height-weight'} disabled={!isFormValid} />
		</div>
	)
}

export default Sex
