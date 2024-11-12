import EventsCarousel from "@/components/misc/EventsCarousel"
import Loading from "@/components/misc/Loading"
import ForwardButton from "@/components/navigation/AllEventsButton"
import type { Metadata } from "next"

export const metadata: Metadata = {
  description: "Beevents - Homepage",
}

export default async function Home() {

  return (
    <>
      <ForwardButton path='/events'/>
      <EventsCarousel subtitle={"Latest Events."} titlestyle = {"mb-10 text-6xl font-black self-start"} useFilter={false}/>
      <EventsCarousel subtitle={"Events in the next 30 days."} titlestyle = {"mb-10 text-4xl font-black pt-10 self-start"} useFilter={true}/>
    </>
  )
}