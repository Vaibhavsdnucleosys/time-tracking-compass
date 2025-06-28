
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Bell, User, LogOut, Settings } from 'lucide-react';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [notifications] = useState(3); // Mock notification count

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-gradient-to-r from-red-500 to-pink-500 text-white';
      case 'director': return 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white';
      case 'pm': return 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white';
      case 'tl': return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white';
      case 'employee': return 'bg-gradient-to-r from-gray-500 to-slate-500 text-white';
      default: return 'bg-gradient-to-r from-gray-500 to-slate-500 text-white';
    }
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100 px-6 py-4 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                TimeTracker Pro
              </h1>
              <p className="text-xs text-gray-500 -mt-1">Project Management Suite</p>
            </div>
          </div>
          <Badge className={`${getRoleBadgeColor(user?.role || '')} border-0 shadow-sm`}>
            {user?.role?.toUpperCase()}
          </Badge>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button 
            variant="ghost" 
            size="sm" 
            className="relative hover:bg-gray-100 rounded-xl transition-smooth"
          >
            <Bell className="h-5 w-5 text-gray-600" />
            {notifications > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-gradient-to-r from-red-500 to-pink-500 border-2 border-white">
                {notifications}
              </Badge>
            )}
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="flex items-center space-x-3 hover:bg-gray-100 rounded-xl px-4 py-2 transition-smooth"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-medium text-gray-900">{user?.name}</div>
                  <div className="text-xs text-gray-500">{user?.email}</div>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white/95 backdrop-blur-sm border border-gray-200 shadow-lg">
              <DropdownMenuItem className="hover:bg-gray-50 transition-smooth">
                <Settings className="h-4 w-4 mr-2 text-gray-500" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout} className="hover:bg-red-50 text-red-700 transition-smooth">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
