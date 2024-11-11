"use client"

//TO-DO - need to lazy load and disable pre-rendering

import { createContext, useEffect, useState } from "react"

export const StaffContext = createContext(null)

export default function StaffProvider({
    children,
}: {
  children: React.ReactNode
}) {
  if(typeof window !== 'undefined'){
    // Initialize state from sessionStorage or with default values
    const [staff$, setStaff] = useState(() => sessionStorage.getItem("staff") || "");
    const [staff_id$, setStaffId] = useState(() => sessionStorage.getItem("staff_id") || "");
    const [staffLoggedIn$, setStaffLoggedIn] = useState(() => sessionStorage.getItem("staffLoggedIn") === "true");
  
    // Function to update staff state and save to sessionStorage
    const changeStaff = (staff) => {
      setStaff(staff);
      sessionStorage.setItem("staff", staff);
    };
  
    // Function to update staff state and save to sessionStorage
    const changeStaffId = (staff_id) => {
      setStaffId(staff_id);
      sessionStorage.setItem("staff_id", staff_id.toString());
    };
  
    // Function to update loggedIn state and save to sessionStorage
    const changeStaffLoggedIn = (bool) => {
      setStaffLoggedIn(bool);
      sessionStorage.setItem("staffLoggedIn", bool.toString());
    };
  
    const logout = () => {
      // Reset the state
      setStaff("");
      setStaffId("");
      setStaffLoggedIn(false);
      // Clear sessionStorage entries
      sessionStorage.removeItem("staff");
      sessionStorage.removeItem("staff_id");
      sessionStorage.removeItem("staffLoggedIn");
      window.location.href = '/'
    };
  
    // useEffect to sync state with sessionStorage on provider mount
    useEffect(() => {
      // On component mount, sync state with sessionStorage
      const storedStaff = sessionStorage.getItem("staff");
      const storedStaffId = sessionStorage.getItem("staff_id");
      const storedStaffLoggedIn = sessionStorage.getItem("staffLoggedIn");
  
      if (storedStaff) setStaff(storedStaff);
      if (storedStaffId) setStaffId(storedStaffId);
      if (storedStaffLoggedIn) setStaffLoggedIn(storedStaffLoggedIn === "true");
    }, []);

      return <StaffContext.Provider value={{staff: [staff$, changeStaff], staff_id: [staff_id$, changeStaffId], staffLoggedIn : [staffLoggedIn$, changeStaffLoggedIn], logout}}>{children}</StaffContext.Provider>
  }
}