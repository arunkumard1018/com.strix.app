"use client"
import { TableComponent } from "@/components/table-def/TableComponent"
import { Button } from "@/components/ui/button"
import { Tabs } from "@/components/ui/tabs"
import { RootState } from "@/store/store"
import { File, PlusCircle } from "lucide-react"
import Link from "next/link"
import { useSelector } from "react-redux"
import { Businesscolumns } from "./business-column"


export default function BusinessTable() {
    const businessList = useSelector((state: RootState) => state.authContext.user?.business);
    if(!businessList) return <div>Loading...</div>
    return (
        <div className="flex flex-col sm:py-4">
            <div className="grid flex-1 items-start gap-4 px-0 sm:px-6 sm:py-0 md:gap-8">
                <Tabs defaultValue="all">
                    <div className="flex items-center">
                        <div className="ml-auto flex items-center gap-2">
                            <Button size="sm" variant="outline" className="h-7 gap-1 rounded-none ">
                                <File className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                    Export
                                </span>
                            </Button>
                            <Link href="business/add-business">
                                <Button size="sm" className="h-7 gap-1 rounded-none">
                                    <PlusCircle className="h-3.5 w-3.5" />
                                    <span className="sm:not-sr-only sm:whitespace-nowrap">
                                        Add New Business
                                    </span>
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <TableComponent columns={Businesscolumns} data={businessList} heading="Business Details" headingInfo="Manage You Business"
                        smHiddenCells={["GSTIN", "catagory", "HSN"]}
                        isSearchInputRequired={false}
                        searchInputValue=""
                        key={businessList.length}
                        isSelectAvailable={false} />
                </Tabs>
            </div>
        </div>
    )
}