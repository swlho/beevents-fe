"use client"

import BackButton from "@/components/navigation/BackButton"
import {observer} from "@legendapp/state/react"
import Dashboard from "@/components/dashboard/Dashboard"
import { UserContext } from "@/app/context/user-provider"
import { useContext } from "react"

  
function UserDashboardPage() {

    const data = useContext(UserContext)
    console.log(data)

    return (
      <>
      <BackButton path={"javascript:history.go(-1)"} />
      <Dashboard />
      </>
    )
}

export default observer(UserDashboardPage)