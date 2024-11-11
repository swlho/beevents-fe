"use client"

import React, { useContext } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MyEvents from './MyEvents'
import StaffCalendar from './StaffCalendar'
import { useEventsByStaffId } from '@/hooks/useEventsByStaffId'
import { StaffContext } from '@/lib/context/staff-provider'

function DashboardTabs() {

  const {staff, staff_id, staffLoggedIn} = useContext(StaffContext)
  const [staff$, changeStaff] = staff
  const [staff_id$, changeStaffId] = staff_id
  const [staffLoggedIn$, changeStaffLoggedIn] = staffLoggedIn

  const staffEvents = useEventsByStaffId(staff_id$, false)

  return (
    <Tabs defaultValue="my-events" className="w-full h-full bg-gray-100">
    <TabsList className="grid w-full grid-cols-4 bg-yellow-400">
        <TabsTrigger value="my-events" className='bg-yellow-100'>My Events</TabsTrigger>
        <TabsTrigger value="calendar" className='bg-yellow-100'>Calendar</TabsTrigger>
        <TabsTrigger value="profile" className='bg-yellow-100'>Profile</TabsTrigger>
        <TabsTrigger value="password" className='bg-yellow-100'>Password</TabsTrigger>
    </TabsList>

    {/* DASHBOARD CONTENT */}
        <TabsContent value="my-events"><MyEvents staffEvents={staffEvents}/></TabsContent>
        <TabsContent value="calendar"><StaffCalendar staffEvents={staffEvents}/></TabsContent>
        <TabsContent value="profile">Hi, you are logged in as {staff$}.</TabsContent>
        <TabsContent value="password">Coming soon.  Please contact site admin for help.</TabsContent>
    </Tabs>
  )
}

export default DashboardTabs