import { useQuery } from "@tanstack/react-query"

const fetchEventsByStaffId = async (staffId=3, bool) => {
    const response =  await fetch(`https://beevents-be.onrender.com/events/staff/${staffId}?is_archived=${bool}`)
    const data = await response.json()
    return data
}

const useEventsByStaffId = (staffId, bool) => {
    return useQuery({
        queryKey: ['events-by-staff-id'],
        queryFn: ()=>fetchEventsByStaffId(staffId, bool),
      })
}

export { fetchEventsByStaffId, useEventsByStaffId }