"use client"

import React, { useState } from 'react'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';

function CancelAndArchiveButton({event_id}) {

    const [open, setOpen] = useState(false);
    const [statusText, setStatusText] = useState("");
    const [buttonInnerText, setButtonInnerText] = useState("Confirm")
    const [buttonDisabled, setButtonDisabled] = useState(false)

    function handleClick(){
        setOpen(false);
    }

        async function handleClickDelete (){ //TO-DO: ADD TO EVENT HANDLER AND/OR BACKEND TO NOTIFY USERS OF EVENT CANCELLATION
            const cancelActiveEventById = async (event_id:number) => {
                setStatusText("")
                setButtonDisabled(true)
                const bool = true
                const response =  await fetch(`https://beevents-be.onrender.com/events/${event_id}?is_archived=${bool}`, {method: 'PATCH'})
                const data = await response.json()
                return data
            }
            const data = await cancelActiveEventById(event_id)

            if(data.status_code === 200) {
                //TO-DO - logic to handle Stripe refund process
                setStatusText("Event successfully cancelled and archived!")
                setButtonDisabled(false)
                setButtonInnerText("Confirm")
                setOpen(false)
                window.location.reload();
            } else {
                setStatusText("Something happened... please try again")
                setButtonDisabled(false)
                setButtonInnerText("Confirm")
            }
        }

    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogTrigger asChild>
                <Button className='bg-red-400 rounded-full hover:bg-red-200' >Cancel and archive event</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white">
                <DialogHeader>
                <DialogTitle>⚠️ Cancel and archive event? ⚠️</DialogTitle>
                <DialogDescription>
                    <h2>This cannot be undone.  You will have to create the event again if you want it to be reactivated.</h2>
                    <h2 className="mt-2">{statusText}</h2>
                </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button id="cancel" className="bg-yellow-400 font-medium rounded-2xl text-gray-600 hover:bg-yellow-200" onClick={handleClick}>No</Button>
                    <Button id="delete-event" className="bg-red-400 rounded-2xl hover:bg-red-200" onClick={handleClickDelete} disabled={buttonDisabled}>{buttonInnerText}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CancelAndArchiveButton