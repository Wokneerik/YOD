import { configureStore } from '@reduxjs/toolkit'

import controlsSlice from './controls.slice'
import stateCheckSlice from './state-check.slice'

export const store = configureStore({
	reducer: {
		stateCheck: stateCheckSlice,
		controls: controlsSlice,
	},
})
