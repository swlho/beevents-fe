import React from 'react'
import MyEventsTabs from './MyEventsTabs'

function MyEvents(props) {
  const {data} = props
  return (
    <MyEventsTabs userData={data}/>
  )
}

export default MyEvents