"use server"

import BackButton from "@/components/navigation/BackButton"
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import Dashboard from "@/components/dashboard/Dashboard"

  
export default async function UserDashboardPage() {

  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  if (data) {
    return (
      <>
      <BackButton path={"javascript:history.go(-1)"} />
      <Dashboard />
      </>
    )
  }
}