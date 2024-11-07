import React from 'react'
import { Skeleton } from '../ui/skeleton'

function Loading() {
  return (
    <>
        <p>Loading...</p>
        <div className='w-10 grid grid-cols-5 gap-4'>
          <Skeleton className="h-4 w-4 rounded-xl bg-gray-800" />
          <Skeleton className="h-8 w-4 rounded-xl bg-yellow-400" />
          <Skeleton className="h-10 w-4 rounded-xl bg-gray-800" />
          <Skeleton className="h-10 w-4 rounded-xl bg-yellow-400" />
          <Skeleton className="h-6 w-5 rounded-xl bg-gray-800" />
        </div>
    </>
  )
}

export default Loading