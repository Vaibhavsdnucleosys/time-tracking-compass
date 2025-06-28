
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Search, Edit, Trash2, Mail, Phone, Building } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const DEMO_CLIENTS = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@acmecorp.com',
    phone: '+1-555-0123',
    company: 'Acme Corporation',
    createdAt: '2024-01-15',
    status: 'active'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@techstart.io',
    phone: '+1-555-0456',
    company: 'TechStart Solutions',
    createdAt: '2024-02-20',
    status: 'active'
  },
  {
    id: '3',
    name: 'Mike Chen',
    email: 'mike@innovate.com',
    phone: '+1-555-0789',
    company: 'Innovate Labs',
    createdAt: '2024-03-10',
    status: 'inactive'
  }
];

export const ClientList: React.FC = () => {
  const { user } = useAuth();
  const [clients, setClients] = useState(DEMO_CLIENTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const canManageClients = user?.role === 'admin' || user?.role === 'director';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Client Management</h2>
          <p className="text-gray-600 mt-1">Manage your clients and their information</p>
        </div>
        {canManageClients && (
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add Client
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Client</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <Input placeholder="Client Name" />
                <Input placeholder="Email" type="email" />
                <Input placeholder="Phone" />
                <Input placeholder="Company" />
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Add Client
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
                placeholder="Search clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-200 focus:border-blue-500"
              />
            </div>
            <Badge variant="secondary" className="bg-blue-50 text-blue-700">
              {filteredClients.length} clients
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="text-gray-700 font-medium">Client</TableHead>
                <TableHead className="text-gray-700 font-medium">Contact</TableHead>
                <TableHead className="text-gray-700 font-medium">Company</TableHead>
                <TableHead className="text-gray-700 font-medium">Status</TableHead>
                <TableHead className="text-gray-700 font-medium">Created</TableHead>
                {canManageClients && <TableHead className="text-gray-700 font-medium">Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow key={client.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="font-medium text-gray-900">{client.name}</div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="h-3 w-3 mr-1" />
                        {client.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="h-3 w-3 mr-1" />
                        {client.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm text-gray-700">
                      <Building className="h-3 w-3 mr-1" />
                      {client.company}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={client.status === 'active' ? 'default' : 'secondary'}
                      className={
                        client.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-600'
                      }
                    >
                      {client.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {new Date(client.createdAt).toLocaleDateString()}
                  </TableCell>
                  {canManageClients && (
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
