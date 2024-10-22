"use client"

import React, { useContext, useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

import Link from 'next/link'
import DeleteButton from './DeleteButton'
import CancelBookingButton from './CancelBookingButton'
import { UserContext } from "@/app/context/user-provider";
import { Button } from '@/components/ui/button'

//TO-DO: CLEAN-UP UI ELEMENTS, EG, TAGS
function DashboardEventCard(props) {

    const {eventData, userarchived, upcoming} = props

    const { event_id, title, date_time, details, location, tags, cost } = eventData

    const [buttonInnerText, setButtonInnerText] = useState(userarchived? "Unarchive" : "Archive")
    const [buttonDisabled, setButtonDisabled] = useState(false)

    const user = useContext(UserContext)
    const {id} = user[0];
    

    function handleOnClick(){
        const patchEventArchivingById = async (user_id:string, event_id:number, bool:boolean) => {
            const response =  await fetch(`https://beevents-be.onrender.com/user/${user_id}/archive/${event_id}?archive=${bool}`, {method: 'PATCH'})
            const data = await response.json()
            return data
        }
        setButtonDisabled(true)
        setButtonInnerText("Done!")
        patchEventArchivingById(id, event_id, !userarchived)
        window.location.reload(false);
    }

    function returnCardButton(){ //Fn to conditionally return the correct action button
        if(upcoming){
            return <CancelBookingButton user_id={id} event_id={event_id}/>
        } else {
            if(userarchived){
                return <span>
                <Button className='bg-yellow-400  rounded-full p-3 mt-2 mr-2 hover:bg-yellow-200' onClick={handleOnClick} disabled={buttonDisabled}>{buttonInnerText}</Button>
                <DeleteButton user_id={id} event_id={event_id}/>
                </span>
            } else {
                return <Button className='bg-yellow-400  rounded-full p-3 mt-2 mr-2 hover:bg-yellow-200' onClick={handleOnClick} disabled={buttonDisabled}>{buttonInnerText}</Button>
            }
        }
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
                {
                returnCardButton()
                }
            </CardContent>
    </Card>
  )
}

export default DashboardEventCard