import React from 'react'
import NewEventForm from './NewEventForm'

function CreateNewEvent() {
  return (
    <div className='bg-white'>
    <h2 className='mb-3 font-medium'>Create a new event using the form below</h2>
    <NewEventForm />
    </div>
  )
}

export default CreateNewEvent