import { configureStore } from '@reduxjs/toolkit'

import stateCheckSlice from './state-check.slice'

export const store = configureStore({
	reducer: {
		stateCheck: stateCheckSlice,
	},
})
