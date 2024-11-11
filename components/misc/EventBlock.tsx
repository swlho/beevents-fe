"use client"

import { UserContext } from '@/lib/context/user-provider'
import { formatDateTime } from '@/lib/utils'
import { useContext } from 'react'
import { Badge } from '../ui/badge'
import BookEventButton from './BookEventButton'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"

function EventBlock({eventData}) {

    const {event_id, title, date_time, details, location, tags, cost} = eventData.data[0]
    
    const user = useContext(UserContext)

    const id = user[0]?.id

    const tagsArr = JSON.parse(tags);
    const date = formatDateTime(date_time)

    return (
          <>
      <Card className='grid justify-items-start'>
          <CardHeader>
            <CardTitle className='font-bold text-4xl'>{title}</CardTitle>
            <h2>{date}</h2>
          </CardHeader>
          <CardContent className='grid space-y-3'>
            <h2>{details}</h2>
            <h2>Location: {location}</h2>
            <h2>{cost===0? "Free": `£${cost/100}`}</h2>
          </CardContent>
          <CardFooter className='grid justify-items-start'>
            <div className='mb-10 flex space-x-2'>
            {tagsArr.map((tag) => <Badge variant="outline" key={tag} className='outline outline-1 outline-yellow-400 bg-yellow-200'>{tag}</Badge> )}
            </div>
      {!id? 
        <h2 className='font-bold'>Log in to book a spot</h2> : 
        <BookEventButton event_id={event_id} cost={cost} title={title} date_time={date_time} user_id={id}/> }
      </CardFooter>
        </Card>
        </>
    )

  }

export default EventBlock