import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, Calendar, Gift } from "lucide-react";

// import { useNavigate } from "react-router-dom";


// const navigate = useNavigate();

const Movement = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-8">
        <section className="py-20 px-4 bg-gradient-hero">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6 animate-gentle-fade">
              BluePink{" "}
              <span className="bg-gradient-healing bg-clip-text text-blue-950 rounded-2xl p-2">
                Movement
              </span>
            </h1>
            <p className="text-xl text-warm-gray mb-8 animate-gentle-fade">
              Our cancer support and wellness outreach mission - building community, 
              sharing hope, and healing together.
            </p>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Impact
              </h2>
              <p className="text-lg text-warm-gray max-w-2xl mx-auto">
                Together, we're creating a supportive ecosystem where healing happens 
                through connection, compassion, and shared strength.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 auto-rows-fr">
              <Card className="text-center shadow-card border-0 bg-healing-pink-light">
                <CardHeader>
                  <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle className="font-heading text-2xl font-bold text-foreground">
                    500+
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-warm-gray font-medium">Lives Touched</p>
                </CardContent>
              </Card>

              <Card className="text-center shadow-card border-0 bg-healing-blue-light">
                <CardHeader>
                  <Users className="w-12 h-12 text-secondary mx-auto mb-4" />
                  <CardTitle className="font-heading text-2xl font-bold text-foreground">
                    50+
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-warm-gray font-medium">Community Members</p>
                </CardContent>
              </Card>

              <Card className="text-center shadow-card border-0 bg-calm-gray">
                <CardHeader>
                  <Gift className="w-12 h-12 text-primary mx-auto mb-4" />
                  <CardTitle className="font-heading text-2xl font-bold text-foreground">
                    24/7
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-warm-gray font-medium">Support Available</p>
                </CardContent>
              </Card>

            </div>

            <div className="grid lg:grid-cols-2 gap-16 mb-16">
              <div>
                <h3 className="font-heading text-3xl font-bold text-foreground mb-6">
                  Healing Hour – The Courage to Begin Again
                </h3>
                <p className="text-warm-gray leading-relaxed mb-6">
                  Life doesn’t always go as planned, but every ending invites a fresh start. Healing is remembering who you are beyond the pain.
                </p>
                <p>Affirmations:</p><br></br>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-warm-gray">I give myself permission to start again.</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span className="text-warm-gray">I am refined, not defined, by my past.</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-healing-pink-dark rounded-full"></div>
                    <span className="text-warm-gray">Each day is a gift I honor with courage.</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-warm-gray">I release the weight and embrace the lessons.</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-warm-gray">I trust the process and walk with grace.</span>
                  </li>
                </ul>
               
              </div>

              <div className="bg-gradient-healing rounded-3xl p-8 text-white">
                <h3 className="font-heading text-3xl font-bold mb-6">
                  Support Our Mission
                </h3>
                <p className="text-lg opacity-90 mb-8">
                  Your donation helps us provide free wellness products, organize 
                  healing events, and support families during their most challenging times.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center bg-white/10 rounded-lg p-3">
                    <span>Healing Yoga Bags</span>
                    
                  </div>
                  <div className="flex justify-between items-center bg-white/10 rounded-lg p-3">
                    <span>Comfort Fleece Blankets</span>
                   
                  </div>
                  <div className="flex justify-between items-center bg-white/10 rounded-lg p-3">
                    <span>Natural Wellness Oils</span>
                   
                  </div>
                </div>

                 <Button
                    variant="secondary"
                    size="lg"
                    className="w-full bg-white text-primary hover:bg-white/90 font-bold py-4 text-lg rounded-xl"
                    
                  >
                    Donate Now
                  </Button> 
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Movement;