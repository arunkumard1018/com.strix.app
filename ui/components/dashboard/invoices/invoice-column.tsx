"use client"

import { deleteInvoiceById, updatePaymentStatus } from "@/api/invoices"
import { ActionsDropDownRow } from "@/components/table-def/ActionDropDownMenu"
import { cn, formatCurrency, formatDateDDMMYY } from "@/lib/utils"
import { removeInvoice, updateInvoiceStatus } from "@/store/slices/invoicesSlice"
import { RootState } from "@/store/store"
import { Invoices } from "@/types/invoices"
import { ColumnDef, Row } from "@tanstack/react-table"
import { ChevronsUpDown } from "lucide-react"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "sonner"
import { PaymentStatus } from "./types"
import { Badge } from "@/components/ui/badge"
import { statusStyles } from "./invoice-view/Invoice"

export const Invoicescolumns: ColumnDef<Invoices>[] = [
    {
        id: "invoiceDetails.invoiceNo",
        accessorKey: "invoiceDetails.invoiceNo",
        header: ({ column }) => {
            return (
                <div className="flex items-center justify-start cursor-pointer capitalize" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} >
                    Invoice No
                    <ChevronsUpDown className="h-4 w-3 " />
                </div>
            )
        },

        cell: ({ row }) => {
            const prefix = row.original.invoiceDetails.invoicePrefix;
            const number = row.original.invoiceDetails.invoiceNo;
            return (
                <div className="capitalize space-y-1">
                    <div className="font-medium text-left">{prefix + number}</div>
                </div>
            );
        },
    },
    {
        id: "invoiceTo.name",
        accessorKey: "invoiceTo.name",
        header: "Invoice To",
        cell: ({ row }) => (
            <div className="capitalize table-cell">{row.getValue("invoiceTo.name")}</div>
        ),
    },
    {
        id: "invoiceTo.city",
        accessorKey: "invoiceTo.city",
        header: "Address",
        cell: ({ row }) => (
            <div className="capitalize table-cell">{row.getValue("invoiceTo.city")}</div>
        ),
    },
    {
        id: "invoiceDetails.invoiceDate",
        accessorKey: "invoiceDetails.invoiceDate",
        header: "Invoice Date",
        cell: ({ row }) => (
            <div className="capitalize table-cell">{formatDateDDMMYY(row.getValue("invoiceDetails.invoiceDate"))}</div>
        ),
    },

    {
        id: "additionalInfo.paymentStatus",
        accessorKey: "additionalInfo.paymentStatus",
        header: "Payment Status",
        cell: ({ row }) => (
            <Badge variant="outline" className={cn("capitalize  px-3 text-sm font-medium shadow-sm rounded-none table-cell", statusStyles[row.getValue("additionalInfo.paymentStatus") as PaymentStatus])}>{row.getValue("additionalInfo.paymentStatus")}</Badge>
        ),
    },
    {
        id: "additionalInfo.paymentMethod",
        accessorKey: "additionalInfo.paymentMethod",
        header: "Payment Method",
        cell: ({ row }) => (
            <div className="capitalize table-cell">{row.getValue("additionalInfo.paymentMethod")}</div>
        ),
    },
    {
        id: "invoiceSummary.invoiceAmount",
        accessorKey: "invoiceSummary.invoiceAmount",
        header: "Amount",
        cell: ({ row }) => (
            <div className="capitalize table-cell">
                {formatCurrency(row.getValue("invoiceSummary.invoiceAmount"))}
            </div>
        ),
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => <ActionsCell row={row} />
    },
]

const ActionsCell = ({ row }: { row: Row<Invoices> }) => {
    const model = row.original;
    const businessId = useSelector((state: RootState) => state.authContext.activeBusiness._id);
    const dispatch = useDispatch();
    const router = useRouter();
    const deleteInvoice = async (id: string): Promise<boolean> => {
        try {
            const resp = await deleteInvoiceById(businessId, id);
            if (resp) {
                dispatch(removeInvoice(id));
            }
            return resp;
        } catch {
            return Promise.reject(false);
        }
    }
    const handleDownload = async () => {
        try {
            const response = await fetch(`/api/invoice/download?id=${model._id}`);
            if (!response.ok) {
                throw new Error('Download failed');
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `invoice-${model.invoiceDetails.invoicePrefix}${model.invoiceDetails.invoiceNo}.pdf`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

            toast.success('Invoice downloaded successfully', {
                duration: 2000
            });
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            toast.error('Failed to download invoice', {
                duration: 2000
            });
        }
    }

    const handleView = (id: string) => {
        const origin = window.location.origin;
        window.open(`${origin}/i/${id}`, '_blank');
    };

    const handleUpdate = () => {
        router.push(`/dashboard/invoices/add-invoices/${model._id}`);
    }
    const handlePayment = async (id: string, paymentStatus: PaymentStatus) => {
        try {
            const resp = await updatePaymentStatus(businessId, id, paymentStatus);
            if (resp) {
                toast.success('Payment Status Updated Successfully');
                dispatch(updateInvoiceStatus({ invoiceId: id, paymentStatus: paymentStatus }));
            }
        } catch {
            toast.error('Failed to update payment status');
        }
    }
    return (
        <ActionsDropDownRow
            handleDownload={handleDownload}
            handleView={handleView}
            deleteFunction={deleteInvoice}
            id={model._id}
            itemName={model.invoiceDetails.invoiceNo}
            name="Invoice"
            path="/dashboard/invoices"
            handleUpdate={handleUpdate}
            handlePayment={handlePayment}
        />
    );
}