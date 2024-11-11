import { useQuery } from "@tanstack/react-query"

const fetchArchivedEventsByStaffId = async (staffId, bool) => {
    const response =  await fetch(`https://beevents-be.onrender.com/events/staff/${staffId}?is_archived=${bool}`)
    const data = await response.json()
    return data
}

const useArchivedEventsByStaffId = (staffId, bool) => {
    return useQuery({
        queryKey: ['archived-events-by-staff-id'],
        queryFn: ()=>fetchArchivedEventsByStaffId(staffId, bool),
      })
}

export { fetchArchivedEventsByStaffId, useArchivedEventsByStaffId }