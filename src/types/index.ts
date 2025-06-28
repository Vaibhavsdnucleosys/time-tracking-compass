
export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'director' | 'pm' | 'tl' | 'employee';
  name: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  clientId: string;
  description: string;
  status: 'active' | 'completed' | 'on-hold';
  startDate: string;
  endDate?: string;
  estimatedHours: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  projectId: string;
  assignedTo: string;
  assignedBy: string;
  status: 'pending' | 'in-progress' | 'completed';
  estimatedTime: number;
  actualTime: number;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  dueDate: string;
}

export interface TimeEntry {
  id: string;
  userId: string;
  projectId: string;
  taskId?: string;
  startTime: string;
  endTime?: string;
  breakTime: number;
  totalTime: number;
  status: 'running' | 'paused' | 'completed';
  description: string;
}

export interface TimesheetRequest {
  id: string;
  userId: string;
  projectId: string;
  date: string;
  startTime: string;
  endTime: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedBy?: string;
  rejectionReason?: string;
  escalationLevel: 'tl' | 'pm' | 'director';
}

export interface Notification {
  id: string;
  userId: string;
  type: 'idle' | 'approval' | 'task_assigned' | 'timesheet';
  message: string;
  isRead: boolean;
  createdAt: string;
}
