import { useQuery } from "@tanstack/react-query";

const fetchEventsByUserId = async (id, bool) => {
  const response = await fetch(`https://beevents-be.onrender.com/events/user/${id}?is_archived=${bool}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
};

const useEventsByUserId = (id, bool) => {
  return useQuery({
    queryKey: ['events-by-user-id', id, bool],
    queryFn: () => fetchEventsByUserId(id, bool),
    enabled: !!id && bool !== undefined, // Only run query if `id` is set and `bool` is not undefined
  });
};

export { fetchEventsByUserId, useEventsByUserId };
