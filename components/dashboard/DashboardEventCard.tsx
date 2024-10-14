"use client"

import React, { useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from '../ui/button'
import Link from 'next/link'
import DeleteButton from './DeleteButton'


//TO-DO: CLEAN-UP UI ELEMENTS, EG, TAGS
function DashboardEventCard({eventData}) {

    
    const { event_id, title, date_time, details, location, tags, cost, is_archived } = eventData

    const [buttonInnerText, setButtonInnerText] = useState(is_archived? "Unarchive" : "Archive")
    const [buttonDisabled, setButtonDisabled] = useState(false)
    
    function handleOnClick(){
        const patchEventById = async (id:number, bool:boolean) => {
            const response =  await fetch(`https://beevents-be.onrender.com/events/${id}?is_archived=${bool}`, {method: 'PATCH'})
            const data = await response.json()
            return data
        }
        setButtonDisabled(true)
        setButtonInnerText("Done!")
        patchEventById(event_id, !is_archived)
    }

    return (
    <Card key={event_id}>
        <CardHeader className='bg-white'>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{date_time}</CardDescription>
        </CardHeader>
            <CardContent className='bg-white justify-left mb-6 shadow-lg'>
                <h2>{location}</h2>
                <h2>Cost: {cost}</h2>
                <h3>{tags}</h3>
                <Link href={`/events/${event_id}`} target='_blank'>
                <Button className='bg-yellow-400  rounded-full mt-2 mr-2 hover:bg-yellow-200'>Event Page</Button>
                </Link>
                <Button className='bg-yellow-400  rounded-full p-3 mt-2 mr-2 hover:bg-yellow-200' onClick={handleOnClick} disabled={buttonDisabled}>{buttonInnerText}</Button>
                {is_archived ? <DeleteButton event_id={event_id}/> : null}
            </CardContent>
    </Card>
  )
}

export default DashboardEventCard