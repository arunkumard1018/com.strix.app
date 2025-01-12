"use client"

import { deleteBusiness } from "@/api/business"
import { ActionsDropDownRow } from "@/components/table-def/ActionDropDownMenu"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast"
import { Business, removeBusiness } from "@/store/slices/userSlice"
import { RootState } from "@/store/store"
import { ColumnDef, Row } from "@tanstack/react-table"
import axios from "axios"
import { ChevronsUpDown } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"

export const Businesscolumns: ColumnDef<Business>[] = [

    {
        id: "logo",
        accessorKey: "logo",
        header: "Logo",
        cell: ({ row }) => (
            <div className="relative size-14">
                <Image
                    alt="logo"
                    fill
                    className="aspect-square rounded-md object-contain"
                    src={row.getValue("logo")}
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
        id: "city",
        accessorKey: "city",
        header: "City",
        cell: ({ row }) => (
            <div className="capitalize table-cell">{row.getValue("city")}</div>
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
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => <BusinessActionsCell row={row} />
    },
]

const BusinessActionsCell = ({ row }: { row: Row<Business> }) => {
    const business = row.original;
    const authContext = useSelector((state: RootState) => state.authContext)
    const router = useRouter();
    const dispatch = useDispatch()
    const {toast} = useToast();
    const deleteBusines = async (businessId: string): Promise<boolean> => {
        if (authContext.user?.business?.length === 1) {
            toast({
                variant: "destructive",
                title: "Business Can't be Deleted",
                description: `Atleast One Business Should Be There`,
                action: <ToastAction altText="Ok" >close</ToastAction>,
            })
            return Promise.resolve(false);
        }
        if (authContext.activeBusiness._id === businessId) {
            toast({
                variant: "destructive",
                title: "Active Business Can't be Deleted",
                description: `Change The Active Business to another to Delete`,
                action: <ToastAction altText="Ok" >close</ToastAction>,
            })
            return Promise.resolve(false);
        }
        try {
            const response: boolean = await deleteBusiness(businessId);
            if (response) dispatch(removeBusiness(businessId));
            return response;
        } catch (error) {
            if(axios.isAxiosError(error)) return Promise.resolve(false);
            return Promise.resolve(false);
        }
    }

    const handleUpdate = () => {
        router.push(`/dashboard/business/add-business/${business._id}`);
    }

    return (
        <ActionsDropDownRow
            deleteFunction={deleteBusines}
            id={business._id}
            itemName={business.name}
            name="Business"
            path="/dashboard/business"
            handleUpdate={handleUpdate}
        />
    );
}