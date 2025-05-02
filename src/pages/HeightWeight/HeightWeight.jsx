import { getAuth } from 'firebase/auth'
import { Form, Formik } from 'formik'
import { Ruler, Weight } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import BackButton from '../../components/ui/BackButton/BackButton'
import BottomNavigation from '../../components/ui/BottomNavigation/BottomNavigation'
import NumericInputForm from '../../components/ui/NumericInputForm/NumericInputForm'
import ProgressBar from '../../components/ui/ProgressBar/ProgressBar'
import {
	saveUserDataToFirestore,
	setHeight,
	setWeight,
} from '../../store/user-data.slice'
import './styles.css'

const HeightWeightSchema = Yup.object().shape({
	height: Yup.number()
		.typeError('Height must be a number')
		.positive('Height must be positive')
		.min(3, 'Height must be at least 3 ft')
		.max(8, 'Height must be less than 8 ft')
		.required('Height is required'),
	weight: Yup.number()
		.typeError('Weight must be a number')
		.positive('Weight must be positive')
		.min(50, 'Weight must be at least 50 lbs')
		.max(500, 'Weight must be less than 500 lbs')
		.required('Weight is required'),
})

const HeightWeight = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const dispatch = useDispatch()
	const auth = getAuth()

	// Check if we're in "edit mode" - this is true if navigating from PersonalCard
	const isEditMode = location.state?.fromPersonalCard || false

	// Get data from Redux
	const { height: savedHeight, weight: savedWeight } = useSelector(
		state => state.userData
	)

	// Get current user
	const currentUser = auth.currentUser

	// Initialize form values
	const [initialValues, setInitialValues] = useState({
		height: savedHeight || '',
		weight: savedWeight || '',
	})

	useEffect(() => {
		if (savedHeight || savedWeight) {
			setInitialValues({
				height: savedHeight || '',
				weight: savedWeight || '',
			})
		}
	}, [currentUser, savedHeight, savedWeight])

	const handleFormSubmit = values => {
		// Dispatch actions to update Redux state
		dispatch(setHeight(values.height))
		dispatch(setWeight(values.weight))

		// Save to Firestore if user is authenticated
		if (currentUser) {
			dispatch(
				saveUserDataToFirestore({
					userId: currentUser.uid,
					userData: {
						height: Number(values.height),
						weight: Number(values.weight),
					},
				})
			)

			// If in edit mode, go back to previous page
			// Otherwise continue with the registration flow
			if (isEditMode) {
				navigate(-1) // Go back to where user came from
			} else {
				navigate('/goal') // Continue with registration flow
			}
		}
	}

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={HeightWeightSchema}
			onSubmit={handleFormSubmit}
			enableReinitialize={true}
		>
			{formik => {
				// Check if form is valid for the bottom navigation
				const isFormValid = formik.isValid && formik.dirty

				return (
					<div className='height-weight-container'>
						{/* Header */}
						<div className='height-weight-header'>
							<div>
								<BackButton />
							</div>
							{!isEditMode && <ProgressBar progress={60} />}
						</div>

						{/* Main Content */}
						<Form className='height-weight-main-content'>
							<h1 className='height-weight-title'>
								What is your height and weight?
							</h1>
							<div className='height-weight-input-container'>
								<NumericInputForm
									title={'Height'}
									measuredAs={'ft'}
									icon={Ruler}
									name='height'
									max={8}
									formik={formik}
									onChange={e => {
										formik.handleChange(e)
									}}
								/>
								<NumericInputForm
									title={'Weight'}
									measuredAs={'lbs'}
									icon={Weight}
									name='weight'
									max={500}
									formik={formik}
									onChange={e => {
										formik.handleChange(e)
									}}
								/>
							</div>

							<p className='sex-text'>We need this to calculate your BMI</p>
						</Form>

						{/* Bottom Navigation */}
						<BottomNavigation
							disabled={!isFormValid}
							buttonText={isEditMode ? 'SAVE' : 'NEXT'}
							isEdit={isEditMode}
							onClick={formik.handleSubmit}
						/>
					</div>
				)
			}}
		</Formik>
	)
}

export default HeightWeight
