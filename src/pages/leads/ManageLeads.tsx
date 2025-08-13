import React, { useState } from 'react';
import { 
  Eye, 
  Edit, 
  Trash2, 
  Calendar, 
  Star,
  Filter,
  Download,
  Plus,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Header from '@/components/layout/Header';
import StatusUpdateModal from '@/components/leads/StatusUpdateModal';
import { MOCK_LEADS } from '@/data/mockData';
import { Lead, StatusChange } from '@/types/crm';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const ManageLeads: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [leads, setLeads] = useState(MOCK_LEADS);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

  // Filter leads based on user role
  const allLeads = user?.role === 'admin' ? leads : leads.filter(lead => lead.ownerId === user?.id);

  // Apply filters
  const filteredLeads = allLeads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    
    const matchesPriority = priorityFilter === 'all' || 
                           (priorityFilter === 'high' && lead.priority >= 7) ||
                           (priorityFilter === 'medium' && lead.priority >= 4 && lead.priority <= 6) ||
                           (priorityFilter === 'low' && lead.priority <= 3);

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      approved: 'status-approved',
      pending: 'status-pending',
      rejected: 'status-rejected',
      contacted: 'status-contacted'
    };
    
    return (
      <Badge className={statusClasses[status as keyof typeof statusClasses]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getPriorityStars = (priority: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(Math.min(priority, 10))].map((_, i) => (
          <Star 
            key={i} 
            className={`w-3 h-3 ${
              priority >= 7 ? 'text-danger fill-danger' :
              priority >= 4 ? 'text-warning fill-warning' : 
              'text-success fill-success'
            }`} 
          />
        ))}
        <span className="text-sm text-muted-foreground ml-1">({priority})</span>
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleStatusUpdate = (leadId: string, newStatus: string, notes: string) => {
    setLeads(prevLeads => 
      prevLeads.map(lead => {
        if (lead.id === leadId) {
          const statusChange: StatusChange = {
            id: Date.now().toString(),
            fromStatus: lead.status,
            toStatus: newStatus,
            changedBy: user?.name || 'Unknown',
            changedAt: new Date().toISOString(),
            notes
          };

          return {
            ...lead,
            status: newStatus as Lead['status'],
            updatedAt: new Date().toISOString(),
            statusHistory: [statusChange, ...lead.statusHistory]
          };
        }
        return lead;
      })
    );
  };

  const handleOpenStatusModal = (lead: Lead) => {
    setSelectedLead(lead);
    setIsStatusModalOpen(true);
  };

  return (
    <div className="flex-1 flex flex-col">
      <Header 
        title={user?.role === 'admin' ? 'Manage All Leads' : 'My Leads'} 
        subtitle={`${filteredLeads.length} leads found`} 
      />
      
      <div className="flex-1 p-6 space-y-6">
        {/* Filters and Actions */}
        <Card className="stat-card">
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                {/* Search */}
                <div className="flex-1 max-w-md">
                  <Input
                    placeholder="Search leads by name, company, or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="h-10"
                  />
                </div>

                {/* Filters */}
                <div className="flex gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                      <SelectItem value="contacted">Contacted</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priority</SelectItem>
                      <SelectItem value="high">High (7-10)</SelectItem>
                      <SelectItem value="medium">Medium (4-6)</SelectItem>
                      <SelectItem value="low">Low (1-3)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                {user?.role === 'sales' && (
                  <Button 
                    size="sm" 
                    className="bg-gradient-to-r from-primary to-secondary"
                    onClick={() => navigate('/leads/create')}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Lead
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Leads Table */}
        <Card className="stat-card">
          <CardHeader>
            <CardTitle>Leads Overview</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Contact</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeads.map((lead) => (
                    <TableRow key={lead.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div>
                          <p className="font-medium">{lead.name}</p>
                          <p className="text-sm text-muted-foreground">{lead.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{lead.company}</p>
                          <p className="text-sm text-muted-foreground">{lead.phone}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(lead.status)}
                      </TableCell>
                      <TableCell>
                        {getPriorityStars(lead.priority)}
                      </TableCell>
                      <TableCell>
                        <p className="text-sm">{lead.ownerName}</p>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm">{formatDate(lead.createdAt)}</p>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => handleOpenStatusModal(lead)}
                            title="Update Progress"
                          >
                            <Clock className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Calendar className="w-4 h-4" />
                          </Button>
                          {user?.role === 'admin' && (
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-danger hover:text-danger">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {filteredLeads.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No leads found matching your criteria</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Status Update Modal */}
        <StatusUpdateModal
          lead={selectedLead}
          isOpen={isStatusModalOpen}
          onClose={() => setIsStatusModalOpen(false)}
          onUpdate={handleStatusUpdate}
        />
      </div>
    </div>
  );
};

export default ManageLeads;