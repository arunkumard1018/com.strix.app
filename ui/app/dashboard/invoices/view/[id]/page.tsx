"use client";

import { getInvoiceById } from "@/api/invoices";
import { CreatedInvoiceView } from "@/components/dashboard/invoices/invoice-view/CreatedInvoiceView";
import { Invoice } from "@/components/dashboard/invoices/types";
import { ApiResponse } from "@/types/api-responses";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function InvoiceViewPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [invoice, setInvoice] = useState<Invoice>();
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const loadInvoices = async () => {
            setLoading(true)
            try {
                const response: ApiResponse<Invoice> = await getInvoiceById(params.id);
                if (response.result) {
                    setInvoice(response.result);
                }
            } catch {
            } finally {
                setLoading(false)
            }
        };
        loadInvoices();
    }, [params.id]);

    console.log("invoice id", params.id);
    if (!invoice) {
        return (
            <div>
                <div>Invoice not found for id: {params.id}</div>
            </div>)
    }

    return (
        <div>
            {loading ? <div className="text-center">Loading...</div> :
                <CreatedInvoiceView
                    invoice={invoice}
                    onCreateNew={() => router.push('/dashboard/invoices/add-invoices')}
                />}
        </div>
    );
}