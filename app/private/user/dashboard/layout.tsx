// Import your globals here
import "@/styles/globals.css";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
// import { hasLoggedIn$ } from "@/app/_stores/_login"

export const metadata = {
    title: "New page title here",
    description: "Sample description",
};

export default async function Layout({children}: {children: React.ReactNode}) {
    
    // const userLoggedIn$ = hasLoggedIn$.get()

    const supabase = createClient()

    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
      redirect('/login')
    } else {
        // // userLoggedIn$.setLoggedIn()
        // console.log(userLoggedIn$.loggedIn)
        return (
            <div>{children}</div>
    );
    }
}