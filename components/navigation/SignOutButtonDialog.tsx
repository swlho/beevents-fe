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
import { useState } from "react";

function SignOutButtonDialog() {

    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(false)
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
        <Button id="user-login" className="bg-yellow-400 font-medium rounded-2xl text-gray-600 hover:bg-yellow-200" onClick={handleClick}>Cancel</Button>
        <form action="/auth/signout" method="post">
        <Button className="bg-red-400 font-medium rounded-2xl hover:bg-red-200" type="submit">
          Confirm
        </Button>
        </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>

  )
}

export default SignOutButtonDialog