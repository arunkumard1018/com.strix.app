
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import customersReducer from './slices/customersSlice'
import invoicesReducer from './slices/invoicesSlice'
import latestDataReducer from './slices/latestDataSlice'
import invoiceConfigReducer from './slices/invoiceConfigSlice'

export const store = configureStore({
    reducer: {
        authContext: userReducer,
        customers: customersReducer,
        invoices: invoicesReducer,
        latestData: latestDataReducer,
        invoiceConfig: invoiceConfigReducer,
    },
});

// Types for the store's dispatch and state
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
