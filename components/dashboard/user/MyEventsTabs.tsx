import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BookedEvents from './BookedEvents'
import ArchivedEvents from './ArchivedEvents'
import PastEvents from './PastEvents'
import { useEventsByUserId } from '@/hooks/useEventsByUserId'
import { useArchivedEventsByUserId } from '@/hooks/useArchivedEventsByUserId'
import { Skeleton } from '@/components/ui/skeleton'
import { formatToTimestamp } from '@/lib/utils'


function MyEventsTabs({userData}) {

  const {id} = userData.data[0]

  const userEvents = useEventsByUserId(id, false)

  const archivedEvents = useArchivedEventsByUserId(id, true)

  const { data, isPending, isFetching } = userEvents

  let bookedEventsArr = []
  let pastEventsArr = []

  if (isPending){
    return <Skeleton />
  }

  if (isFetching){
    return <Skeleton />
  }

  if(data){
    //some logic to categorise events by active or past, then pass onto children components
    data.forEach((event)=>{
      if(formatToTimestamp(event.data[0].date_time) >= Date.now()){
        bookedEventsArr.push(event.data[0])
      } else {
        pastEventsArr.push(event.data[0])
      }
    })
  }

  return (
    <Tabs defaultValue="booked-events" className="w-full h-full bg-gray-100 lg:w-3/4">
    <TabsList className="grid w-full grid-cols-3 bg-yellow-400">
        <TabsTrigger value="booked-events" className='bg-yellow-100'>Upcoming Events</TabsTrigger>
        <TabsTrigger value="past-events" className='bg-yellow-100'>Past Events</TabsTrigger>
        <TabsTrigger value="archived-events" className='bg-yellow-100'>Archived</TabsTrigger>
    </TabsList>

    {/* DASHBOARD CONTENT */}
        <TabsContent value="booked-events"><BookedEvents bookedEventsArr={bookedEventsArr}/></TabsContent>
        <TabsContent value="past-events"><PastEvents pastEventsArr={pastEventsArr}/></TabsContent>
        <TabsContent value="archived-events"><ArchivedEvents archivedEvents={archivedEvents}/></TabsContent>
    </Tabs>
  )
}

export default MyEventsTabs