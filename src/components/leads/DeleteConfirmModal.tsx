import React from 'react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Trash2 } from 'lucide-react';
import { Lead } from '@/types/crm';
import { useToast } from '@/hooks/use-toast';

interface DeleteConfirmModalProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
  onDelete: (leadId: string) => void;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  lead,
  isOpen,
  onClose,
  onDelete
}) => {
  const { toast } = useToast();

  const handleDelete = () => {
    if (!lead) return;

    onDelete(lead.id);
    
    toast({
      title: "Lead Deleted",
      description: `${lead.name} has been permanently deleted.`,
      variant: "destructive"
    });
    
    onClose();
  };

  if (!lead) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Trash2 className="w-5 h-5 text-danger" />
            Delete Lead
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete <strong>{lead.name}</strong> from <strong>{lead.company}</strong>?
            <br />
            <br />
            This action cannot be undone. All related data including status history and follow-ups will be permanently removed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-danger text-danger-foreground hover:bg-danger/90"
          >
            Delete Lead
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConfirmModal;