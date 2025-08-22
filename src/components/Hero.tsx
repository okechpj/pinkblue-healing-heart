import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Peaceful healing environment with wellness elements" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-80"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-gentle-fade">
        <h1 className="font-heading text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
          Welcome to{" "}
          <span className="bg-gradient-healing bg-clip-text text-blue-950 rounded-2xl p-2">
            PinkBlue
          </span>
        </h1>
        
        <p className="font-heading text-2xl md:text-3xl text-warm-gray mb-4 italic">
          Where Healing Meets Heart
        </p>
        
        <p className="text-lg md:text-xl text-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          Join our compassionate community dedicated to wellness, healing, and supporting those on their cancer journey. 
          Discover natural products that nurture both body and soul.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/shop">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary-hover text-primary-foreground px-8 py-6 text-lg font-semibold rounded-xl shadow-gentle hover-lift"
            >
              Shop Now
            </Button>
          </Link>
          <Link to="/movement">
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground px-8 py-6 text-lg font-semibold rounded-xl shadow-gentle hover-lift"
            >
              Join the Movement
            </Button>
          </Link>
        </div>
        
        <div className="mt-16 animate-healing-pulse">
          <p className="text-warm-gray font-medium mb-2">Our Mission</p>
          <p className="font-heading text-xl italic text-foreground">
            "Healing with Love, Serving with Heart"
          </p>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-healing-pink rounded-full opacity-30 blur-xl animate-healing-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-healing-blue rounded-full opacity-20 blur-xl animate-healing-pulse" style={{animationDelay: '1s'}}></div>
    </section>
  );
};

export default Hero;