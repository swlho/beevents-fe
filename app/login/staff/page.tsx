import BackButton from "@/components/navigation/BackButton"
import { Metadata } from "next"

export const metadata: Metadata = {
    description: "Beevents - Login",
  }
  
  export default async function StaffLoginPage() {
  
    return (
      <>
      <BackButton path={"javascript:history.go(-1)"} />
      <h1>Staff login</h1>
      </>
    )
  }