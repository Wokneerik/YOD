import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../../context/AuthContext'

import { useSelector } from 'react-redux'
import PersonalCard from '../PersonalCard/PersonalCard'
import './styles.css'

const Account = () => {
	const [openAccPage, setOpenAccPage] = useState(false)
	const [user, setUser] = useState(null)
	const [loading, setLoading] = useState(false)

	const [isNewUser, setIsNewUser] = useState(false)

	const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false)
	const navigate = useNavigate()

	const { googleSignIn } = UserAuth()

	const { name } = useSelector(state => state.userData)

	const handleGoogleSignIn = async () => {
		try {
			setLoading(true)
			const result = await googleSignIn()

			// Check if this is a new user (just registered)
			if (
				result?.user?.metadata?.creationTime ===
				result?.user?.metadata?.lastSignInTime
			) {
				setIsNewUser(true)
				// Store in localStorage that this is a new registration
				localStorage.setItem('isNewRegistration', 'true')
			}
		} catch (error) {
			console.error('Error signing in with Google:', error)
			setLoading(false)
		}
	}

	// Initialize auth on component mount
	useEffect(() => {
		const auth = getAuth()
		const unsubscribe = onAuthStateChanged(auth, currentUser => {
			setUser(currentUser)
			setLoading(false)

			// Check if this is a new registration and redirect if needed
			const isNewRegistration =
				localStorage.getItem('isNewRegistration') === 'true'

			if (currentUser && isNewRegistration) {
				// Clear the flag
				localStorage.removeItem('isNewRegistration')
				// Redirect to welcome page
				navigate('/welcome')
			}
		})

		// Cleanup subscription on unmount
		return () => unsubscribe()
	}, [navigate])

	const handleButtonClick = () => {
		setOpenAccPage(prev => !prev)
	}

	const handleSignOut = async () => {
		try {
			setLoading(true)
			const auth = getAuth()
			await signOut(auth)

			setOpenAccPage(false)
		} catch (error) {
			console.error('Error signing out:', error)
			setLoading(false)
		}
	}

	const handleSignOutClick = () => {
		setShowLogoutConfirmation(true)
	}

	const handleSignOutConfirm = async () => {
		try {
			setLoading(true)
			const auth = getAuth()
			await signOut(auth)
			setShowLogoutConfirmation(false)
		} catch (error) {
			console.error('Error signing out:', error)
			setLoading(false)
		}
	}

	const handleCancelLogout = () => {
		setShowLogoutConfirmation(false)
	}

	return (
		<>
			<div
				className={`acc-button ${
					openAccPage ? 'showing-close' : 'showing-user'
				}`}
				onClick={handleButtonClick}
				style={{
					zIndex: openAccPage ? 110 : 102,
					backgroundImage: openAccPage
						? ''
						: `url(${user?.photoURL || '/img/buttons/user.png'})`,
				}}
			></div>

			{user && (
				<>
					<div
						className={`acc-button-left ${openAccPage ? 'active' : ''}`}
						style={{
							zIndex: openAccPage ? 110 : 102,
							backgroundImage: `url(${
								user.photoURL || '/img/buttons/user.png'
							})`,
						}}
					></div>
					<div
						className={`user-name-label ${openAccPage ? 'active' : ''}`}
						style={{
							zIndex: openAccPage ? 110 : 102,
						}}
					>
						{name || 'User'}
					</div>

					<div
						className={`sign-out-button ${openAccPage ? 'active' : ''}`}
						style={{
							zIndex: openAccPage ? 110 : 102,
						}}
						onClick={handleSignOutClick}
					></div>
					<div
						className={`sign-out-label ${openAccPage ? 'active' : ''}`}
						style={{
							zIndex: openAccPage ? 110 : 102,
						}}
					>
						Log Out
					</div>

					{openAccPage && (
						<>
							<PersonalCard isVisible={openAccPage} />
						</>
					)}
					<div
						className={`logout-container ${
							showLogoutConfirmation ? 'active' : ''
						}`}
					>
						<div className='logout-confirmation'>
							<h2>Are you sure you want to log out?</h2>
							<div className='logout-options'>
								<button className='cancel-button' onClick={handleCancelLogout}>
									Cancel
								</button>
								<button
									className='logout-button'
									onClick={handleSignOutConfirm}
								>
									Log Out
								</button>
							</div>
						</div>
					</div>
				</>
			)}

			<div className={`acc-overlay ${openAccPage ? 'active' : ''}`}>
				{loading ? (
					<div className='loading-spinner'></div>
				) : !user && openAccPage ? (
					<button className='google-auth-button' onClick={handleGoogleSignIn}>
						<span className='google-icon'></span>
						Sign in with Google
					</button>
				) : null}
			</div>
		</>
	)
}

export default Account
