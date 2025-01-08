'use client';
import { getInvoiceById } from '@/api/invoices';
import { InvoiceFormData } from '@/components/dashboard/invoices/form-data';
import { InvoiceForm } from '@/components/dashboard/invoices/invoices-form';
import { Invoice, InvoiceProduct, InvoiceProductTransport } from '@/components/dashboard/invoices/types';
import { invoiceFormInitialData } from '@/config/invoice';
import { ApiResponse } from '@/types/api-responses';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function Page() {
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [initialValues, setInitialValues] = useState<InvoiceFormData | null>(null);

    useEffect(() => {
        const loadInvoice = async () => {
            try {
                setLoading(true);
                const response: ApiResponse<Invoice> = await getInvoiceById(params.slug as string);
                if (response.result) {
                    const invoice = response.result;
                    const invoiceProductsTransport = invoice.additionalInfo.isTransportInvoice ? (invoice.invoiceProducts as InvoiceProductTransport[]).map((item) => ({
                        ...item,
                        price: item.price.toString(),
                        cgst: item.cgst.toString(),
                        sgst: item.sgst.toString(),
                        amount: item.amount.toString(),
                    })) : invoiceFormInitialData.invoiceProductsTransport;
                    const invoiceProducts = invoice.additionalInfo.isTransportInvoice ? invoiceFormInitialData.invoiceProducts : (invoice.invoiceProducts as InvoiceProduct[]).map((item) => ({
                        ...item,
                        price: item.price.toString(),
                        cgst: item.cgst.toString(),
                        sgst: item.sgst.toString(),
                        amount: item.amount.toString(),
                        qty: item.qty.toString(),
                    }));
                    setInitialValues({
                        ...invoice,
                        customers: invoice.customers || '',
                        invoiceProducts: invoiceProducts,
                        invoiceProductsTransport: invoiceProductsTransport,
                        invoiceSummary: invoice.invoiceSummary,
                        additionalInfo: invoice.additionalInfo,
                        invoiceFrom: { ...invoice.invoiceFrom, postalCode: invoice.invoiceFrom.postalCode.toString(), phone: invoice.invoiceFrom.phone?.toString() },
                        invoiceTo: { ...invoice.invoiceTo, postalCode: invoice.invoiceTo.postalCode.toString(), phone: invoice.invoiceTo.phone?.toString() },
                        invoiceDetails: { ...invoice.invoiceDetails, invoiceNo: invoice.invoiceDetails.invoiceNo.toString(), HSN: invoice.invoiceDetails.HSN?.toString(), stateCode: invoice.invoiceDetails.stateCode?.toString() },
                        invoiceHeading: invoice.invoiceHeading,
                        bankDetails: { ...invoice.bankDetails, accountNumber: invoice.bankDetails.accountNumber?.toString() },
                    });
                } else {
                    console.error("Invoice data not found in the API response.");
                }
            } catch (error) {
                console.error("Error loading invoice:", error);
            } finally {
                setLoading(false);
            }
        };

        loadInvoice();
    }, [params.slug]);

    if (loading || !initialValues) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <InvoiceForm initialValues={initialValues} type="UPDATE" id={params.slug as string} />
        </div>
    );
}

export default Page;
