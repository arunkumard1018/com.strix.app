"use client"
import NavHeader from "@/components/dashboard/layout/app-header";
import { AppSidebar } from "@/components/dashboard/layout/app-sidebar";
import OnboardingPage from "@/components/dashboard/layout/onboarding";
import { ThemeProvider } from "@/components/themes/theme-provider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { setActiveBusiness, setUserData } from "@/store/slices/userSlice";
import { RootState, store } from "@/store/store";
import { useEffect } from "react";
import { Provider, useDispatch, useSelector } from 'react-redux';

export default function Layout({ children }: { children: React.ReactNode }): React.JSX.Element {
    return (
        <Provider store={store}>
            <Dashboardlayout>{children}</Dashboardlayout>
        </Provider>
    );
}


export function Dashboardlayout({ children }: { children: React.ReactNode }) {
    const dispatch = useDispatch();
    const authContext = useSelector((state: RootState) => state.authContext);

    useEffect(() => {
        if (typeof window !== undefined && authContext.user === undefined) {
            const data = window.localStorage.getItem("userData");
            if (data && data !== undefined) {
                dispatch(setUserData(JSON.parse(data)))
            }
            const activeBusiness = window.localStorage.getItem("activeBusiness");
            if (activeBusiness && activeBusiness != undefined) {
                dispatch(setActiveBusiness(JSON.parse(activeBusiness)))
            }
        }
    }, [authContext.user, dispatch])
    console.log(authContext.activeBusiness._id)
    return (
        <>
            {authContext.user === undefined ? <div className="text-center mt-20">Loading...</div> :
                authContext.user?.business === undefined || authContext.user?.business.length === 0 ? <div><OnboardingPage /></div> :
                    <SidebarProvider>
                        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                            <AppSidebar />
                            <SidebarInset>
                                <NavHeader />
                                <div className="mt-20">
                                    {children}
                                </div>
                            </SidebarInset>
                        </ThemeProvider>
                    </SidebarProvider>

            }
        </>
    )
}
