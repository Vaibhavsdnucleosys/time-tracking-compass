
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Users } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  client: string;
  status: string;
  progress: number;
  estimatedHours: number;
  actualHours: number;
  dueDate: string;
  description?: string;
}

interface ProjectViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

export const ProjectViewModal: React.FC<ProjectViewModalProps> = ({ isOpen, onClose, project }) => {
  if (!project) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500 text-white';
      case 'completed': return 'bg-blue-500 text-white';
      case 'on-hold': return 'bg-yellow-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">Project Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">{project.name}</h3>
            <Badge className={`${getStatusColor(project.status)} border-0 shadow-sm`}>
              {project.status}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <Users className="h-4 w-4" />
                <div>
                  <span className="text-sm text-gray-500">Client:</span>
                  <p className="font-medium text-gray-900">{project.client}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar className="h-4 w-4" />
                <div>
                  <span className="text-sm text-gray-500">Due Date:</span>
                  <p className="font-medium text-gray-900">{new Date(project.dueDate).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-gray-700">Progress</span>
                  <span className="font-bold text-gray-900">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300" 
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <div className="text-sm">
                    <span className="text-gray-600">Estimated:</span>
                    <div className="font-semibold text-gray-900">{project.estimatedHours}h</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <div className="text-sm">
                    <span className="text-gray-600">Actual:</span>
                    <div className="font-semibold text-gray-900">{project.actualHours}h</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {project.description && (
            <div>
              <label className="text-sm font-medium text-gray-500">Description</label>
              <p className="mt-1 text-gray-900 bg-gray-50 p-3 rounded-md">{project.description}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
