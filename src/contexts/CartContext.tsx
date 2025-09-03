import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: { id: string; name: string; price: number; image?: string }) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  getTotalAmount: () => number;
  getTotalItems: () => number;
  clearCart: () => void;
  loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  // Load cart items from database when user logs in
  useEffect(() => {
    if (user) {
      loadCartFromDatabase();
    } else {
      setItems([]);
    }
  }, [user]);

  const loadCartFromDatabase = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data: cartData, error } = await supabase
        .from('cart_items')
        .select(`
          quantity,
          products (
            id,
            name,
            price,
            image
          )
        `)
        .eq('user_id', user.id);

      if (error) throw error;

      const cartItems: CartItem[] = cartData?.map((item: any) => ({
        id: item.products.id,
        name: item.products.name,
        price: item.products.price,
        quantity: item.quantity,
        image: item.products.image
      })) || [];

      setItems(cartItems);
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const syncCartToDatabase = async (cartItems: CartItem[]) => {
    if (!user) return;

    try {
      // Clear existing cart items for this user
      await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id);

      // Insert new cart items using upsert to handle duplicates
      if (cartItems.length > 0) {
        const cartData = cartItems.map(item => ({
          user_id: user.id,
          product_id: item.id,
          quantity: item.quantity
        }));

        await supabase
          .from('cart_items')
          .upsert(cartData, {
            onConflict: 'user_id,product_id'
          });
      }
    } catch (error) {
      console.error('Error syncing cart to database:', error);
    }
  };

  const addToCart = async (product: { id: string; name: string; price: number; image?: string }) => {
    const newItems = [...items];
    const existingItem = newItems.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      newItems.push({ ...product, quantity: 1 });
    }
    
    setItems(newItems);
    
    if (user) {
      await syncCartToDatabase(newItems);
    }
  };

  const removeFromCart = async (id: string) => {
    const newItems = items.filter(item => item.id !== id);
    setItems(newItems);
    
    if (user) {
      await syncCartToDatabase(newItems);
    }
  };

  const updateQuantity = async (id: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(id);
      return;
    }
    
    const newItems = items.map(item =>
      item.id === id ? { ...item, quantity } : item
    );
    
    setItems(newItems);
    
    if (user) {
      await syncCartToDatabase(newItems);
    }
  };

  const getTotalAmount = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const clearCart = async () => {
    setItems([]);
    
    if (user) {
      try {
        await supabase
          .from('cart_items')
          .delete()
          .eq('user_id', user.id);
      } catch (error) {
        console.error('Error clearing cart:', error);
      }
    }
  };

  const value = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotalAmount,
    getTotalItems,
    clearCart,
    loading,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};