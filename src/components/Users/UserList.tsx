
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Edit, Trash2, Mail, User, Shield } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const DEMO_USERS = [
  {
    id: '1',
    name: 'Admin User',
    username: 'admin',
    email: 'admin@company.com',
    role: 'admin',
    status: 'active',
    createdAt: '2024-01-01'
  },
  {
    id: '2',
    name: 'Director Smith',
    username: 'director',
    email: 'director@company.com',
    role: 'director',
    status: 'active',
    createdAt: '2024-01-05'
  },
  {
    id: '3',
    name: 'Project Manager Jones',
    username: 'pm',
    email: 'pm@company.com',
    role: 'pm',
    status: 'active',
    createdAt: '2024-01-10'
  },
  {
    id: '4',
    name: 'Team Lead Wilson',
    username: 'tl',
    email: 'tl@company.com',
    role: 'tl',
    status: 'active',
    createdAt: '2024-01-15'
  },
  {
    id: '5',
    name: 'Employee Brown',
    username: 'employee',
    email: 'employee@company.com',
    role: 'employee',
    status: 'active',
    createdAt: '2024-01-20'
  }
];

export const UserList: React.FC = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState(DEMO_USERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'director': return 'bg-purple-100 text-purple-800';
      case 'pm': return 'bg-blue-100 text-blue-800';
      case 'tl': return 'bg-green-100 text-green-800';
      case 'employee': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const canManageUsers = user?.role === 'admin' || user?.role === 'director';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">User Management</h2>
          <p className="text-gray-600 mt-1">Manage system users and their roles</p>
        </div>
        {canManageUsers && (
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <Input placeholder="Full Name" />
                <Input placeholder="Username" />
                <Input placeholder="Email" type="email" />
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="employee">Employee</SelectItem>
                    <SelectItem value="tl">Team Lead</SelectItem>
                    <SelectItem value="pm">Project Manager</SelectItem>
                    <SelectItem value="director">Director</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Add User
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <Card className="bg-white shadow-sm border border-gray-200">
        <CardHeader className="border-b border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-200 focus:border-blue-500"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="director">Director</SelectItem>
                <SelectItem value="pm">PM</SelectItem>
                <SelectItem value="tl">Team Lead</SelectItem>
                <SelectItem value="employee">Employee</SelectItem>
              </SelectContent>
            </Select>
            <Badge variant="secondary" className="bg-blue-50 text-blue-700">
              {filteredUsers.length} users
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="text-gray-700 font-medium">User</TableHead>
                <TableHead className="text-gray-700 font-medium">Contact</TableHead>
                <TableHead className="text-gray-700 font-medium">Role</TableHead>
                <TableHead className="text-gray-700 font-medium">Status</TableHead>
                <TableHead className="text-gray-700 font-medium">Created</TableHead>
                {canManageUsers && <TableHead className="text-gray-700 font-medium">Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((userData) => (
                <TableRow key={userData.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{userData.name}</div>
                        <div className="text-sm text-gray-500">@{userData.username}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="h-3 w-3 mr-1" />
                      {userData.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getRoleBadgeColor(userData.role)}>
                      <Shield className="h-3 w-3 mr-1" />
                      {userData.role.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="default"
                      className="bg-green-100 text-green-800"
                    >
                      {userData.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {new Date(userData.createdAt).toLocaleDateString()}
                  </TableCell>
                  {canManageUsers && (
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
