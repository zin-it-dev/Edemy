import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/features/dashboard/components/app-sidebar';
import { Outlet } from 'react-router';
import AppHeader from '@/features/dashboard/components/app-header';
import { Toaster } from '../ui/sonner';

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex min-h-dvh flex-col">
        <AppHeader />
        <main className="mx-auto w-full max-w-7xl flex-1 p-4 transition-all sm:p-6 lg:p-8">
          <Outlet />
        </main>
        <Toaster />
      </SidebarInset>
    </SidebarProvider>
  );
}
