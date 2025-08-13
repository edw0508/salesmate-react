import { Lead, Project, FollowUp, DashboardStats } from '@/types/crm';

export const MOCK_LEADS: Lead[] = [
  {
    id: '1',
    name: 'Michael Johnson',
    company: 'SwiftTech Solutions',
    email: 'michael@swifttech.com',
    phone: '+1 (555) 123-4567',
    status: 'approved',
    priority: 8,
    requirements: 'Custom CRM software for managing 500+ clients',
    createdAt: '2024-01-05T11:20:00Z',
    updatedAt: '2024-01-07T14:30:00Z',
    ownerId: '2',
    ownerName: 'Sales Representative',
    followUpDate: '2024-01-15T10:00:00Z',
    statusHistory: [
      {
        id: '1',
        fromStatus: 'pending',
        toStatus: 'approved',
        changedBy: 'Admin User',
        changedAt: '2024-01-07T14:30:00Z',
        notes: 'High-value client, good fit for our services'
      }
    ]
  },
  {
    id: '2',
    name: 'Emma Davis',
    company: 'BlueWave Group',
    email: 'emma@bluewave.com',
    phone: '+1 (555) 234-5678',
    status: 'pending',
    priority: 6,
    requirements: 'E-commerce platform development',
    createdAt: '2024-01-10T09:45:00Z',
    updatedAt: '2024-01-10T09:45:00Z',
    ownerId: '2',
    ownerName: 'Sales Representative',
    followUpDate: '2024-01-18T14:00:00Z',
    statusHistory: []
  },
  {
    id: '3',
    name: 'Ethan Wilson',
    company: 'Summit Inc',
    email: 'ethan@summit.com',
    phone: '+1 (555) 345-6789',
    status: 'rejected',
    priority: 3,
    requirements: 'Simple website redesign',
    createdAt: '2024-01-15T14:30:00Z',
    updatedAt: '2024-01-16T10:15:00Z',
    ownerId: '2',
    ownerName: 'Sales Representative',
    statusHistory: [
      {
        id: '2',
        fromStatus: 'pending',
        toStatus: 'rejected',
        changedBy: 'Admin User',
        changedAt: '2024-01-16T10:15:00Z',
        notes: 'Budget too low for our services'
      }
    ]
  },
  {
    id: '4',
    name: 'Olivia Parker',
    company: 'Nexus Corporation',
    email: 'olivia@nexus.com',
    phone: '+1 (555) 456-7890',
    status: 'contacted',
    priority: 9,
    requirements: 'Enterprise software solution',
    createdAt: '2024-01-20T16:00:00Z',
    updatedAt: '2024-01-22T11:30:00Z',
    ownerId: '2',
    ownerName: 'Sales Representative',
    followUpDate: '2024-01-25T15:00:00Z',
    statusHistory: [
      {
        id: '3',
        fromStatus: 'pending',
        toStatus: 'contacted',
        changedBy: 'Sales Representative',
        changedAt: '2024-01-22T11:30:00Z',
        notes: 'Initial contact made, waiting for response'
      }
    ]
  },
  {
    id: '5',
    name: 'Sophia Adams',
    company: 'Stellar Ltd',
    email: 'sophia@stellar.com',
    phone: '+1 (555) 567-8901',
    status: 'pending',
    priority: 7,
    requirements: 'Mobile app development',
    createdAt: '2024-01-25T09:00:00Z',
    updatedAt: '2024-01-25T09:00:00Z',
    ownerId: '2',
    ownerName: 'Sales Representative',
    followUpDate: '2024-02-01T10:00:00Z',
    statusHistory: []
  }
];

export const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    leadId: '1',
    name: 'SwiftTech CRM Development',
    description: 'Custom CRM software for managing 500+ clients',
    status: 'in-progress',
    assignedManagerId: 'pm1',
    assignedManagerName: 'Sarah Mitchell',
    createdAt: '2024-01-08T10:00:00Z',
    estimatedValue: 150000
  }
];

export const MOCK_FOLLOWUPS: FollowUp[] = [
  {
    id: '1',
    leadId: '1',
    leadName: 'Michael Johnson',
    company: 'SwiftTech Solutions',
    scheduledDate: '2024-01-15T10:00:00Z',
    notes: 'Discuss project timeline and requirements',
    completed: false,
    ownerId: '2'
  },
  {
    id: '2',
    leadId: '2',
    leadName: 'Emma Davis',
    company: 'BlueWave Group',
    scheduledDate: '2024-01-18T14:00:00Z',
    notes: 'Follow up on proposal sent',
    completed: false,
    ownerId: '2'
  },
  {
    id: '3',
    leadId: '4',
    leadName: 'Olivia Parker',
    company: 'Nexus Corporation',
    scheduledDate: '2024-01-25T15:00:00Z',
    notes: 'Schedule technical discussion',
    completed: false,
    ownerId: '2'
  }
];

export const MOCK_DASHBOARD_STATS: DashboardStats = {
  totalLeads: 5,
  approvedLeads: 1,
  rejectedLeads: 1,
  pendingLeads: 2,
  totalProjects: 1,
  conversionRate: 20, // 1 approved out of 5 total
  monthlyRevenue: 150000,
  todayFollowUps: 3
};

export const MOCK_SALES_CHART_DATA = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Sales',
      data: [65000, 75000, 85000, 95000, 110000, 150000],
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
      borderColor: 'rgb(99, 102, 241)',
      borderWidth: 3,
      fill: true
    }
  ]
};

export const MOCK_LEAD_STATUS_CHART_DATA = {
  labels: ['Pending', 'Approved', 'Rejected', 'Contacted'],
  datasets: [
    {
      label: 'Lead Status',
      data: [2, 1, 1, 1],
      backgroundColor: [
        'rgba(251, 191, 36, 0.8)',
        'rgba(34, 197, 94, 0.8)',
        'rgba(239, 68, 68, 0.8)',
        'rgba(59, 130, 246, 0.8)'
      ]
    }
  ]
};