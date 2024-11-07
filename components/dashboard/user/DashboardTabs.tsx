"use client"

import React, { useContext } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MyEvents from './MyEvents'
import ProfileTab from './ProfileTab'
import { UserContext } from '@/app/context/user-provider'
import UserCalendar from './UserCalendar'
import { useEventsByUserId } from '@/hooks/useEventsByUserId'
import Loading from '@/components/misc/Loading'

function DashboardTabs() {

  const user = useContext(UserContext)

  if(user[0]){

    const {id, email} = user[0]
    const {data, isPending, isError, isFetching} = useEventsByUserId(id, false)
    
    if (isPending){
      return <Loading />
    }
  
    if (isFetching){
      return <Loading />
    }
  
    if (isError){
        return <span>Error!</span>
    }

    return (
      <>
      <h1 className='mb-5 font-medium'>Signed in as {email}</h1>
      <Tabs defaultValue="my-events" className="w-full h-full bg-gray-100">
      <TabsList className="grid w-full grid-cols-4 bg-yellow-400">
          <TabsTrigger value="my-events" className='bg-yellow-100'>My Events</TabsTrigger>
          <TabsTrigger value="calendar" className='bg-yellow-100'>Calendar</TabsTrigger>
          <TabsTrigger value="profile" className='bg-yellow-100'>Profile</TabsTrigger>
          <TabsTrigger value="password" className='bg-yellow-100'>Password</TabsTrigger>
      </TabsList>

      {/* DASHBOARD CONTENT */}
          <TabsContent value="my-events"><MyEvents userId={id} userEvents={data}/></TabsContent>
          <TabsContent value="calendar"><UserCalendar userEvents={data}/></TabsContent>
          <TabsContent value="profile"><ProfileTab userId={id}/></TabsContent>
          <TabsContent value="password">Coming soon.  Please contact site admin for help.</TabsContent>
      </Tabs>
      </>
    )
  }
}

export default DashboardTabs