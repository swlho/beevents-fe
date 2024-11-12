"use client"

import DashboardEventCard from './DashboardEventCard'
import Loading from '@/components/misc/Loading';

//TO-DO: IMPLEMENT USEMUTATION TO RERENDER ONCE EVENT IS DELETED
function ArchivedEvents({archivedStaffEvents}) {

  const {data, isPending, isFetching} = archivedStaffEvents

  if (isPending){
    return <Loading text={"event"}/>
  }

  if (isFetching){
    return <Loading text={"event"}/>
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