import RegisterOrLoginPage from "@/components/auth/authentication"

function page() {
  return (
    <div>
      <div className='bg-custome-dark'>
        <RegisterOrLoginPage  path='/auth/login' type='signIn' />
      </div>
    </div>
  )
}

export default page