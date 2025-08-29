import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  tags: string[];
  image?: string;
  created_at: string;
}

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) {
        navigate('/blog');
        return;
      }

      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setPost(data);
      } catch (error) {
        console.error('Error fetching blog post:', error);
        toast({
          title: "Error loading blog post",
          description: "The blog post could not be found.",
          variant: "destructive",
        });
        navigate('/blog');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, navigate, toast]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-8">
          <section className="py-20 px-4">
            <div className="container mx-auto max-w-4xl">
              <Card className="animate-pulse">
                <CardHeader>
                  <div className="h-8 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-64 bg-gray-200 rounded"></div>
                </CardHeader>
              </Card>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-8">
          <section className="py-20 px-4">
            <div className="container mx-auto max-w-4xl text-center">
              <h1 className="font-heading text-3xl font-bold text-foreground mb-6">
                Blog Post Not Found
              </h1>
              <p className="text-warm-gray mb-8">
                The blog post you're looking for doesn't exist.
              </p>
              <Button onClick={() => navigate('/blog')}>
                Back to Blog
              </Button>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-8">
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="flex items-center mb-8">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/blog')}
                className="mr-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </div>

            <article>
              <Card className="shadow-card border-0 bg-white">
                <CardHeader className="pb-8">
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    {post.tags && post.tags.length > 0 && (
                      <span className="text-sm text-primary bg-healing-pink-light px-3 py-1 rounded-full">
                        {post.tags[0]}
                      </span>
                    )}
                    <div className="flex items-center text-sm text-warm-gray gap-4">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(post.created_at).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
                    {post.title}
                  </h1>

                  {post.image && (
                    <div className="mb-6">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-64 md:h-96 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </CardHeader>
                
                <CardContent>
                  <div className="prose prose-lg max-w-none">
                    <div className="text-warm-gray leading-relaxed whitespace-pre-wrap">
                      {post.content}
                    </div>
                  </div>
                  
                  {post.tags && post.tags.length > 1 && (
                    <div className="mt-8 pt-6 border-t">
                      <p className="text-sm font-medium text-foreground mb-2">Tags:</p>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag, index) => (
                          <span 
                            key={index}
                            className="text-xs bg-healing-blue-light text-primary px-2 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="text-center mt-12">
                <div className="bg-gradient-healing rounded-2xl p-8 text-white">
                  <h3 className="font-heading text-2xl font-bold mb-4">
                    Stay Connected with Our Healing Community
                  </h3>
                  <p className="mb-6 opacity-90">
                    Subscribe to our monthly newsletter for wellness tips, healing reflections, 
                    and updates from the PinkBlue movement.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                    <input 
                      type="email" 
                      placeholder="your-email@example.com"
                      className="flex-1 px-4 py-3 rounded-lg text-foreground"
                    />
                    <button className="bg-white text-primary font-semibold px-6 py-3 rounded-lg hover:bg-white/90 transition-colors">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;