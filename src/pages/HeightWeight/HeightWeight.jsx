import { getAuth } from 'firebase/auth'
import { Form, Formik } from 'formik'
import { Ruler, Weight } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import BackButton from '../../components/ui/BackButton/BackButton'
import BottomNavigation from '../../components/ui/BottomNavigation/BottomNavigation'
import NumericInputForm from '../../components/ui/NumericInputForm/NumericInputForm'
import ProgressBar from '../../components/ui/ProgressBar/ProgressBar'

import { useNavigate } from 'react-router-dom'
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
	const dispatch = useDispatch()

	const auth = getAuth()

	const navigate = useNavigate()

	const { height: savedHeight, weight: savedWeight } = useSelector(
		state => state.userData
	)

	// Get current user
	const currentUser = auth.currentUser

	// Set initial values from Redux or default to empty strings
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

		console.log(
			'CHECK HEIGHT AND WEIGHT,',
			values.height,
			'WEIGHT,',
			values.weight
		)

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
		}
	}

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={HeightWeightSchema}
			onSubmit={handleFormSubmit}
			enableReinitialize={true}
		>
			{formik => (
				<div className='height-weight-container'>
					{/* Header */}
					<div className='height-weight-header'>
						<div>
							<BackButton />
						</div>
						<ProgressBar progress={50} />
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

									dispatch(setHeight(e.target.value))
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

									dispatch(setWeight(e.target.value))
								}}
							/>
						</div>

						<p className='sex-text'>We need this to calculate your BMI</p>
					</Form>

					{/* Bottom Navigation */}
					<BottomNavigation
						disabled={!formik.isValid || !formik.dirty || formik.isSubmitting}
						onClick={async () => {
							await formik.submitForm()
							if (formik.isValid) {
								navigate('/goal')
							}
						}}
					/>
				</div>
			)}
		</Formik>
	)
}

export default HeightWeight
