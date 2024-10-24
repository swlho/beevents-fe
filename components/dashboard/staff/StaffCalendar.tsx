"use client"

import dayGridPlugin from '@fullcalendar/daygrid'
import FullCalendar from '@fullcalendar/react'

function StaffCalendar({staffEvents}) {

    const { data, isPending, isFetching } = staffEvents

    if (isPending){
        return null
      }
    
      if (isFetching){
        return null
      }

    const events = data.data.map((event)=>{
        return {
            id: event.event_id,
            title: event.title,
            start: event.date_time,
        }
    })

    

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView='dayGridMonth'
        weekends={true}
        events={events}
        eventContent={renderEventContent}
        firstDay={1}
      />
    </div>
  )
}

export default StaffCalendar

function renderEventContent(eventInfo) {
    return (
      <div className='bg-yellow-200'>
        <b className='mr-1'>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </div>
    )
  }