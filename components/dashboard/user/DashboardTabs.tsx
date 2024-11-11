"use client"

import React, { useContext, useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MyEvents from './MyEvents'
import ProfileTab from './ProfileTab'
import { UserContext } from '@/lib/context/user-provider'
import UserCalendar from './UserCalendar'
import { useEventsByUserId } from '@/hooks/useEventsByUserId'
import Loading from '@/components/misc/Loading'

function DashboardTabs() {
  const user = useContext(UserContext);
  const [resolvedUser, setResolvedUser] = useState(null);

  useEffect(() => {
    let attemptCount = 0;
    const maxAttempts = 5; // Set a limit for attempts to avoid infinite reloads

    const checkUserAndReload = () => {
      if (user && user[0]) {
        setResolvedUser(user[0]); // Set resolved user if user[0] exists
      } else if (attemptCount < maxAttempts) {
        attemptCount += 1; // Increase attempt count
      } else {
        clearInterval(interval); // Stop checking after max attempts
        window.location.reload(); // Reload the page
      }
    };

    // Check immediately and set interval for periodic checking
    checkUserAndReload();
    const interval = setInterval(checkUserAndReload, 1000); // Check every 3 seconds

    return () => clearInterval(interval); // Clear interval on unmount
  }, [user]);

  // Call useEventsByUserId unconditionally; it will only fetch when enabled.
  const { data, isPending, isError, isFetching } = useEventsByUserId(
    resolvedUser ? resolvedUser.id : null,
    false // Pass `false` or whatever your `bool` value is
  );

  if (!resolvedUser) {
    return <Loading />; // Show loading until `resolvedUser` is available
  }

  if (isPending || isFetching) {
    return <Loading />;
  }

  if (isError) {
    return <span>Error!</span>;
  }

  const { id, email } = resolvedUser;

  return (
    <>
      <h1 className='mb-5 font-medium'>Signed in as {email}</h1>
      <Tabs defaultValue="my-events" className="w-full h-full bg-gray-100">
        <TabsList className="grid w-full grid-cols-4 bg-yellow-400">
          <TabsTrigger value="my-events" className='bg-yellow-100'>My Events</TabsTrigger>
          <TabsTrigger value="calendar" className='bg-yellow-100'>Calendar</TabsTrigger>
          <TabsTrigger value="profile" className='bg-yellow-100'>Profile</TabsTrigger>
          <TabsTrigger value="password" className='bg-yellow-100'>Password</TabsTrigger>
        </TabsList>

        {/* DASHBOARD CONTENT */}
        <TabsContent value="my-events"><MyEvents userId={id} userEvents={data} /></TabsContent>
        <TabsContent value="calendar"><UserCalendar userEvents={data} /></TabsContent>
        <TabsContent value="profile"><ProfileTab userId={id} /></TabsContent>
        <TabsContent value="password">Coming soon. Please contact site admin for help.</TabsContent>
      </Tabs>
    </>
  );
}

export default DashboardTabs