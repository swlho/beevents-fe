"use client"

import React, { useContext } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ActiveEvents from './ActiveEvents'
import CreateNewEvent from './CreateNewEvent'
import ArchivedEvents from './ArchivedEvents'
import PastEvents from './PastEvents'
import { formatToTimestamp } from '@/lib/utils'
import { useArchivedEventsByStaffId } from '@/hooks/useArchivedEventsByStaffId'
import Loading from '@/components/misc/Loading'
import { StaffContext } from '@/lib/context/staff-provider'

function MyEventsTabs({staffEvents}) {
  const { staff_id } = useContext(StaffContext)
  const [staff_id$, changeStaffId] = staff_id

  const archivedStaffEvents = useArchivedEventsByStaffId(staff_id$, true)

  const { data, isPending, isFetching } = staffEvents

  const activeEventsArr = []
  const pastEventsArr = []

  if (isPending){
    return <Loading />
  }

  if (isFetching){
    return <Loading />
  }


  if(data){
    //some logic to categorise events by active or past, then pass onto children components
    data.data.forEach((event)=>{
      if(formatToTimestamp(event.date_time) >= Date.now()){
        activeEventsArr.push(event)
      } else {
        pastEventsArr.push(event)
      }
    })
}

  return (
    <Tabs defaultValue="active-events" className="w-full h-full bg-gray-100 lg:w-3/4">
    <TabsList className="grid w-full grid-cols-4 bg-yellow-400">
        <TabsTrigger value="active-events" className='bg-yellow-100'>Active Events</TabsTrigger>
        <TabsTrigger value="past-events" className='bg-yellow-100'>Past Events</TabsTrigger>
        <TabsTrigger value="create-new" className='bg-yellow-100'>Create New</TabsTrigger>
        <TabsTrigger value="archived-events" className='bg-yellow-100'>Archived</TabsTrigger>
    </TabsList>

    {/* DASHBOARD CONTENT */}
        <TabsContent value="active-events"><ActiveEvents activeEventsArr={activeEventsArr}/></TabsContent>
        <TabsContent value="past-events"><PastEvents pastEventsArr={pastEventsArr}/></TabsContent>
        <TabsContent value="create-new"><CreateNewEvent/></TabsContent>
        <TabsContent value="archived-events"><ArchivedEvents archivedStaffEvents={archivedStaffEvents}/></TabsContent>
    </Tabs>
  )
}

export default MyEventsTabs