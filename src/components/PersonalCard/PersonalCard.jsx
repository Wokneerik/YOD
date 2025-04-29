import { ChevronRight } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UserAuth } from '../../context/AuthContext'
import { loadUserDataFromFirestore } from '../../store/user-data.slice'
import './styles.css'

const PersonalCard = ({ isVisible }) => {
	const [showCard, setShowCard] = useState(false)

	const dispatch = useDispatch()

	const { user } = UserAuth()
	const uid = user?.uid

	useEffect(() => {
		// Load user data when the component mounts and when the user ID changes
		if (uid) {
			dispatch(loadUserDataFromFirestore(uid))
		}
	}, [uid])

	const { height, weight, goal } = useSelector(state => state.userData)

	useEffect(() => {
		if (isVisible) {
			const timer = setTimeout(() => setShowCard(true), 200)
			return () => clearTimeout(timer)
		} else {
			setShowCard(false)
		}
	}, [isVisible])

	if (!isVisible) return null

	return (
		<div className={`personal-card ${showCard ? 'show' : ''}`}>
			<div className='personal-card-title'>Personal Details</div>

			<div className='personal-data-item'>
				<span className='data-label'>Name</span>
				<div className='data-value'>
					<span>Max</span>
					<ChevronRight
						className='personal-card__icon'
						color='#454545'
						strokeWidth={1.75}
					/>
				</div>
			</div>

			<div className='personal-data-item'>
				<span className='data-label'>Height</span>
				<div className='data-value'>
					<span>{height || '-'} ft</span>
					<ChevronRight
						className='personal-card__icon'
						color='#454545'
						strokeWidth={1.75}
					/>
				</div>
			</div>

			<div className='personal-data-item'>
				<span className='data-label'>Weight</span>
				<div className='data-value'>
					<span>{weight || '-'} lbs</span>
					<ChevronRight
						color='#454545'
						strokeWidth={1.75}
						className='personal-card__icon'
					/>
				</div>
			</div>

			<div className='personal-data-item'>
				<span className='data-label'>Goal</span>
				<div className='data-value'>
					<span>{goal || '-'}</span>
					<ChevronRight
						color='#454545'
						strokeWidth={1.75}
						className='personal-card__icon'
					/>
				</div>
			</div>
		</div>
	)
}

export default PersonalCard
