
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import customersReducer from './slices/customersSlice'

export const store = configureStore({
    reducer: {
        authContext: userReducer,
        customers : customersReducer,
    },
});

// Types for the store's dispatch and state
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
