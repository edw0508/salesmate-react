import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'sales'>('admin');
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    const success = await login(email, password, role);
    
    if (success) {
      toast({
        title: "Welcome!",
        description: `Successfully logged in as ${role}`,
      });
      
      // Redirect based on role
      navigate(role === 'admin' ? '/admin/dashboard' : '/sales/dashboard');
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive"
      });
    }
  };

  const fillDemoCredentials = (demoRole: 'admin' | 'sales') => {
    setRole(demoRole);
    setEmail(demoRole === 'admin' ? 'admin@crm.com' : 'sales@crm.com');
    setPassword('password');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-0">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
              <Building2 className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Welcome to CRM Pro
          </CardTitle>
          <p className="text-muted-foreground">
            Choose your role and sign in to continue
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <Tabs value={role} onValueChange={(value) => setRole(value as 'admin' | 'sales')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="admin" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Admin
              </TabsTrigger>
              <TabsTrigger value="sales" className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground">
                Sales
              </TabsTrigger>
            </TabsList>

            <TabsContent value="admin" className="space-y-4 mt-6">
              <div className="text-center p-4 bg-primary/5 rounded-lg border border-primary/20">
                <p className="text-sm text-primary font-medium">Admin Access</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Full system access and lead management
                </p>
              </div>
            </TabsContent>

            <TabsContent value="sales" className="space-y-4 mt-6">
              <div className="text-center p-4 bg-secondary/5 rounded-lg border border-secondary/20">
                <p className="text-sm text-secondary font-medium">Sales Representative</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Lead creation and personal dashboard
                </p>
              </div>
            </TabsContent>
          </Tabs>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-11 bg-gradient-to-r from-primary to-secondary hover:from-primary-hover hover:to-secondary-hover"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : null}
              Sign In as {role === 'admin' ? 'Admin' : 'Sales Rep'}
            </Button>
          </form>

          <div className="space-y-2">
            <p className="text-xs text-center text-muted-foreground">
              Demo Credentials:
            </p>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => fillDemoCredentials('admin')}
                className="text-xs"
              >
                Try Admin
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => fillDemoCredentials('sales')}
                className="text-xs"
              >
                Try Sales
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;