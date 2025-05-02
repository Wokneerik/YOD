import { getAuth } from 'firebase/auth'
import { BicepsFlexed, MoveDownRight, RulerDimensionLine } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import BackButton from '../../components/ui/BackButton/BackButton'
import BottomNavigation from '../../components/ui/BottomNavigation/BottomNavigation'
import Button from '../../components/ui/Button/Button'
import ProgressBar from '../../components/ui/ProgressBar/ProgressBar'
import { saveUserDataToFirestore, setGoal } from '../../store/user-data.slice'
import './styles.css'

const Goal = () => {
	const [selectedGoal, setSelectedGoal] = useState('')

	const navigate = useNavigate()
	const location = useLocation()
	const dispatch = useDispatch()
	const auth = getAuth()

	// Check if we're in "edit mode" - this is true if navigating from PersonalCard
	const isEditMode = location.state?.fromPersonalCard || false

	const { goal: savedGoal } = useSelector(state => state.userData)
	const currentUser = auth.currentUser

	const isFormValid = selectedGoal !== ''

	useEffect(() => {
		// If there's saved goal in Redux, use it
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

	const handleBottomNavigationClick = () => {
		if (isFormValid) {
			// Save to Firestore
			if (currentUser) {
				dispatch(
					saveUserDataToFirestore({
						userId: currentUser.uid,
						userData: { goal: selectedGoal },
					})
				)
			}

			// If in edit mode, go back to previous page
			// Otherwise continue with the registration flow
			if (isEditMode) {
				navigate(-1) // Go back to where user came from
			} else {
				navigate('/customize') // Continue with registration flow
			}
		}
	}

	return (
		<div className='goal-container'>
			{/* Header */}
			<div className='goal-header'>
				<div>
					<BackButton />
				</div>
				{!isEditMode && <ProgressBar progress={80} />}
			</div>

			{/* Main Content */}
			<div className='goal-main-content'>
				<h1 className='goal-title'>What is your goal?</h1>

				<div className='goal-button-container'>
					<Button
						color={selectedGoal === 'bulk' ? '#c2f2f8' : 'white'}
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
						color={selectedGoal === 'cut' ? '#c2f2f8' : 'white'}
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
						color={selectedGoal === 'maintain' ? '#c2f2f8' : 'white'}
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
				buttonText={isEditMode ? 'SAVE' : 'NEXT'}
				isEdit={isEditMode}
				onClick={handleBottomNavigationClick}
			/>
		</div>
	)
}

export default Goal
