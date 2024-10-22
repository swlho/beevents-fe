import React from 'react'
import DashboardEventCard from './DashboardEventCard'

function BookedEvents({bookedEventsArr}) {

  if(bookedEventsArr){
    return (
      bookedEventsArr.length == 0 ? <h1>You are not booked into any upcoming events</h1> :
      <div className='flex-wrap items-start'>
        {bookedEventsArr.map((event)=> {
          return (
            <DashboardEventCard eventData = {event} key={event.event_id} upcoming={true}/>
          )
        }
        )}
      </div>
    )
  }
}

export default BookedEvents