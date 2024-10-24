/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import React, { useState } from 'react'

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Button } from '../ui/button'
  


function FilterBar({setQuery}) {

    const [selectorValue, setSelectorValue] = useState("date_time")
    const [order, setOrder] = useState(false)

    function handleOnClick() {
        setQuery([selectorValue,order])
    }

  return (
    <div className='flex flex-row outline outline-2 outline-yellow-400 rounded-2xl mb-3 p-2'>
        <Select onValueChange={setSelectorValue} defaultValue={"date_time"}>
        <SelectTrigger className="w-[300px] border-0">
            <SelectValue placeholder="Sort by..." />
        </SelectTrigger>
        <SelectContent className="bg-white">
            <SelectItem value="date_time">Date</SelectItem>
            <SelectItem value="title">Title</SelectItem>
            <SelectItem value="cost">Cost</SelectItem>
        </SelectContent>
    </Select>
    <RadioGroup onValueChange={setOrder} defaultValue="false" className='ml-8'>
        <div className="flex items-center space-x-2">
            <RadioGroupItem value="false" id="false" />
            <Label htmlFor="false">Ascending</Label>
        </div>
        <div className="flex items-center space-x-2">
            <RadioGroupItem value="true" id="true" />
            <Label htmlFor="true">Descending</Label>
        </div>
    </RadioGroup>
    <Button onClick={handleOnClick} className='ml-8 outline outline-2 outline-yellow-400 rounded-2xl'>Apply filter</Button>
    </div>
  )
}

export default FilterBar