import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, User } from "lucide-react";

const Blog = () => {
  const posts = [
    {
      id: 1,
      title: "The Healing Power of Community Support",
      excerpt: "Discover how connecting with others on similar journeys can accelerate healing and provide comfort during challenging times.",
      author: "Debra PinkBlue",
      date: "November 15, 2024",
      category: "Healing Reflections"
    },
    {
      id: 2,
      title: "Natural Wellness: Benefits of Baobab for Immunity",
      excerpt: "Learn about the incredible immune-boosting properties of baobab fruit and how it can support your health naturally.",
      author: "Irene Wellness",
      date: "November 10, 2024", 
      category: "Product Benefits"
    },
    {
      id: 3,
      title: "Creating Sacred Space: Healing Hour Reflections",
      excerpt: "Insights from our latest Healing Hour gathering and the transformative power of shared meditation and mindfulness.",
      author: "PinkBlue Team",
      date: "November 5, 2024",
      category: "Healing Events"
    }
  ];

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
            <div className="space-y-8">
              {posts.map((post, index) => (
                <Card 
                  key={post.id}
                  className="shadow-card hover-lift animate-gentle-fade border-0 bg-white"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <CardHeader>
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <span className="text-sm text-primary bg-healing-pink-light px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                      <div className="flex items-center text-sm text-warm-gray gap-4">
                        <div className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{post.date}</span>
                        </div>
                      </div>
                    </div>
                    <CardTitle className="font-heading text-2xl font-bold text-foreground hover:text-primary cursor-pointer transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-warm-gray text-base leading-relaxed">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <button className="text-primary font-semibold hover:text-primary-hover transition-colors">
                      Read More →
                    </button>
                  </CardContent>
                </Card>
              ))}
            </div>

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