import { ChevronRight } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../../context/AuthContext'
import { loadUserDataFromFirestore } from '../../store/user-data.slice'
import './styles.css'

const PersonalCard = ({ isVisible }) => {
	const [showCard, setShowCard] = useState(false)

	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { user } = UserAuth()
	const uid = user?.uid

	useEffect(() => {
		// Load user data when the component mounts and when the user ID changes
		if (uid) {
			dispatch(loadUserDataFromFirestore(uid))
		}
	}, [uid, dispatch])

	const { name, height, weight, goal } = useSelector(state => state.userData)

	useEffect(() => {
		if (isVisible) {
			const timer = setTimeout(() => setShowCard(true), 200)
			return () => clearTimeout(timer)
		} else {
			setShowCard(false)
		}
	}, [isVisible])

	// Navigate to edit pages with state indicating we're coming from PersonalCard
	const navigateToEdit = path => {
		navigate(path, { state: { fromPersonalCard: true } })
	}

	if (!isVisible) return null

	return (
		<div className={`personal-card ${showCard ? 'show' : ''}`}>
			<div className='personal-card-title'>Personal Details</div>

			<button
				className='personal-data-item'
				onClick={() => navigateToEdit('/name')}
			>
				<span className='data-label'>Name</span>
				<div className='data-value'>
					<span>{name || '-'}</span>
					<ChevronRight
						className='personal-card__icon'
						color='#454545'
						strokeWidth={1.75}
					/>
				</div>
			</button>

			<button
				className='personal-data-item'
				onClick={() => navigateToEdit('/height-weight')}
			>
				<span className='data-label'>Height</span>
				<div className='data-value'>
					<span>{height || '-'} ft</span>
					<ChevronRight
						className='personal-card__icon'
						color='#454545'
						strokeWidth={1.75}
					/>
				</div>
			</button>

			<button
				className='personal-data-item'
				onClick={() => navigateToEdit('/height-weight')}
			>
				<span className='data-label'>Weight</span>
				<div className='data-value'>
					<span>{weight || '-'} lbs</span>
					<ChevronRight
						color='#454545'
						strokeWidth={1.75}
						className='personal-card__icon'
					/>
				</div>
			</button>

			<button
				className='personal-data-item'
				onClick={() => navigateToEdit('/goal')}
			>
				<span className='data-label'>Goal</span>
				<div className='data-value'>
					<span>{goal || '-'}</span>
					<ChevronRight
						color='#454545'
						strokeWidth={1.75}
						className='personal-card__icon'
					/>
				</div>
			</button>
		</div>
	)
}

export default PersonalCard
