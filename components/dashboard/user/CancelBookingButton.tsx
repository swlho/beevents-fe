"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
  } from "@/components/ui/dialog"

import React from 'react'
import { Button } from '@/components/ui/button'
import { useState } from "react";


function CancelBookingButton({user_id, event_id}) {

    const [open, setOpen] = useState(false);
    const [statusText, setStatusText] = useState("");
    const [buttonInnerText, setButtonInnerText] = useState("Confirm")
    const [buttonDisabled, setButtonDisabled] = useState(false)

    function handleClick(){
        setOpen(false);
    }

    async function handleClickDelete (){
        const cancelBookedEventById = async (user_id:string, event_id:number) => {
            setStatusText("")
            setButtonDisabled(true)
            setButtonInnerText("Cancelling booking...")
            const response =  await fetch(`https://beevents-be.onrender.com/user/${user_id}/events/${event_id}?book=false&cost=0`, {method: 'PATCH'})
            const data = await response.json()
            return data
        }
        const data = await cancelBookedEventById(user_id, event_id)
        if(data["status code"] === 200) { //change this logic
            //TO-DO - logic to handle Stripe refund process
            setStatusText("Booking successfully cancelled!")
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
                <Button className='bg-red-400 rounded-full hover:bg-red-200' >Cancel booking</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white">
                <DialogHeader>
                <DialogTitle>⚠️ Cancel booking? ⚠️</DialogTitle>
                <DialogDescription>
                    <h2>This cannot be undone</h2>
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

export default CancelBookingButton