"use client"

import React from 'react'
import UpdateProfileForm from './UpdateProfileForm'
import { useUserById } from '@/hooks/useUserById'
import { Skeleton } from '@/components/ui/skeleton'

function ProfileTab({userId}) {

  const {data, isPending, isFetching, isError} = useUserById(userId)

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
    <h2 className='my-5 font-medium'>Update your profile using the form below</h2>
    <UpdateProfileForm data={data}/>
    </>
  )
}

export default ProfileTab