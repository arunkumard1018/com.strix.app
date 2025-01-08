import { PaymentStatus } from '@/components/dashboard/invoices/types';
import { Invoices, InvoicesData } from '@/types/invoices';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState: InvoicesData = {
    invoices: [],
    pagination: {
        currentPage: 1,
        itemsPerPage: 20,
        totalPages: 1,
        totalItems: 0,
    },
    activeBusiness: "",
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

        updateInvoiceStatus(state, action: PayloadAction<{ invoiceId: string, paymentStatus: PaymentStatus }>) {
            const { invoiceId, paymentStatus } = action.payload;
            const index = state.invoices.findIndex((invoice) => invoice._id === invoiceId);
            if (index !== -1) {
                state.invoices[index].additionalInfo.paymentStatus = paymentStatus;
            }
        },

        clearInvoices(state) {
            state.invoices = [];
        },
    },
});

export const { clearInvoices, updateInvoice, removeInvoice, setInvoices, unShiftInvoice, updateInvoiceStatus } = invoicesSlice.actions;
export default invoicesSlice.reducer;
