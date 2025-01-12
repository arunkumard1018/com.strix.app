"use client"
import { ModeToggle } from "@/components/reuse/theme-select"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarTrigger,
    useSidebar
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

function NavHeader() {
    const { isMobile } = useSidebar();
    const [isExpanded, setIsExpanded] = useState(true);
    const pathname = usePathname();
    const paths = pathname.split("/").filter(Boolean); // Remove leading/trailing slashes

    const ToggleSideBarTrigger = () => {
        setIsExpanded(!isExpanded);
    };

    // Function to capitalize the first letter of a segment
    const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

    return (
        <header
            className={cn(
                "no-print flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 justify-between fixed z-50 bg-background shadow-sm w-screen",
                isExpanded && !isMobile ? "md:w-[calc(100vw-17rem)]" : "md:w-[calc(100vw-3rem)]"
            )}
        >
            <div className="flex items-center gap-2 px-4">
                <div onClick={ToggleSideBarTrigger} className="">
                    <SidebarTrigger className="-ml-1" />
                </div>
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                    <BreadcrumbList>
                        {paths.length === 1 ? (
                            // If there's only one segment, show it as "Dashboard"
                            <BreadcrumbItem>
                                <BreadcrumbPage className="capitalize">{capitalize(paths[0])}</BreadcrumbPage>
                            </BreadcrumbItem>
                        ) : (
                            // Render full breadcrumb for multiple segments
                            paths.map((segment, index) => {
                                const href = `/${paths.slice(0, index + 1).join("/")}`; // Build the path for each segment
                                const isLast = index === paths.length - 1; // Check if it's the last segment
                                return (
                                    <BreadcrumbItem key={index}>
                                        {isLast ? (
                                            <BreadcrumbPage className="capitalize">{capitalize(segment)}</BreadcrumbPage>
                                        ) : (
                                            <>
                                                <Link href={href} className="capitalize">
                                                    {capitalize(segment)}
                                                </Link>
                                                {/* <BreadcrumbSeparator className="hidden md:block" /> */}
                                                <ChevronRight size={15}/>
                                            </>
                                        )}
                                    </BreadcrumbItem>
                                );
                            })
                        )}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="flex space-x-4 mx-8">
                <div>
                    <ModeToggle />
                </div>
            </div>
        </header>
    );
}

export default NavHeader