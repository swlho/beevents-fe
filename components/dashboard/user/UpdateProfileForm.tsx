"use client"

import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"


//TO_DO: CLEAN UP RESET FORM FIELDS AFTER FORM IS SUBMITTED SUCCESSFULLY
function UpdateProfileForm({data}) {

    //STATE
    const [submitButtonInnerText, setSubmitButtonInnerText] = useState("Update profile")
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [alertText, setAlertText] = useState("")


    const {id, full_name, email, updated_at} = data.data[0]

    //ZOD CONFIG

    const formSchema = z.object({
            fullName: z.string(),
            email: z.string().min(1, {
                message: "Please provide an email address"
            }),
            updatedAt: z.date(),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: full_name,
            email: email,
            updatedAt: updated_at,
        },
    })
    
    const {reset} = form
        
        // Define a submit handler.
        async function onSubmit(values: z.infer<typeof formSchema>) {
            setButtonDisabled(true)
            setAlertText("")
            setSubmitButtonInnerText("Creating...")
            const {fullName, email } = values
            const postBody = await JSON.stringify({
                id: id,
                full_name: fullName,
                email: email,
                updated_at: Date.now(),
             })
            const response = await fetch(`https://beevents-be.onrender.com/user/${id}`, {method: 'POST', headers: {'Content-Type':'application/json'}, body: postBody})
            if (response.status === 201){
                setSubmitButtonInnerText("User profile successfully updated!")
                setAlertText("🎉 User profile successfully updated 🎉")
                reset()
                setTimeout(()=>{
                    setSubmitButtonInnerText("Update profile")
                    setButtonDisabled(false)}, 
                    2000)
            } else if (response.status === 400) {
                setButtonDisabled(false)
                setSubmitButtonInnerText("Update profile")
                setAlertText("Something happened... please try again")
            }
        }

  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
        control={form.control}
        name="fullName"
        render={({ field }) => (
        <FormItem>
            <FormLabel>Full name</FormLabel>
            <FormControl>
            <Input placeholder={full_name} {...field} />
            </FormControl>
            <FormMessage className='text-red-500'/>
        </FormItem>
        )}
        />
        <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
        <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
            <Input placeholder={email} {...field} />
            </FormControl>
            <FormMessage className='text-red-500'/>
        </FormItem>
        )}
        />
        <h2 className='italic text-sm'>Last updated: {updated_at}</h2>
        <FormMessage className='text-red-500'/>
        <Button type="submit" className='hover:bg-yellow-200 bg-yellow-500 rounded-2xl'disabled={buttonDisabled}>{submitButtonInnerText}</Button>
        <h3>{alertText}</h3>
    </form>
  </Form>
  )
}

export default UpdateProfileForm