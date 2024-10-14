import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ActiveEvents from './ActiveEvents'
import CreateNewEvent from './CreateNewEvent'
import ArchivedEvents from './ArchivedEvents'
import PastEvents from './PastEvents'

function MyEventsTabs() {
  return (
    <Tabs defaultValue="active-events" className="w-full h-full bg-gray-100 lg:w-3/4">
    <TabsList className="grid w-full grid-cols-4 bg-yellow-400">
        <TabsTrigger value="active-events" className='bg-yellow-100'>Active Events</TabsTrigger>
        <TabsTrigger value="past-events" className='bg-yellow-100'>Past Events</TabsTrigger>
        <TabsTrigger value="account" className='bg-yellow-100'>Create New</TabsTrigger>
        <TabsTrigger value="password" className='bg-yellow-100'>Archived</TabsTrigger>
    </TabsList>

    {/* DASHBOARD CONTENT */}
        <TabsContent value="active-events"><ActiveEvents/></TabsContent>
        <TabsContent value="past-events"><PastEvents/></TabsContent>
        <TabsContent value="account"><CreateNewEvent/></TabsContent>
        <TabsContent value="password"><ArchivedEvents/></TabsContent>
    </Tabs>
  )
}

export default MyEventsTabs