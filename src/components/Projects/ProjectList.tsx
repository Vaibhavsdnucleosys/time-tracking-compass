
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { ProjectModal } from './ProjectModal';

export const ProjectList: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const projects = [
    {
      id: '1',
      name: 'E-commerce Website',
      client: 'Tech Corp',
      status: 'active',
      progress: 75,
      estimatedHours: 120,
      actualHours: 90,
      dueDate: '2024-01-15'
    },
    {
      id: '2',
      name: 'Mobile App Development',
      client: 'StartupXYZ',
      status: 'active',
      progress: 45,
      estimatedHours: 200,
      actualHours: 90,
      dueDate: '2024-02-28'
    },
    {
      id: '3',
      name: 'Data Analytics Dashboard',
      client: 'BigData Inc',
      status: 'completed',
      progress: 100,
      estimatedHours: 80,
      actualHours: 85,
      dueDate: '2023-12-20'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'completed': return 'bg-blue-500';
      case 'on-hold': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Projects</h2>
        <Button onClick={() => setIsModalOpen(true)} className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Project</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{project.name}</CardTitle>
                <Badge className={`${getStatusColor(project.status)} text-white`}>
                  {project.status}
                </Badge>
              </div>
              <p className="text-sm text-gray-600">{project.client}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Estimated:</span>
                  <div className="font-semibold">{project.estimatedHours}h</div>
                </div>
                <div>
                  <span className="text-gray-600">Actual:</span>
                  <div className="font-semibold">{project.actualHours}h</div>
                </div>
              </div>

              <div className="text-sm">
                <span className="text-gray-600">Due Date:</span>
                <div className="font-semibold">{project.dueDate}</div>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="text-red-600">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <ProjectModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        project={editingProject}
      />
    </div>
  );
};
