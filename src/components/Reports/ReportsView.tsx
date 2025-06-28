
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart3, TrendingUp, Clock, AlertTriangle } from 'lucide-react';

export const ReportsView: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState('efficiency');

  const reports = [
    { id: 'efficiency', name: 'Efficiency Report', icon: TrendingUp },
    { id: 'errors', name: 'Error Index', icon: AlertTriangle },
    { id: 'load', name: 'Load Factor', icon: BarChart3 },
    { id: 'breaks', name: 'Break Report', icon: Clock },
    { id: 'attendance', name: 'Attendance Report', icon: Clock },
  ];

  const efficiencyData = [
    { employee: 'John Doe', assigned: 40, worked: 38, efficiency: 95 },
    { employee: 'Jane Smith', assigned: 35, worked: 32, efficiency: 91 },
    { employee: 'Mike Wilson', assigned: 42, worked: 40, efficiency: 95 },
  ];

  const errorData = [
    { employee: 'John Doe', internal: 2, external: 1, internalRate: 5, externalRate: 2.5 },
    { employee: 'Jane Smith', internal: 1, external: 0, internalRate: 3, externalRate: 0 },
    { employee: 'Mike Wilson', internal: 3, external: 2, internalRate: 7, externalRate: 5 },
  ];

  const renderEfficiencyReport = () => (
    <Card>
      <CardHeader>
        <CardTitle>Team Efficiency Report</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Employee</th>
                <th className="text-left p-2">Assigned Hours</th>
                <th className="text-left p-2">Worked Hours</th>
                <th className="text-left p-2">Efficiency %</th>
              </tr>
            </thead>
            <tbody>
              {efficiencyData.map((row, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2 font-medium">{row.employee}</td>
                  <td className="p-2">{row.assigned}h</td>
                  <td className="p-2">{row.worked}h</td>
                  <td className="p-2">
                    <span className={`px-2 py-1 rounded text-sm ${
                      row.efficiency >= 95 ? 'bg-green-100 text-green-800' :
                      row.efficiency >= 85 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {row.efficiency}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );

  const renderErrorReport = () => (
    <Card>
      <CardHeader>
        <CardTitle>Error Index Report</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Internal Errors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {errorData.reduce((sum, row) => sum + row.internal, 0)}
                </div>
                <p className="text-sm text-gray-600">Total internal errors this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">External Errors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">
                  {errorData.reduce((sum, row) => sum + row.external, 0)}
                </div>
                <p className="text-sm text-gray-600">Total external errors this month</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Employee</th>
                  <th className="text-left p-2">Internal Errors</th>
                  <th className="text-left p-2">External Errors</th>
                  <th className="text-left p-2">Internal Rate %</th>
                  <th className="text-left p-2">External Rate %</th>
                </tr>
              </thead>
              <tbody>
                {errorData.map((row, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2 font-medium">{row.employee}</td>
                    <td className="p-2">{row.internal}</td>
                    <td className="p-2">{row.external}</td>
                    <td className="p-2">{row.internalRate}%</td>
                    <td className="p-2">{row.externalRate}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderReport = () => {
    switch (selectedReport) {
      case 'efficiency':
        return renderEfficiencyReport();
      case 'errors':
        return renderErrorReport();
      case 'load':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Load Factor Report</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-600 py-8">
                Load Factor analysis showing (Estimated Time / Actual Time) × 100
              </p>
            </CardContent>
          </Card>
        );
      case 'breaks':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Break Report</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-600 py-8">
                Break duration analysis and patterns
              </p>
            </CardContent>
          </Card>
        );
      case 'attendance':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Attendance Report</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-600 py-8">
                Employee attendance and presence summary
              </p>
            </CardContent>
          </Card>
        );
      default:
        return renderEfficiencyReport();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Reports & Analytics</h2>
        <div className="flex space-x-4">
          <Select value={selectedReport} onValueChange={setSelectedReport}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {reports.map((report) => (
                <SelectItem key={report.id} value={report.id}>
                  {report.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button>Export Report</Button>
        </div>
      </div>

      {renderReport()}
    </div>
  );
};
