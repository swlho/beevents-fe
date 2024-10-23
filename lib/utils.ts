import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatToTimestamp(dateStr:string){
  const date = new Date(dateStr)
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date format");
  }
  
  // Return the date as timestamp
  return date.getTime();
}

export function formatDateTime(dateStr:string){
  const dateObj = new Date(dateStr)
  const options = {
    timeZone: "Europe/London",
    timeZoneName: "shortOffset",
    hour: "numeric",
    minute: "numeric",
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  }
  const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(dateObj)
  return formattedDate
}