import React from 'react'
import { Form } from '../ui/form'
import UpdateProfileForm from './UpdateProfileForm'

function ProfileTab({data}) {
  return (
    <>
    <h2 className='my-5 font-medium'>Update your profile using the form below</h2>
    <UpdateProfileForm data={data}/>
    </>
  )
}

export default ProfileTab