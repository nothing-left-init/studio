'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Bell,
  Home,
  Users,
  Dumbbell,
  Calendar,
  FileText,
  Video,
  Settings,
  Shield,
  User,
  Activity,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { UserNav } from '@/components/dashboard/UserNav';
import { Logo } from '@/components/icons/logo';
import { ThemeToggle } from '@/components/common/ThemeToggle';

const navItems = {
  admin: [
    { href: '/dashboard/admin', icon: <Shield />, label: 'Dashboard', tooltip: 'Admin' },
    { href: '#', icon: <Users />, label: 'Members', tooltip: 'Members' },
    { href: '#', icon: <User />, label: 'Trainers', tooltip: 'Trainers' },
    { href: '#', icon: <Calendar />, label: 'Schedules', tooltip: 'Schedules' },
    { href: '#', icon: <Dumbbell />, label: 'Plans', tooltip: 'Plans' },
    { href: '#', icon: <Video />, label: 'Videos', tooltip: 'Videos' },
    { href: '#', icon: <FileText />, label: 'Diet Plans', tooltip: 'Diet Plans' },
    { href: '#', icon: <Bell />, label: 'Notifications', tooltip: 'Notifications' },
  ],
  trainer: [
    { href: '/dashboard/trainer', icon: <Home />, label: 'Dashboard', tooltip: 'Dashboard' },
    { href: '#', icon: <Users />, label: 'My Members', tooltip: 'My Members' },
    { href: '#', icon: <Activity />, label: 'Track Performance', tooltip: 'Track Performance' },
    { href: '#', icon: <Dumbbell />, label: 'Upload Plans', tooltip: 'Upload Plans' },
    { href: '#', icon: <Video />, label: 'Share Videos', tooltip: 'Share Videos' },
  ],
  user: [
    { href: '/dashboard/user', icon: <Home />, label: 'Dashboard', tooltip: 'Dashboard' },
    { href: '#', icon: <Dumbbell />, label: 'Workout Plan', tooltip: 'Workout Plan' },
    { href: '#', icon: <Activity />, label: 'Progress Tracker', tooltip: 'Progress Tracker' },
    { href: '#', icon: <Video />, label: 'Workout Videos', tooltip: 'Workout Videos' },
    { href: '#', icon: <FileText />, label: 'Diet Plans', tooltip: 'Diet Plans' },
  ],
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const segments = pathname.split('/');
  const role = segments.length > 2 && ['admin', 'trainer', 'user'].includes(segments[2]) ? segments[2] : 'user';

  const items = navItems[role as keyof typeof navItems];

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <div className="flex w-full items-center justify-center p-2 group-data-[collapsible=icon]:justify-center">
            <Logo className="size-7 shrink-0 group-data-[collapsible=icon]:size-7" />
            <span className="font-bold text-lg group-data-[collapsible=icon]:hidden ml-2">GymGenius</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton asChild tooltip={{ children: item.tooltip }} isActive={pathname.startsWith(item.href)}>
                  <Link href={item.href}>
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip={{ children: 'Settings' }} isActive={pathname === '/dashboard/settings'}>
                <Link href="/dashboard/settings">
                  <Settings />
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="sm:hidden" />
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="outline" size="icon" className="h-9 w-9">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
            <UserNav />
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4 sm:p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
