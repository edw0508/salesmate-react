import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Building2, Mail, Phone, FileText, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import Header from '@/components/layout/Header';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const CreateLead: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    requirements: '',
    priority: [5]
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.company || !formData.email || !formData.requirements) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock lead creation
    const newLead = {
      id: Date.now().toString(),
      ...formData,
      priority: formData.priority[0],
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ownerId: user?.id || '2',
      ownerName: user?.name || 'Sales Representative',
      statusHistory: []
    };

    console.log('New lead created:', newLead);

    toast({
      title: "Success!",
      description: "Lead created successfully and is now pending review",
    });

    setIsSubmitting(false);
    navigate('/leads/manage');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getPriorityColor = (priority: number) => {
    if (priority <= 3) return 'text-success';
    if (priority <= 6) return 'text-warning';
    return 'text-danger';
  };

  const getPriorityLabel = (priority: number) => {
    if (priority <= 3) return 'Low Priority';
    if (priority <= 6) return 'Medium Priority';
    return 'High Priority';
  };

  return (
    <div className="flex-1 flex flex-col">
      <Header 
        title="Create New Lead" 
        subtitle="Add a new potential customer to the system" 
      />
      
      <div className="flex-1 p-6">
        <div className="max-w-2xl mx-auto">
          <Card className="stat-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-primary" />
                Lead Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-2">
                      <UserPlus className="w-4 h-4" />
                      Contact Name *
                    </Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company" className="flex items-center gap-2">
                      <Building2 className="w-4 h-4" />
                      Company Name *
                    </Label>
                    <Input
                      id="company"
                      placeholder="Acme Corporation"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      className="h-11"
                    />
                  </div>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@acme.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="h-11"
                    />
                  </div>
                </div>

                {/* Requirements */}
                <div className="space-y-2">
                  <Label htmlFor="requirements" className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Project Requirements *
                  </Label>
                  <Textarea
                    id="requirements"
                    placeholder="Describe the project requirements, goals, and any specific needs..."
                    value={formData.requirements}
                    onChange={(e) => handleInputChange('requirements', e.target.value)}
                    className="min-h-[120px]"
                  />
                </div>

                {/* Priority Slider */}
                <div className="space-y-4">
                  <Label className="flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    Priority Level
                  </Label>
                  <div className="space-y-3">
                    <Slider
                      value={formData.priority}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}
                      max={10}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Low (1)</span>
                      <span className={`font-medium ${getPriorityColor(formData.priority[0])}`}>
                        {formData.priority[0]} - {getPriorityLabel(formData.priority[0])}
                      </span>
                      <span>High (10)</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => navigate('/sales/dashboard')}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-primary-hover hover:to-secondary-hover"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Creating Lead...' : 'Create Lead'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateLead;