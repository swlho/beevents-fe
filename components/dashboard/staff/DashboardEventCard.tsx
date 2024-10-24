"use client"

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { formatDateTime, formatToTimestamp } from '@/lib/utils'
import Link from 'next/link'
import { useState } from 'react'
import CancelAndArchiveButton from './CancelAndArchiveButton'
import DeleteButton from './DeleteButton'


//TO-DO: CLEAN-UP UI ELEMENTS, EG, TAGS
function DashboardEventCard(props) {

    const {eventData, upcoming, archived} = props

    const { event_id, title, date_time, details, location, tags, cost, is_archived } = eventData
    const tagsArr = JSON.parse(tags);

    const [buttonInnerText, setButtonInnerText] = useState(archived? "Unarchive" : "Archive")
    const [buttonDisabled, setButtonDisabled] = useState(false)
    
    function handleOnClick(){
        const patchEventById = async (id:number, bool:boolean) => {
            const response =  await fetch(`https://beevents-be.onrender.com/events/${id}?is_archived=${bool}`, {method: 'PATCH'})
            const data = await response.json()
            window.location.reload();
            return data
        }
        setButtonDisabled(true)
        setButtonInnerText("Done!")
        patchEventById(event_id, !archived)
    }

    function returnCardButton(){ //Fn to conditionally return the correct action button
        if(upcoming){
            return <CancelAndArchiveButton event_id={event_id}/>
        } else {
            if (archived && formatToTimestamp(date_time) >= Date.now()) {
            return <span>
                <Button className='bg-yellow-400  rounded-full p-3 mt-2 mr-2 hover:bg-yellow-200' disabled>Cannot unarchive</Button>
                <DeleteButton event_id={event_id}/>
                </span>
            } else if(archived){
                return <span>
                <Button className='bg-yellow-400  rounded-full p-3 mt-2 mr-2 hover:bg-yellow-200' onClick={handleOnClick} disabled={buttonDisabled}>{buttonInnerText}</Button>
                <DeleteButton event_id={event_id}/>
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
            <div className='flex space-x-2'>
            {tagsArr.map((tag) => <Badge variant="outline" key={tag} className='outline outline-1 outline-yellow-400 bg-yellow-200'>{tag}</Badge> )}
            </div>
        </CardHeader>
            <CardContent className='bg-white justify-left mb-6 shadow-lg'>
                {formatDateTime(date_time)}
                <h2>Location: {location}</h2>
                <h2>Cost: {cost===0? "Free" : `£${cost / 100}`}</h2>
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