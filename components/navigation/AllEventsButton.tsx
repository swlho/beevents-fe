import React from 'react'

function ForwardButton({path, text='All events'}) {
  return (
    <a href={path}>
    <button className='pb-10 font-bold'>{text} &gt;</button>
    </a>
  )
}

export default ForwardButton