import React from 'react'
import MyEventsTabs from './MyEventsTabs'

function MyEvents(props) {
  const {userId, userEvents} = props
  return (
    <MyEventsTabs userId={userId} userEvents={userEvents}/>
  )
}

export default MyEvents