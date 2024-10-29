import { ThemeProvider } from "@/components/themes/theme-provider";

export default function RootLayout({ children }: {children:React.ReactNode}) {
    return (
        <>
            <html lang="en" suppressHydrationWarning>
                <head />
                <body suppressHydrationWarning >
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        {children}
                    </ThemeProvider>
                </body>
            </html>
        </>
    )
}