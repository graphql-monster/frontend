import { configureStore, ThunkAction, UnknownAction } from '@reduxjs/toolkit'
import userReducer from './reducers/userSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
})

export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, UnknownAction>
