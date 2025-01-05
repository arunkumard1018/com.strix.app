import { LatestInvoices, RevenueData } from '@/types/invoices';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface LatestDataContext {
    invoices: LatestInvoices[] | undefined;
    revenue: RevenueData;
}
const initialState: LatestDataContext = {
    invoices: undefined,
    revenue: {
        invoicedAmount: 0,
        paidAmount: 0,
        outstandingAmount: 0,
        totalInvoices: 0,
        totalPaidInvoices: 0,
        totalProcessingInvoices: 0,
        totalDueInvoices: 0,
    },
};

const latestDataSlice = createSlice({
    name: 'latestData',
    initialState,
    reducers: {
        addLatestInvoices(state, action: PayloadAction<LatestInvoices[]>) {
            state.invoices = action.payload;
        },
        addRevenueData(state, action: PayloadAction<RevenueData>) {
            state.revenue = action.payload;
        }
    },
});
export const { addLatestInvoices, addRevenueData } = latestDataSlice.actions;
export default latestDataSlice.reducer;

