import React from 'react'

function EventBlock({data}) {

    const {event_id, title, date_time, details, location, tags, cost} = data.data[0]
    
  return (
    <>
    <h1>{title}</h1>
    <h1>{date_time}</h1>
    <h2>{details}</h2>
    <h2>{location}</h2>
    <h2>{cost}</h2>
    <h3>{tags}</h3>
    </>
  )
}

export default EventBlock