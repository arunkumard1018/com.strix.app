"use client"
import { ThemeProvider } from '@/components/themes/theme-provider';
import { store } from "@/store/store";
import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';
import { Provider } from 'react-redux';

function AutehnticationLayout({ children }: { children: React.ReactNode }) {
    const googleClient: string = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "GOOGLE ID UNDEFINED";
    return (
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem forcedTheme='dark' disableTransitionOnChange>
            <GoogleOAuthProvider clientId={googleClient}>
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