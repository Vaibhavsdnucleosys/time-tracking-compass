
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { LoginForm } from '@/components/Login/LoginForm';
import { Header } from '@/components/Layout/Header';
import { DashboardCards } from '@/components/Dashboard/DashboardCards';
import { TimeTracker } from '@/components/TimeTracker/TimeTracker';
import { ProjectList } from '@/components/Projects/ProjectList';
import { TaskList } from '@/components/Tasks/TaskList';
import { ReportsView } from '@/components/Reports/ReportsView';
import { ClientList } from '@/components/Clients/ClientList';
import { UserList } from '@/components/Users/UserList';
import { ApprovalsList } from '@/components/Approvals/ApprovalsList';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/Layout/AppSidebar';

const Index = () => {
  const { isAuthenticated } = useAuth();
  const [currentView, setCurrentView] = useState('dashboard');

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  const renderMainContent = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <DashboardCards />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="lg:col-span-2">
                <TimeTracker />
              </div>
            </div>
          </div>
        );
      case 'timetracker':
        return <TimeTracker />;
      case 'projects':
        return <ProjectList />;
      case 'tasks':
      case 'my-tasks':
        return <TaskList />;
      case 'reports':
        return <ReportsView />;
      case 'clients':
        return <ClientList />;
      case 'users':
        return <UserList />;
      case 'approvals':
        return <ApprovalsList />;
      case 'timesheet-requests':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">My Timesheet Requests</h2>
            <div className="text-center text-gray-600 py-12">
              <p>Timesheet request interface will be displayed here.</p>
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <DashboardCards />
          </div>
        );
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar currentView={currentView} onViewChange={setCurrentView} />
        <div className="flex-1 flex flex-col">
          <header className="h-16 flex items-center justify-between px-6 bg-white border-b border-gray-200">
            <SidebarTrigger className="lg:hidden" />
            <Header />
          </header>
          <main className="flex-1 p-8 overflow-auto">
            {renderMainContent()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
