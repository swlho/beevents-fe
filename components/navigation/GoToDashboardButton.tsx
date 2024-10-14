import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

function GoToDashboardButton() {
  return (
    <Link href="/private/user/dashboard">
      <Button className='outline outline-2 outline-yellow-400 rounded-2xl mr-3'>Dashboard</Button>
    </Link>
  )
}

export default GoToDashboardButton