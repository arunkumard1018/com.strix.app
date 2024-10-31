"use client"
import { GoogleOAuthProvider } from '@react-oauth/google'
import React from 'react'
import { Provider } from 'react-redux';
import { store } from "@/store/store";

function AutehnticationLayout({ children }: { children: React.ReactNode }) {
    return (
        <GoogleOAuthProvider clientId="852761542997-kk8hil8g7totjurlcal0ut6u7rgbgifv.apps.googleusercontent.com">
            <Provider store={store}>
                <div>
                    {children}
                </div>
            </Provider>
        </GoogleOAuthProvider>
    )
}

export default AutehnticationLayout