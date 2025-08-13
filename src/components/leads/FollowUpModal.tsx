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
import { Calendar } from 'lucide-react';
import { Lead } from '@/types/crm';
import { useToast } from '@/hooks/use-toast';

interface FollowUpModalProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
  onSchedule: (leadId: string, followUpDate: string, notes: string) => void;
}

const FollowUpModal: React.FC<FollowUpModalProps> = ({
  lead,
  isOpen,
  onClose,
  onSchedule
}) => {
  const { toast } = useToast();
  const [followUpDate, setFollowUpDate] = useState('');
  const [notes, setNotes] = useState('');

  React.useEffect(() => {
    if (lead && isOpen) {
      // Set default date to tomorrow
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const defaultDate = tomorrow.toISOString().split('T')[0] + 'T09:00';
      setFollowUpDate(defaultDate);
      setNotes('');
    }
  }, [lead, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!lead || !followUpDate) return;

    onSchedule(lead.id, followUpDate, notes);
    
    toast({
      title: "Follow-up Scheduled",
      description: `Follow-up with ${lead.name} scheduled for ${new Date(followUpDate).toLocaleString()}`,
    });
    
    onClose();
  };

  if (!lead) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Schedule Follow-up
          </DialogTitle>
          <DialogDescription>
            Schedule a follow-up call with {lead.name} from {lead.company}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="followUpDate">Follow-up Date & Time *</Label>
            <Input
              id="followUpDate"
              type="datetime-local"
              value={followUpDate}
              onChange={(e) => setFollowUpDate(e.target.value)}
              required
              min={new Date().toISOString().split('T')[0] + 'T00:00'}
            />
          </div>

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes about this follow-up..."
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Schedule Follow-up
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FollowUpModal;