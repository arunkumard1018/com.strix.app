"use client"
import { getAllInvoices } from "@/api/invoices"
import { TableComponent } from "@/components/table-def/TableComponent"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs } from "@/components/ui/tabs"
import { setInvoices } from "@/store/slices/invoicesSlice"
import { RootState } from "@/store/store"
import { ApiResponse } from "@/types/api-responses"
import { InvoicesData } from "@/types/invoices"
import { File, PlusCircle, Search } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Invoicescolumns } from "./invoice-column"


export default function InvoicesTable() {
    const dispatch = useDispatch();
    const businessId = useSelector((state: RootState) => state.authContext.activeBusiness._id);
    const invoiceData = useSelector((state: RootState) => state.invoicesData);
    const currentBusinessId = useSelector((state: RootState) => state.invoicesData.activeBusiness)
    const [pageIndex, setPageIndex] = useState(1);
    const [limit] = useState(20);
    const [totalPages, setTotalPages] = useState(invoiceData.pagination.totalPages);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchFlag, setSearchFlag] = useState(false);
    const [searchBadge, setSearchBadge] = useState("");


    const searchInvoice = () => {
        setSearchFlag(true);
        setSearchBadge(searchQuery)
    };

    // useEffect(() => {
    //     const loadInvoices = async (businessId: string) => {
    //         try {
    //             const response: ApiResponse<InvoicesData> = await getAllInvoices(businessId);
    //             if (response.result) {
    //                 dispatch(setInvoices({ ...response.result, activeBusiness: businessId }));
    //                 setTotalPages(response.result.pagination.totalPages); //CHANGE
    //             }
    //         } catch {
    //         }
    //     };
    //     if (businessId !== currentBusinessId) loadInvoices(businessId);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [businessId]);
    useEffect(() => {
        const loadInvoices = async (businessId: string, page: number, limit: number) => {
            try {
                const response: ApiResponse<InvoicesData> = await getAllInvoices(businessId, page, limit, searchQuery);
                setSearchFlag(false)
                if (response.result) {
                    dispatch(setInvoices({ ...response.result, activeBusiness: businessId }));
                    setTotalPages(response.result.pagination.totalPages);
                    setPageIndex(response.result.pagination.currentPage)
                }
            } catch (error) {
                console.error("Error fetching invoices", error);
            }
        };
        if (businessId !== currentBusinessId || pageIndex !== invoiceData.pagination.currentPage || searchFlag) {
            loadInvoices(businessId, pageIndex, limit);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [businessId, pageIndex, searchFlag]);


    if (!invoiceData.invoices) return <div className="text-center mt-10">Loading...</div>
    return (
        <div className="flex flex-col sm:py-4">
            <div className="grid flex-1 items-start gap-4 px-0 sm:px-6 sm:py-0 md:gap-8">
                <Tabs defaultValue="all">
                    <div className="flex items-center mb-5">
                        <div className="w-full flex items-center">
                            <Input type="text"
                                placeholder="Search In Invoice"
                                value={searchQuery}
                                onChange={(event) => setSearchQuery(event.target.value)}
                                onKeyDown={(event) => {
                                    if (event.key === "Enter") {
                                        searchInvoice();
                                    }
                                }}
                                className="w-[30%] rounded-none shadow-none"
                            />
                            <Button
                                className="mx-1 border-none rounded-none shadow-none bg-muted-foreground/30"
                                type="submit"
                                variant={"outline"}
                                onClick={() => { searchInvoice() }}
                            >
                                <Search size={20} />
                            </Button>
                            <div className="mx-4">
                                {searchBadge && <Badge variant={"outline"} >{searchBadge}</Badge>}
                            </div>
                        </div>
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
                    <TableComponent columns={Invoicescolumns} data={invoiceData.invoices} heading="Invoice Details" headingInfo="Manage You're Invoices"
                        smHiddenCells={["invoiceTo.city", "invoiceDetails.invoiceDate", "additionalInfo.paymentStatus", "additionalInfo.paymentMethod"]}
                        key={invoiceData.invoices.length}
                        isPaginationAvailable={false}
                        isSelectAvailable={false} />
                </Tabs>

                <div className="flex justify-between items-center py-4 px-4">
                    <Button
                        variant="outline"
                        size="sm"
                        className="rounded-none"
                        onClick={() => setPageIndex(pageIndex - 1)}
                        disabled={pageIndex <= 1}
                    >
                        Previous
                    </Button>
                    <div className="text-sm text-muted-foreground">
                        Page {pageIndex} of {totalPages}
                    </div>
                    <Button
                        variant="outline"
                        className="rounded-none"
                        size="sm"
                        onClick={() => setPageIndex(pageIndex + 1)}
                        disabled={pageIndex >= totalPages}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}
