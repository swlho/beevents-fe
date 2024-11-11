"use client"

import BackButton from "@/components/navigation/BackButton"
import { Button } from "@/components/ui/button"
import { createClient } from '@/utils/supabase/client'
import { useContext } from 'react'
import { StaffContext } from '@/lib/context/staff-provider'

export default function StaffLoginPage() {
  const supabase = createClient()
  const { staff, staffLoggedIn, staff_id } = useContext(StaffContext)
  const [staff$, changeStaff] = staff
  const [staff_id$, changeStaffId] = staff_id
  const [staffLoggedIn$, changeStaffLoggedIn] = staffLoggedIn

  async function getStaff(staffEmail) {
    const staffLoginQuery = supabase.from("staff").select("password, staff_id").eq("email", staffEmail)
    const { data, error } = await staffLoginQuery
    if (error) {
      window.location.href = '/error'
      return null
    }
    if (data && data.length > 0) {
      return data[0]
    }
    return null
  }

  function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const loginData = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    }

    getStaff(loginData.email)
      .then((data) => {
        if (data && data.password === loginData.password) {
          changeStaffLoggedIn(true)
          changeStaff(loginData.email)
          changeStaffId(data.staff_id)
          window.location.href = '/private/staff/dashboard'
        } else {
          window.location.href = '/error'
        }
      })
  }

  return (
    <>
      <BackButton path={"javascript:history.go(-1)"} />
      <h1 className="mb-4 font-medium">Login to your staff account</h1>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label htmlFor="email">Staff Email:</label>
        <input id="email" name="email" type="email" className="outline outline-2 outline-yellow-400" required />
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" className="outline outline-2 outline-yellow-400" required />
        <Button type='submit' className="bg-yellow-400 rounded-2xl mt-3 mb-3 hover:bg-yellow-200">Log in</Button>
      </form>
    </>
  )
}