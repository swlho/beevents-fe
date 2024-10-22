import { useQuery } from "@tanstack/react-query"

const fetchArchivedEventsByUserId = async (id, bool) => {
    const response =  await fetch(`https://beevents-be.onrender.com/events/user/${id}?is_archived=${bool}`)
    const data = await response.json()
    return data
}

const useArchivedEventsByUserId = (id, bool) => {
    return useQuery({
        queryKey: ['archived-events-by-user-id'],
        queryFn: ()=>fetchArchivedEventsByUserId(id, bool),
      })
}

export { fetchArchivedEventsByUserId, useArchivedEventsByUserId }