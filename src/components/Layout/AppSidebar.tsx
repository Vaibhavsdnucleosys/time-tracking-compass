
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { 
  Users, 
  FolderOpen, 
  ClipboardList, 
  Clock, 
  BarChart3, 
  CheckSquare,
  Home
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

interface AppSidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({ currentView, onViewChange }) => {
  const { user } = useAuth();
  const { state } = useSidebar();

  const getMenuItems = () => {
    const baseItems = [
      { id: 'dashboard', label: 'Dashboard', icon: Home }
    ];

    if (user?.role === 'employee') {
      return [
        ...baseItems,
        { id: 'timetracker', label: 'Time Tracker', icon: Clock },
        { id: 'my-tasks', label: 'My Tasks', icon: CheckSquare },
        { id: 'timesheet-requests', label: 'Timesheet Requests', icon: ClipboardList }
      ];
    }

    // For managers and above
    const managerItems = [
      ...baseItems,
      { id: 'projects', label: 'Projects', icon: FolderOpen },
      { id: 'tasks', label: 'Tasks', icon: CheckSquare },
      { id: 'timetracker', label: 'Time Tracker', icon: Clock },
      { id: 'reports', label: 'Reports', icon: BarChart3 },
      { id: 'approvals', label: 'Approvals', icon: ClipboardList }
    ];

    if (user?.role === 'admin' || user?.role === 'director') {
      managerItems.splice(2, 0, { id: 'clients', label: 'Clients', icon: Users });
      managerItems.push({ id: 'users', label: 'Users', icon: Users });
    }

    return managerItems;
  };

  const menuItems = getMenuItems();

  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-500 font-semibold uppercase tracking-wider text-xs mb-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => onViewChange(item.id)}
                      isActive={isActive}
                      className={`w-full justify-start rounded-xl transition-all duration-200 ${
                        isActive 
                          ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border border-blue-200 shadow-sm hover:from-blue-100 hover:to-purple-100' 
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className={`h-5 w-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                      <span className="font-medium">{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
