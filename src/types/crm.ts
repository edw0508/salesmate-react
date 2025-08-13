export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: 'pending' | 'approved' | 'rejected' | 'contacted';
  priority: number; // 1-10 scale
  requirements: string;
  createdAt: string;
  updatedAt: string;
  ownerId: string;
  ownerName: string;
  followUpDate?: string;
  notes?: string;
  statusHistory: StatusChange[];
}

export interface StatusChange {
  id: string;
  fromStatus: string;
  toStatus: string;
  changedBy: string;
  changedAt: string;
  notes?: string;
}

export interface Project {
  id: string;
  leadId: string;
  name: string;
  description: string;
  status: 'planning' | 'in-progress' | 'completed';
  assignedManagerId: string;
  assignedManagerName: string;
  createdAt: string;
  estimatedValue: number;
}

export interface FollowUp {
  id: string;
  leadId: string;
  leadName: string;
  company: string;
  scheduledDate: string;
  notes: string;
  completed: boolean;
  completedAt?: string;
  ownerId: string;
}

export interface DashboardStats {
  totalLeads: number;
  approvedLeads: number;
  rejectedLeads: number;
  pendingLeads: number;
  totalProjects: number;
  conversionRate: number;
  monthlyRevenue: number;
  todayFollowUps: number;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
  }[];
}