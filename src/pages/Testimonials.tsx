import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Quote, Star, Edit, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useUserRole } from "@/hooks/useUserRole";
import { EditTestimonialModal } from "@/components/EditTestimonialModal";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTestimonial, setEditingTestimonial] = useState<any>(null);
  const { toast } = useToast();
  const { isAdmin } = useUserRole();

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .order('date', { ascending: false });

        if (error) throw error;
        setTestimonials(data || []);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        toast({
          title: "Error loading testimonials",
          description: "Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, [toast]);

  const handleDeleteTestimonial = async (testimonialId: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;
    
    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', testimonialId);

      if (error) throw error;

      toast({
        title: "Testimonial deleted",
        description: "Testimonial has been successfully deleted.",
      });
      
      // Refresh testimonials
      const { data, error: fetchError } = await supabase
        .from('testimonials')
        .select('*')
        .order('date', { ascending: false });

      if (!fetchError) {
        setTestimonials(data || []);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete testimonial.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-8">
        <section className="py-20 px-4 bg-gradient-hero">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6 animate-gentle-fade">
              Healing{" "}
              <span className="bg-gradient-healing bg-clip-text text-blue-950 rounded-2xl p-2">
                Stories
              </span>
            </h1>
            <p className="text-xl text-warm-gray animate-gentle-fade">
              Real experiences from our community members who found hope, healing, and connection through PinkBlue
            </p>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                Stories of Hope & Healing
              </h2>
              <p className="text-lg text-warm-gray max-w-2xl mx-auto">
                Every person's journey is unique, but no one should walk it alone. 
                Here are some of the beautiful stories shared by our community.
              </p>
            </div>

            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {[...Array(6)].map((_, index) => (
                  <Card key={index} className="animate-pulse">
                    <CardHeader>
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-6 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded"></div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            ) : testimonials.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-warm-gray text-lg">No testimonials available yet.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {testimonials.map((testimonial, index) => (
                <Card 
                  key={testimonial.id}
                  className="shadow-card hover-lift animate-gentle-fade border-0 bg-white h-full relative"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {isAdmin && (
                    <div className="absolute top-2 right-2 flex gap-2 z-10">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="p-2 h-8 w-8 bg-white/90 hover:bg-white"
                          onClick={() => setEditingTestimonial(testimonial)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="p-2 h-8 w-8 bg-red-500/90 hover:bg-red-600"
                        onClick={() => handleDeleteTestimonial(testimonial.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <Quote className="w-8 h-8 text-primary opacity-30" />
                      <div className="flex space-x-1">
                        {[...Array(testimonial.rating || 5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className="w-4 h-4 fill-primary text-primary" 
                          />
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-warm-gray leading-relaxed italic">
                      "{testimonial.message}"
                    </p>
                    <div className="border-t border-border pt-4">
                      <p className="font-semibold text-foreground">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-warm-gray">
                        {new Date(testimonial.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                ))}
              </div>
            )}

           
          </div>
        </section>
      </main>
      <Footer />
      
      {editingTestimonial && (
        <EditTestimonialModal
          testimonial={editingTestimonial}
          isOpen={!!editingTestimonial}
          onClose={() => setEditingTestimonial(null)}
          onUpdate={async () => {
            const { data, error } = await supabase
              .from('testimonials')
              .select('*')
              .order('date', { ascending: false });
            if (!error) {
              setTestimonials(data || []);
            }
          }}
        />
      )}
    </div>
  );
};

export default Testimonials;