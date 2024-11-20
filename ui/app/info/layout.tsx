import { Footer } from "@/components/home/Footer"
import NavBar from "@/components/home/pages/header"
import { ThemeProvider } from "@/components/themes/theme-provider"

function layout({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem forcedTheme='light' disableTransitionOnChange>
            <div className="bg-white">
                <nav><NavBar /></nav>
                <section>{children}</section>
                <footer className="mx-2 md:mx-36"><Footer /></footer>
            </div>
        </ThemeProvider>
    )
}

export default layout