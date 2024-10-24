"use client"

import React, { useState } from 'react'

import AllActiveEventsList from '@/components/misc/AllActiveEventsList'
import FilterBar from '@/components/misc/FilterBar'

export default function AllEventsPage () {


    const [query, setQuery] = useState(["date_time","false"])

    return (
        <>
        <h1 className='font-bold text-2xl mb-5'>All available events</h1>
        <FilterBar setQuery={setQuery}/>
        <AllActiveEventsList query={query}/>
        </>
    )
}

//SORTBY
//ASC/DESC
    //DATE
    //TITLE
    //COST