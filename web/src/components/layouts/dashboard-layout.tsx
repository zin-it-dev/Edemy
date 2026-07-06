import { Outlet } from 'react-router';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '../ui/sidebar';
import { AppSidebar } from '../ui/app-sidebar';

const DashboardLayout = () => {
  // const sidebarLinks = [
  //   { name: 'Dashboard', path: '/dashboard', icon: dashboardicon },
  //   { name: 'Overview', path: '/overview', icon: overviewicon },
  //   { name: 'Chat', path: '/chat', icon: chaticon },
  // ];

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main>
          <SidebarTrigger />
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
