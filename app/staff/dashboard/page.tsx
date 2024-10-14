import Dashboard from "@/components/dashboard/Dashboard"
import BackButton from "@/components/navigation/BackButton"
import { Metadata } from "next"


export const metadata: Metadata = {
    description: "Beevents - Staff Dashboard",
  }
  
  export default async function StaffDashboardPage() {
  
    return (
      <>
      <BackButton path={"/"} text={'Go to Home Page'}/>
      <Dashboard />
      </>
    )
  }