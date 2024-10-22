import { useQuery } from "@tanstack/react-query"

const fetchUserById = async (id) => {
    const response =  await fetch(`https://beevents-be.onrender.com/user/${id}`)
    const data = await response.json()
    return data
}

const useUserById = (id) => {
    return useQuery({
        queryKey: ['user-by-id'],
        queryFn: ()=>fetchUserById(id),
      })
}

export { fetchUserById, useUserById }