import { HeaderNav } from "@/components/navigation/HeaderNav"
import type { Metadata } from "next"
import type { ReactNode } from "react"
import "@/styles/globals.css"
import QueryProvider from "@/lib/_QueryProvider"

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

export default async function RootLayout({
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
        <div className="max-w-screen-md px-6 mx-auto">
          <HeaderNav />
          <main className="container py-10 mx-auto">{children}</main>
        </div>
        </QueryProvider>
      </body>
    </html>
  )
}