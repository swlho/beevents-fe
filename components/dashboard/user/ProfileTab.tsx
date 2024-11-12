"use client"

import React from 'react'
import UpdateProfileForm from './UpdateProfileForm'
import { useUserById } from '@/hooks/useUserById'
import Loading from '@/components/misc/Loading'

function ProfileTab({userId}) {

  const {data, isPending, isFetching, isError} = useUserById(userId)

  if (isPending){
    return <Loading text={"profile"}/>
  }

  if (isFetching){
    return <Loading text={"profile"}/>
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