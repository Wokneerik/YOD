import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'

export const saveUserData = async (userId, userData) => {
	try {
		const userRef = doc(db, 'users', userId)

		const docSnap = await getDoc(userRef)

		if (docSnap.exists()) {
			await updateDoc(userRef, userData)
		} else {
			await setDoc(userRef, userData)
		}

		return { success: true }
	} catch (error) {
		console.error('Error saving user data:', error)
		return { success: false, error }
	}
}

export const getUserData = async userId => {
	try {
		const userRef = doc(db, 'users', userId)
		const docSnap = await getDoc(userRef)

		if (docSnap.exists()) {
			return { success: true, data: docSnap.data() }
		} else {
			return { success: false, error: 'User data not found' }
		}
	} catch (error) {
		console.error('Error fetching user data:', error)
		return { success: false, error }
	}
}
