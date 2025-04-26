import { getAuth, signOut } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { UserAuth } from '../../context/AuthContext'
import './style.css'

const Account = () => {
	const [openAccPage, setOpenAccPage] = useState(false)
	const [loading, setLoading] = useState(false)
	const [showSignOut, setShowSignOut] = useState(false)

	const { googleSignIn, user } = UserAuth()

	const handleGoogleSignIn = async () => {
		try {
			setLoading(true)
			await googleSignIn()
		} catch (error) {
			console.error('Error signing in with Google:', error)
			setLoading(false)
		}
	}

	// Handle redirect result on component mount
	useEffect(() => {
		const auth = getAuth()
		const handleRedirectResult = async () => {
			try {
				setLoading(true)
				const result = await getRedirectResult(auth)
				if (result) {
					console.log('Successfully signed in after redirect')
				}
			} catch (error) {
				console.error('Error with redirect result:', error)
			} finally {
				setLoading(false)
			}
		}

		handleRedirectResult()
	}, [])

	const handleButtonClick = () => {
		setOpenAccPage(prev => !prev)
		if (user && !openAccPage) {
			setShowSignOut(false)
		} else {
			setShowSignOut(false)
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
		} finally {
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
					<>
						<button
							className={`sign-out-button ${showSignOut ? 'active' : ''}`}
							onClick={handleSignOut}
						></button>
						<div className={`sign-out-label ${showSignOut ? 'active' : ''}`}>
							Sign Out
						</div>
					</>
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
