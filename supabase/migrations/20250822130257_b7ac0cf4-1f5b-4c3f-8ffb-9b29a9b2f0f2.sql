-- Insert sample products data
INSERT INTO public.products (name, description, price, category, image, stock) VALUES
('Premium Yoga Mat & Bag Set', 'Eco-friendly, non-slip yoga mat with matching healing-themed carry bag', 49.99, 'Yoga & Movement', '/placeholder-yoga.jpg', 25),
('Comfort Fleece Blanket', 'Ultra-soft fleece blanket for warmth during treatments and recovery', 34.99, 'Comfort Items', '/placeholder-blanket.jpg', 50),
('Pure Neem Oil', '100% natural neem oil for skincare and healing properties', 19.99, 'Natural Oils', '/placeholder-oil.jpg', 30),
('Healing Castor Oil', 'Cold-pressed castor oil for therapeutic and skincare use', 22.99, 'Natural Oils', '/placeholder-castor.jpg', 20),
('Baobab Powder Supplement', 'Natural immune-boosting baobab powder rich in vitamin C', 28.99, 'Supplements', '/placeholder-baobab.jpg', 15),
('Moringa Capsules', 'Premium moringa leaf capsules for natural energy and wellness', 32.99, 'Supplements', '/placeholder-moringa.jpg', 40);

-- Insert sample movement activities
INSERT INTO public.movement_activities (type, title, description, date) VALUES
('healing_hour', 'Monthly Healing Circle', 'Join us for our monthly healing circle where we share stories, support each other, and practice mindfulness together.', '2024-02-15 18:00:00+00'),
('support_mission', 'Care Package Distribution', 'Distributing care packages filled with comfort items and natural wellness products to cancer patients in local hospitals.', '2024-02-20 10:00:00+00'),
('community_event', 'Wellness Workshop Series', 'Educational workshops covering natural healing methods, stress management, and emotional support techniques.', '2024-02-25 14:00:00+00');

-- Insert sample blog posts
INSERT INTO public.blog_posts (title, content, author, tags) VALUES
('The Healing Power of Community', 'When facing life''s challenges, especially health struggles like cancer, the power of community cannot be overstated. At PinkBlue, we''ve witnessed firsthand how connection, support, and shared experiences can transform the healing journey...', 'Debra Collins', ARRAY['community', 'healing', 'support']),
('Natural Wellness: Incorporating Baobab into Your Daily Routine', 'Baobab, often called the "Tree of Life," offers incredible nutritional benefits that can support your wellness journey. Rich in vitamin C, fiber, and antioxidants, this superfruit powder can be easily incorporated into your daily routine...', 'Dr. Sarah Johnson', ARRAY['nutrition', 'natural-health', 'baobab']),
('Finding Peace Through Mindful Movement', 'Gentle movement and mindfulness practices have been cornerstones of healing for centuries. In our modern approach to wellness, we''ve rediscovered the profound impact that conscious movement can have on both physical and emotional healing...', 'Maria Rodriguez', ARRAY['mindfulness', 'movement', 'healing']);

-- Insert sample testimonials
INSERT INTO public.testimonials (name, message, rating) VALUES
('Sarah M.', 'PinkBlue has been a beacon of hope during my cancer journey. The community support and natural products have made such a difference in my healing process.', 5),
('John D.', 'The Healing Hour sessions provided me with strength and comfort I never knew I needed. Forever grateful for this amazing community.', 5),
('Emily R.', 'The quality of their natural products is exceptional. The neem oil has helped so much with my skin sensitivity during treatment.', 5),
('Michael T.', 'Finding PinkBlue was a blessing. The support, the products, and the genuine care from everyone involved has been life-changing.', 5);