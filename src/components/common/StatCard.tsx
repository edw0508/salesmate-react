import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  variant = 'default' 
}) => {
  const cardClasses = {
    default: 'stat-card',
    primary: 'stat-card-primary',
    success: 'stat-card-success',
    warning: 'stat-card-warning',
    danger: 'stat-card-danger'
  };

  const iconClasses = {
    default: 'text-muted-foreground',
    primary: 'text-primary',
    success: 'text-success',
    warning: 'text-warning',
    danger: 'text-danger'
  };

  return (
    <Card className={cardClasses[variant]}>
      <CardContent className="p-0">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground mb-1">
              {title}
            </p>
            <p className="text-3xl font-bold text-foreground">
              {typeof value === 'number' ? value.toLocaleString() : value}
            </p>
            {trend && (
              <p className={`text-sm mt-2 ${
                trend.isPositive ? 'text-success' : 'text-danger'
              }`}>
                {trend.isPositive ? '+' : ''}{trend.value}% from last month
              </p>
            )}
          </div>
          <div className={`p-3 rounded-xl bg-background/50 ${iconClasses[variant]}`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;