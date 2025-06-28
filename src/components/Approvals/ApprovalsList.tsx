
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, X, Clock, Eye, User, Calendar } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const DEMO_APPROVALS = [
  {
    id: '1',
    employeeName: 'Employee Brown',
    employeeId: '5',
    date: '2024-06-27',
    hours: 8,
    project: 'Website Redesign',
    description: 'Frontend development work',
    status: 'pending',
    submittedAt: '2024-06-27T09:00:00Z',
    escalationLevel: 'tl'
  },
  {
    id: '2',
    employeeName: 'John Doe',
    employeeId: '6',
    date: '2024-06-26',
    hours: 7.5,
    project: 'Mobile App',
    description: 'Bug fixes and testing',
    status: 'pending',
    submittedAt: '2024-06-26T17:30:00Z',
    escalationLevel: 'pm'
  },
  {
    id: '3',
    employeeName: 'Sarah Wilson',
    employeeId: '7',
    date: '2024-06-25',
    hours: 8,
    project: 'Data Migration',
    description: 'Database schema updates',
    status: 'approved',
    submittedAt: '2024-06-25T16:00:00Z',
    approvedAt: '2024-06-26T10:00:00Z',
    approvedBy: 'Team Lead Wilson',
    escalationLevel: 'tl'
  },
  {
    id: '4',
    employeeName: 'Mike Chen',
    employeeId: '8',
    date: '2024-06-24',
    hours: 6,
    project: 'API Development',
    description: 'REST API endpoints',
    status: 'rejected',
    submittedAt: '2024-06-24T15:00:00Z',
    rejectedAt: '2024-06-25T09:00:00Z',
    rejectedBy: 'Project Manager Jones',
    rejectionReason: 'Insufficient documentation provided',
    escalationLevel: 'pm'
  }
];

export const ApprovalsList: React.FC = () => {
  const { user } = useAuth();
  const [approvals, setApprovals] = useState(DEMO_APPROVALS);
  const [selectedApproval, setSelectedApproval] = useState<any>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case 'approved':
        return <Badge className="bg-green-100 text-green-800"><Check className="h-3 w-3 mr-1" />Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800"><X className="h-3 w-3 mr-1" />Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleApprove = (id: string) => {
    setApprovals(prev => prev.map(approval => 
      approval.id === id 
        ? { ...approval, status: 'approved', approvedBy: user?.name, approvedAt: new Date().toISOString() }
        : approval
    ));
  };

  const handleReject = (id: string, reason: string = 'No reason provided') => {
    setApprovals(prev => prev.map(approval => 
      approval.id === id 
        ? { 
            ...approval, 
            status: 'rejected', 
            rejectedBy: user?.name, 
            rejectedAt: new Date().toISOString(),
            rejectionReason: reason
          }
        : approval
    ));
  };

  const canApprove = user?.role === 'tl' || user?.role === 'pm' || user?.role === 'director' || user?.role === 'admin';

  const pendingApprovals = approvals.filter(a => a.status === 'pending');
  const processedApprovals = approvals.filter(a => a.status !== 'pending');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Timesheet Approvals</h2>
        <p className="text-gray-600 mt-1">Review and approve employee timesheet requests</p>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList className="bg-white border border-gray-200">
          <TabsTrigger value="pending" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
            Pending ({pendingApprovals.length})
          </TabsTrigger>
          <TabsTrigger value="processed" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
            Processed ({processedApprovals.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <Card className="bg-white shadow-sm border border-gray-200">
            <CardHeader className="border-b border-gray-100">
              <CardTitle className="text-lg font-semibold text-gray-900">Pending Approvals</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="text-gray-700 font-medium">Employee</TableHead>
                    <TableHead className="text-gray-700 font-medium">Date</TableHead>
                    <TableHead className="text-gray-700 font-medium">Hours</TableHead>
                    <TableHead className="text-gray-700 font-medium">Project</TableHead>
                    <TableHead className="text-gray-700 font-medium">Submitted</TableHead>
                    <TableHead className="text-gray-700 font-medium">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingApprovals.map((approval) => (
                    <TableRow key={approval.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-blue-600" />
                          </div>
                          <span className="font-medium text-gray-900">{approval.employeeName}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-gray-700">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(approval.date).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-medium">
                          {approval.hours}h
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-700">{approval.project}</TableCell>
                      <TableCell className="text-gray-600 text-sm">
                        {new Date(approval.submittedAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedApproval(approval);
                              setIsDetailModalOpen(true);
                            }}
                            className="text-gray-600 hover:text-gray-800"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {canApprove && (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleApprove(approval.id)}
                                className="text-green-600 hover:text-green-800"
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleReject(approval.id)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="processed">
          <Card className="bg-white shadow-sm border border-gray-200">
            <CardHeader className="border-b border-gray-100">
              <CardTitle className="text-lg font-semibold text-gray-900">Processed Approvals</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="text-gray-700 font-medium">Employee</TableHead>
                    <TableHead className="text-gray-700 font-medium">Date</TableHead>
                    <TableHead className="text-gray-700 font-medium">Hours</TableHead>
                    <TableHead className="text-gray-700 font-medium">Project</TableHead>
                    <TableHead className="text-gray-700 font-medium">Status</TableHead>
                    <TableHead className="text-gray-700 font-medium">Processed By</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {processedApprovals.map((approval) => (
                    <TableRow key={approval.id} className="hover:bg-gray-50">
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-blue-600" />
                          </div>
                          <span className="font-medium text-gray-900">{approval.employeeName}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-gray-700">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(approval.date).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-medium">
                          {approval.hours}h
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-700">{approval.project}</TableCell>
                      <TableCell>
                        {getStatusBadge(approval.status)}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        {approval.approvedBy || approval.rejectedBy || 'System'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Timesheet Request Details</DialogTitle>
          </DialogHeader>
          {selectedApproval && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Employee</label>
                  <p className="text-gray-900">{selectedApproval.employeeName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Date</label>
                  <p className="text-gray-900">{new Date(selectedApproval.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Hours</label>
                  <p className="text-gray-900">{selectedApproval.hours} hours</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Project</label>
                  <p className="text-gray-900">{selectedApproval.project}</p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Description</label>
                <p className="text-gray-900 bg-gray-50 p-3 rounded-md">{selectedApproval.description}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Status</label>
                <div className="mt-1">{getStatusBadge(selectedApproval.status)}</div>
              </div>
              {selectedApproval.rejectionReason && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Rejection Reason</label>
                  <p className="text-red-700 bg-red-50 p-3 rounded-md">{selectedApproval.rejectionReason}</p>
                </div>
              )}
              {selectedApproval.status === 'pending' && canApprove && (
                <div className="flex space-x-3 pt-4">
                  <Button 
                    onClick={() => {
                      handleApprove(selectedApproval.id);
                      setIsDetailModalOpen(false);
                    }}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Approve
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      handleReject(selectedApproval.id);
                      setIsDetailModalOpen(false);
                    }}
                    className="flex-1 border-red-300 text-red-700 hover:bg-red-50"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
