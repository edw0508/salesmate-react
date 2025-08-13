import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAuth } from '@/contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  // If user is not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Role-based route protection
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isSalesRoute = location.pathname.startsWith('/sales');

  if (isAdminRoute && user.role !== 'admin') {
    return <Navigate to="/sales/dashboard" replace />;
  }

  if (isSalesRoute && user.role !== 'sales') {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default Layout;