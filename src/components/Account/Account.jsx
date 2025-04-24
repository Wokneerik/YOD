import {
	GoogleAuthProvider,
	getAuth,
	onAuthStateChanged,
	signInWithPopup,
	signOut,
} from 'firebase/auth'
import { useEffect, useState } from 'react'
import './style.css'

const Account = () => {
	const [openAccPage, setOpenAccPage] = useState(false)
	const [user, setUser] = useState(null)
	const [loading, setLoading] = useState(false)
	const [showSignOut, setShowSignOut] = useState(false)

	// Initialize auth on component mount
	useEffect(() => {
		const auth = getAuth()
		const unsubscribe = onAuthStateChanged(auth, currentUser => {
			setUser(currentUser)
			setLoading(false)
		})

		// Cleanup subscription on unmount
		return () => unsubscribe()
	}, [])

	const handleButtonClick = () => {
		setOpenAccPage(prev => !prev)
		if (user && !openAccPage) {
			setShowSignOut(false)
		} else {
			setShowSignOut(false)
		}
	}

	const handleGoogleSignIn = async () => {
		try {
			setLoading(true)
			const auth = getAuth()
			const provider = new GoogleAuthProvider()
			await signInWithPopup(auth, provider)
			setOpenAccPage(false) // Close overlay after successful sign-in
		} catch (error) {
			console.error('Error signing in with Google:', error)
			setLoading(false)
		}
	}

	const handleSignOut = async () => {
		try {
			setLoading(true)
			const auth = getAuth()
			await signOut(auth)
			setShowSignOut(false)
			setOpenAccPage(false)
		} catch (error) {
			console.error('Error signing out:', error)
			setLoading(false)
		}
	}

	const handleLeftButtonClick = () => {
		if (user) {
			setShowSignOut(prev => !prev)
		}
	}

	return (
		<>
			<div
				className={`acc-button ${
					openAccPage ? 'showing-close' : 'showing-user'
				}`}
				onClick={handleButtonClick}
				style={{ zIndex: openAccPage ? 999999 : 9997 }}
			></div>

			{user && (
				<>
					<div
						className={`acc-button-left ${openAccPage ? 'active' : ''}`}
						style={{
							zIndex: openAccPage ? 999999 : 9989,
							backgroundImage: `url(${
								user.photoURL || '/img/buttons/user.png'
							})`,
						}}
						onClick={handleLeftButtonClick}
					></div>
					<div
						className={`user-name-label ${openAccPage ? 'active' : ''}`}
						style={{
							zIndex: openAccPage ? 999999 : 9989,
						}}
					>
						{user.displayName?.split(' ')[0] || 'User'}
					</div>
				</>
			)}

			<div
				className={`acc-overlay ${openAccPage || showSignOut ? 'active' : ''}`}
			>
				{loading ? (
					<div className='loading-spinner'></div>
				) : showSignOut ? (
					<button className='sign-out-button' onClick={handleSignOut}>
						Sign Out
					</button>
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
