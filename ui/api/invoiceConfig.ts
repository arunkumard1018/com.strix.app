import { ApiResponse } from "@/types/api-responses";
import { axiosClient } from "./axiosClient";
import { InvoiceConfig } from "@/components/dashboard/invoices/form-data";



const createUrl = (businessId: string) => {
    return `/api/v1/business/${businessId}/invoice-config`
}
const getInvoiceConfig = async (businessId: string) => {
    await new Promise(resolve => setTimeout(resolve, 3000));
    const response = await axiosClient.get<ApiResponse<InvoiceConfig>>(createUrl(businessId));
    return response.data;
}
const createInvoiceConfig = async (businessId: string, config: InvoiceConfig) => {
    const data: CreateInvoiceConfig = {
        ...config,
        invoiceDetails: {
            invoiceNo: 1,
            invoicePrefix: config.invoiceDetails.invoicePrefix,
            GSTIN: config.invoiceDetails.GSTIN,
            PAN: config.invoiceDetails.PAN,
            HSN: Number(config.invoiceDetails.HSN),
            stateCode: Number(config.invoiceDetails.stateCode),
        },
        invoiceFrom: {
            ...config.invoiceFrom,
            postalCode: Number(config.invoiceFrom.postalCode),
            phone: Number(config.invoiceFrom.phone)
        },
        bankDetails: {
            ...config.bankDetails,
            accountNumber: Number(config.bankDetails.accountNumber)
        },
        additionalInfo: {
            thankyouNote: config.additionalInfo.thankyouNote,
            isBankDetails: config.additionalInfo.isBankDetails,
            isTransportInvoice: config.additionalInfo.isTransportInvoice,
        },
    }
    const response = await axiosClient.post<ApiResponse<InvoiceConfig>>(createUrl(businessId), { ...data });
    return response.data;
}
const updateInvoiceConfig = async (businessId: string, config: InvoiceConfig) => {
    const data: CreateInvoiceConfig = {
        ...config,
        invoiceDetails: {
            invoiceNo: Number(config.invoiceDetails.invoiceNo),
            invoicePrefix: config.invoiceDetails.invoicePrefix,
            GSTIN: config.invoiceDetails.GSTIN,
            PAN: config.invoiceDetails.PAN,
            HSN: Number(config.invoiceDetails.HSN),
            stateCode: Number(config.invoiceDetails.stateCode),
        },
        invoiceFrom: {
            ...config.invoiceFrom,
            postalCode: Number(config.invoiceFrom.postalCode),
            phone: Number(config.invoiceFrom.phone)
        },
        bankDetails: {
            ...config.bankDetails,
            accountNumber: Number(config.bankDetails.accountNumber)
        },
        additionalInfo: {
            thankyouNote: config.additionalInfo.thankyouNote,
            isBankDetails: config.additionalInfo.isBankDetails,
            isTransportInvoice: config.additionalInfo.isTransportInvoice,
        },
    }
    const response = await axiosClient.put<ApiResponse<InvoiceConfig>>(createUrl(businessId), { ...data });
    return response.data;
}

export {
    createInvoiceConfig, getInvoiceConfig, updateInvoiceConfig
};

/** TypeScript Interface for invoiceConfigJoiSchema */
export interface CreateInvoiceConfig {
    invoiceHeading: {
        heading: string;
        subHeading?: string | null;
        title?: string | null;
    };
    invoiceFrom: {
        name: string;
        address: string;
        city: string;
        state: string;
        postalCode?: number;
        phone?: number;
        email?: string | null;
    };
    invoiceDetails: {
        invoicePrefix: string;
        invoiceNo: number;
        GSTIN?: string | null;
        PAN?: string | null;
        HSN?: number | null;
        stateCode?: number | null;
    };
    bankDetails?: {
        bankName?: string | null;
        accountName?: string | null;
        accountNumber?: number | null;
        ifscCode?: string | null;
        branch?: string | null;
    };
    additionalInfo: {
        thankyouNote?: string | null;
        isBankDetails: boolean;
        isTransportInvoice: boolean;
    };
}
