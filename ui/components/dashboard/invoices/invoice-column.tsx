"use client"

import { ActionsDropDownRow } from "@/components/table-def/ActionDropDownMenu"
import { formatCurrency, formatDateDDMMYY } from "@/lib/utils"
import { Invoices } from "@/types/invoices"
import { ColumnDef, Row } from "@tanstack/react-table"
import { ChevronsUpDown } from "lucide-react"
import { toast } from "sonner"

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
            <div className="capitalize table-cell ">{row.getValue("additionalInfo.paymentStatus")}</div>
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


    const deleteInvoice = async (id: string): Promise<boolean> => {

        return Promise.resolve(id === "dkahuy");
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

    return (
        <ActionsDropDownRow
            handleDownload={handleDownload}
            handleView={handleView}
            deleteFunction={deleteInvoice}
            id={model._id}
            itemName={model.invoiceDetails.invoiceNo}
            name="Invoice"
            path="/dashboard/invoices"
            handleUpdate={() => { }}
        />
    );
}