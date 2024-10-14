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
import { Link } from "@/components/navigation/Link"
import { useState } from "react";

function LoginButtonDialog() {

    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(false)
    }

  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogTrigger asChild>
      <Button id="login" className="bg-yellow-400 font-medium rounded-2xl text-gray-600 hover:bg-yellow-200">Login</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>
            Please choose an option
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
        <Link href="/login">
        <Button id="user-login" className="bg-yellow-400 font-medium rounded-2xl text-gray-600 hover:bg-yellow-200" onClick={handleClick}>User login</Button>
        </Link>
        <Link href="/login/staff">
        <Button id="staff-login" className="bg-yellow-200 font-medium rounded-2xl text-gray-600 hover:bg-yellow-100" onClick={handleClick}>Staff login</Button>
        </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>

  )
}

export default LoginButtonDialog