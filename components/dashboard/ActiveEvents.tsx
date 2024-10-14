"use client"

import { useEventsByStaffId } from '@/hooks/useEventsByStaffId'
import React from 'react'
import { Skeleton } from '../ui/skeleton'
import DashboardEventCard from './DashboardEventCard'

function ActiveEvents() {

  const {data, isPending, isError, isFetching} = useEventsByStaffId(3, false)

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
    data.data.length == 0 ? <h1>No active events</h1> :
    <div className='flex-wrap items-start'>
      {data.data.map((event)=> {
        return (
          <DashboardEventCard eventData = {event} key={event.event_id}/>
        )
      }
      )}
    </div>
  )
}

export default ActiveEvents