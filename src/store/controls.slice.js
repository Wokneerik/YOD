import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	isControlsBlocked: false,
	isBackBtnVisible: false,
	isControlsBtnVisible: true,
}

const controlsSlice = createSlice({
	name: 'controls',
	initialState,
	reducers: {
		setIsControlsBlocked: (state, action) => {
			state.isControlsBlocked = action.payload
		},
		setIsBackBtnVisible: (state, action) => {
			state.isBackBtnVisible = action.payload
		},
		setIsControlsBtnVisible: (state, action) => {
			state.isControlsBtnVisible = action.payload
		},
	},
})

export const {
	setIsControlsBlocked,
	setIsBackBtnVisible,
	setIsControlsBtnVisible,
} = controlsSlice.actions

export default controlsSlice.reducer
