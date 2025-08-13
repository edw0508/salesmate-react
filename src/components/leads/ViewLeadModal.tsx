import React from 'react';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Calendar, Clock, Mail, Phone, Building, User, FileText, Star } from 'lucide-react';
import { Lead } from '@/types/crm';

interface ViewLeadModalProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
}

const ViewLeadModal: React.FC<ViewLeadModalProps> = ({
  lead,
  isOpen,
  onClose
}) => {
  if (!lead) return null;

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
        <span className="text-sm text-muted-foreground ml-1">({priority}/10)</span>
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Lead Details
          </DialogTitle>
          <DialogDescription>
            Complete information for {lead.name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Contact Name</p>
                  <p className="text-lg">{lead.name}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Company</p>
                  <p className="text-lg">{lead.company}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-lg">{lead.email}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <p className="text-lg">{lead.phone}</p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Status and Priority */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium mb-2">Status</p>
              {getStatusBadge(lead.status)}
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Priority</p>
              {getPriorityStars(lead.priority)}
            </div>
          </div>

          <Separator />

          {/* Requirements */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-muted-foreground" />
              <p className="text-sm font-medium">Requirements</p>
            </div>
            <p className="text-sm bg-muted/50 p-3 rounded-lg">{lead.requirements}</p>
          </div>

          {lead.notes && (
            <>
              <Separator />
              <div>
                <p className="text-sm font-medium mb-2">Notes</p>
                <p className="text-sm bg-muted/50 p-3 rounded-lg">{lead.notes}</p>
              </div>
            </>
          )}

          <Separator />

          {/* Dates and Owner */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Created</p>
                  <p className="text-sm">{formatDate(lead.createdAt)}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Last Updated</p>
                  <p className="text-sm">{formatDate(lead.updatedAt)}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Owner</p>
                  <p className="text-sm">{lead.ownerName}</p>
                </div>
              </div>

              {lead.followUpDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Next Follow-up</p>
                    <p className="text-sm">{formatDate(lead.followUpDate)}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Status History */}
          {lead.statusHistory.length > 0 && (
            <>
              <Separator />
              <div>
                <p className="text-sm font-medium mb-3">Status History</p>
                <div className="space-y-3 max-h-40 overflow-y-auto">
                  {lead.statusHistory.map((change) => (
                    <div key={change.id} className="border border-border rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getStatusBadge(change.toStatus)}
                          <span className="text-xs text-muted-foreground">
                            from {change.fromStatus}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(change.changedAt)}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">
                        Changed by: {change.changedBy}
                      </p>
                      {change.notes && (
                        <p className="text-sm text-foreground">{change.notes}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewLeadModal;