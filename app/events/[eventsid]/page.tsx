"use client"

import EventBlock from '@/components/misc/EventBlock'
import BackButton from '@/components/navigation/BackButton'
import { Skeleton } from '@/components/ui/skeleton'
import { useEventById } from '@/hooks/useEventById'
import { useParams } from 'next/navigation'
import React from 'react'


function EventPage () {
  const params = useParams()
  const {eventsid} = params

  const {data, isPending, isError, isFetching} = useEventById(eventsid)

  if (isPending){
      return <Skeleton/>
  }

  if (isFetching){
    return <Skeleton/>
}

  if (isError){
      return <span>Error!</span>
  }

  return (
      <>
      <BackButton path={"/"}/>
      <EventBlock eventData={data}/>
      </>
)

}

export default EventPage