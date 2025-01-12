"use client"

import { logoutUser } from "@/api/auth";
import { logoff } from "@/app/actions";
import { NavFeatures } from "@/components/dashboard/layout/nav-features";
import { NavMain } from "@/components/dashboard/layout/nav-main";
import { NavUser } from "@/components/dashboard/layout/nav-user";
import { BusinessSwitcher } from "@/components/dashboard/layout/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail
} from "@/components/ui/sidebar";
import { clearUser } from "@/store/slices/userSlice";
import { RootState } from "@/store/store";
import {
  AudioWaveform,
  BookOpen,
  Box,
  Building2,
  Command,
  FileText,
  GalleryVerticalEnd,
  LayoutDashboard,
  Map,
  PieChart,
  Settings2,
  Users
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
// import statuc

// This is sample data.
export const data = {
  user: {
    name: "user",
    email: "m@example.com",
    picture: "undefined",
  },
  business: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Invoices",
      url: "/dashboard/invoices",
      icon: FileText,
    },
    {
      title: "Business",
      url: "/dashboard/business",
      icon: Building2,
    },
    {
      title: "Customers",
      url: "/dashboard/customers",
      icon: Users,
    },
    {
      title: "Products",
      url: "#",
      icon: Box,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
    },
  ],
  features: [
    {
      name: "Documentation",
      url: "#",
      icon: BookOpen,
    },
    {
      name: "Report",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const dispatch = useDispatch();
  const authContext = useSelector((state: RootState) => state.authContext);
  const doLogout = async () => {
    try {
      await logoff();
      await logoutUser();
    } catch {
      toast.error("Error While Logging Out");
    } finally {
      dispatch(clearUser());
      window.location.href = "/auth/login";
    }
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <BusinessSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavFeatures projects={data.features} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={authContext.user} logout={doLogout} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

