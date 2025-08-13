import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Building2, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <div className="text-center max-w-md mx-auto p-8">
        <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
          <Building2 className="w-12 h-12 text-white" />
        </div>
        
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          404
        </h1>
        
        <h2 className="text-2xl font-semibold mb-4 text-foreground">
          Page Not Found
        </h2>
        
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Button 
          asChild
          className="bg-gradient-to-r from-primary to-secondary hover:from-primary-hover hover:to-secondary-hover"
        >
          <a href="/login" className="flex items-center gap-2">
            <Home className="w-4 h-4" />
            Return to Login
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
