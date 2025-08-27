import { Link } from "react-router-dom";
import { Heart, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { name: "About Us", path: "/about" },
    { name: "Shop", path: "/shop" },
    { name: "BluePink Movement", path: "/movement" },
    { name: "Blog", path: "/blog" },
  ];

  const support = [
    { name: "Contact", path: "/contact" },
    { name: "Testimonials", path: "/testimonials" },
    { name: "FAQ", path: "/faq" },
    { name: "Privacy Policy", path: "/privacy" },
  ];

  return (
    <footer className="bg-gradient-soft border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-healing rounded-full flex items-center justify-center">
                <span className="text-white font-heading font-bold text-lg">PB</span>
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-foreground">BluePink</h3>
                <p className="text-xs text-warm-gray -mt-1">Healing with Love</p>
              </div>
            </Link>
            <p className="text-warm-gray mb-6 leading-relaxed">
              A compassionate wellness movement supporting cancer patients, survivors, and 
              their families through natural products and community healing.
            </p>
            <p className="font-heading text-lg italic text-primary">
              "Healing with Love, Serving with Heart"
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-foreground mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-warm-gray hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-foreground mb-4">
              Support
            </h4>
            <ul className="space-y-2">
              {support.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-warm-gray hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-foreground mb-4">
              Get In Touch
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-warm-gray">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm">hello@pinkblue.com</span>
              </div>
              <div className="flex items-center space-x-3 text-warm-gray">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm">+1 (555) 123-HEAL</span>
              </div>
              <div className="flex items-center space-x-3 text-warm-gray">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm">Supporting communities worldwide</span>
              </div>
            </div>
            
            <div className="mt-6">
              <p className="text-sm text-warm-gray mb-2">WhatsApp Support:</p>
              <a 
                href="https://wa.me/1555123heal" 
                className="inline-flex items-center space-x-2 bg-healing-blue hover:bg-healing-blue-dark text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm font-medium">Chat with Us</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-warm-gray text-sm mb-4 md:mb-0">
            © 2024 BluePink Movement. All rights reserved. Made with{" "}
            <Heart className="w-4 h-4 inline text-primary" /> for healing.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy" className="text-warm-gray hover:text-primary text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-warm-gray hover:text-primary text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;