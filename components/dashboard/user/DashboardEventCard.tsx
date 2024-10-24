"use client"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { useContext, useState } from 'react'

import { UserContext } from "@/app/context/user-provider"
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatDateTime } from '@/lib/utils'
import Link from 'next/link'
import CancelBookingButton from './CancelBookingButton'
import DeleteButton from './DeleteButton'

//TO-DO: CLEAN-UP UI ELEMENTS, EG, TAGS
function DashboardEventCard(props) {

    const {eventData, userarchived, upcoming} = props

    const { event_id, title, date_time, details, location, tags, cost } = eventData

    const [buttonInnerText, setButtonInnerText] = useState(userarchived? "Unarchive" : "Archive")
    const [buttonDisabled, setButtonDisabled] = useState(false)

    const user = useContext(UserContext)
    const {id} = user[0];
    const tagsArr = JSON.parse(tags);

    function handleOnClick(){
        const patchEventArchivingById = async (user_id:string, event_id:number, bool:boolean) => {
            const response =  await fetch(`https://beevents-be.onrender.com/user/${user_id}/archive/${event_id}?archive=${bool}`, {method: 'PATCH'})
            const data = await response.json()
            return data
        }
        setButtonDisabled(true)
        setButtonInnerText("Done!")
        patchEventArchivingById(id, event_id, !userarchived)
        window.location.reload();
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