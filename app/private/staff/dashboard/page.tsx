import Dashboard from "@/components/dashboard/staff/Dashboard"
import BackButton from "@/components/navigation/BackButton"
import { Metadata } from "next"


export const metadata: Metadata = {
    description: "Beevents - Staff Dashboard",
  }
  
  export default async function StaffDashboardPage() {
  
    return (
      <>
      <BackButton path={"/"} text={'Go to Home Page'}/>
      <h2 className="font-medium mb-5">Welcome to the staff dashboard</h2>
      <Dashboard />
      </>
    )
  }