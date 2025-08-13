import React from 'react';
import { 
  Users, 
  UserPlus, 
  Calendar, 
  Target,
  TrendingUp,
  Clock,
  CheckCircle
} from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import Header from '@/components/layout/Header';
import StatCard from '@/components/common/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MOCK_LEADS, MOCK_FOLLOWUPS } from '@/data/mockData';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SalesDashboard: React.FC = () => {
  // Calculate personal stats (for sales user)
  const myLeads = MOCK_LEADS.filter(lead => lead.ownerId === '2');
  const myApprovedLeads = myLeads.filter(lead => lead.status === 'approved');
  const myPendingLeads = myLeads.filter(lead => lead.status === 'pending');
  const todayFollowUps = MOCK_FOLLOWUPS.filter(followUp => !followUp.completed);
  
  const conversionRate = myLeads.length > 0 ? Math.round((myApprovedLeads.length / myLeads.length) * 100) : 0;

  // Personal performance chart data
  const personalChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Leads Created',
        data: [2, 1, 3, 2, 4, 1, 2],
        backgroundColor: 'rgba(99, 102, 241, 0.8)',
      },
      {
        label: 'Follow-ups',
        data: [1, 3, 2, 4, 2, 3, 1],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="flex-1 flex flex-col">
      <Header 
        title="Sales Dashboard" 
        subtitle="Your personal performance and activities overview" 
      />
      
      <div className="flex-1 p-6 space-y-6">
        {/* Personal Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="My Leads"
            value={myLeads.length}
            icon={Users}
            variant="primary"
            trend={{ value: 5.2, isPositive: true }}
          />
          <StatCard
            title="Approved"
            value={myApprovedLeads.length}
            icon={CheckCircle}
            variant="success"
            trend={{ value: 12.1, isPositive: true }}
          />
          <StatCard
            title="Today's Follow-ups"
            value={todayFollowUps.length}
            icon={Calendar}
            variant="warning"
          />
          <StatCard
            title="Conversion Rate"
            value={`${conversionRate}%`}
            icon={Target}
            variant="primary"
            trend={{ value: 3.2, isPositive: true }}
          />
        </div>

        {/* Charts and Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Activity Chart */}
          <Card className="stat-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Weekly Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <Bar data={personalChartData} options={chartOptions} />
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="stat-card">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full justify-start gap-3 h-12 bg-gradient-to-r from-primary to-primary-hover">
                <UserPlus className="w-5 h-5" />
                Create New Lead
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3 h-12">
                <Calendar className="w-5 h-5" />
                Schedule Follow-up
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3 h-12">
                <Users className="w-5 h-5" />
                View My Leads
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3 h-12">
                <Target className="w-5 h-5" />
                Update Lead Status
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Today's Follow-ups */}
        <Card className="stat-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-warning" />
              Today's Follow-ups
            </CardTitle>
          </CardHeader>
          <CardContent>
            {todayFollowUps.length > 0 ? (
              <div className="space-y-4">
                {todayFollowUps.slice(0, 3).map((followUp) => (
                  <div key={followUp.id} className="flex items-center justify-between p-4 bg-background rounded-lg border">
                    <div className="flex items-center gap-4">
                      <div className="w-3 h-3 bg-warning rounded-full"></div>
                      <div>
                        <p className="font-medium">{followUp.leadName}</p>
                        <p className="text-sm text-muted-foreground">{followUp.company}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">
                        {new Date(followUp.scheduledDate).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                      <Button size="sm" variant="outline" className="mt-1">
                        Contact
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No follow-ups scheduled for today</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="stat-card">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 bg-success/5 rounded-lg border border-success/20">
                <CheckCircle className="w-5 h-5 text-success" />
                <div>
                  <p className="font-medium">Lead Approved</p>
                  <p className="text-sm text-muted-foreground">Michael Johnson from SwiftTech Solutions</p>
                </div>
                <span className="text-xs text-muted-foreground ml-auto">2 hours ago</span>
              </div>
              <div className="flex items-center gap-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
                <UserPlus className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">New Lead Created</p>
                  <p className="text-sm text-muted-foreground">Sophia Adams from Stellar Ltd</p>
                </div>
                <span className="text-xs text-muted-foreground ml-auto">4 hours ago</span>
              </div>
              <div className="flex items-center gap-4 p-3 bg-secondary/5 rounded-lg border border-secondary/20">
                <Calendar className="w-5 h-5 text-secondary" />
                <div>
                  <p className="font-medium">Follow-up Scheduled</p>
                  <p className="text-sm text-muted-foreground">Emma Davis from BlueWave Group</p>
                </div>
                <span className="text-xs text-muted-foreground ml-auto">Yesterday</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SalesDashboard;