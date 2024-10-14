"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
  } from "@/components/ui/dialog"
import { useEvents } from "@/hooks/useEvents"
import Link from "next/link"
import { Button } from "../ui/button"
import { Skeleton } from "../ui/skeleton"

export default function EventsCarousel({subtitle, titlestyle}){

    const {data, isPending, isError, isFetching} = useEvents(false)

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
  <div className="flex flex-col gap-3 row-start-2 items-center sm:items-start">
      <h1 className={titlestyle}>{subtitle}</h1>
        <Carousel className="w-4/6 lg:w-full max-w-screen-md ">
            <CarouselContent className="-ml-1">
                {data.data.map((event)=>{
    return (
        <CarouselItem className="md:basis-1/2 lg:basis-1/3" key={event.event_id}>
          <div className="p-1">
              <Dialog>
                <DialogTrigger asChild>
                <a href="#" target="_parent" rel="noopener noreferrer">
                  <Card>
                      <CardContent className="flex flex-col aspect-square items-left justify-center p-6 shadow-lg">
                        <h1 className="text-lg font-bold">{event.title}</h1>
                        <h2 className="text-sm">{event.date_time}</h2>
                        <h3 className="text-sm font-light">{event.location}</h3>
                      </CardContent>
                  </Card>
                </a>
                </DialogTrigger>
              <DialogContent className="sm:max-w-screen-md bg-white">
                <DialogHeader>
                  <DialogTitle>{event.title}</DialogTitle>
                  <DialogDescription>{event.details}</DialogDescription>
                  <DialogDescription>{event.date_time}</DialogDescription>
                  <DialogDescription>{event.location}</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Link href={`/events/${event.event_id}`}>
                    <Button>Go to event page</Button>
                  </Link>
                </DialogFooter>
              </DialogContent>
            </Dialog>
        </div>
      </CarouselItem>
      )})
    }
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
  </div>
  )
}