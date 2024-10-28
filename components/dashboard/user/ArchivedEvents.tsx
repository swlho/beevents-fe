"use client"

import React from 'react'
import DashboardEventCard from './DashboardEventCard'
import { Skeleton } from '@/components/ui/skeleton'


//TO-DO: IMPLEMENT USEMUTATION TO RERENDER ONCE EVENT IS DELETED
function ArchivedEvents({archivedEvents}) {

  const {data, isPending, isFetching} = archivedEvents

  if (isPending){
    return <Skeleton/>
}

if (isFetching){
  return <Skeleton/>
}


  return (
    data?.length == 0 ? <h1>No archived events</h1> :
    <div className='flex-wrap items-start'>
      {data?.map((event)=> {
        return (
          <DashboardEventCard eventData = {event.data[0]} key={event.data[0].event_id} userarchived={true}/>
        )
      }
      )}
    </div>
  )
}

export default ArchivedEvents