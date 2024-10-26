import RegisterOrLoginPage from "@/components/auth/authentication"

function Page() {
  return (
    <div className='bg-custome-dark'>
      <RegisterOrLoginPage type='signUp' path='/auth/register' />
    </div>
  )
}

export default Page