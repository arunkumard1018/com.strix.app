import { ThemeProvider } from '@/components/themes/theme-provider'
import React from 'react'
import { Toaster } from 'sonner'

function layout({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <div className="max-w-4xl mx-auto p-4 sm:p-8">
                {children}
            </div>
            <Toaster />
        </ThemeProvider>
    )
}

export default layout