"use client"

import { deleteCustomers } from "@/api/customers"
import { ActionsDropDownRow } from "@/components/table-def/ActionDropDownMenu"
import { removeCustomer } from "@/store/slices/customersSlice"
import { RootState } from "@/store/store"
import { Customers } from "@/types/definetions"
import { ColumnDef, Row } from "@tanstack/react-table"
import axios from "axios"
import { ChevronsUpDown } from "lucide-react"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"

export const Customerscolumns: ColumnDef<Customers>[] = [

    {
        id: "name",
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <div className="flex items-center justify-start cursor-pointer capitalize" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} >
                    Name
                    <ChevronsUpDown className="h-4 w-3 ml-3" />
                </div>
            )
        },
        cell: ({ row }) => <div className="capitalize space-y-1">
            <div className="font-medium text-left">{row.getValue("name")}</div>
        </div>,
    },

    {
        id: "email",
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => (
            <div className="capitalize table-cell">{row.getValue("email")}</div>
        ),
    },

    {
        id: "GSTIN",
        accessorKey: "GSTIN",
        header: "GSTIN",
        cell: ({ row }) => (
            <div className="capitalize table-cell">{row.getValue("GSTIN")}</div>
        ),
    },
    {
        id: "PAN",
        accessorKey: "PAN",
        header: "PAN",
        cell: ({ row }) => (
            <div className="capitalize table-cell">{row.getValue("PAN")}</div>
        ),
    },
    {
        id: "phone",
        accessorKey: "phone",
        header: "Phone",
        cell: ({ row }) => (
            <div className="capitalize table-cell">{row.getValue("phone")}</div>
        ),
    },
    {
        id: "address.city",
        accessorKey: "address.city", // Accessing the nested city inside the address
        header: "Address",
        cell: ({ row }) => (
            <div className="capitalize table-cell">
                {row.getValue("address.city")} {/* This will render the city value */}
            </div>
        ),
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => <ActionsCell row={row} />
    },
]

const ActionsCell = ({ row }: { row: Row<Customers> }) => {
    const model = row.original;
    const businessId = useSelector((state: RootState) => state.authContext.activeBusiness._id);
    const dispatch = useDispatch()
    const deleteCustomer = async (id: string): Promise<boolean> => {
        try {
            const response: boolean = await deleteCustomers(id, businessId);
            if (response) dispatch(removeCustomer(id))
            return response;
        } catch (error) {
            if (axios.isAxiosError(error)) return Promise.resolve(false);
            return Promise.resolve(false);
        }
    }
    const router = useRouter()
    const handleUpdate = (id: string) => {
        router.push(`customers?customersId=${id}`)
    }
    return (
        <ActionsDropDownRow
            deleteFunction={deleteCustomer}
            handleUpdate={handleUpdate}
            id={model._id}
            itemName={model.name}
            name="Customers"
            path="/dashboard/customers"
        />
    );
}