import { createSlice, configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterReducer'
import counterReducer2 from './counterReducer2'

export const Store = configureStore({
  reducer: {
    counterReducer,
    counterReducer2
  }
})

export type RootState = ReturnType<typeof Store.getState>;