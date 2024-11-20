'use client'
import PrivacyPolicy from '@/components/home/pages/privacy';
import { notFound, useParams } from 'next/navigation'
import React from 'react'

function Page() {
    const params = useParams();
    const path: string = Array.isArray(params) ? params[0] : params.info;
    switch (path) {
        case "privacy-policy": {
            return <PrivacyPolicy/>
        }
        default: return notFound();
    }
}

export default Page