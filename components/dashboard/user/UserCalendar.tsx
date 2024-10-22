"use client"

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

function UserCalendar({userEvents}) {

    const events = userEvents.map(({data})=>{
        return {
            id: data[0].event_id,
            title: data[0].title,
            start: data[0].date_time,
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

export default UserCalendar

function renderEventContent(eventInfo) {
    return (
      <div className='bg-yellow-200'>
        <b className='mr-1'>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </div>
    )
  }