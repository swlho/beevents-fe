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