import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Context Providers
import { AuthProvider } from "@/contexts/AuthContext";

// Components
import Layout from "@/components/layout/Layout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

// Pages
import Login from "@/pages/auth/Login";
import AdminDashboard from "@/pages/dashboards/AdminDashboard";
import SalesDashboard from "@/pages/dashboards/SalesDashboard";
import CreateLead from "@/pages/leads/CreateLead";
import ManageLeads from "@/pages/leads/ManageLeads";
import FollowUps from "@/pages/FollowUps";
import Projects from "@/pages/Projects";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Root redirect */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            
            {/* Authentication */}
            <Route 
              path="/login" 
              element={
                <ProtectedRoute requireAuth={false}>
                  <Login />
                </ProtectedRoute>
              } 
            />

            {/* Admin Routes */}
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute>
                  <Layout>
                    <AdminDashboard />
                  </Layout>
                </ProtectedRoute>
              } 
            />

            {/* Sales Routes */}
            <Route 
              path="/sales/dashboard" 
              element={
                <ProtectedRoute>
                  <Layout>
                    <SalesDashboard />
                  </Layout>
                </ProtectedRoute>
              } 
            />

            {/* Lead Management Routes */}
            <Route 
              path="/leads/create" 
              element={
                <ProtectedRoute>
                  <Layout>
                    <CreateLead />
                  </Layout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/leads/manage" 
              element={
                <ProtectedRoute>
                  <Layout>
                    <ManageLeads />
                  </Layout>
                </ProtectedRoute>
              } 
            />

            {/* Follow-ups */}
            <Route 
              path="/followups" 
              element={
                <ProtectedRoute>
                  <Layout>
                    <FollowUps />
                  </Layout>
                </ProtectedRoute>
              } 
            />

            {/* Projects */}
            <Route 
              path="/projects" 
              element={
                <ProtectedRoute>
                  <Layout>
                    <Projects />
                  </Layout>
                </ProtectedRoute>
              } 
            />

            {/* Analytics (Admin only) */}
            <Route 
              path="/analytics" 
              element={
                <ProtectedRoute>
                  <Layout>
                    <AdminDashboard />
                  </Layout>
                </ProtectedRoute>
              } 
            />

            {/* 404 Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
