import { Invoices, InvoiceStats } from '@/types/invoices';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface LatestDataContext {
    invoices: Invoices[] | undefined;
    invoiceStats: InvoiceStats;
}
const initialState: LatestDataContext = {
    invoices: undefined,
    invoiceStats: {
        totalInvoices: 0,
        totalPaid: 0,
        totalProcessing: 0,
        totalDue: 0,
        totalPaidAmount: 0,
        totalProcessingAmount: 0,
        totalDueAmount: 0,
    },
};

const latestDataSlice = createSlice({
    name: 'latestData',
    initialState,
    reducers: {
        addLatestInvoices(state, action: PayloadAction<Invoices[]>) {
            state.invoices = action.payload;
        },
        addInvoicesStats(state, action: PayloadAction<InvoiceStats>) {
            state.invoiceStats = action.payload;
        }
    },
});
export const { addLatestInvoices, addInvoicesStats } = latestDataSlice.actions;
export default latestDataSlice.reducer;

