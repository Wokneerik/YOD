import { BicepsFlexed, MoveDownRight, RulerDimensionLine } from 'lucide-react'
import React, { useState } from 'react'
import BackButton from '../../components/ui/BackButton/BackButton'
import BottomNavigation from '../../components/ui/BottomNavigation/BottomNavigation'
import Button from '../../components/ui/Button/Button'
import ProgressBar from '../../components/ui/ProgressBar/ProgressBar'
import './styles.css'

const Goal = () => {
	const [selectedGaol, setSelectedGoal] = useState('')

	return (
		<div className='goal-container'>
			{/* Header */}
			<div className='goal-header'>
				<div>
					<BackButton />
				</div>
				<ProgressBar progress={75} />
			</div>

			{/* Main Content */}
			<div className='goal-main-content'>
				<h1 className='goal-title'>What is your goal?</h1>

				<div className='goal-button-container'>
					<Button
						color={selectedGaol === 'bulk' ? '#c2f2f8' : 'white'}
						text={
							<>
								<BicepsFlexed
									color='#454545'
									strokeWidth={1.75}
									className='icon-goal'
								/>
								Bulk
							</>
						}
						onClick={() => setSelectedGoal('bulk')}
					/>
					<Button
						color={selectedGaol === 'cut' ? '#c2f2f8' : 'white'}
						text={
							<>
								<MoveDownRight
									color='#454545'
									strokeWidth={1.75}
									className='icon-goal'
								/>
								Cut
							</>
						}
						onClick={() => setSelectedGoal('cut')}
					/>

					<Button
						color={selectedGaol === 'maintain' ? '#c2f2f8' : 'white'}
						text={
							<>
								<RulerDimensionLine
									color='#454545'
									strokeWidth={1.75}
									className='icon-goal'
								/>
								Maintain
							</>
						}
						onClick={() => setSelectedGoal('maintain')}
					/>
				</div>

				<p className='goal-text'>
					Pick the goal that best fits your lifestyle. You can always change it
					later.
				</p>
			</div>

			{/* Bottom Navigation */}
			<BottomNavigation link={'/skin-color'} />
		</div>
	)
}

export default Goal
