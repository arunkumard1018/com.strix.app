import { InvoiceStats, LatestInvoices } from '@/types/invoices';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface LatestDataContext {
    invoices: LatestInvoices[] | undefined;
    invoiceStats: InvoiceStats;
}
const initialState: LatestDataContext = {
    invoices: undefined,
    invoiceStats: {
        totalInvoices: 0,
        paidInvoices: 0,
        processingInvoices: 0,
        dueInvoices: 0,
        totalPaidAmount: 0,
        totalProcessingAmount: 0,
        totalDueAmount: 0,
    },
};

const latestDataSlice = createSlice({
    name: 'latestData',
    initialState,
    reducers: {
        addLatestInvoices(state, action: PayloadAction<LatestInvoices[]>) {
            state.invoices = action.payload;
        },
        addInvoicesStats(state, action: PayloadAction<InvoiceStats>) {
            state.invoiceStats = action.payload;
        }
    },
});
export const { addLatestInvoices, addInvoicesStats } = latestDataSlice.actions;
export default latestDataSlice.reducer;

