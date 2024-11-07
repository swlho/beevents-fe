import BackButton from "@/components/navigation/BackButton"
import { Metadata } from "next"


export const metadata: Metadata = {
    description: "Beevents - Signup successful",
  }
  
  export default async function ConfirmationSuccessPage() {
  
    return (
    <>
        <BackButton path={"/"} text={'Go to Home Page'}/>
        <h1 className="mb-5 font-extrabold text-2xl">Signup successful!</h1> 
        <h2 className="mb-5">A confirmation email has been sent to you.  Please check your email inbox and confirm your email by clicking the confirmation link.</h2>
        <h3>If you cannot find the email, first check your &apos;Junk&apos; folder.  Otherwise contact the site admin.</h3>
    </>
    )
  }