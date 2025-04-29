import { getAuth } from 'firebase/auth'
import { Mars, Venus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BackButton from '../../components/ui/BackButton/BackButton'
import BottomNavigation from '../../components/ui/BottomNavigation/BottomNavigation'
import Button from '../../components/ui/Button/Button'
import ProgressBar from '../../components/ui/ProgressBar/ProgressBar'
import { saveUserDataToFirestore, setSex } from '../../store/user-data.slice'
import './styles.css'

const Sex = () => {
	const [selectedSex, setSelectedSex] = useState('')

	const navigate = useNavigate()

	const isFormValid = selectedSex !== ''

	const dispatch = useDispatch()

	const auth = getAuth()

	const { sex: savedSex } = useSelector(state => state.userData)

	const currentUser = auth.currentUser

	useEffect(() => {
		// If no user is logged in, redirect to sign in

		// if (!currentUser) {
		//   navigate('/');
		// }

		// If there's saved sex in Redux, use it
		if (savedSex) {
			setSelectedSex(savedSex)
		}
	}, [currentUser, savedSex])

	const handleSexSelection = sex => {
		setSelectedSex(sex)
		dispatch(setSex(sex))

		// Save to Firestore if user is authenticated
		if (currentUser) {
			dispatch(
				saveUserDataToFirestore({
					userId: currentUser.uid,
					userData: { sex },
				})
			)
		}
	}

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
						onClick={() => handleSexSelection('male')}
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
						onClick={() => handleSexSelection('female')}
						className={selectedSex === 'female' ? 'selected-female-button' : ''}
					/>
				</div>

				<p className='sex-text'>
					Your sex impacts key body metrics. We use this data to provide content
					tailored to you.
				</p>
			</div>

			{/* Bottom Navigation */}
			<BottomNavigation
				disabled={!isFormValid}
				onClick={() => {
					if (isFormValid) {
						saveUserDataToFirestore()
						navigate('/height-weight')
					}
				}}
			/>
		</div>
	)
}

export default Sex
