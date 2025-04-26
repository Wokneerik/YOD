import {
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithRedirect,
	signOut,
} from 'firebase/auth'
import { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState({})
	const [loading, setLoading] = useState(true)

	const googleSignIn = () => {
		const provider = new GoogleAuthProvider()
		return signInWithRedirect(auth, provider)
	}

	const logOut = () => {
		return signOut(auth)
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, currentUser => {
			setUser(currentUser)
			setLoading(false)
		})
		return () => {
			unsubscribe()
		}
	}, [])

	return (
		<AuthContext.Provider value={{ googleSignIn, logOut, user, loading }}>
			{children}
		</AuthContext.Provider>
	)
}

export const UserAuth = () => {
	return useContext(AuthContext)
}
