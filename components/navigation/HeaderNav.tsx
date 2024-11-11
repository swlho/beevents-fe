"use client"

import { Link } from "@/components/navigation/Link"
import LoginButtonDialog from "./LoginButtonDialog"
import { createClient } from "@/utils/supabase/client"
import SignOutButtonDialog from "./SignOutButtonDialog"
import GoToDashboardButton from "./GoToDashboardButton"
import { useContext } from "react"
import { StaffContext } from "@/lib/context/staff-provider"
import { UserContext } from "@/lib/context/user-provider"

export function HeaderNav() {

  const supabase = createClient()

 const user = useContext(UserContext)
 const userLoggedIn = user[0]
 const changeUserLoggedIn = user[2]
 console.log(userLoggedIn,"<---is user logged in");
 

  const { staff, staffLoggedIn, staff_id, logout } = useContext(StaffContext)
  const [staff$, changeStaff] = staff
  const [staff_id$, changeStaffId] = staff_id
  const [staffLoggedIn$, changeStaffLoggedIn] = staffLoggedIn

  if (!staff$ || !staff_id$ || staffLoggedIn$ === false) {
    console.log("no staff logged in")
  }

  function returnHeaderNavButtons(){ //Fn to conditionally render the correct Navbuttons
    let path = null
    if(!userLoggedIn && !staffLoggedIn$){
      return <LoginButtonDialog />
    } else if (user[0]){
      path = "/private/user/dashboard"
      return <div>
      <GoToDashboardButton path={path}/>
      <SignOutButtonDialog />
      </div>
    } else if (staffLoggedIn$ === true){
      path = "/private/staff/dashboard"
      changeUserLoggedIn(false)
      supabase.auth.signOut()
      return <div>
      <GoToDashboardButton path={path}/>
      <SignOutButtonDialog />
      </div>
    }
  }

  return (
    <header>
      <div className="container flex items-center justify-between py-6 mx-auto">
        <Link href="/" className="text-2xl font-semibold no-underline">
        <span>
            <b className="text-yellow-400">BEE</b>VENTS🐝
        </span>
        </Link>
        {returnHeaderNavButtons()}
      </div>
    </header>
  )
}