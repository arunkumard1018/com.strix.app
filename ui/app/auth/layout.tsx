import { GoogleOAuthProvider } from '@react-oauth/google'
import React from 'react'

function AutehnticationLayout({ children }: { children: React.ReactNode }) {
    return (
        <GoogleOAuthProvider clientId="852761542997-kk8hil8g7totjurlcal0ut6u7rgbgifv.apps.googleusercontent.com">
            <div>
                {children}
            </div>
        </GoogleOAuthProvider>
    )
}

export default AutehnticationLayout