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

function DeleteButton({event_id}) {

    const [open, setOpen] = useState(false);
    const [statusText, setStatusText] = useState("");
    const [buttonInnerText, setButtonInnerText] = useState("Delete")
    const [buttonDisabled, setButtonDisabled] = useState(false)

    function handleClick(){
        setOpen(false);
    }

    async function handleClickDelete (){
        const deleteEventById = async (event_id:number) => {
            setStatusText("")
            setButtonDisabled(true)
            setButtonInnerText("Deleting...")
            const response =  await fetch(`https://beevents-be.onrender.com/events/${event_id}`, {method: 'DELETE'})
            const data = await response.json()
            return data
        }
        const data = await deleteEventById(event_id)
        if(data.message === "Event deletion failed") {
            setStatusText("Something happened... please try again")
            setButtonDisabled(false)
            setButtonInnerText("Delete")
        } else {
            setStatusText("Event successfully deleted!")
            setButtonDisabled(false)
            setButtonInnerText("Delete")
            setOpen(false)
            window.location.reload(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogTrigger asChild>
                <Button className='bg-red-400 rounded-full hover:bg-red-200' >Delete Event</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white">
                <DialogHeader>
                <DialogTitle>⚠️ Delete Event? ⚠️</DialogTitle>
                <DialogDescription>
                    <h2>This cannot be undone</h2>
                    <h2 className="mt-2">{statusText}</h2>
                </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button id="cancel" className="bg-yellow-400 font-medium rounded-2xl text-gray-600 hover:bg-yellow-200" onClick={handleClick}>Cancel</Button>
                    <Button id="delete-event" className="bg-red-400 rounded-2xl hover:bg-red-200" onClick={handleClickDelete} disabled={buttonDisabled}>{buttonInnerText}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteButton