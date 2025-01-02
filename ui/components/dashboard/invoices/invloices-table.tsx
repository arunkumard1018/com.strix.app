"use client"
import { getAllInvoices } from "@/api/invoices"
import { TableComponent } from "@/components/table-def/TableComponent"
import { Button } from "@/components/ui/button"
import { Tabs } from "@/components/ui/tabs"
import { setInvoices } from "@/store/slices/invoicesSlice"
import { RootState } from "@/store/store"
import { ApiResponse } from "@/types/api-responses"
import { InvoicesData } from "@/types/invoices"
import { File, PlusCircle, Upload } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Invoicescolumns } from "./invoice-column"


export default function InvoicesTable() {
    const dispatch = useDispatch();
    const businessId = useSelector((state: RootState) => state.authContext.activeBusiness._id);
    const invoiceList = useSelector((state: RootState) => state.invoicesData.invoices);
    // const [file, setFile] = useState<File>();

    useEffect(() => {
        const loadInvoices = async (businessId: string) => {
            try {
                const response: ApiResponse<InvoicesData> = await getAllInvoices(businessId);
                if (response.result) {
                    dispatch(setInvoices(response.result));
                }
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (_error: unknown) {
            }
        };
        if (invoiceList.length === 0) loadInvoices(businessId);
    }, [businessId, dispatch, invoiceList]);

    const handleFileUpload = async (file: File) => {
        console.log("uploading file");
        console.log("file", file);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', file.name);
        console.log("formData", formData);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            handleFileUpload(file);
        }
    };

    if (!invoiceList) return <div className="text-center mt-10">Loading...</div>
    return (
        <div className="flex flex-col sm:py-4">
            <div className="grid flex-1 items-start gap-4 px-0 sm:px-6 sm:py-0 md:gap-8">
                <Tabs defaultValue="all">
                    <div className="flex items-center mx-2">
                        <div className="ml-auto flex items-center gap-2">
                            <Button size="sm" variant="outline" className="h-7 gap-1 rounded-none">
                                <Upload className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                    Upload
                                </span>
                                <input
                                    disabled={true}
                                    type="file"
                                    onChange={handleFileChange}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    aria-label="Upload file"
                                />
                            </Button>
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
                        smHiddenCells={["invoiceTo.city", "invoiceDetails.invoiceDate", "additionalInfo.paymentStatus", "additionalInfo.paymentMethod"]}
                        isSearchInputRequired
                        searchInputValue="invoiceTo.name"
                        key={invoiceList.length}
                        isSelectAvailable={false} />
                </Tabs>
            </div>
        </div>
    )
}
