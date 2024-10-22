"use client"

import { UserContext } from '@/app/context/user-provider'
import React, { useContext } from 'react'
import BookEventButton from './BookEventButton'

function EventBlock({eventData}) {

    const {event_id, title, date_time, details, location, tags, cost} = eventData.data[0]
    
    const user = useContext(UserContext)

    const id = user[0]?.id

    return (
      <>
      <h1>{title}</h1>
      <h1>{date_time}</h1>
      <h2>{details}</h2>
      <h2>{location}</h2>
      <h2>{cost}</h2>
      <h3>{tags}</h3>
      {!id? 
        <h2>Log in to book a spot</h2> : 
        <BookEventButton event_id={event_id} cost={cost} title={title} date_time={date_time} user_id={id}/> }
      </>
    )

  }

export default EventBlock