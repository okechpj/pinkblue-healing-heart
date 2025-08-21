import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah M.",
      location: "Toronto, Canada",
      story: "The PinkBlue community became my lifeline during treatment. The Healing Hours gave me peace I didn't know I could find during such a difficult time.",
      rating: 5,
      category: "Healing Hour Participant"
    },
    {
      id: 2,
      name: "Michael R.", 
      location: "Phoenix, USA",
      story: "As a caregiver, I felt lost until I found PinkBlue. Their natural oils and the supportive community helped both me and my wife through her recovery journey.",
      rating: 5,
      category: "Caregiver"
    },
    {
      id: 3,
      name: "Elena K.",
      location: "London, UK", 
      story: "The baobab supplements and fleece blankets were more than products - they were hugs of comfort when I needed them most. Thank you for caring.",
      rating: 5,
      category: "Product Customer"
    },
    {
      id: 4,
      name: "James T.",
      location: "Sydney, Australia",
      story: "Three years cancer-free, and I still attend the virtual Healing Hours. This community understands the journey like no other.",
      rating: 5,
      category: "Cancer Survivor"
    },
    {
      id: 5,
      name: "Maria L.",
      location: "São Paulo, Brazil",
      story: "The yoga mats arrived just when I was starting my mindfulness practice. Having tools that supported my healing made all the difference.",
      rating: 5,
      category: "Wellness Practitioner"
    },
    {
      id: 6,
      name: "David W.",
      location: "Vancouver, Canada",
      story: "PinkBlue doesn't just sell products - they create hope. Every interaction felt like talking to family who truly cared about my wellbeing.",
      rating: 5,
      category: "Community Member"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-8">
        <section className="py-20 px-4 bg-gradient-hero">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6 animate-gentle-fade">
              Healing{" "}
              <span className="bg-gradient-healing bg-clip-text text-transparent">
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

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {testimonials.map((testimonial, index) => (
                <Card 
                  key={testimonial.id}
                  className="shadow-card hover-lift animate-gentle-fade border-0 bg-white h-full"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <Quote className="w-8 h-8 text-primary opacity-30" />
                      <div className="flex space-x-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star 
                            key={i} 
                            className="w-4 h-4 fill-primary text-primary" 
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-primary bg-healing-pink-light px-3 py-1 rounded-full w-fit">
                      {testimonial.category}
                    </span>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-warm-gray leading-relaxed italic">
                      "{testimonial.story}"
                    </p>
                    <div className="border-t border-border pt-4">
                      <p className="font-semibold text-foreground">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-warm-gray">
                        {testimonial.location}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <div className="bg-gradient-healing rounded-3xl p-12 text-white max-w-3xl mx-auto">
                <h3 className="font-heading text-3xl font-bold mb-6">
                  Share Your Healing Story
                </h3>
                <p className="text-lg opacity-90 mb-8">
                  Your journey could inspire and comfort others walking a similar path. 
                  We'd love to hear how PinkBlue has been part of your healing experience.
                </p>
                <button className="bg-white text-primary font-bold px-8 py-4 rounded-xl hover:bg-white/90 transition-colors text-lg">
                  Submit Your Story
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Testimonials;