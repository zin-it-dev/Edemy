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
  useSidebar,
} from '@/components/ui/sidebar';
import Logo from '@/features/marketing/components/logo';
import { NavLink } from 'react-router';
import { DialogCourse } from '@/features/dashboard/components/dialog-course';
import { sidebarData } from '@/constants/data';
import Credits from '@/features/dashboard/components/credits';
import CurrentUserButton from '@/features/auth/components/currentuser-button';
import { useAuth } from '@/features/auth/hooks/use-auth';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function AppSidebar() {
  const { user } = useAuth();
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="p-4">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center justify-between">
            <Logo />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          {!isCollapsed && (
            <SidebarGroupLabel className="text-muted-foreground text-[11px] font-semibold tracking-wider uppercase">
              AI Tutor
            </SidebarGroupLabel>
          )}
          <div className="mt-1">
            <DialogCourse />
          </div>
        </SidebarGroup>

        <SidebarGroup className="mt-2">
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {sidebarData.map((opt) => (
                <SidebarMenuItem key={opt.title}>
                  <SidebarMenuButton
                    render={
                      <NavLink
                        to={opt.to}
                        end={opt.end}
                        className={({ isActive }) =>
                          isActive
                            ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                            : ''
                        }
                      >
                        <opt.icon className="size-5 shrink-0" />
                        <span>{opt.title}</span>
                      </NavLink>
                    }
                    tooltip={opt.title}
                    className="hover:bg-accent/60 h-10 transition-colors"
                  />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-sidebar-border space-y-3 border-t p-3">
        {/* Credits Widget: Ẩn hoặc chuyển icon khi collapse */}
        {!isCollapsed ? (
          <div className="border-border/60 bg-card/50 rounded-lg border p-3 shadow-xs backdrop-blur-xs">
            <Credits />
          </div>
        ) : (
          <Tooltip>
            <TooltipTrigger
              render={
                <div className="flex justify-center py-2">
                  <Credits isCompact />
                </div>
              }
            />
            <TooltipContent side="right">Credits Left</TooltipContent>
          </Tooltip>
        )}

        {/* User Info Widget */}
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-3 px-1 py-1">
            <CurrentUserButton />
            {!isCollapsed && (
              <div className="flex min-w-0 flex-col overflow-hidden text-xs">
                <span className="text-sidebar-foreground truncate leading-tight font-medium">
                  {user?.email ?? 'user@example.com'}
                </span>
                <span className="text-muted-foreground truncate text-[10px]">
                  Free Account
                </span>
              </div>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
