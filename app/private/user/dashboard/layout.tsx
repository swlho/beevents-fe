// Import your globals here
import "@/styles/globals.css";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const metadata = {
    title: "New page title here",
    description: "Sample description",
};

export default async function Layout({children}: {children: React.ReactNode}) {
    
    const supabase = createClient()

    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
      redirect('/login')
    }
    
    return (
            <div>{children}</div>
    );
}