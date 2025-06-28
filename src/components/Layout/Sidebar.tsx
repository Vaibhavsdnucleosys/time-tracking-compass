
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  FolderOpen, 
  ClipboardList, 
  Clock, 
  BarChart3, 
  Settings,
  Plus,
  CheckSquare
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  const { user } = useAuth();

  const getMenuItems = () => {
    const baseItems = [
      { id: 'dashboard', label: 'Dashboard', icon: BarChart3 }
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
    <div className="bg-gray-900 text-white w-64 min-h-screen p-4">
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={currentView === item.id ? "secondary" : "ghost"}
              className={`w-full justify-start text-left ${
                currentView === item.id 
                  ? 'bg-gray-700 text-white' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
              onClick={() => onViewChange(item.id)}
            >
              <Icon className="h-5 w-5 mr-3" />
              {item.label}
            </Button>
          );
        })}
      </nav>
    </div>
  );
};
