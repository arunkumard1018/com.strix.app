import { getLatestInvoices } from "@/api/latestData";
import { LatestInvoiceSkelton } from "@/components/skeltons/latest-invoices";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { cn, formatCurrency, formatDateDDMMYY } from "@/lib/utils";
import { addLatestInvoices } from "@/store/slices/latestDataSlice";
import { RootState } from "@/store/store";
import { ApiResponse } from "@/types/api-responses";
import { LatestInvoices } from "@/types/invoices";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PaymentStatus } from "../invoices/types";
import { statusStyles } from "../invoices/invoice-view/Invoice";

export function LatestInvoicesTable() {
    const latestData = useSelector((state: RootState) => state.latestData);
    const activeBusinessId = useSelector((state: RootState) => state.authContext.activeBusiness?._id);
    const [loading, setloading] = useState(true)
    const dispatch = useDispatch();
    const [totalAmount, setTotalAmount] = useState(0);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadLatestInvoices = async () => {
            try {
                setloading(true);
                setError(null);
                const response: ApiResponse<LatestInvoices[]> = await getLatestInvoices(activeBusinessId);
                if (response.result) {
                    dispatch(addLatestInvoices(response.result));
                    setTotalAmount(response.result.reduce((acc, invoice) => acc + (invoice.invoiceAmount || 0), 0));
                } else {
                    setError(response.message || 'Failed to load invoices');
                }
            } catch {
                setError('Failed to load invoices. Please try again later.');
            } finally {
                setloading(false);
            }
        }
        loadLatestInvoices();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeBusinessId])

    if (loading) return <LatestInvoiceSkelton />
    if (error) return <div className="text-red-500 text-center p-4">{error}</div>
    return (
        <Table>
            {!latestData.invoices || latestData.invoices.length === 0 ?
                <TableCaption>No Recent Invoices.</TableCaption> :
                <TableCaption>A list of your recent invoices.</TableCaption>
            }
            <TableHeader>
                <TableRow>
                    <TableHead className="">Invoice No</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="hidden md:table-cell">Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {latestData.invoices?.map((invoice) => (
                    <TableRow key={invoice._id}>
                        <TableCell className="font-medium px-2">{invoice.invoiceNumber}</TableCell>
                        <TableCell className="px-2">{invoice.customerName}</TableCell>
                        <TableCell className="px-2">{formatDateDDMMYY(invoice.invoiceDate)}</TableCell>
                        <TableCell className={"px-2 hidden md:table-cell"}>
                            <Badge variant="outline" className={cn("capitalize  px-3 text-sm font-medium shadow-sm rounded-none table-cell", statusStyles[invoice.paymentStatus as PaymentStatus])}>{invoice.paymentStatus}</Badge>
                        </TableCell>
                        <TableCell className="text-right px-2">{formatCurrency(invoice.invoiceAmount)}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={4} className="px-2 hidden md:table-cell">Total</TableCell>
                    <TableCell colSpan={3} className="px-2 md:hidden">Total</TableCell>
                    <TableCell className="text-right ">{formatCurrency(totalAmount)}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}
