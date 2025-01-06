"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getAllInvoices } from "@/api/invoices";
import { InvoicesData } from "@/types/invoices";
import { ApiResponse } from "@/types/api-responses";
import { setInvoices } from "@/store/slices/invoicesSlice";
import { CreatedInvoiceView } from "@/components/dashboard/invoices/invoice-view/CreatedInvoiceView";

export default function InvoiceViewPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const dispatch = useDispatch();
    const businessId = useSelector((state: RootState) => state.authContext.activeBusiness._id);
    useEffect(() => {
        const loadInvoices = async (businessId: string) => {
            try {
                const response: ApiResponse<InvoicesData> = await getAllInvoices(businessId);
                if (response.result) {
                    dispatch(setInvoices(response.result));
                }
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (_error: unknown) {
            }
        };
        loadInvoices(businessId);
    }, [businessId, dispatch]);
    const invoice = useSelector((state: RootState) =>
        state.invoicesData.invoices.find(inv => inv._id === params.id)
    );
    const invoices = useSelector((state: RootState) => state.invoicesData.invoices);

    console.log("invoice id", params.id);
    if (!invoice) {
        return (
            <div>
                <div>Invoice not found for id: {params.id}</div>
                <div>Invoices: {invoices.length}</div>
            </div>)
    }

    return (
        <CreatedInvoiceView
            invoice={invoice}
            onCreateNew={() => router.push('/dashboard/invoices/add-invoices')}
        />
    );
}