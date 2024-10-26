"use client"
import RegisterForm from '@/components/auth/register-form'
import { notFound, useParams } from 'next/navigation'


function Page() {
  const {slug} = useParams()
  console.log(slug)

  switch (slug) {
    case ("email") : {
      return <div className='py-10 bg-custome-black'><RegisterForm/></div>
    }
    case ("apple") : {
      return notFound();
    }
    case ("google") : {
      return notFound();
    }
    default : notFound();
  } 

}

export default Page