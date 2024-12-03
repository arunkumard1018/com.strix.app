import { getLatestInvoices } from "@/api/latestData";
import { LatestInvoiceSkelton } from "@/components/skeltons/latest-invoices";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { formatCurrency, formatDateDDMMYY } from "@/lib/utils";
import { addLatestInvoices } from "@/store/slices/latestDataSlice";
import { RootState } from "@/store/store";
import { ApiResponse } from "@/types/api-responses";
import { Invoices } from "@/types/invoices";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"



export function LatestInvoicesTable() {
    const latestData = useSelector((state: RootState) => state.latestData);
    const [loading, setloading] = useState(true)
    const dispatch = useDispatch();
    const [totalAmount, setTotalAmount] = useState(0);
    useEffect(() => {
        const loadLatestInvoices = async () => {
            if (!latestData.invoices) {
                const response: ApiResponse<Invoices[]> = await getLatestInvoices();
                if (response.result) dispatch(addLatestInvoices(response.result));
                setloading(false)
            }
        }
        if (latestData.invoices && latestData.invoices.length > 0) {
            const amount = latestData.invoices.reduce((acc, invoice) => acc + (invoice.invoiceAmount || 0), 1);
            setTotalAmount(amount);
        }
        loadLatestInvoices();
    }, [latestData.invoices, dispatch])
    if (loading) return <LatestInvoiceSkelton />
    return (
        <Table>
            {!latestData.invoices || latestData.invoices.length === 0 ?
                <TableCaption>No Recent Invoices.</TableCaption> :
                <TableCaption>A list of your recent invoices.</TableCaption>
            }
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Invoice No</TableHead>
                    <TableHead>Invoice To</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {latestData.invoices?.map((invoice) => (
                    <TableRow key={invoice._id}>
                        <TableCell className="font-medium px-2">{invoice.invoiceNo}</TableCell>
                        <TableCell className="px-2">{invoice.invoiceTo.name}</TableCell>
                        <TableCell className="px-2">{formatDateDDMMYY(invoice.invoiceDate)}</TableCell>
                        <TableCell className="text-right px-2">{formatCurrency(invoice.invoiceAmount)}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3} className="px-2">Total</TableCell>
                    <TableCell className="text-right px-2">{formatCurrency(totalAmount)}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}
