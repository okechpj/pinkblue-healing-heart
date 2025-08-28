import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useUserRole } from "@/hooks/useUserRole";
import { User, LogOut, Shield } from "lucide-react";

const AuthButton = () => {
  const { user, signOut, loading } = useAuth();
  const { isAdmin } = useUserRole();

  if (loading) {
    return (
      <Button variant="ghost" size="sm" disabled>
        Loading...
      </Button>
    );
  }

  if (user) {
    return (
      <div className="flex items-center space-x-2">
        {isAdmin && (
          <Link to="/admin">
            <Button variant="ghost" size="sm" className="text-foreground hover:text-primary">
              <Shield className="w-4 h-4 mr-2" />
              Admin
            </Button>
          </Link>
        )}
        <Button variant="ghost" size="sm" className="text-foreground hover:text-primary">
          <User className="w-4 h-4 mr-2" />
          {user.user_metadata?.display_name || user.email?.split('@')[0]}
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={signOut}
          className="text-foreground hover:text-primary"
        >
          <LogOut className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <Link to="/auth?mode=signup">
        <Button 
          variant="ghost" 
          size="sm"
          className="text-foreground hover:text-primary"
        >
          Sign Up
        </Button>
      </Link>
      <Link to="/auth">
        <Button 
          variant="outline" 
          size="sm"
          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
        >
          Sign In
        </Button>
      </Link>
    </div>
  );
};

export default AuthButton;