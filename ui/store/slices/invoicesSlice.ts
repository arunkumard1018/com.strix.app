import { Invoices } from '@/types/invoices';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState: Invoices[] = [];

const invoicesSlice = createSlice({
    name: 'invoices',
    initialState,
    reducers: {
        setInvoices(state, action: PayloadAction<Invoices[]>) {
            return action.payload;
        },

        removeInvoice(state, action: PayloadAction<string>) {
            return state.filter((customer: Invoices) => customer._id !== action.payload);
        },

        updateInvoice(state, action: PayloadAction<Invoices>) {
            const updatedCustomer = action.payload;
            const index = state.findIndex((customer) => customer._id === updatedCustomer._id);
            if (index !== -1) {
                state[index] = updatedCustomer;
            }
        },

        appendInvoice(state, action: PayloadAction<Invoices>) {
            state.push(action.payload);
        },

        clearInvoices() {
            return [];
        },
    },
});

export const { clearInvoices,updateInvoice,removeInvoice, setInvoices,appendInvoice } = invoicesSlice.actions;
export default invoicesSlice.reducer;
