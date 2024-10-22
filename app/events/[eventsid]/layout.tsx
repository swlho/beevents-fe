// Import your globals here
import UserProvider from "@/app/context/user-provider";
import "@/styles/globals.css";

export const metadata = {
    title: "New page title here",
    description: "Sample description",
};

export default async function Layout({children}: {children: React.ReactNode}) {

    return (
            <UserProvider>{children}</UserProvider>
    );

}