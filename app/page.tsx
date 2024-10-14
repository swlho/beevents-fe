import EventsCarousel from "@/components/misc/EventsCarousel"
import type { Metadata } from "next"

export const metadata: Metadata = {
  description: "Beevents - Homepage",
}

export default async function Home() {

  return (
    <>
      <EventsCarousel subtitle={"Latest Events."} titlestyle = {"mb-10 text-6xl font-black self-start"}/>
      <EventsCarousel subtitle={"Upcoming Events."} titlestyle = {"mb-10 text-4xl font-black pt-10 self-start"}/>
    </>
  )
}