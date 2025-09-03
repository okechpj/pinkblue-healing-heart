-- Add foreign key constraint between cart_items and products
ALTER TABLE public.cart_items 
ADD CONSTRAINT cart_items_product_id_fkey 
FOREIGN KEY (product_id) REFERENCES public.products(id) 
ON DELETE CASCADE;