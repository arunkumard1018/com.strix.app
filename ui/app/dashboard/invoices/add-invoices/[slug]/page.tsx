'use client'
import { useParams } from 'next/navigation'
import React from 'react'

function Page() {
    const params = useParams()
    return (
        <div>Update Invoice {params.slug}</div>
    )
}

export default Page