"use client"

import { createClient } from '@/utils/supabase/client'
import { QueryData } from '@supabase/supabase-js'
import { useContext } from 'react'
import { StaffContext } from '@/lib/context/staff-provider'


export async function login(formData: FormData) {
  const supabase = createClient()
  const state$ = useContext(StaffContext)

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const loginData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const staffLoginQuery = supabase.from("staff").select("password").eq("email", loginData.email)
  type StaffLoginQuery = QueryData<typeof staffLoginQuery>

  const { data, error } = await staffLoginQuery
  const staffLogin: StaffLoginQuery = data;

  if (error) {
      window.location.href = '/error'
  }

  if(data){
    if (staffLogin[0]?.password === loginData.password){
      state$.setLoggedIn(true)
      state$.setStaff({email: loginData.email})
      window.location.href = '/private/staff/dashboard'
    } else {
      window.location.href = '/error'
    }
  }
}