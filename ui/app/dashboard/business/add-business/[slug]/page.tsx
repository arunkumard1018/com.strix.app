"use client"
import { useParams } from "next/navigation"

function Page() {
    const params = useParams()
    return (
        <div className='px-10 text-center'>
            Update Business With Id {params.slug}
        </div>
    )
}

export default Page