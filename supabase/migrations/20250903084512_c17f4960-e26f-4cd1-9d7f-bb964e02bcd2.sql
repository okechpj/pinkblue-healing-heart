-- Add unique constraint to prevent duplicate cart items for same user/product
ALTER TABLE public.cart_items 
ADD CONSTRAINT cart_items_user_id_product_id_key 
UNIQUE (user_id, product_id);