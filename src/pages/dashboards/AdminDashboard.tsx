import React from 'react';
import { 
  Users, 
  CheckCircle, 
  XCircle, 
  Clock, 
  TrendingUp,
  FolderOpen,
  DollarSign
} from 'lucide-react';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
} from 'chart.js';
import Header from '@/components/layout/Header';
import StatCard from '@/components/common/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MOCK_DASHBOARD_STATS, MOCK_SALES_CHART_DATA, MOCK_LEAD_STATUS_CHART_DATA } from '@/data/mockData';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
);

const AdminDashboard: React.FC = () => {
  const stats = MOCK_DASHBOARD_STATS;

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

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  return (
    <div className="flex-1 flex flex-col">
      <Header 
        title="Admin Dashboard" 
        subtitle="Overview of all CRM activities and performance metrics" 
      />
      
      <div className="flex-1 p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Leads"
            value={stats.totalLeads}
            icon={Users}
            variant="primary"
            trend={{ value: 12.5, isPositive: true }}
          />
          <StatCard
            title="Approved Leads"
            value={stats.approvedLeads}
            icon={CheckCircle}
            variant="success"
            trend={{ value: 8.2, isPositive: true }}
          />
          <StatCard
            title="Pending Review"
            value={stats.pendingLeads}
            icon={Clock}
            variant="warning"
            trend={{ value: 3.1, isPositive: false }}
          />
          <StatCard
            title="Monthly Revenue"
            value={`$${(stats.monthlyRevenue / 1000).toFixed(0)}K`}
            icon={DollarSign}
            variant="primary"
            trend={{ value: 15.3, isPositive: true }}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sales Trend Chart */}
          <Card className="stat-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Sales Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <Line data={MOCK_SALES_CHART_DATA} options={chartOptions} />
              </div>
            </CardContent>
          </Card>

          {/* Lead Status Distribution */}
          <Card className="stat-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-secondary" />
                Lead Status Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <Doughnut data={MOCK_LEAD_STATUS_CHART_DATA} options={doughnutOptions} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Active Projects"
            value={stats.totalProjects}
            icon={FolderOpen}
            variant="success"
          />
          <StatCard
            title="Conversion Rate"
            value={`${stats.conversionRate}%`}
            icon={TrendingUp}
            variant="primary"
          />
          <StatCard
            title="Rejected Leads"
            value={stats.rejectedLeads}
            icon={XCircle}
            variant="danger"
          />
        </div>

        {/* Quick Actions */}
        <Card className="stat-card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/20 text-center">
                <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="font-medium">Review Pending Leads</p>
                <p className="text-sm text-muted-foreground">{stats.pendingLeads} leads waiting</p>
              </div>
              <div className="p-4 bg-success/5 rounded-lg border border-success/20 text-center">
                <FolderOpen className="w-8 h-8 text-success mx-auto mb-2" />
                <p className="font-medium">Assign Project Managers</p>
                <p className="text-sm text-muted-foreground">{stats.approvedLeads} ready for assignment</p>
              </div>
              <div className="p-4 bg-warning/5 rounded-lg border border-warning/20 text-center">
                <Clock className="w-8 h-8 text-warning mx-auto mb-2" />
                <p className="font-medium">Schedule Follow-ups</p>
                <p className="text-sm text-muted-foreground">{stats.todayFollowUps} follow-ups today</p>
              </div>
              <div className="p-4 bg-secondary/5 rounded-lg border border-secondary/20 text-center">
                <TrendingUp className="w-8 h-8 text-secondary mx-auto mb-2" />
                <p className="font-medium">View Analytics</p>
                <p className="text-sm text-muted-foreground">Detailed reports</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;