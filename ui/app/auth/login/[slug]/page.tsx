"use client"
import LoginForm from '@/components/auth/login-form'
import { notFound, useParams } from 'next/navigation'


function Page() {
    const { slug } = useParams()

    switch (slug) {
        case ("email"): {
            return <div className='py-10 bg-custome-black'><LoginForm /></div>
        }
        case ("apple"): {
            return notFound();
        }
        case ("google"): {
            return notFound();
        }
        default: notFound();
    }

}

export default Page