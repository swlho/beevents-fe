import { useQuery } from "@tanstack/react-query"

const fetchEventById = async (id) => {
    const response =  await fetch(`https://beevents-be.onrender.com/events/${id}`)
    const data = await response.json()
    return data
}

const useEventById = (id) => {
    return useQuery({
        queryKey: ['event_by_id'],
        queryFn: ()=>fetchEventById(id),
      })
}

export { fetchEventById, useEventById }