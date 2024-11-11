import type { Metadata } from "next"
import type { ReactNode } from "react"
import "@/styles/globals.css"
import QueryProvider from "@/lib/_QueryProvider"

import UserProvider from "@/lib/context/user-provider"
import dynamic from "next/dynamic"

export const metadata: Metadata = {
  title: {
    default: "Beevents",
    template: "%s | Next.js for Drupal",
  },
  description: "Beevents",
  icons: {
    icon: "/favicon.ico",
  },
}

const HeaderNav = dynamic(()=> import("@/components/navigation/HeaderNav").then((mod) => mod.HeaderNav), {ssr:false})
const StaffProvider = dynamic(()=> import("../lib/context/staff-provider"), {ssr:false})

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: ReactNode
}) {

  return (
    <html lang="en">
      <body>
        <QueryProvider>
        <StaffProvider>
        <UserProvider>
        <div className="max-w-screen-md px-6 mx-auto">
          <HeaderNav />
          <main className="container py-10 mx-auto">{children}</main>
        </div>
        </UserProvider>
        </StaffProvider>
        </QueryProvider>
      </body>
    </html>
  )
}