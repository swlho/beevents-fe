import React from 'react'
import DashboardEventCard from './DashboardEventCard'

function ActiveEvents({activeEventsArr}) {


  return (
    activeEventsArr.length == 0 ? <h1>No active events</h1> :
    <div className='flex-wrap items-start'>
      {activeEventsArr.map((event)=> {
        return (
          <DashboardEventCard eventData = {event} key={event.event_id} upcoming={true}/>
        )
      }
      )}
    </div>
  )
}

export default ActiveEvents