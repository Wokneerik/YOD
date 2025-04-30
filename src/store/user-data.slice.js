import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getUserData, saveUserData } from '../services/firestoreService'

// Async thunk for saving user data to Firestore
export const saveUserDataToFirestore = createAsyncThunk(
	'userData/saveToFirestore',
	async ({ userId, userData }, { rejectWithValue }) => {
		try {
			const response = await saveUserData(userId, userData)
			if (!response.success) {
				return rejectWithValue(response.error)
			}
			return userData
		} catch (error) {
			return rejectWithValue(error.message)
		}
	}
)

// Async thunk for loading user data from Firestore
export const loadUserDataFromFirestore = createAsyncThunk(
	'userData/loadFromFirestore',
	async (userId, { rejectWithValue }) => {
		try {
			const response = await getUserData(userId)
			if (!response.success) {
				return rejectWithValue(response.error)
			}
			return response.data
		} catch (error) {
			return rejectWithValue(error.message)
		}
	}
)

const initialState = {
	name: '',
	sex: '',
	height: '',
	weight: '',
	goal: '',
	skinColor: '',
	loading: false,
	error: null,
	isDataSaved: false,
}

const userDataSlice = createSlice({
	name: 'userData',
	initialState,
	reducers: {
		setName: (state, action) => {
			state.name = action.payload
		},
		setSex: (state, action) => {
			state.sex = action.payload
		},
		setHeight: (state, action) => {
			state.height = action.payload
		},
		setWeight: (state, action) => {
			state.weight = action.payload
		},
		setGoal: (state, action) => {
			state.goal = action.payload
		},
		setSkinColor: (state, action) => {
			state.skinColor = action.payload
		},
		resetUserData: () => initialState,
	},
	extraReducers: builder => {
		builder
			// Handle saveUserDataToFirestore
			.addCase(saveUserDataToFirestore.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(saveUserDataToFirestore.fulfilled, state => {
				state.loading = false
				state.isDataSaved = true
			})
			.addCase(saveUserDataToFirestore.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
			// Handle loadUserDataFromFirestore
			.addCase(loadUserDataFromFirestore.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(loadUserDataFromFirestore.fulfilled, (state, action) => {
				state.loading = false
				state.name = action.payload.name || ''
				state.sex = action.payload.sex || ''
				state.height = action.payload.height || ''
				state.weight = action.payload.weight || ''
				state.goal = action.payload.goal || ''
				state.skinColor = action.payload.skinColor || ''
			})
			.addCase(loadUserDataFromFirestore.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})
	},
})

export const {
	setName,
	setSex,
	setHeight,
	setWeight,
	setGoal,
	setSkinColor,
	resetUserData,
} = userDataSlice.actions

export default userDataSlice.reducer
