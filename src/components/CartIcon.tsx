import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const CartIcon = () => {
  const { getTotalItems } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const itemCount = getTotalItems();

  const handleCartClick = () => {
    if (!user) {
      navigate('/auth');
      return;
    }
    navigate('/checkout');
  };

  // Don't show cart icon if user is not logged in
  if (!user) {
    return null;
  }

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="relative"
      onClick={handleCartClick}
    >
      <ShoppingCart className="h-5 w-5" />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </Button>
  );
};

export default CartIcon;