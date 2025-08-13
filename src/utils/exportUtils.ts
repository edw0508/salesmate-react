import { Lead } from '@/types/crm';

export const exportLeadsToCSV = (leads: Lead[], filename: string = 'leads-export') => {
  // Define CSV headers
  const headers = [
    'Name',
    'Company', 
    'Email',
    'Phone',
    'Status',
    'Priority',
    'Requirements',
    'Owner',
    'Created Date',
    'Last Updated',
    'Follow-up Date',
    'Notes'
  ];

  // Convert leads data to CSV rows
  const rows = leads.map(lead => [
    lead.name,
    lead.company,
    lead.email,
    lead.phone,
    lead.status,
    lead.priority.toString(),
    `"${lead.requirements.replace(/"/g, '""')}"`, // Escape quotes in requirements
    lead.ownerName,
    new Date(lead.createdAt).toLocaleDateString(),
    new Date(lead.updatedAt).toLocaleDateString(),
    lead.followUpDate ? new Date(lead.followUpDate).toLocaleDateString() : '',
    lead.notes ? `"${lead.notes.replace(/"/g, '""')}"` : '' // Escape quotes in notes
  ]);

  // Combine headers and rows
  const csvContent = [headers, ...rows]
    .map(row => row.join(','))
    .join('\n');

  // Create and download file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export const exportLeadsToJSON = (leads: Lead[], filename: string = 'leads-export') => {
  const jsonContent = JSON.stringify(leads, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}-${new Date().toISOString().split('T')[0]}.json`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};