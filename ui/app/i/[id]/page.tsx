"use client"
import { getInvoiceById } from "@/api/invoices";
import { Invoice as InvoiceType } from "@/components/dashboard/invoices/types";
import InvoiceSkeleton from "@/components/skeltons/invoice-skelton";
import { useParams, notFound } from "next/navigation";
import { useEffect, useState } from "react";
import NotFound from "./not-found";
import Invoice from "@/components/dashboard/invoices/invoice-view/Invoice";


function Page() {
  const { id } = useParams();
  const [invoiceData, setInvoiceData] = useState<InvoiceType | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInvoiceData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const invoiceData = await getInvoiceById(id as string);
        if (!invoiceData.result) {
          notFound();
        }
        setInvoiceData(invoiceData.result);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError('Failed to load invoice. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }
    fetchInvoiceData();
  }, [id]);

  if (isLoading) {
    return <InvoiceSkeleton />;
  }
  if (error) {
    return <NotFound/>;
  }
  return (
    <div>
      <Invoice invoiceData={invoiceData as InvoiceType} />
    </div>
  )
}

export default Page