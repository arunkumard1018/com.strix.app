import { getLatestInvoices } from "@/api/latestData";
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
    const dispatch = useDispatch();
    const [totalAmount, setTotalAmount] = useState(0);
    useEffect(() => {
        const loadLatestInvoices = async () => {
            if (!latestData.invoices) {
                const response: ApiResponse<Invoices[]> = await getLatestInvoices();
                if (response.result) dispatch(addLatestInvoices(response.result))
            }
        }
        if (latestData.invoices && latestData.invoices.length > 0) {
            const amount = latestData.invoices.reduce((acc, invoice) => acc + (invoice.invoiceAmount || 0), 1);
            setTotalAmount(amount);
        }
        loadLatestInvoices();
    }, [latestData.invoices, dispatch])

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
                        <TableCell className="font-medium">{invoice.invoiceNo}</TableCell>
                        <TableCell>{invoice.invoiceTo.name}</TableCell>
                        <TableCell>{formatDateDDMMYY(invoice.invoiceDate)}</TableCell>
                        <TableCell className="text-right">{formatCurrency(invoice.invoiceAmount)}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell className="text-right">{formatCurrency(totalAmount)}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}
