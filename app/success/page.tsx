import BackButton from "@/components/navigation/BackButton"
import { Metadata } from "next"


export const metadata: Metadata = {
    description: "Beevents - Payment successful",
  }
  
  export default async function PaymentSucessPage() {
  
    return (
    <>
        <BackButton path={"/"} text={'Go to Home Page'}/>
        <h2>Payment successful! Your booking is now live.</h2>
    </>
    )
  }