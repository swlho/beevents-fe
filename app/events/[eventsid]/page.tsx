"use client"

import EventBlock from '@/components/misc/EventBlock'
import Loading from '@/components/misc/Loading'
import BackButton from '@/components/navigation/BackButton'
import { useEventById } from '@/hooks/useEventById'
import { useParams } from 'next/navigation'
import React from 'react'


function EventPage () {
  const params = useParams()
  const {eventsid} = params

  const {data, isPending, isError, isFetching} = useEventById(eventsid)

  if (isPending){
      return <Loading />
  }

  if (isFetching){
    return <Loading />
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