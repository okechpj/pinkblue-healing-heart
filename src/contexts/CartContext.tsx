import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
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
  const { user } = useAuth();

  // Load cart items from database when user logs in
  useEffect(() => {
    if (user) {
      loadCartItems();
    } else {
      setItems([]);
    }
  }, [user]);

  const loadCartItems = async () => {
    if (!user) return;
    
    try {
      const { data: cartData, error } = await supabase
        .from('cart_items')
        .select(`
          id,
          quantity,
          product_id,
          products (
            id,
            name,
            price,
            image
          )
        `)
        .eq('user_id', user.id);

      if (error) throw error;

      const cartItems: CartItem[] = cartData?.map(item => ({
        id: (item.products as any).id,
        name: (item.products as any).name,
        price: (item.products as any).price,
        quantity: item.quantity,
        image: (item.products as any).image
      })) || [];

      setItems(cartItems);
    } catch (error) {
      console.error('Error loading cart items:', error);
    }
  };

  const addToCart = async (product: { id: string; name: string; price: number; image?: string }) => {
    if (!user) return;

    try {
      // Check if item already exists in cart
      const { data: existingItem } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', user.id)
        .eq('product_id', product.id)
        .single();

      if (existingItem) {
        // Update quantity
        const { error } = await supabase
          .from('cart_items')
          .update({ quantity: existingItem.quantity + 1 })
          .eq('id', existingItem.id);

        if (error) throw error;
      } else {
        // Insert new item
        const { error } = await supabase
          .from('cart_items')
          .insert({
            user_id: user.id,
            product_id: product.id,
            quantity: 1
          });

        if (error) throw error;
      }

      // Reload cart items
      await loadCartItems();
    } catch (error) {
      console.error('Error adding to cart:', error);
      // Fallback to local state update
      setItems(currentItems => {
        const existingItem = currentItems.find(item => item.id === product.id);
        
        if (existingItem) {
          return currentItems.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        
        return [...currentItems, { ...product, quantity: 1 }];
      });
    }
  };

  const removeFromCart = async (id: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', id);

      if (error) throw error;

      // Update local state
      setItems(currentItems => currentItems.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error removing from cart:', error);
      // Fallback to local state update
      setItems(currentItems => currentItems.filter(item => item.id !== id));
    }
  };

  const updateQuantity = async (id: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(id);
      return;
    }

    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('user_id', user.id)
        .eq('product_id', id);

      if (error) throw error;

      // Update local state
      setItems(currentItems =>
        currentItems.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    } catch (error) {
      console.error('Error updating quantity:', error);
      // Fallback to local state update
      setItems(currentItems =>
        currentItems.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const getTotalAmount = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const clearCart = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;

      setItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
      // Fallback to local state update
      setItems([]);
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
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};