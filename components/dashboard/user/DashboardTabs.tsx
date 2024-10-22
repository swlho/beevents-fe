"use client"

import React, { useContext } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MyEvents from './MyEvents'
import ProfileTab from './ProfileTab'
import { Skeleton } from '@/components/ui/skeleton'
import { UserContext } from '@/app/context/user-provider'
import { useUserById } from '@/hooks/useUserById'

function DashboardTabs() {

  const user = useContext(UserContext)
  
  if(user[0]){
    const {data, isPending, isError, isFetching} = useUserById(user[0].id)
    if (isPending){
      return <Skeleton/>
    }
  
    if (isFetching){
      return <Skeleton/>
    }
  
    if (isError){
        return <span>Error!</span>
    }

    return (
      <>
      <h1 className='mb-5 font-medium'>Signed in as {data.data[0].email}</h1>
      <Tabs defaultValue="my-events" className="w-full h-full bg-gray-100">
      <TabsList className="grid w-full grid-cols-4 bg-yellow-400">
          <TabsTrigger value="my-events" className='bg-yellow-100'>My Events</TabsTrigger>
          <TabsTrigger value="calendar" className='bg-yellow-100'>Calendar</TabsTrigger>
          <TabsTrigger value="profile" className='bg-yellow-100'>Profile</TabsTrigger>
          <TabsTrigger value="password" className='bg-yellow-100'>Password</TabsTrigger>
      </TabsList>

      {/* DASHBOARD CONTENT */}
          <TabsContent value="my-events"><MyEvents data={data}/></TabsContent>
          <TabsContent value="calendar">View your calendar here.</TabsContent>
          <TabsContent value="profile"><ProfileTab data={data}/></TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
      </>
    )
  }
}

export default DashboardTabs