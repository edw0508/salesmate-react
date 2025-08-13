import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User } from 'lucide-react';
import { Lead, StatusChange } from '@/types/crm';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface StatusUpdateModalProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (leadId: string, newStatus: string, notes: string) => void;
}

const StatusUpdateModal: React.FC<StatusUpdateModalProps> = ({
  lead,
  isOpen,
  onClose,
  onUpdate
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [newStatus, setNewStatus] = useState('');
  const [notes, setNotes] = useState('');
  const [priority, setPriority] = useState('');

  React.useEffect(() => {
    if (lead) {
      setNewStatus(lead.status);
      setPriority(lead.priority.toString());
      setNotes('');
    }
  }, [lead]);

  const handleSubmit = () => {
    if (!lead || !newStatus) return;

    onUpdate(lead.id, newStatus, notes);
    
    toast({
      title: "Status Updated",
      description: `Lead status changed to ${newStatus}`,
    });
    
    setNotes('');
    onClose();
  };

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!lead) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update Lead Progress</DialogTitle>
          <DialogDescription>
            Track progress and update status for {lead.name} from {lead.company}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Lead Info */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Contact</Label>
                <p className="text-sm">{lead.name}</p>
                <p className="text-xs text-muted-foreground">{lead.email}</p>
              </div>
              <div>
                <Label className="text-sm font-medium">Current Status</Label>
                <div className="mt-1">
                  {getStatusBadge(lead.status)}
                </div>
              </div>
            </div>
          </div>

          {/* Status Update */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="status">New Status</Label>
              <Select value={newStatus} onValueChange={setNewStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="priority">Priority (1-10)</Label>
              <Input
                id="priority"
                type="number"
                min="1"
                max="10"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="notes">Progress Notes</Label>
              <Textarea
                id="notes"
                placeholder="Add notes about this status change..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>
          </div>

          {/* Status History */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Progress History</Label>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {lead.statusHistory.length === 0 ? (
                <p className="text-sm text-muted-foreground">No status changes yet</p>
              ) : (
                lead.statusHistory.map((change) => (
                  <div key={change.id} className="border border-border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getStatusBadge(change.toStatus)}
                        <span className="text-xs text-muted-foreground">
                          from {change.fromStatus}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {formatDate(change.changedAt)}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                      <User className="w-3 h-3" />
                      {change.changedBy}
                    </div>
                    {change.notes && (
                      <p className="text-sm text-foreground mt-2">{change.notes}</p>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!newStatus || newStatus === lead.status}
          >
            Update Progress
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StatusUpdateModal;