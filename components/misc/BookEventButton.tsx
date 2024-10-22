"use client"

import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { useRouter } from 'next/navigation'

function BookEventButton(props) {

    const {event_id, cost, title, date_time, user_id} = props

    const [open, setOpen] = useState(false);
    const [buttonInnerText, setButtonInnerText] = useState("Confirm")
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [cancelButtonText, setCancelButtonText] = useState("Cancel")
    const {push} = useRouter()
    
    async function handleOnClick () {
        
        const bookEventById = async (user_id:string, event_id:number, cost:number) => {
            const response =  await fetch(`https://beevents-be.onrender.com/user/${user_id}/events/${event_id}?book=true&cost=${cost}`, {method: 'PATCH'})
            const data = await response.json()
            return data
        }

        console.log(cost, "cost");

        if(cost === 0){ //IF EVENT COST IS FREE
            //TRIGGER PATCH TO /USER/ID
            console.log("event is free")
            const data = await bookEventById(user_id, event_id, cost)

            if(data["status code"] === 400 && data.message === "You are already booked into this event"){
                setButtonDisabled(true)
                setButtonInnerText("You've already booked this event!")
                return
            }

            if(data["status code"] === 200) { //change this logic
                console.log(data["message"]);
                setButtonInnerText("Booking successful!")
                setButtonDisabled(true)
                setCancelButtonText("Exit")
            }

        } else { //IF EVENT IS A PAID EVENT
            //TRIGGER STRIPE API AND THEN REDIRECTS TO PAYMENT PAGE
            console.log("event needs to be paid!")
            const data = await bookEventById(user_id, event_id, cost)
            if(data){
                push(data.url)
            }
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <Button className='rounded-2xl bg-yellow-400 hover:bg-yellow-100'>{!cost>0? "Book a spot" : "Book spot and pay"}</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white">
                <DialogHeader>
                <DialogTitle className='mb-5'>Confirm booking?</DialogTitle>
                <DialogDescription>
                    <Button onClick={()=>setOpen(false)} className='outline outline-2 outline-yellow-400 rounded-2xl mr-5'>{cancelButtonText}</Button>
                    <Button onClick={handleOnClick} className='rounded-2xl bg-yellow-400 hover:bg-yellow-100' disabled={buttonDisabled}>{buttonInnerText}</Button>
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default BookEventButton