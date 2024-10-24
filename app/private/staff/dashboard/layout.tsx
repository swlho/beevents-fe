// Import your globals here
import StaffProvider from "@/app/context/staff-provider";
import "@/styles/globals.css";

export const metadata = {
    title: "New page title here",
    description: "Sample description",
};

export default async function Layout({children}: {children: React.ReactNode}) {

    return (
            <StaffProvider>{children}</StaffProvider>
    );

}