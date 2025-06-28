
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
  CheckSquare,
  Home
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  const { user } = useAuth();

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
    <div className="bg-white border-r border-gray-200 w-64 min-h-screen shadow-sm">
      <div className="p-4">
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Navigation
          </h3>
        </div>
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <Button
                key={item.id}
                variant="ghost"
                className={`w-full justify-start text-left rounded-xl transition-smooth ${
                  isActive 
                    ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border border-blue-200 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
                onClick={() => onViewChange(item.id)}
              >
                <Icon className={`h-5 w-5 mr-3 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                <span className="font-medium">{item.label}</span>
              </Button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
