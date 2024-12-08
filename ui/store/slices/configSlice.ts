import { InvoiceConfig } from '@/components/dashboard/invoices/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Config {
    invoiceConfig: InvoiceConfig | undefined;
    businessId: string | undefined;
}

const initialState: Config = {
    invoiceConfig: undefined,
    businessId: undefined,
};

const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        setInvoiceConfig(state, action: PayloadAction<Config | undefined>) {
            state.invoiceConfig = action.payload?.invoiceConfig;
            state.businessId = action.payload?.businessId;
        },
    },
});

export const { setInvoiceConfig } = configSlice.actions;
export default configSlice.reducer;
