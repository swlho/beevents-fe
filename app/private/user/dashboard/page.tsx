"use client"

import BackButton from "@/components/navigation/BackButton"
import Dashboard from "@/components/dashboard/user/Dashboard"

  
function UserDashboardPage() {

    return (
      <>
      <BackButton path={"javascript:history.go(-1)"} />
      <Dashboard />
      </>
    )
}

export default UserDashboardPage