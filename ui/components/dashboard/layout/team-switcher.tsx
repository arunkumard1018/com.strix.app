"use client"

import { ChevronsUpDown, Plus } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { RootState } from "@/store/store"
import Image from "next/image"
import { useDispatch, useSelector } from "react-redux"
import { setActiveBusiness } from "@/store/slices/userSlice"
import Link from "next/link"
import { useState } from "react"
export function BusinessSwitcher() {
  const authContext = useSelector((state: RootState) => state.authContext);
  const [isDropDownOpen, setisDropDownOpen] = useState(false);
  const { isMobile } = useSidebar();
  const dispatch = useDispatch();
  const [activeTeam, setActiveTeam] = useState(authContext.activeBusiness);

  const toggleDropdown = () => {
    setisDropDownOpen(prevState => !prevState);
  };

  return (
    <SidebarMenu onClick={toggleDropdown}>
      <SidebarMenuItem>
        <DropdownMenu open={isDropDownOpen} onOpenChange={setisDropDownOpen}>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              onClick={toggleDropdown} // Toggle dropdown on button click
            >
              <div className="flex relative aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
                <Image src={activeTeam.logo} fill alt="" className="object-contain size-8" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {activeTeam.name}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-none"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
            onClick={toggleDropdown}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Teams
            </DropdownMenuLabel>
            {authContext.user?.business?.map((team, index) => (
              <DropdownMenuItem
                key={team._id}
                onClick={() => {
                  setActiveTeam(team);
                  dispatch(setActiveBusiness(team));
                  setisDropDownOpen(false); // Close dropdown after selecting a team
                }}
                className="gap-2 p-2 hover:rounded-none"
              >
                <div className="flex relative size-6 items-center justify-center rounded-sm border">
                  <Image src={team.logo} fill alt="" className="object-contain" />
                </div>
                {team.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <Link href={"/dashboard/business/add-business"}>
                <div className="font-medium text-muted-foreground">Add Business</div>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
