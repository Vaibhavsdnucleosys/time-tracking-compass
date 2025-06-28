
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, User, Eye, Calendar, Clock } from 'lucide-react';
import { TaskModal } from './TaskModal';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/hooks/use-toast';

export const TaskList: React.FC = () => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [tasks, setTasks] = useState([
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
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500 hover:bg-yellow-600';
      case 'in-progress': return 'bg-blue-500 hover:bg-blue-600';
      case 'completed': return 'bg-green-500 hover:bg-green-600';
      default: return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500 hover:bg-red-600';
      case 'medium': return 'bg-orange-500 hover:bg-orange-600';
      case 'low': return 'bg-green-500 hover:bg-green-600';
      default: return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  const canManageTasks = ['admin', 'director', 'pm', 'tl'].includes(user?.role || '');

  const handleEditTask = (task: any) => {
    console.log('Edit task:', task);
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleViewTask = (task: any) => {
    console.log('View task:', task);
    toast({
      title: "Task Details",
      description: `Viewing details for "${task.title}"`,
    });
  };

  const handleDeleteTask = (taskId: string) => {
    console.log('Delete task:', taskId);
    setTasks(tasks.filter(task => task.id !== taskId));
    toast({
      title: "Task Deleted",
      description: "The task has been successfully deleted.",
      variant: "destructive",
    });
  };

  const handleAddTask = () => {
    console.log('Add new task');
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            {user?.role === 'employee' ? 'My Tasks' : 'Tasks Management'}
          </h2>
          <p className="text-gray-600 mt-1">
            {user?.role === 'employee' ? 'Track your assigned tasks' : 'Manage and assign tasks to team members'}
          </p>
        </div>
        {canManageTasks && (
          <Button 
            onClick={handleAddTask} 
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
          >
            <Plus className="h-4 w-4" />
            <span>Add Task</span>
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6">
        {tasks.map((task) => (
          <Card key={task.id} className="hover:shadow-lg transition-all duration-200 border-0 shadow-md">
            <CardHeader className="pb-4">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="flex-1">
                  <CardTitle className="text-xl text-gray-900 mb-2">{task.title}</CardTitle>
                  <p className="text-gray-600 font-medium">{task.project}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge className={`${getPriorityColor(task.priority)} text-white border-0 shadow-sm`}>
                    {task.priority}
                  </Badge>
                  <Badge className={`${getStatusColor(task.status)} text-white border-0 shadow-sm`}>
                    {task.status.replace('-', ' ')}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2 text-gray-600">
                  <User className="h-4 w-4" />
                  <span className="text-sm font-medium">{task.assignedTo}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">
                    <span className="font-medium">{task.estimatedTime}h</span> estimated
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">
                    <span className="font-medium">{task.actualTime}h</span> logged
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm font-medium">{task.dueDate}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <div className="flex flex-col sm:flex-row gap-2">
                  {user?.role === 'employee' ? (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleViewTask(task)}
                      className="flex items-center space-x-2 hover:bg-gray-50"
                    >
                      <Eye className="h-4 w-4" />
                      <span>View Details</span>
                    </Button>
                  ) : (
                    <>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleViewTask(task)}
                        className="flex items-center space-x-2 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300"
                      >
                        <Eye className="h-4 w-4" />
                        <span>View</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleEditTask(task)}
                        className="flex items-center space-x-2 hover:bg-green-50 hover:text-green-700 hover:border-green-300"
                      >
                        <Edit className="h-4 w-4" />
                        <span>Edit</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleDeleteTask(task.id)}
                        className="flex items-center space-x-2 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span>Delete</span>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {tasks.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Plus className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No tasks yet</h3>
          <p className="text-gray-600 mb-4">Get started by creating your first task</p>
          {canManageTasks && (
            <Button onClick={handleAddTask} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Create Task
            </Button>
          )}
        </div>
      )}

      <TaskModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        task={editingTask}
      />
    </div>
  );
};
