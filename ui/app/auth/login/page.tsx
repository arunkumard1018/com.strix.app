"use client"
import { authenticateGoogleCode, AuthResponse } from "@/api/auth";
import LoginForm from "@/components/auth/login-form";
import { setActiveBusiness, setUserData } from "@/store/slices/userSlice";
import { ApiResponse } from "@/types/api-responses";
import { CodeResponse, useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
function Page() {
  const dispatch = useDispatch();
  const router = useRouter();
  const responseGoogle = async (authResult: unknown) => {
    try {
      if (authResult && typeof authResult === 'object' && 'code' in authResult) {
        const { code } = authResult as CodeResponse;
        const response: ApiResponse<AuthResponse> = await authenticateGoogleCode(code);
        console.log(response)
        if (response.result) {
          console.log("SETING RESPONSE CONTEXT")
          dispatch(setUserData(response.result?.user));
          if (response.result.user.business.length !== 0) {
            dispatch(setActiveBusiness(response.result.user.business[0]))
          }
          router.push("/dashboard")
        }
      }
    } catch (error) {
      /**Alert to Be Implemented */
      console.error("Error While Fetching Login Code", (error as Error).message)
    }
  }

  const handleGoogleSignIn = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code"
  })

  return (
    <div className='bg-black'>
      <div className='my-5 bg-custome-black'><LoginForm handleGoogleSignIn={handleGoogleSignIn} /></div>
    </div>
  )
}

export default Page