import { getAuth } from 'firebase/auth'
import { UserRoundPen } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BackButton from '../../components/ui/BackButton/BackButton'
import BottomNavigation from '../../components/ui/BottomNavigation/BottomNavigation'
import InputForm from '../../components/ui/InputForm/InputForm'
import ProgressBar from '../../components/ui/ProgressBar/ProgressBar'
import { saveUserDataToFirestore, setName } from '../../store/user-data.slice'
import './styles.css'

const Name = () => {
	const [selectedName, setSelectedName] = useState('')

	const navigate = useNavigate()

	const isFormValid = selectedName !== ''

	const dispatch = useDispatch()

	const auth = getAuth()

	const { name: savedName } = useSelector(state => state.userData)

	const currentUser = auth.currentUser

	useEffect(() => {
		// If no user is logged in, redirect to sign in

		// if (!currentUser) {
		//   navigate('/');
		// }

		// If there's saved sex in Redux, use it
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

	return (
		<div className='name-container'>
			{/* Header */}
			<div className='name-header'>
				<div>
					<BackButton />
				</div>
				<ProgressBar progress={20} />
			</div>

			{/* Main Content */}
			<div className='name-main-content'>
				<h1 className='name-title'>What is your name?</h1>

				<div className='name-input-container'>
					<InputForm
						title={'Name'}
						icon={UserRoundPen}
						onChange={handleNameChange}
					/>
				</div>
			</div>

			{/* Bottom Navigation */}
			<BottomNavigation
				disabled={!isFormValid}
				onClick={() => {
					if (isFormValid) {
						saveUserDataToFirestore()
						navigate('/sex')
					}
				}}
			/>
		</div>
	)
}

export default Name
