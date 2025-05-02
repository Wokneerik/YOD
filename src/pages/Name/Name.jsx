import { getAuth } from 'firebase/auth'
import { UserRoundPen } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import BackButton from '../../components/ui/BackButton/BackButton'
import BottomNavigation from '../../components/ui/BottomNavigation/BottomNavigation'
import InputForm from '../../components/ui/InputForm/InputForm'
import ProgressBar from '../../components/ui/ProgressBar/ProgressBar'
import { saveUserDataToFirestore, setName } from '../../store/user-data.slice'
import './styles.css'

const Name = () => {
	const [selectedName, setSelectedName] = useState('')

	const navigate = useNavigate()
	const location = useLocation()
	const dispatch = useDispatch()
	const auth = getAuth()

	const isEditMode = location.state?.fromPersonalCard || false

	const { name: savedName } = useSelector(state => state.userData)

	const isFormValid = selectedName !== ''

	const currentUser = auth.currentUser

	useEffect(() => {
		if (savedName) {
			setSelectedName(savedName)
		}
	}, [currentUser, savedName])

	const handleNameChange = event => {
		const newName = event.target.value
		setSelectedName(newName)
		dispatch(setName(newName))

		// Save to Firestore whenever the name changes and user is logged in
		if (currentUser) {
			dispatch(
				saveUserDataToFirestore({
					userId: currentUser.uid,
					userData: { name: newName },
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
						userData: { name: selectedName },
					})
				)
			}

			// If in edit mode, go back to previous page
			// Otherwise continue with the registration flow
			if (isEditMode) {
				navigate(-1) // Go back to where user came from
			} else {
				navigate('/sex') // Continue with registration flow
			}
		}
	}

	return (
		<div className='name-container'>
			{/* Header */}
			<div className='name-header'>
				<div>
					<BackButton />
				</div>
				{!isEditMode && <ProgressBar progress={20} />}
			</div>

			{/* Main Content */}
			<div className='name-main-content'>
				<h1 className='name-title'>What is your name?</h1>

				<div className='name-input-container'>
					<InputForm
						title={'Name'}
						icon={UserRoundPen}
						value={selectedName}
						onChange={handleNameChange}
					/>
				</div>
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

export default Name
