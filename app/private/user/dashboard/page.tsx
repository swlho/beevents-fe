import BackButton from "@/components/navigation/BackButton"
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import Dashboard from "@/components/dashboard/Dashboard"

  
export default function UserDashboardPage() {

  return (
      <>
      <BackButton path={"javascript:history.go(-1)"} />
      <Dashboard />
      </>
    )
}