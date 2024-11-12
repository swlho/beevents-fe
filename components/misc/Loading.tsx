import React from 'react'
import { Skeleton } from '../ui/skeleton'

function Loading({text}) {
  return (
    <>
        <p className='mb-2'>Loading {text}... please wait</p>
        <div className='box-border h-10 w-10 grid grid-cols-5 grid-rows-2 gap-4 items-center'>
          <Skeleton className="row-span-1 col-start-3 col-end-3 h-5 w-3 -rotate-45 outline outline-1 outline-gray-600 rounded-xl bg-gray-300" />
          <Skeleton className="row-span-1 col-start-4 col-end-4 h-6 w-3 rotate-45 outline outline-1 outline-gray-600 rounded-xl bg-gray-400" />
          <Skeleton className="row-span-2 col=start-1 col-end-2 h-4 w-4 rounded-xl bg-gray-800" />
          <Skeleton className="row-span-2 h-8 w-4 rounded-xl bg-yellow-400" />
          <Skeleton className="row-span-2 h-10 w-4 rounded-xl bg-gray-800" />
          <Skeleton className="row-span-2 h-10 w-4 rounded-xl bg-yellow-400" />
          <Skeleton className="row-span-2 h-6 w-5 rounded-xl bg-gray-800" />
        </div>
    </>
  )
}

export default Loading