
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { LoginForm } from '@/components/Login/LoginForm';
import { Header } from '@/components/Layout/Header';
import { Sidebar } from '@/components/Layout/Sidebar';
import { DashboardCards } from '@/components/Dashboard/DashboardCards';
import { TimeTracker } from '@/components/TimeTracker/TimeTracker';
import { ProjectList } from '@/components/Projects/ProjectList';
import { TaskList } from '@/components/Tasks/TaskList';
import { ReportsView } from '@/components/Reports/ReportsView';

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
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Clients Management</h2>
            <div className="text-center text-gray-600 py-12">
              <p>Client management interface will be displayed here.</p>
            </div>
          </div>
        );
      case 'users':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">User Management</h2>
            <div className="text-center text-gray-600 py-12">
              <p>User management interface will be displayed here.</p>
            </div>
          </div>
        );
      case 'approvals':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Timesheet Approvals</h2>
            <div className="text-center text-gray-600 py-12">
              <p>Timesheet approval interface will be displayed here.</p>
            </div>
          </div>
        );
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
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar currentView={currentView} onViewChange={setCurrentView} />
        <main className="flex-1 p-8">
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;
