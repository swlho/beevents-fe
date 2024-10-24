import { Skeleton } from '@/components/ui/skeleton'
import { useEvents } from "@/hooks/useEvents"

import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"

import { Link } from '@/components/navigation/Link'
import { Button } from '@/components/ui/button'
import { formatDateTime } from '@/lib/utils'
import { Badge } from '../ui/badge'

function AllActiveEventsList({query}) {

  const {data, isPending, isError, isFetching} = useEvents(false, query)

  if (isPending){
      return <Skeleton/>
  }

  if (isFetching){
    return <Skeleton/>
  }

  if (isError){
      return <span>Error!</span>
  }

    return (
        <div>
        {data.data.map((event)=>{
        const tagsArr = JSON.parse(event.tags);
        return (
            <div key={event.event_id} className="p-1">
                  <Dialog>
                    <DialogTrigger asChild>
                    <a href="#" target="_parent" rel="noopener noreferrer">
                      <Card className='mb-4'>
                          <CardContent className="flex flex-col items-left justify-center p-6 shadow-lg">
                            <h1 className="text-lg font-bold">{event.title}</h1>
                            <h2 className="text-sm">{formatDateTime(event.date_time)}</h2>
                            <h3 className="text-sm font-light">{event.location}</h3>
                            <h3 className="text-sm font-light mb-3">{event.cost===0? "Free" : `£${event.cost / 100}`}</h3>
                            <h4 className='text-sm mb-3'>{event.details.slice(0,24)+"..."}</h4>
                            <div className='flex space-x-2'>
                            {tagsArr.map((tag) => <Badge variant="outline" key={tag} className='outline outline-1 outline-yellow-400 bg-yellow-200 text-xs'>{tag}</Badge> )}
                            </div>
                          </CardContent>
                      </Card>
                    </a>
                    </DialogTrigger>
                  <DialogContent className="sm:max-w-screen-md bg-white grid justify-items-start space-y-2">
                    <DialogHeader className="grid justify-items-start">
                      <DialogTitle>{event.title}</DialogTitle>
                      <DialogDescription>{formatDateTime(event.date_time)}</DialogDescription>
                      <DialogDescription>{event.location}</DialogDescription>
                      <DialogDescription>{event.cost===0? "Free" : `£${event.cost / 100}`}</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Link href={`/events/${event.event_id}`}>
                        <Button className="rounded-2xl bg-yellow-400 hover:bg-yellow-100">Go to event page</Button>
                      </Link>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
            </div>
            )}
        )}
        </div>
  )
}

export default AllActiveEventsList