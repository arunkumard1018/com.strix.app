"use client"
import NavHeader from "@/components/dashboard/app-header";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { ThemeProvider } from "@/components/themes/theme-provider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { store } from "@/store/store";
import { Provider } from 'react-redux';

export default function Layout({ children }: { children: React.ReactNode }): React.JSX.Element {
    return (
        <Provider store={store}>
            <Dashboardlayout>{children}</Dashboardlayout>
        </Provider>
    );
}



export function Dashboardlayout({ children }: { children: React.ReactNode }) {
    // const [loading, setLoading] = useState(false)
    // const dispatch = useDispatch();
    // const authContext = useSelector((state: RootState) => state.authContext);
    // const loadUserData = async () => {
    //     setLoading(true)
    //     try {
    //         const response = await getUsersInfo()
    //         console.log(response);
    //         dispatch(setUserData(response.data.user))
    //     } catch (error) {
    //         console.log(error)
    //     } finally {
    //         setLoading(false);
    //     }
    // }

    // useEffect(() => {
    //     if (!authContext.user) {
    //         loadUserData()
    //     }
    // }, [])


    return (
        <>
                <SidebarProvider>
                    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                        <AppSidebar />
                        <SidebarInset>
                            <NavHeader />
                            <div className="mt-20">{children}</div>
                        </SidebarInset>
                    </ThemeProvider>
                </SidebarProvider>
        </>
    )
}
