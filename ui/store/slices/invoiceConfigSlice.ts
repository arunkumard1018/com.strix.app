import { InvoiceConfig } from '@/components/dashboard/invoices/types';
import { invoiceConfig } from '@/config/invoice';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState: InvoiceConfig = invoiceConfig;

const invoiceConfigSlice = createSlice({
    name: 'invoiceConfig',
    initialState,
    reducers: {
        setInvoiceConfig(state, action: PayloadAction<InvoiceConfig>) {
            console.log("Storing config State ",action.payload)
            return action.payload;
        },
    },
});

export const { setInvoiceConfig } = invoiceConfigSlice.actions;
export default invoiceConfigSlice.reducer;
