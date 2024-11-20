"use client"
import { getAllInvoices } from "@/api/invoices"
import { TableComponent } from "@/components/table-def/TableComponent"
import { Button } from "@/components/ui/button"
import { Tabs } from "@/components/ui/tabs"
import { setInvoices } from "@/store/slices/invoicesSlice"
import { RootState } from "@/store/store"
import { ApiResponse } from "@/types/api-responses"
import { Invoices } from "@/types/invoices"
import { File, PlusCircle } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Invoicescolumns } from "./invoice-column"


export default function InvoicesTable() {
    const storeState = useSelector((state: RootState) => state);
    const dispatch = useDispatch();
    const businessId = storeState.authContext.activeBusiness._id;
    const invoiceList = storeState.invoices;

    useEffect(() => {
        const loadInvoices = async (Id: string) => {
            try {
                const invoices: ApiResponse<Invoices[]> = await getAllInvoices(Id);
                if (invoices.result) {
                    dispatch(setInvoices(invoices.result));
                }
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (_error: unknown) {
            }
        };
        loadInvoices(businessId);
    }, [businessId, dispatch]);
    if (!invoiceList) return <div className="text-center mt-10">Loading...</div>
    return (
        <div className="flex flex-col sm:py-4">
            <div className="grid flex-1 items-start gap-4 px-0 sm:px-6 sm:py-0 md:gap-8">
                <Tabs defaultValue="all">
                    <div className="flex items-center mx-2">
                        <div className="ml-auto flex items-center gap-2">
                            <Button size="sm" variant="outline" className="h-7 gap-1 rounded-none">
                                <File className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                    Export
                                </span>
                            </Button>
                            <Link href="invoices/add-invoices">
                                <Button size="sm" className="h-7 gap-1 rounded-none">
                                    <PlusCircle className="h-3.5 w-3.5" />
                                    <span className="sm:not-sr-only sm:whitespace-nowrap">
                                        Add Invoice
                                    </span>
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <TableComponent columns={Invoicescolumns} data={invoiceList} heading="Invoice Details" headingInfo="Manage You're Invoices"
                        smHiddenCells={["invoiceTo.address.city", "invoiceDate", "paymentStatus", "paymentMethod"]}
                        isSearchInputRequired
                        searchInputValue="invoiceTo.name"
                        key={invoiceList.length}
                        isSelectAvailable={false} />
                </Tabs>
            </div>
        </div>
    )
}
