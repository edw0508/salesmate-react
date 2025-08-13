import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  UserPlus, 
  Calendar, 
  FolderOpen, 
  LogOut,
  BarChart3,
  Building2
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const adminMenuItems = [
    { 
      icon: LayoutDashboard, 
      label: 'Dashboard', 
      path: '/admin/dashboard' 
    },
    { 
      icon: Users, 
      label: 'Manage Leads', 
      path: '/leads/manage' 
    },
    { 
      icon: FolderOpen, 
      label: 'Projects', 
      path: '/projects' 
    },
    { 
      icon: BarChart3, 
      label: 'Analytics', 
      path: '/analytics' 
    }
  ];

  const salesMenuItems = [
    { 
      icon: LayoutDashboard, 
      label: 'Dashboard', 
      path: '/sales/dashboard' 
    },
    { 
      icon: UserPlus, 
      label: 'Create Lead', 
      path: '/leads/create' 
    },
    { 
      icon: Users, 
      label: 'My Leads', 
      path: '/leads/manage' 
    },
    { 
      icon: Calendar, 
      label: 'Follow-ups', 
      path: '/followups' 
    }
  ];

  const menuItems = user?.role === 'admin' ? adminMenuItems : salesMenuItems;

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="w-64 bg-card border-r border-border h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            CRM Pro
          </span>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {user?.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user?.name}</p>
            <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive: linkIsActive }) =>
                  linkIsActive || isActive(item.path)
                    ? 'sidebar-item-active'
                    : 'sidebar-item'
                }
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-border">
        <Button
          variant="outline"
          className="w-full justify-start gap-3"
          onClick={logout}
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;