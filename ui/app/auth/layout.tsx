"use client"
import { GoogleOAuthProvider } from '@react-oauth/google'
import React from 'react'
import { Provider } from 'react-redux';
import { store } from "@/store/store";
import { ThemeProvider } from '@/components/themes/theme-provider';

function AutehnticationLayout({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <GoogleOAuthProvider clientId="852761542997-kk8hil8g7totjurlcal0ut6u7rgbgifv.apps.googleusercontent.com">
                <Provider store={store}>
                    <div>
                        {children}
                    </div>
                </Provider>
            </GoogleOAuthProvider>
        </ThemeProvider>
    )
}

export default AutehnticationLayout