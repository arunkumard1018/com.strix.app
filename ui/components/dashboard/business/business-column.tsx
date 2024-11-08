"use client"

import { ActionsDropDownRow } from "@/components/table-def/ActionDropDownMenu"
import { Business } from "@/store/slices/userSlice"
import { ColumnDef, Row } from "@tanstack/react-table"
import { ChevronsUpDown } from "lucide-react"
import Image from "next/image"

export const Businesscolumns: ColumnDef<Business>[] = [

    {
        id: "businessLogo",
        accessorKey: "businessLogo",
        header: "Logo",
        cell: ({ row }) => (
            <div className="relative size-14">
                <Image
                    alt="logo"
                    fill
                    className="aspect-square rounded-md object-contain"
                    src={row.getValue("businessLogo")}
                />
            </div>
        ),

    },


    {
        id: "name",
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <div className="flex items-center justify-start cursor-pointer capitalize" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} >
                    Business
                    <ChevronsUpDown className="h-4 w-3 ml-3" />
                </div>
            )
        },
        cell: ({ row }) => <div className="capitalize space-y-1">
            <div className="font-medium text-left">{row.getValue("name")}</div>
            <div className="text-xs md:hidden text-left"> GSTIN : {row.getValue("gstin")}</div>
        </div>,
    },

    {
        id: "catagory",
        accessorKey: "catagory",
        header: "Business Catagory",
        cell: ({ row }) => (
            <div className="capitalize table-cell">{row.getValue("catagory")}</div>
        ),
    },

    {
        id: "gstin",
        accessorKey: "gstin",
        header: "GSTIN",
        cell: ({ row }) => (
            <div className="capitalize table-cell">{row.getValue("gstin")}</div>
        ),
    },
    {
        id: "hsn",
        accessorKey: "hsn",
        header: "HSN",
        cell: ({ row }) => (
            <div className="capitalize table-cell">{row.getValue("hsn")}</div>
        ),
    },

    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => <BusinessActionsCell row={row} />
    },
]

const BusinessActionsCell = ({ row }: { row: Row<Business> }) => {
    const business = row.original;

    return (
        <ActionsDropDownRow
            deleteFunction={() => true}
            revalidator={(id:number) => {
                console.log(id,"Remove Business");
            }}
            id={business._id}
            itemName={business.name}
            name="Business"
            path="/dashboard/business"
        />
    );
}