import React from 'react'

function BackButton({path, text='Go Back'}) {
  return (
    <a href={path}>
    <button className='pb-10 font-bold'>&lt; {text}</button>
    </a>
  )
}

export default BackButton