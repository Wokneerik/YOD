import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	stateCheck: '',
	sliderVisible: true,
	showHealthConditionButton: false,
}

const stateCheckSlice = createSlice({
	name: 'stateCheck',
	initialState,
	reducers: {
		setStateCheck: (state, action) => {
			state.stateCheck = action.payload
		},
		setSliderVisible: (state, action) => {
			state.sliderVisible = action.payload
		},
		setShowHealthConditionButton: (state, action) => {
			state.showHealthConditionButton = action.payload
		},
	},
})

export const { setStateCheck, setSliderVisible, setShowHealthConditionButton } =
	stateCheckSlice.actions
export default stateCheckSlice.reducer
