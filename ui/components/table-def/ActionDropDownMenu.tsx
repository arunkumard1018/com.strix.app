"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
import { ConfirmationDialog } from "./ConfirmationDialog"
import { PaymentStatus } from "../dashboard/invoices/types"

const paymentStatus: PaymentStatus[] = ["Paid", "Processing", "Due"];
export function ActionsDropDownRow({ id, name, itemName, deleteFunction, handleUpdate, handleDownload, handleView,handlePayment }:
    {
        id: string, name: string, path: string, itemName?: string,
        deleteFunction: (id: string) => Promise<boolean>,
        handleUpdate: (id: string) => void,
        handleDownload?: (id: string) => void,
        handleView?: (id: string) => void,
        handlePayment?: (id: string, paymentStatus: PaymentStatus) => void,
    }) {

    const [isDialogOpen, setDialogOpen] = useState(false); // State to control dialog visibility
    const route = useRouter();

    const handleDelete = async () => {
        try {
            const resp = await deleteFunction(id);
            if (resp) {
                toast.success(`${name} Deleted Successfully!`);
                route.refresh();
            } else {
                toast.error(`Error While Deleting ${name}!`);
            }
        } catch {
            toast.error(`Error While Deleting ${name}!`);
        }
        setDialogOpen(false);
    };
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel className="disabled:opacity-50 disabled:cursor-not-allowed">Actions</DropdownMenuLabel>
                    {handleView && (
                        <DropdownMenuItem className="cursor-pointer" onClick={() => handleView(id)}>
                            View {name}
                        </DropdownMenuItem>
                    )}

                    {handlePayment && <DropdownMenuSub>
                        <DropdownMenuSubTrigger>Update Status</DropdownMenuSubTrigger>
                        <DropdownMenuSubContent >
                            <DropdownMenuGroup >
                                {paymentStatus.map((status: PaymentStatus) => (
                                    <DropdownMenuItem key={status} onClick={() =>  handlePayment(id, status)}>
                                        {status}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuGroup>
                        </DropdownMenuSubContent>
                    </DropdownMenuSub>}

                    <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => navigator.clipboard.writeText(String(id))}>
                        Copy {name} ID
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer" onClick={() => handleUpdate(id)}>Update {name}</DropdownMenuItem>
                    {handleDownload && (
                        <DropdownMenuItem className="cursor-pointer" onClick={() => handleDownload(id)}>
                            Download {name}
                        </DropdownMenuItem>
                    )}
                    <DropdownMenuItem className="cursor-pointer" onClick={() => setDialogOpen(true)}>Delete {name}</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Alert Dialog for Deletion */}
            <ConfirmationDialog
                open={isDialogOpen}
                onOpenChange={setDialogOpen}
                title={`Delete ${itemName}?`}
                description={`Are you sure you want to delete ${name}? This action cannot be undone.`}
                confirmText="Delete"
                cancelText="Cancel"
                onConfirm={handleDelete}
            />
        </div>
    )
}



