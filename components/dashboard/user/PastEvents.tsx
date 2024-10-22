import React from 'react'
import DashboardEventCard from './DashboardEventCard'

function PastEvents({pastEventsArr}) {
    if(pastEventsArr){
      return (
        pastEventsArr.length == 0 ? <h1>No past events available to view</h1> :
        <div className='flex-wrap items-start'>
          {pastEventsArr.map((event)=> {
            return (
              <DashboardEventCard eventData = {event} key={event.event_id} userarchived={false}/>
            )
          }
          )}
        </div>
      )
    }
}

export default PastEvents