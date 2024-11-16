import { Customers } from '@/types/definetions';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: Customers[] = [];

const customersSlice = createSlice({
    name: 'customers',
    initialState,
    reducers: {
        setCustomers(state, action: PayloadAction<Customers[]>) {
            return action.payload;
        },

        removeCustomer(state, action: PayloadAction<string>) {
            return state.filter((customer: Customers) => customer._id !== action.payload);
        },

        updateCustomer(state, action: PayloadAction<Customers>) {
            const updatedCustomer = action.payload;
            const index = state.findIndex((customer) => customer._id === updatedCustomer._id);
            if (index !== -1) {
                state[index] = updatedCustomer;
            }
        },

        appendCustomer(state, action: PayloadAction<Customers>) {
            state.push(action.payload);
        },

        clearCustomers() {
            return [];
        },
    },
});

export const { appendCustomer,updateCustomer, removeCustomer, setCustomers, clearCustomers } = customersSlice.actions;
export default customersSlice.reducer;
