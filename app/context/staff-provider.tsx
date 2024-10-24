"use client"

import { createContext, useEffect, useState } from "react"
import { hasLoggedIn$ } from "../_stores/_login"

export const StaffContext = createContext({})

export default function StaffProvider({
    children,
}: {
  children: React.ReactNode
}) {

    const [staff, setStaff]= useState('')
    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(()=>{
        setLoggedIn(hasLoggedIn$.loggedIn.get())
        setStaff(hasLoggedIn$.staff.email.get())
        setLoggedIn(true)
    }, [])

    return <StaffContext.Provider value={[staff, loggedIn]}>{children}</StaffContext.Provider>
}