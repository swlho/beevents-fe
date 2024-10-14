import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MyEvents from './MyEvents'

function DashboardTabs() {
  return (
    <Tabs defaultValue="my-events" className="w-full h-full bg-gray-100">
    <TabsList className="grid w-full grid-cols-4 bg-yellow-400">
        <TabsTrigger value="my-events" className='bg-yellow-100'>My Events</TabsTrigger>
        <TabsTrigger value="calendar" className='bg-yellow-100'>Calendar</TabsTrigger>
        <TabsTrigger value="profile" className='bg-yellow-100'>Profile</TabsTrigger>
        <TabsTrigger value="password" className='bg-yellow-100'>Password</TabsTrigger>
    </TabsList>

    {/* DASHBOARD CONTENT */}
        <TabsContent value="my-events"><MyEvents/></TabsContent>
        <TabsContent value="calendar">View your calendar here.</TabsContent>
        <TabsContent value="profile">View your profile here.</TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
    </Tabs>
  )
}

export default DashboardTabs