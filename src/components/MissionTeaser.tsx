import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, Users, Sparkles } from "lucide-react";

const MissionTeaser = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="animate-soft-slide">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
              Our{" "}
              <span className="bg-gradient-healing bg-clip-text rounded-2xl p-2">
                Mission & Vision
              </span>
            </h2>
            
            <p className="text-lg text-foreground mb-8 leading-relaxed">
              Born from the Pink Ribbon Drive, BluePink has evolved into a movement of hope, 
              healing, and community. We believe in the power of love to heal hearts, 
              comfort souls, and strengthen spirits during life's most challenging moments.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-healing-pink-light rounded-full flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                    Compassionate Care
                  </h3>
                  <p className="text-foreground">
                    Supporting cancer patients and survivors with love, understanding, and practical resources.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-healing-blue-light rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                    Community Healing
                  </h3>
                  <p className="text-foreground">
                    Building connections through our Healing Hour events and supportive community networks.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-calm-gray rounded-full flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-healing-pink-dark" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                    Natural Wellness
                  </h3>
                  <p className="text-foreground">
                    Promoting holistic healing through natural products, mindful practices, and gentle care.
                  </p>
                </div>
              </div>
            </div>

            <Link to="/about">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary-hover text-primary-foreground px-8 py-4 text-lg font-semibold rounded-xl shadow-gentle hover-lift"
              >
                Learn More About Us
              </Button>
            </Link>
          </div>

          {/* Visual Element */}
          <div className="animate-gentle-fade">
            <div className="relative">
              <div className="bg-gradient-healing rounded-3xl p-12 shadow-hero">
                <div className="text-center text-white">
                  <h3 className="font-heading text-3xl font-bold mb-4">
                    Join Our Movement
                  </h3>
                  <p className="text-lg opacity-90 mb-8">
                    Be part of a community that believes in healing through love, 
                    compassion, and shared strength.
                  </p>
                  
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="text-center">
                      <div className="text-2xl font-bold">500+</div>
                      <div className="text-sm opacity-80">Lives Touched</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">50+</div>
                      <div className="text-sm opacity-80">Healing Hours</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">24/7</div>
                      <div className="text-sm opacity-80">Support</div>
                    </div>
                  </div>

                  <Link to="/movement">
                    <Button 
                      variant="secondary" 
                      className="bg-white text-primary hover:text-black hover:bg-primary-hover font-semibold px-6 py-3 rounded-lg"
                    >
                      Get Involved Today
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionTeaser;