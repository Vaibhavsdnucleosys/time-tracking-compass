
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Eye, Calendar, Clock, User, AlertCircle } from 'lucide-react';
import { TaskModal } from './TaskModal';
import { TaskViewModal } from './TaskViewModal';
import { toast } from '@/hooks/use-toast';

export const TaskList: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [viewingTask, setViewingTask] = useState(null);
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
      dueDate: '2024-01-10',
      description: 'Create a modern and responsive homepage layout for the e-commerce platform'
    },
    {
      id: '2',
      title: 'API Integration',
      project: 'Mobile App',
      assignedTo: 'Jane Smith',
      status: 'pending',
      priority: 'medium',
      estimatedTime: 12,
      actualTime: 0,
      dueDate: '2024-01-15',
      description: 'Integrate payment gateway and user authentication APIs'
    },
    {
      id: '3',
      title: 'Database Migration',
      project: 'Data Analytics Dashboard',
      assignedTo: 'Mike Johnson',
      status: 'completed',
      priority: 'high',
      estimatedTime: 16,
      actualTime: 14,
      dueDate: '2024-01-05',
      description: 'Migrate legacy database to new cloud infrastructure'
    }
  ]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'on-hold': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewTask = (task: any) => {
    console.log('View task:', task);
    setViewingTask(task);
    setIsViewModalOpen(true);
  };

  const handleEditTask = (task: any) => {
    console.log('Edit task:', task);
    setEditingTask(task);
    setIsModalOpen(true);
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

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setViewingTask(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Tasks</h2>
          <p className="text-gray-600 mt-1">Manage and track your team's tasks and assignments</p>
        </div>
        <Button 
          onClick={handleAddTask} 
          className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
        >
          <Plus className="h-4 w-4" />
          <span>Add Task</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <Card key={task.id} className="hover:shadow-lg transition-all duration-200 border-0 shadow-md">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg text-gray-900 mb-2">{task.title}</CardTitle>
                  <div className="flex items-center space-x-2 text-gray-600 mb-2">
                    <User className="h-4 w-4" />
                    <span className="text-sm font-medium">{task.assignedTo}</span>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getStatusColor(task.status)}>
                      {task.status}
                    </Badge>
                    <Badge className={getPriorityColor(task.priority)}>
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {task.priority}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-gray-600">
                <span className="font-medium">Project:</span> {task.project}
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-gray-700">Time Progress</span>
                  <span className="font-bold text-gray-900">{task.actualTime}h / {task.estimatedTime}h</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300" 
                    style={{ width: `${Math.min((task.actualTime / task.estimatedTime) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar className="h-4 w-4" />
                <div className="text-sm">
                  <span className="text-gray-600">Due:</span>
                  <span className="font-semibold ml-1 text-gray-900">{new Date(task.dueDate).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleViewTask(task)}
                    className="flex-1 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleEditTask(task)}
                    className="flex-1 hover:bg-green-50 hover:text-green-700 hover:border-green-300"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleDeleteTask(task.id)}
                    className="hover:bg-red-50 hover:text-red-700 hover:border-red-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <TaskModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        task={editingTask}
      />

      <TaskViewModal 
        isOpen={isViewModalOpen} 
        onClose={handleCloseViewModal} 
        task={viewingTask}
      />
    </div>
  );
};
