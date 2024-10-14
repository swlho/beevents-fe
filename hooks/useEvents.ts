import { useQuery } from "@tanstack/react-query"

const fetchEvents = async (bool) => {
    const response =  await fetch(`https://beevents-be.onrender.com/events?is_archived=${bool}`)
    const data = await response.json()
    return data
}

const useEvents = (bool) => {
    return useQuery({
        queryKey: ['events'],
        queryFn: ()=>fetchEvents(bool),
      })
}

export { fetchEvents, useEvents }