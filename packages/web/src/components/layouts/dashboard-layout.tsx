import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { Outlet } from "react-router";
import AppHeader from "@/components/ui/app-header";
import { Toaster } from "../ui/sonner";


export default function DashboardLayout() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <main className="w-full">
                    <AppHeader/>
                    <div className="p-10">
                        <Outlet />
                    </div>
                </main>
                <Toaster />
            </SidebarInset>
        </SidebarProvider>
    );
}
