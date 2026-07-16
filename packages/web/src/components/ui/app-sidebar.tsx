import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import Logo from '@/components/ui/logo';
import {
  User2
} from 'lucide-react';
import { NavLink } from 'react-router';
import { DialogCourse } from './dialog-course';
import { sidebarData } from '@/constants/data';


export function AppSidebar() {
  return (
    <Sidebar variant="sidebar">
      <SidebarHeader>
        <SidebarMenu className={'p-2'}>
          <Logo to={'/'} />
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>AI Tutor</SidebarGroupLabel>
          <DialogCourse />
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarData.map((opt) => (
                <SidebarMenuItem key={opt.title}>
                  <NavLink
                    to={opt.to}
                    end={opt.end}
                    style={{ display: 'contents' }}
                  >
                    {({ isActive }) => (
                      <SidebarMenuButton isActive={isActive} className="py-6">
                        <opt.icon className="mr-2 size-7" />
                        <span className={isActive ? 'font-medium' : ''}>
                          {opt.title}
                        </span>
                      </SidebarMenuButton>
                    )}
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <User2 /> Username
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
