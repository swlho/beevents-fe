import BackButton from "@/components/navigation/BackButton"
import {observer} from "@legendapp/state/react"
import Dashboard from "@/components/dashboard/Dashboard"

  
function UserDashboardPage() {

    return (
      <>
      <BackButton path={"javascript:history.go(-1)"} />
      <Dashboard />
      </>
    )
}

export default observer(UserDashboardPage)