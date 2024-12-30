import { InvoiceConfig } from '@/components/dashboard/invoices/form-data';
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
        setInvoiceConfigWithId(state, action: PayloadAction<Config | undefined>) {
            state.invoiceConfig = action.payload?.invoiceConfig;
            state.businessId = action.payload?.businessId;
        },
        setConfigData(state, action: PayloadAction<InvoiceConfig>) {
            state.invoiceConfig = action.payload;
        },
    },
});

export const { setInvoiceConfigWithId, setConfigData } = configSlice.actions;
export default configSlice.reducer;
