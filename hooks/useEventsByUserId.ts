import { useQuery } from "@tanstack/react-query"

const fetchEventsByUserId = async (id, bool) => {
    const response =  await fetch(`https://beevents-be.onrender.com/events/user/${id}?is_archived=${bool}`)
    const data = await response.json()
    return data
}

const useEventsByUserId = (id, bool) => {
    return useQuery({
        queryKey: ['events-by-user-id'],
        queryFn: ()=>fetchEventsByUserId(id, bool),
      })
}

export { fetchEventsByUserId, useEventsByUserId }