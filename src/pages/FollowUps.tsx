import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  Plus,
  Phone,
  Mail,
  Building2,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Header from '@/components/layout/Header';
import { MOCK_FOLLOWUPS } from '@/data/mockData';
import { FollowUp } from '@/types/crm';
import { useToast } from '@/hooks/use-toast';

const FollowUps: React.FC = () => {
  const { toast } = useToast();
  const [followUps, setFollowUps] = useState<FollowUp[]>(MOCK_FOLLOWUPS);
  const [completionNotes, setCompletionNotes] = useState('');
  const [selectedFollowUp, setSelectedFollowUp] = useState<FollowUp | null>(null);

  const todayFollowUps = followUps.filter(followUp => !followUp.completed);
  const completedFollowUps = followUps.filter(followUp => followUp.completed);

  const handleCompleteFollowUp = (followUpId: string) => {
    if (!completionNotes.trim()) {
      toast({
        title: "Error",
        description: "Please add completion notes",
        variant: "destructive"
      });
      return;
    }

    setFollowUps(prev => 
      prev.map(followUp => 
        followUp.id === followUpId 
          ? { 
              ...followUp, 
              completed: true, 
              completedAt: new Date().toISOString(),
              notes: completionNotes 
            }
          : followUp
      )
    );

    toast({
      title: "Success!",
      description: "Follow-up marked as completed",
    });

    setCompletionNotes('');
    setSelectedFollowUp(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isOverdue = (dateString: string) => {
    return new Date(dateString) < new Date();
  };

  return (
    <div className="flex-1 flex flex-col">
      <Header 
        title="Follow-ups" 
        subtitle={`${todayFollowUps.length} pending follow-ups`} 
      />
      
      <div className="flex-1 p-6 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="stat-card-warning">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending</p>
                  <p className="text-3xl font-bold">{todayFollowUps.length}</p>
                </div>
                <Clock className="w-8 h-8 text-warning" />
              </div>
            </CardContent>
          </Card>

          <Card className="stat-card-success">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Completed</p>
                  <p className="text-3xl font-bold">{completedFollowUps.length}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="stat-card-primary">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total</p>
                  <p className="text-3xl font-bold">{followUps.length}</p>
                </div>
                <Calendar className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Follow-ups */}
        <Card className="stat-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-warning" />
              Pending Follow-ups
            </CardTitle>
            <Button size="sm" className="bg-gradient-to-r from-primary to-secondary">
              <Plus className="w-4 h-4 mr-2" />
              Schedule New
            </Button>
          </CardHeader>
          <CardContent>
            {todayFollowUps.length > 0 ? (
              <div className="space-y-4">
                {todayFollowUps.map((followUp) => (
                  <div 
                    key={followUp.id} 
                    className={`p-4 rounded-lg border transition-all hover:shadow-md ${
                      isOverdue(followUp.scheduledDate) 
                        ? 'bg-danger/5 border-danger/20' 
                        : 'bg-background border-border'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-3">
                        {/* Lead Info */}
                        <div className="flex items-start gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <User className="w-4 h-4 text-primary" />
                              <h3 className="font-semibold text-lg">{followUp.leadName}</h3>
                              {isOverdue(followUp.scheduledDate) && (
                                <Badge variant="destructive" className="text-xs">Overdue</Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Building2 className="w-3 h-3" />
                                {followUp.company}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {formatDate(followUp.scheduledDate)} at {formatTime(followUp.scheduledDate)}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Notes */}
                        <div className="bg-muted/30 p-3 rounded-lg">
                          <p className="text-sm">{followUp.notes}</p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Phone className="w-4 h-4 mr-2" />
                            Call
                          </Button>
                          <Button size="sm" variant="outline">
                            <Mail className="w-4 h-4 mr-2" />
                            Email
                          </Button>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                size="sm" 
                                className="bg-success hover:bg-success/90"
                                onClick={() => setSelectedFollowUp(followUp)}
                              >
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Mark Complete
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Complete Follow-up</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <p className="text-sm text-muted-foreground">
                                    {selectedFollowUp?.leadName} - {selectedFollowUp?.company}
                                  </p>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="notes">Completion Notes</Label>
                                  <Textarea
                                    id="notes"
                                    placeholder="Add notes about the follow-up outcome..."
                                    value={completionNotes}
                                    onChange={(e) => setCompletionNotes(e.target.value)}
                                    className="min-h-[100px]"
                                  />
                                </div>
                                <div className="flex gap-2">
                                  <Button 
                                    variant="outline" 
                                    className="flex-1"
                                    onClick={() => {
                                      setCompletionNotes('');
                                      setSelectedFollowUp(null);
                                    }}
                                  >
                                    Cancel
                                  </Button>
                                  <Button 
                                    className="flex-1 bg-success hover:bg-success/90"
                                    onClick={() => handleCompleteFollowUp(followUp.id)}
                                  >
                                    Complete
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No pending follow-ups</h3>
                <p className="text-muted-foreground">All follow-ups are completed!</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Completed Follow-ups */}
        {completedFollowUps.length > 0 && (
          <Card className="stat-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-success" />
                Recently Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {completedFollowUps.slice(0, 3).map((followUp) => (
                  <div key={followUp.id} className="flex items-center justify-between p-3 bg-success/5 rounded-lg border border-success/20">
                    <div>
                      <p className="font-medium">{followUp.leadName}</p>
                      <p className="text-sm text-muted-foreground">{followUp.company}</p>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-success/10 text-success border-success/20">
                        Completed
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        {followUp.completedAt && formatDate(followUp.completedAt)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default FollowUps;