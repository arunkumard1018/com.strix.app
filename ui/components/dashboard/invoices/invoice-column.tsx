"use client"

import { ActionsDropDownRow } from "@/components/table-def/ActionDropDownMenu"
import { formatCurrency, formatDateDDMMYY } from "@/lib/utils"
import { Invoices } from "@/types/invoices"
import { ColumnDef, Row } from "@tanstack/react-table"
import { ChevronsUpDown } from "lucide-react"

export const Invoicescolumns: ColumnDef<Invoices>[] = [
    {
        id: "invoiceNo",
        accessorKey: "invoiceNo",
        header: ({ column }) => {
            return (
                <div className="flex items-center justify-start cursor-pointer capitalize" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} >
                    Invoice No
                    <ChevronsUpDown className="h-4 w-3 ml-3" />
                </div>
            )
        },
        cell: ({ row }) => <div className="capitalize space-y-1">
            <div className="font-medium text-left">{row.getValue("invoiceNo")}</div>
        </div>,
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
        id: "invoiceTo.address.city",
        accessorKey: "invoiceTo.address.city",
        header: "Address",
        cell: ({ row }) => (
            <div className="capitalize table-cell">{row.getValue("invoiceTo.address.city")}</div>
        ),
    },
    {
        id: "invoiceDate",
        accessorKey: "invoiceDate",
        header: "Invoice Date",
        cell: ({ row }) => (
            <div className="capitalize table-cell">{formatDateDDMMYY(row.getValue("invoiceDate"))}</div>
        ),
    },

    {
        id: "paymentStatus",
        accessorKey: "paymentStatus",
        header: "Payment Status",
        cell: ({ row }) => (
            <div className="capitalize table-cell ">{row.getValue("paymentStatus")}</div>
        ),
    },
    {
        id: "paymentMethod",
        accessorKey: "paymentMethod",
        header: "Payment Method",
        cell: ({ row }) => (
            <div className="capitalize table-cell">{row.getValue("paymentMethod")}</div>
        ),
    },
    {
        id: "invoiceAmount",
        accessorKey: "invoiceAmount",
        header: "Amount",
        cell: ({ row }) => (
            <div className="capitalize table-cell">
                {formatCurrency(row.getValue("invoiceAmount"))}
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
    // const businessId = useSelector((state: RootState) => state.authContext.activeBusiness._id);
    // const dispatch = useDispatch()
    const deleteCustomer = async (id: string): Promise<boolean> => {
        // try {
        //     const response: boolean = await deleteCustomers(id, businessId);
        //     if (response) dispatch(removeCustomer(id))
        //     return response;
        // } catch (error) {
        //     if (axios.isAxiosError(error)) return Promise.resolve(false);
        //     return Promise.resolve(false);
        // }
        return Promise.resolve(id==="dkahuy");
    }
    return (
        <ActionsDropDownRow
            deleteFunction={deleteCustomer}
            id={model._id}
            itemName={model.invoiceNo}
            name="Invoices"
            path="/dashboard/invoices"
        />
    );
}