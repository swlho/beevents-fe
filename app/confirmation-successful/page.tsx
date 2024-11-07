import BackButton from "@/components/navigation/BackButton"
import { Metadata } from "next"


export const metadata: Metadata = {
    description: "Beevents - Email confirmation successful",
  }
  
  export default async function ConfirmationSuccessPage() {
  
    return (
    <>
        <BackButton path={"/"} text={'Go to Home Page'}/>
        <h2>Email confirmation successful! Your account is now live.</h2>
    </>
    )
  }