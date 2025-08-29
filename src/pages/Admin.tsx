import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageUpload } from "@/components/ImageUpload";
import { useUserRole } from "@/hooks/useUserRole";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Plus, Package, FileText, MessageSquare } from "lucide-react";

const Admin = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isAdmin, loading } = useUserRole();
  const { toast } = useToast();

  // Form states
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    stock: ''
  });
  
  const [blogForm, setBlogForm] = useState({
    title: '',
    content: '',
    author: '',
    tags: '',
    image: ''
  });
  
  const [testimonialForm, setTestimonialForm] = useState({
    name: '',
    message: '',
    image: '',
    rating: ''
  });

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate('/');
      toast({
        title: "Access Denied",
        description: "You need admin privileges to access this page.",
        variant: "destructive",
      });
    }
  }, [user, isAdmin, loading, navigate, toast]);

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('products')
        .insert({
          name: productForm.name,
          description: productForm.description,
          price: parseFloat(productForm.price),
          category: productForm.category,
          image: productForm.image,
          stock: parseInt(productForm.stock) || 0
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Product added successfully!",
      });
      
      setProductForm({
        name: '',
        description: '',
        price: '',
        category: '',
        image: '',
        stock: ''
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add product. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('blog_posts')
        .insert({
          title: blogForm.title,
          content: blogForm.content,
          author: blogForm.author,
          tags: blogForm.tags.split(',').map(tag => tag.trim()),
          image: blogForm.image
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Blog post created successfully!",
      });
      
      setBlogForm({
        title: '',
        content: '',
        author: '',
        tags: '',
        image: ''
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create blog post. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleTestimonialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('testimonials')
        .insert({
          name: testimonialForm.name,
          message: testimonialForm.message,
          image: testimonialForm.image,
          rating: parseInt(testimonialForm.rating) || 5
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Testimonial added successfully!",
      });
      
      setTestimonialForm({
        name: '',
        message: '',
        image: '',
        rating: ''
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add testimonial. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-8">
        <section className="py-20 px-4 bg-gradient-soft">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6 animate-gentle-fade">
              Admin{" "}
              <span className="bg-gradient-healing bg-clip-text text-blue-950 rounded-2xl p-2">
                Dashboard
              </span>
            </h1>
            <p className="text-xl text-warm-gray animate-gentle-fade">
              Manage your BluePink website content and features
            </p>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <Tabs defaultValue="products" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="products" className="flex items-center space-x-2">
                  <Package className="w-4 h-4" />
                  <span>Products</span>
                </TabsTrigger>
                <TabsTrigger value="blog" className="flex items-center space-x-2">
                  <FileText className="w-4 h-4" />
                  <span>Blog Posts</span>
                </TabsTrigger>
                <TabsTrigger value="testimonials" className="flex items-center space-x-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>Testimonials</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="products">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Plus className="w-5 h-5" />
                      <span>Add New Product</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleProductSubmit} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">
                            Product Name
                          </label>
                          <Input
                            value={productForm.name}
                            onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">
                            Category
                          </label>
                          <Input
                            value={productForm.category}
                            onChange={(e) => setProductForm({...productForm, category: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Description
                        </label>
                        <Textarea
                          value={productForm.description}
                          onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                          required
                        />
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">
                            Price (Ksh)
                          </label>
                          <Input
                            type="number"
                            step="0.01"
                            value={productForm.price}
                            onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">
                            Stock
                          </label>
                          <Input
                            type="number"
                            value={productForm.stock}
                            onChange={(e) => setProductForm({...productForm, stock: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">
                            Product Image
                          </label>
                          <ImageUpload
                            bucket="product-images"
                            onUpload={(url) => setProductForm({...productForm, image: url})}
                            currentImage={productForm.image}
                          />
                        </div>
                      </div>

                      <Button type="submit" className="w-full">
                        Add Product
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="blog">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Plus className="w-5 h-5" />
                      <span>Create New Blog Post</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleBlogSubmit} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">
                            Title
                          </label>
                          <Input
                            value={blogForm.title}
                            onChange={(e) => setBlogForm({...blogForm, title: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">
                            Author
                          </label>
                          <Input
                            value={blogForm.author}
                            onChange={(e) => setBlogForm({...blogForm, author: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Content
                        </label>
                        <Textarea
                          value={blogForm.content}
                          onChange={(e) => setBlogForm({...blogForm, content: e.target.value})}
                          className="min-h-[200px]"
                          required
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">
                            Tags (comma separated)
                          </label>
                          <Input
                            value={blogForm.tags}
                            onChange={(e) => setBlogForm({...blogForm, tags: e.target.value})}
                            placeholder="wellness, healing, tips"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">
                            Blog Image
                          </label>
                          <ImageUpload
                            bucket="blog-images"
                            onUpload={(url) => setBlogForm({...blogForm, image: url})}
                            currentImage={blogForm.image}
                          />
                        </div>
                      </div>

                      <Button type="submit" className="w-full">
                        Create Blog Post
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="testimonials">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Plus className="w-5 h-5" />
                      <span>Add New Testimonial</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleTestimonialSubmit} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">
                            Name
                          </label>
                          <Input
                            value={testimonialForm.name}
                            onChange={(e) => setTestimonialForm({...testimonialForm, name: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">
                            Rating (1-5)
                          </label>
                          <Input
                            type="number"
                            min="1"
                            max="5"
                            value={testimonialForm.rating}
                            onChange={(e) => setTestimonialForm({...testimonialForm, rating: e.target.value})}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Testimonial Message
                        </label>
                        <Textarea
                          value={testimonialForm.message}
                          onChange={(e) => setTestimonialForm({...testimonialForm, message: e.target.value})}
                          required
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Image URL
                        </label>
                        <Input
                          value={testimonialForm.image}
                          onChange={(e) => setTestimonialForm({...testimonialForm, image: e.target.value})}
                        />
                      </div>

                      <Button type="submit" className="w-full">
                        Add Testimonial
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;