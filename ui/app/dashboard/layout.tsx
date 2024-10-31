"use client"
import { getUsersInfo } from "@/api/auth";
import NavHeader from "@/components/dashboard/app-header";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { ThemeProvider } from "@/components/themes/theme-provider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { setUserData } from "@/store/slices/userSlice";
import { RootState, store } from "@/store/store";
import { useEffect, useState } from "react";
import { Provider, useDispatch, useSelector } from 'react-redux';

export default function Layout({ children }: { children: React.ReactNode }): React.JSX.Element {
    return (
        <Provider store={store}>
            <Dashboardlayout>{children}</Dashboardlayout>
        </Provider>
    );
}



export function Dashboardlayout({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();
    const authContext = useSelector((state: RootState) => state.authContext);
    const loadUserData = async () => {
        setLoading(true)
        try {
            const response = await getUsersInfo()
            console.log(response);
            dispatch(setUserData(response.data.user))
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!authContext.user) {
            loadUserData()
        }
    }, [])


    return (
        <>
            {loading ? <h1>Loading Data.....</h1> :
                <SidebarProvider>
                    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                        <AppSidebar />
                        <SidebarInset>
                            <NavHeader />
                            {children}
                        </SidebarInset>
                    </ThemeProvider>
                </SidebarProvider>
            }
        </>
    )
}
