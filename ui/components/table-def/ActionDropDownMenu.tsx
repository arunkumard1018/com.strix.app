"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ConfirmationDialog } from "./ConfirmationDialog"
import { ToastAction } from "../ui/toast"
import { useToast } from "@/hooks/use-toast"

export function ActionsDropDownRow({ id, name, path, itemName, deleteFunction }:
    {
        id: string, name: string, path: string, itemName?: string,
        deleteFunction: (id: string) => Promise<boolean>,
    }) {

    const [isDialogOpen, setDialogOpen] = useState(false); // State to control dialog visibility
    const route = useRouter();
    const { toast } = useToast();

    const handleDelete = async () => {
        const resp = await deleteFunction(id);
        if (resp) {
            toast({
                variant: "success",
                title: `${name} Deleted Successfully!`,
                description: `${name} ${itemName} Delete.`,
                action: <ToastAction altText="Ok" >close</ToastAction>,
            })
            route.refresh();
        } else {
            toast({
                variant: "destructive",
                title: `Error While Deleting ${name}!`,
                description: `${name} ${itemName} Failed to Delete.`,
                action: <ToastAction altText="Ok" >close</ToastAction>,
            })
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
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                        onClick={() => navigator.clipboard.writeText(String(id))}>
                        Copy {name} ID
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <Link href={`${path}/add-${name.toLowerCase()}/${id}`}>
                        <DropdownMenuItem>Update {name}</DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem onClick={() => setDialogOpen(true)}>Delete {name}</DropdownMenuItem>
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



