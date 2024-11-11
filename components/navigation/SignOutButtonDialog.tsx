"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
  } from "@/components/ui/dialog"

import { Button } from "../ui/button"
import { useContext, useState } from "react";
import { UserContext } from "@/lib/context/user-provider";
import { StaffContext } from "@/lib/context/staff-provider";

function SignOutButtonDialog() {

    const [open, setOpen] = useState(false);
    const user = useContext(UserContext)
    const userLoggedIn = user[0]
    const changeUserLoggedIn = user[2]
    console.log(userLoggedIn,"<---is user logged in");
    
   
     const { staff, staffLoggedIn, staff_id, logout } = useContext(StaffContext)
     const [staff$, changeStaff] = staff
     const [staff_id$, changeStaffId] = staff_id
     const [staffLoggedIn$, changeStaffLoggedIn] = staffLoggedIn
     const logoutStaff = logout

    const handleClick = () => {
        setOpen(false)
    }

    const handleSubmit = () => {
      logoutStaff()
    }

    function returnLogoutButton(userLoggedIn, staffLoggedIn$){
      if (userLoggedIn) {
        return <form action="/auth/signout" method="post">
        <Button className="bg-red-400 font-medium rounded-2xl hover:bg-red-200" type="submit">
          Confirm
        </Button>
        </form>
      } else if (staffLoggedIn$){
        return <form onSubmit={handleSubmit} method="post">
        <Button className="bg-red-400 font-medium rounded-2xl hover:bg-red-200" type="submit">
          Confirm
        </Button>
        </form>
      }
    }

  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogTrigger asChild>
      <Button id="login" className="bg-yellow-400 font-medium rounded-2xl text-gray-600 hover:bg-yellow-200">Sign Out</Button>
      </DialogTrigger>
      <DialogContent className="grid sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Sign Out</DialogTitle>
          <DialogDescription>
            Are you sure you want to sign out?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
        <Button className="w-20 bg-yellow-400 font-medium rounded-2xl text-gray-600 hover:bg-yellow-200" onClick={handleClick}>Cancel</Button>
        {returnLogoutButton(userLoggedIn, staffLoggedIn$)}
        </DialogFooter>
      </DialogContent>
    </Dialog>

  )
}

export default SignOutButtonDialog