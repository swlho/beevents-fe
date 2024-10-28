"use client"

import { Skeleton } from '@/components/ui/skeleton'
import DashboardEventCard from './DashboardEventCard'

//TO-DO: IMPLEMENT USEMUTATION TO RERENDER ONCE EVENT IS DELETED
function ArchivedEvents({archivedStaffEvents}) {

  console.log(archivedStaffEvents);
  

  const {data, isPending, isFetching} = archivedStaffEvents

  if (isPending){
    return <Skeleton/>
  }

  if (isFetching){
    return <Skeleton/>
  }


  return (
    data?.data.length == 0 ? <h1>No archived events</h1> :
    <div className='flex-wrap items-start'>
      {data?.data.map((event)=> {
        return (
          <DashboardEventCard eventData = {event} key={event.event_id} archived={true}/>
        )
      }
      )}
    </div>
  )
}

export default ArchivedEvents