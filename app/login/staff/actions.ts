'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { QueryData } from '@supabase/supabase-js'
import { hasLoggedIn$ } from '@/app/_stores/_login'

export async function login(formData: FormData) {
  const supabase = createClient()

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
    redirect('/error')
  }

  if(data){
    if (staffLogin[0].password === loginData.password){
      hasLoggedIn$.loggedIn.set(true)
      hasLoggedIn$.staff.email.set(loginData.email)
      revalidatePath('/', 'layout')
      redirect('/staff/dashboard')
    } else {
      redirect('/error')
    }
  }
}