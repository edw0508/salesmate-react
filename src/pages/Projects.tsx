import React from 'react';
import { 
  FolderOpen, 
  DollarSign, 
  User, 
  Calendar,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import Header from '@/components/layout/Header';
import StatCard from '@/components/common/StatCard';
import { MOCK_PROJECTS } from '@/data/mockData';

const Projects: React.FC = () => {
  const projects = MOCK_PROJECTS;
  const totalValue = projects.reduce((sum, project) => sum + project.estimatedValue, 0);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      planning: { label: 'Planning', className: 'status-pending', icon: Clock },
      'in-progress': { label: 'In Progress', className: 'status-contacted', icon: TrendingUp },
      completed: { label: 'Completed', className: 'status-approved', icon: CheckCircle }
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    const IconComponent = config.icon;

    return (
      <Badge className={config.className}>
        <IconComponent className="w-3 h-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  const getProgressValue = (status: string) => {
    switch (status) {
      case 'planning': return 20;
      case 'in-progress': return 65;
      case 'completed': return 100;
      default: return 0;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="flex-1 flex flex-col">
      <Header 
        title="Projects" 
        subtitle="Auto-generated projects from approved leads" 
      />
      
      <div className="flex-1 p-6 space-y-6">
        {/* Project Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard
            title="Total Projects"
            value={projects.length}
            icon={FolderOpen}
            variant="primary"
          />
          <StatCard
            title="In Progress"
            value={projects.filter(p => p.status === 'in-progress').length}
            icon={TrendingUp}
            variant="warning"
          />
          <StatCard
            title="Completed"
            value={projects.filter(p => p.status === 'completed').length}
            icon={CheckCircle}
            variant="success"
          />
          <StatCard
            title="Total Value"
            value={formatCurrency(totalValue)}
            icon={DollarSign}
            variant="primary"
          />
        </div>

        {/* Projects List */}
        <Card className="stat-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FolderOpen className="w-5 h-5 text-primary" />
              Active Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            {projects.length > 0 ? (
              <div className="space-y-6">
                {projects.map((project) => (
                  <div key={project.id} className="p-6 bg-background rounded-lg border border-border hover:shadow-md transition-all">
                    <div className="space-y-4">
                      {/* Project Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-semibold">{project.name}</h3>
                            {getStatusBadge(project.status)}
                          </div>
                          <p className="text-muted-foreground">{project.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary">
                            {formatCurrency(project.estimatedValue)}
                          </p>
                          <p className="text-sm text-muted-foreground">Est. Value</p>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{getProgressValue(project.status)}%</span>
                        </div>
                        <Progress value={getProgressValue(project.status)} className="h-2" />
                      </div>

                      {/* Project Details */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Project Manager</p>
                            <p className="text-sm text-muted-foreground">{project.assignedManagerName}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Start Date</p>
                            <p className="text-sm text-muted-foreground">{formatDate(project.createdAt)}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <FolderOpen className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Lead Source</p>
                            <p className="text-sm text-muted-foreground">Lead #{project.leadId}</p>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-4">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          Update Status
                        </Button>
                        <Button variant="outline" size="sm">
                          Contact Manager
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FolderOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Projects Yet</h3>
                <p className="text-muted-foreground mb-4">
                  Projects will automatically appear here when leads are approved
                </p>
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 max-w-md mx-auto">
                  <AlertCircle className="w-5 h-5 text-primary mx-auto mb-2" />
                  <p className="text-sm text-primary">
                    <strong>Auto Project Creation:</strong> When an admin approves a lead, 
                    a project is automatically created and assigned to a project manager.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Project Creation Info */}
        <Card className="stat-card-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              How Projects Are Created
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-lg font-bold text-primary">1</span>
                </div>
                <h4 className="font-medium mb-2">Lead Approval</h4>
                <p className="text-sm text-muted-foreground">
                  Admin reviews and approves a sales lead
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-lg font-bold text-primary">2</span>
                </div>
                <h4 className="font-medium mb-2">Auto Creation</h4>
                <p className="text-sm text-muted-foreground">
                  Project is automatically generated from lead data
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-lg font-bold text-primary">3</span>
                </div>
                <h4 className="font-medium mb-2">Manager Assignment</h4>
                <p className="text-sm text-muted-foreground">
                  Project manager is assigned and notified
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Projects;