import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Blog = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setPosts(data || []);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        toast({
          title: "Error loading blog posts",
          description: "Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [toast]);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-8">
        <section className="py-20 px-4 bg-gradient-soft">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6 animate-gentle-fade">
              Healing{" "}
              <span className="bg-gradient-healing bg-clip-text text-blue-950 rounded-2xl p-2">
                Corner
              </span>
            </h1>
            <p className="text-xl text-warm-gray animate-gentle-fade">
              Reflections, wellness tips, and inspiring stories from our healing community
            </p>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            {loading ? (
              <div className="space-y-8">
                {[...Array(3)].map((_, index) => (
                  <Card key={index} className="animate-pulse">
                    <CardHeader>
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-6 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded"></div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-warm-gray text-lg">No blog posts available yet.</p>
              </div>
            ) : (
              <div className="space-y-8">
                {posts.map((post, index) => (
                <Card 
                  key={post.id}
                  className="shadow-card hover-lift animate-gentle-fade border-0 bg-white"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <CardHeader>
                    <div className="flex flex-wrap items-center gap-4 mb-4">
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
                          <span>{new Date(post.created_at).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}</span>
                        </div>
                      </div>
                    </div>
                    <CardTitle className="font-heading text-2xl font-bold text-foreground hover:text-primary cursor-pointer transition-colors">
                      <button onClick={() => navigate(`/blog/${post.id}`)} className="text-left w-full">
                        {post.title}
                      </button>
                    </CardTitle>
                    <CardDescription className="text-warm-gray text-base leading-relaxed">
                      {post.content.length > 200 ? `${post.content.substring(0, 200)}...` : post.content}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <button 
                      className="text-primary font-semibold hover:text-primary-hover transition-colors"
                      onClick={() => navigate(`/blog/${post.id}`)}
                    >
                      Read More →
                    </button>
                  </CardContent>
                </Card>
                ))}
              </div>
            )}

            <div className="text-center mt-16">
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
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;