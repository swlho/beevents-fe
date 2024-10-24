/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

"use client"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import MultipleSelector from '@/components/ui/multiple-selector'
import { Textarea } from '@/components/ui/textarea'
import { createStripeProduct } from '@/lib/stripe'
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from 'react'
import { useForm } from "react-hook-form"
import { z } from "zod"
import { DateTimePicker } from './DateTimePicker'


//TO_DO: CLEAN UP RESET FORM FIELDS AFTER FORM IS SUBMITTED SUCCESSFULLY
function NewEventForm() {

    //STATE
    const [submitButtonInnerText, setSubmitButtonInnerText] = useState("Create event")
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [alertText, setAlertText] = useState("")

    //ZOD CONFIG
    //@ts-expect-error: no fix
    const OPTIONS: Option[] = [
        { label: 'online', value: 'online' },
        { label: 'social', value: 'social' },
        { label: 'meetup', value: 'meetup' },
        { label: 'afterhours', value: 'afterhours' },
      ];

    const formSchema = z.object({
            title: z.string().min(1, {
                message: "Must have an event title"
                }),
            date_time: z.date(),
            details: z.string().min(1, {
                message: "Please provide event details"
            }),
            location: z.string().min(1, {
                message: "Please provide event location"
            }),
            cost: z.coerce.number().min(0, {
                message: "Please provide event cost"
            }),
            tags: z.array(z.object({
                label:z.string(),
                value: z.string(),
                disable: z.boolean().optional(),
            })).min(1),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            date_time: undefined,
            location: "",
            details: "",
            cost: undefined,
            tags: undefined,
        },
        })
    
    const {reset} = form
        
        // Define a submit handler.
        async function onSubmit(values: z.infer<typeof formSchema>) {
            setButtonDisabled(true)
            setAlertText("")
            setSubmitButtonInnerText("Creating...")
            const {title, date_time, location, details, cost, tags} = values
            const tagArr = []
            for (const value of tags) {
                tagArr.push(value.value)
            }
            const postBody = await JSON.stringify({
                //TO-DO: HARD CODED STAFF ID
                staff_id: 3,
                title: title,
                date_time: date_time,
                location: location,
                details: details,
                cost: cost*100,
                tags: tagArr,
                users_attending: [],
                is_archived: false,
            })
            const response = await (await fetch(`https://beevents-be.onrender.com/events/`, {method: 'POST', headers: {'Content-Type':'application/json'}, body: postBody})).json()
            console.log(response);
            if (response.status_code === 201){
                //TO-DO - get the event id and put it in the fn
                const {event_id, title, date_time, cost} = response.created_event.data[0]
                await createStripeProduct(event_id, title, date_time, cost)
                setSubmitButtonInnerText("Event successfully created!")
                setAlertText("🎉 Event successfully created! Create another event? 🎉")
                reset()
                setTimeout(()=>{
                    setSubmitButtonInnerText("Create event")
                    setButtonDisabled(false)}, 
                    2000)
            } else if (response.status === 400) {
                setButtonDisabled(false)
                setSubmitButtonInnerText("Create")
                setAlertText("Something happened... please try again")
            }
        }

  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
        <FormItem>
            <FormLabel>Event title</FormLabel>
            <FormControl>
            <Input placeholder="Give your event a title" {...field} />
            </FormControl>
            <FormMessage className='text-red-500'/>
        </FormItem>
        )}
        />
        <FormField
        control={form.control}
        name="date_time"
        render={({ field }) => (
        <FormItem>
            <FormLabel>Date/time</FormLabel>
            <FormControl>
            <DateTimePicker placeholder="Pick a date and time" hourCycle={12} granularity='minute' value={field.value} onChange={field.onChange} />
            </FormControl>
            <FormMessage className='text-red-500'/>
        </FormItem>
        )}
        />
        <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
        <FormItem>
            <FormLabel>Event location</FormLabel>
            <FormDescription>Type `Online` if the event is to be held online</FormDescription>
            <FormControl>
            <Input {...field} />
            </FormControl>
            <FormMessage className='text-red-500'/>
        </FormItem>
        )}
        />
        <FormField
        control={form.control}
        name="details"
        render={({ field }) => (
        <FormItem>
            <FormLabel>Event details</FormLabel>
            <FormControl>
            <Textarea placeholder='Please provide details of the event' className='resize-none' {...field} />
            </FormControl>
            <FormMessage className='text-red-500'/>
        </FormItem>
        )}
        />
        <FormField
        control={form.control}
        name="cost"
        render={({ field }) => (
        <FormItem>
            <FormLabel>Event cost</FormLabel>
            <FormDescription>Enter amount in £. Type `0` if the event is free</FormDescription>
            <FormControl>
            <Input placeholder="£" {...field} />
            </FormControl>
            <FormMessage className='text-red-500'/>
        </FormItem>
        )}
        />
        <FormField
        control={form.control}
        name="tags"
        render={({ field }) => (
        <FormItem>
            <FormLabel>Tags</FormLabel>
            <FormDescription>Choose tag or type something that does not exist in the dropdown list...</FormDescription>
            <FormControl>            
            <MultipleSelector 
            {...field}
            defaultOptions={OPTIONS}
            placeholder="Choose tag or type something..."
            creatable
            emptyIndicator={
            <p className="text-left text-lg leading-10 text-gray-600 dark:text-gray-400">
                no results found.
            </p>
            }
            />
            </FormControl>
            <FormMessage className='text-red-500'/>
        </FormItem>
        )}
        />
        <Button type="submit" className='hover:bg-yellow-200 bg-yellow-500 rounded-2xl'disabled={buttonDisabled}>{submitButtonInnerText}</Button>
        <h2>{alertText}</h2>
    </form>
  </Form>
  )
}

export default NewEventForm
