import { Invoices, InvoicesData } from '@/types/invoices';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState: InvoicesData = {
    invoices: [],
    pagination: {
        page: 1,
        limit: 10,
        totalPages: 1,
        totalItems: 0,
    },
};

const invoicesSlice = createSlice({
    name: 'invoices',
    initialState,
    reducers: {
        setInvoices(state, action: PayloadAction<InvoicesData>) {
            return action.payload;
        },
        removeInvoice(state, action: PayloadAction<string>) {
            state.invoices = state.invoices.filter((invoice: Invoices) => invoice._id !== action.payload);
        },
        updateInvoice(state, action: PayloadAction<Invoices>) {
            const updatedInvoice = action.payload;
            const index = state.invoices.findIndex((invoice) => invoice._id === updatedInvoice._id);
            if (index !== -1) {
                state.invoices[index] = updatedInvoice;
            }
        },
        unShiftInvoice(state, action: PayloadAction<Invoices>) {
            state.invoices.unshift(action.payload);
        },

        clearInvoices(state) {
            state.invoices = [];
        },
    },
});

export const { clearInvoices,updateInvoice,removeInvoice, setInvoices,unShiftInvoice } = invoicesSlice.actions;
export default invoicesSlice.reducer;
