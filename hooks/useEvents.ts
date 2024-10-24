import { useQuery } from "@tanstack/react-query"

const fetchEvents = async (bool:boolean, query) => {
    let queryStr = null
    const [selectorValue, order] = query
    
    if(!query){
        queryStr = ''
    } else {
        queryStr = `&order_by=${selectorValue}&descending=${order}`
    }

    const response =  await fetch(`https://beevents-be.onrender.com/events?is_archived=${bool}${queryStr}`)
    const data = await response.json()
    return data
}

const useEvents = (bool, query) => {
    return useQuery({
        queryKey: ['events', query],
        queryFn: ()=>fetchEvents(bool, query)
      })
}

export { fetchEvents, useEvents }