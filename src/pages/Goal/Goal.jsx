import { getAuth } from 'firebase/auth'
import { BicepsFlexed, MoveDownRight, RulerDimensionLine } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BackButton from '../../components/ui/BackButton/BackButton'
import BottomNavigation from '../../components/ui/BottomNavigation/BottomNavigation'
import Button from '../../components/ui/Button/Button'
import ProgressBar from '../../components/ui/ProgressBar/ProgressBar'
import { saveUserDataToFirestore, setGoal } from '../../store/user-data.slice'
import './styles.css'

const Goal = () => {
	const [selectedGaol, setSelectedGoal] = useState('')

	const navigate = useNavigate()

	const isFormValid = selectedGaol !== ''

	const dispatch = useDispatch()

	const auth = getAuth()

	const { goal: savedGoal } = useSelector(state => state.userData)

	const currentUser = auth.currentUser

	useEffect(() => {
		// If no user is logged in, redirect to sign in

		// if (!currentUser) {
		//   navigate('/');
		// }

		// If there's saved sex in Redux, use it
		if (savedGoal) {
			setSelectedGoal(savedGoal)
		}
	}, [currentUser, savedGoal])

	const handleGoalSelection = goal => {
		setSelectedGoal(goal)
		dispatch(setGoal(goal))

		// Save to Firestore if user is authenticated
		if (currentUser) {
			dispatch(
				saveUserDataToFirestore({
					userId: currentUser.uid,
					userData: { goal },
				})
			)
		}
	}

	return (
		<div className='goal-container'>
			{/* Header */}
			<div className='goal-header'>
				<div>
					<BackButton />
				</div>
				<ProgressBar progress={80} />
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
						onClick={() => handleGoalSelection('bulk')}
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
						onClick={() => handleGoalSelection('cut')}
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
						onClick={() => handleGoalSelection('maintain')}
					/>
				</div>

				<p className='goal-text'>
					Pick the goal that best fits your lifestyle. You can always change it
					later.
				</p>
			</div>

			{/* Bottom Navigation */}

			<BottomNavigation
				disabled={!isFormValid}
				onClick={() => {
					if (isFormValid) {
						saveUserDataToFirestore()
						navigate('/skin-color')
					}
				}}
			/>
		</div>
	)
}

export default Goal
