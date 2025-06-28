
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Eye, Calendar, Clock, Users } from 'lucide-react';
import { ProjectModal } from './ProjectModal';
import { ProjectViewModal } from './ProjectViewModal';
import { toast } from '@/hooks/use-toast';

export const ProjectList: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [viewingProject, setViewingProject] = useState(null);
  const [projects, setProjects] = useState([
    {
      id: '1',
      name: 'E-commerce Website',
      client: 'Tech Corp',
      status: 'active',
      progress: 75,
      estimatedHours: 120,
      actualHours: 90,
      dueDate: '2024-01-15',
      description: 'Building a modern e-commerce platform with React and Node.js'
    },
    {
      id: '2',
      name: 'Mobile App Development',
      client: 'StartupXYZ',
      status: 'active',
      progress: 45,
      estimatedHours: 200,
      actualHours: 90,
      dueDate: '2024-02-28',
      description: 'Developing a cross-platform mobile application for iOS and Android'
    },
    {
      id: '3',
      name: 'Data Analytics Dashboard',
      client: 'BigData Inc',
      status: 'completed',
      progress: 100,
      estimatedHours: 80,
      actualHours: 85,
      dueDate: '2023-12-20',
      description: 'Creating a comprehensive analytics dashboard with real-time data visualization'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500 hover:bg-green-600';
      case 'completed': return 'bg-blue-500 hover:bg-blue-600';
      case 'on-hold': return 'bg-yellow-500 hover:bg-yellow-600';
      default: return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  const handleViewProject = (project: any) => {
    console.log('View project:', project);
    setViewingProject(project);
    setIsViewModalOpen(true);
  };

  const handleEditProject = (project: any) => {
    console.log('Edit project:', project);
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleDeleteProject = (projectId: string) => {
    console.log('Delete project:', projectId);
    setProjects(projects.filter(project => project.id !== projectId));
    toast({
      title: "Project Deleted",
      description: "The project has been successfully deleted.",
      variant: "destructive",
    });
  };

  const handleAddProject = () => {
    console.log('Add new project');
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setViewingProject(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Projects</h2>
          <p className="text-gray-600 mt-1">Manage your project portfolio and track progress</p>
        </div>
        <Button 
          onClick={handleAddProject} 
          className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
        >
          <Plus className="h-4 w-4" />
          <span>Add Project</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-all duration-200 border-0 shadow-md">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg text-gray-900 mb-2">{project.name}</CardTitle>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Users className="h-4 w-4" />
                    <span className="text-sm font-medium">{project.client}</span>
                  </div>
                </div>
                <Badge className={`${getStatusColor(project.status)} text-white border-0 shadow-sm`}>
                  {project.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
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
                    <span className="text-gray-600">Est:</span>
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

              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar className="h-4 w-4" />
                <div className="text-sm">
                  <span className="text-gray-600">Due:</span>
                  <span className="font-semibold ml-1 text-gray-900">{project.dueDate}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleViewProject(project)}
                    className="flex-1 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleEditProject(project)}
                    className="flex-1 hover:bg-green-50 hover:text-green-700 hover:border-green-300"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleDeleteProject(project.id)}
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

      <ProjectModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        project={editingProject}
      />

      <ProjectViewModal 
        isOpen={isViewModalOpen} 
        onClose={handleCloseViewModal} 
        project={viewingProject}
      />
    </div>
  );
};
