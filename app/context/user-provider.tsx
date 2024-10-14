"use client"

import { createClient } from "@/utils/supabase/client"
import { createContext, useEffect, useState } from "react"

export const UserContext = createContext({})

export default function UserProvider({
    children,
}: {
  children: React.ReactNode
}) {

    const [user, setUser]= useState(null)
    const [loggedIn, setLoggedIn] = useState(false)
    const supabase = createClient()

    useEffect(()=>{
        async function getUser(){
            const {data, error} = await supabase.auth.getUser()
            if (error || !data?.user){
                console.log("no user")
            } else{
                setUser(data?.user)
            }
        }
        getUser()
        setLoggedIn(true)
    }, [])

    return <UserContext.Provider value={[user, loggedIn]}>{children}</UserContext.Provider>
}