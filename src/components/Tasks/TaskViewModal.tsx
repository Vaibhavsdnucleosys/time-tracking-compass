
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, AlertCircle } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  project: string;
  assignedTo: string;
  status: string;
  priority: string;
  estimatedTime: number;
  actualTime: number;
  dueDate: string;
  description?: string;
}

interface TaskViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
}

export const TaskViewModal: React.FC<TaskViewModalProps> = ({ isOpen, onClose, task }) => {
  if (!task) return null;

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">Task Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">{task.title}</h3>
            <div className="flex gap-2 mb-4">
              <Badge className={getStatusColor(task.status)}>
                {task.status}
              </Badge>
              <Badge className={getPriorityColor(task.priority)}>
                <AlertCircle className="h-3 w-3 mr-1" />
                {task.priority} priority
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <User className="h-4 w-4" />
                <div>
                  <span className="text-sm text-gray-500">Assigned to:</span>
                  <p className="font-medium text-gray-900">{task.assignedTo}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar className="h-4 w-4" />
                <div>
                  <span className="text-sm text-gray-500">Due Date:</span>
                  <p className="font-medium text-gray-900">{new Date(task.dueDate).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <span className="text-sm text-gray-500">Project:</span>
                <p className="font-medium text-gray-900">{task.project}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Time Progress</span>
                  <span className="font-medium text-gray-900">{task.actualTime}h / {task.estimatedTime}h</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${Math.min((task.actualTime / task.estimatedTime) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {task.description && (
            <div>
              <label className="text-sm font-medium text-gray-500">Description</label>
              <p className="mt-1 text-gray-900 bg-gray-50 p-3 rounded-md">{task.description}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
