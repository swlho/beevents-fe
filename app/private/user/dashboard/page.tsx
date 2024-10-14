"use server"

import BackButton from "@/components/navigation/BackButton"
import { redirect } from 'next/navigation'

import {observer} from "@legendapp/state/react"
import { hasLoggedIn$ } from "@/app/_stores/_login"

import { createClient } from '@/utils/supabase/client'
import Dashboard from "@/components/dashboard/Dashboard"

  
export default async function = observer(UserDashboardPage) {

  const supabase = createClient()
  const userLoggedIn$ = hasLoggedIn$.loggedIn.get()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  if (data) {
    userLoggedIn$.setLoggedIn()
    console.log(userLoggedIn$, "here")
    return (
      <>
      <BackButton path={"javascript:history.go(-1)"} />
      <Dashboard />
      </>
    )
  }
}