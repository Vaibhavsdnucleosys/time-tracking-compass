
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, User } from 'lucide-react';
import { TaskModal } from './TaskModal';
import { useAuth } from '@/context/AuthContext';

export const TaskList: React.FC = () => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const tasks = [
    {
      id: '1',
      title: 'Design Homepage Layout',
      project: 'E-commerce Website',
      assignedTo: 'John Doe',
      status: 'in-progress',
      priority: 'high',
      estimatedTime: 8,
      actualTime: 6,
      dueDate: '2024-01-10'
    },
    {
      id: '2',
      title: 'Implement User Authentication',
      project: 'Mobile App Development',
      assignedTo: 'Jane Smith',
      status: 'pending',
      priority: 'medium',
      estimatedTime: 12,
      actualTime: 0,
      dueDate: '2024-01-15'
    },
    {
      id: '3',
      title: 'Create Database Schema',
      project: 'Data Analytics Dashboard',
      assignedTo: 'Mike Wilson',
      status: 'completed',
      priority: 'high',
      estimatedTime: 6,
      actualTime: 7,
      dueDate: '2023-12-30'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'in-progress': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-orange-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const canManageTasks = ['admin', 'director', 'pm', 'tl'].includes(user?.role || '');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          {user?.role === 'employee' ? 'My Tasks' : 'Tasks Management'}
        </h2>
        {canManageTasks && (
          <Button onClick={() => setIsModalOpen(true)} className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Task</span>
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <Card key={task.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{task.title}</CardTitle>
                <div className="flex space-x-2">
                  <Badge className={`${getPriorityColor(task.priority)} text-white`}>
                    {task.priority}
                  </Badge>
                  <Badge className={`${getStatusColor(task.status)} text-white`}>
                    {task.status}
                  </Badge>
                </div>
              </div>
              <p className="text-sm text-gray-600">{task.project}</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{task.assignedTo}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600">Est. Time:</span>
                  <span className="font-semibold ml-1">{task.estimatedTime}h</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600">Actual Time:</span>
                  <span className="font-semibold ml-1">{task.actualTime}h</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600">Due:</span>
                  <span className="font-semibold ml-1">{task.dueDate}</span>
                </div>
              </div>

              <div className="flex space-x-2">
                {user?.role === 'employee' ? (
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                ) : (
                  <>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      <User className="h-4 w-4 mr-1" />
                      Assign
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {canManageTasks && (
        <TaskModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          task={editingTask}
        />
      )}
    </div>
  );
};
