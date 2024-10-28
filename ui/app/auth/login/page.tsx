"use client"
import RegisterOrLoginPage from "@/components/auth/authentication";
import { CodeResponse, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
function Page() {

  const responseGoogle = async (authResult: unknown) => {
    try {
      if (authResult && typeof authResult === 'object' && 'code' in authResult) {
        const { code } = authResult as CodeResponse;
        console.log('Authorization Code:', code);
        // You can now send this code to your backend for further processing
        
        const response = await axios.post("http://localhost:8001/api/auth/google",{code})
        console.log("Api Response",response)
        
      }
    } catch (error) {
      console.error("Error While Fetching Login Code", (error as Error).message)
    }
  }

  const handleGoogleSignIn = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code"
  })

  return (

    <div className='bg-custome-dark'>
      <RegisterOrLoginPage handleGoogleSignIn={handleGoogleSignIn} path='/auth/login' type='signIn' />
    </div>
  )
}

export default Page