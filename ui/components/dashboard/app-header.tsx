import { ModeToggle } from "@/components/reuse/theme-select"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarTrigger,
    useSidebar
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { useState } from "react"

function NavHeader() {
    const { isMobile } = useSidebar();
    const [isExpanded, setIsExpanded] = useState(true)
    const ToggleSideBarTrigger = () => {
        setIsExpanded(!isExpanded)
    }

    return (
        <header className={cn("flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 justify-between fixed z-50 bg-background shadow-sm", isMobile && "w-full mx-2", isExpanded ? "w-[calc(100vw-17rem)]" : "w-[calc(100vw-3rem)]")}>
            <div className="flex items-center gap-2 px-4">
                <div onClick={ToggleSideBarTrigger} className=""><SidebarTrigger className="-ml-1" /></div>
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem className="hidden md:block">
                            <BreadcrumbLink href="#">
                                Building Your Application
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block" />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="flex space-x-4 mx-8 ">
                <div><ModeToggle /></div>
            </div>
        </header>
    )
}

export default NavHeader