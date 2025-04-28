import { Form, Formik } from 'formik'
import { Ruler, Weight } from 'lucide-react'
import React from 'react'
import * as Yup from 'yup'
import BackButton from '../../components/ui/BackButton/BackButton'
import BottomNavigation from '../../components/ui/BottomNavigation/BottomNavigation'
import ProgressBar from '../../components/ui/ProgressBar/ProgressBar'

import NumericInputForm from '../../components/ui/NumericInputForm/NumericInputForm'
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
	const initialValues = {
		height: '',
		weight: '',
	}

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={HeightWeightSchema}
			onSubmit={values => {
				console.log('Form submitted with values:', values)
			}}
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
							/>
							<NumericInputForm
								title={'Weight'}
								measuredAs={'lbs'}
								icon={Weight}
								name='weight'
								max={500}
								formik={formik}
							/>
						</div>

						<p className='sex-text'>We need this to calculate your BMI</p>
					</Form>

					<BottomNavigation
						link={'/goal'}
						disabled={!formik.isValid || !formik.dirty || formik.isSubmitting}
					/>
				</div>
			)}
		</Formik>
	)
}

export default HeightWeight
