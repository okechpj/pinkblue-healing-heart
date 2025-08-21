import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-8">
        <section className="py-20 px-4 bg-gradient-soft">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6 animate-gentle-fade">
              Get In{" "}
              <span className="bg-gradient-healing bg-clip-text text-transparent">
                Touch
              </span>
            </h1>
            <p className="text-xl text-warm-gray animate-gentle-fade">
              We're here to support you on your healing journey. Reach out anytime.
            </p>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <div>
                <h2 className="font-heading text-3xl font-bold text-foreground mb-6">
                  Send us a Message
                </h2>
                <p className="text-warm-gray mb-8">
                  Whether you need support, have questions about our products, or want to 
                  join our movement, we'd love to hear from you.
                </p>

                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        First Name
                      </label>
                      <Input 
                        placeholder="Your first name"
                        className="bg-white border-border focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Last Name
                      </label>
                      <Input 
                        placeholder="Your last name"
                        className="bg-white border-border focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Email Address
                    </label>
                    <Input 
                      type="email"
                      placeholder="your.email@example.com"
                      className="bg-white border-border focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Subject
                    </label>
                    <Input 
                      placeholder="How can we help you?"
                      className="bg-white border-border focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Message
                    </label>
                    <Textarea 
                      placeholder="Tell us more about how we can support you..."
                      className="bg-white border-border focus:border-primary min-h-[120px]"
                    />
                  </div>

                  <Button 
                    type="submit"
                    size="lg"
                    className="w-full bg-primary hover:bg-primary-hover text-primary-foreground py-4 text-lg font-semibold rounded-xl shadow-gentle hover-lift"
                  >
                    Send Message
                  </Button>
                </form>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="font-heading text-3xl font-bold text-foreground mb-6">
                    Connect With Us
                  </h2>
                  <p className="text-warm-gray mb-8">
                    Multiple ways to reach our caring team. We're committed to responding 
                    with compassion and helpful resources.
                  </p>
                </div>

                <div className="space-y-6">
                  <Card className="shadow-card border-0 bg-healing-pink-light hover-lift">
                    <CardHeader className="pb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                          <Mail className="w-6 h-6 text-primary" />
                        </div>
                        <CardTitle className="font-heading text-xl font-semibold text-foreground">
                          Email Us
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-warm-gray mb-2">General inquiries and support</p>
                      <p className="font-semibold text-foreground">hello@pinkblue.com</p>
                    </CardContent>
                  </Card>

                  <Card className="shadow-card border-0 bg-healing-blue-light hover-lift">
                    <CardHeader className="pb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                          <Phone className="w-6 h-6 text-secondary" />
                        </div>
                        <CardTitle className="font-heading text-xl font-semibold text-foreground">
                          Call Us
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-warm-gray mb-2">Direct support line</p>
                      <p className="font-semibold text-foreground">+1 (555) 123-HEAL</p>
                    </CardContent>
                  </Card>

                  <Card className="shadow-card border-0 bg-white hover-lift">
                    <CardHeader className="pb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-healing-blue rounded-full flex items-center justify-center">
                          <MessageCircle className="w-6 h-6 text-white" />
                        </div>
                        <CardTitle className="font-heading text-xl font-semibold text-foreground">
                          WhatsApp Support
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-warm-gray mb-4">
                        Get instant support and connect with our community
                      </p>
                      <Button 
                        className="bg-healing-blue hover:bg-healing-blue-dark text-white font-semibold px-6 py-3 rounded-lg"
                        onClick={() => window.open('https://wa.me/1555123heal', '_blank')}
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Chat Now
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="shadow-card border-0 bg-calm-gray hover-lift">
                    <CardHeader className="pb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                          <MapPin className="w-6 h-6 text-healing-pink-dark" />
                        </div>
                        <CardTitle className="font-heading text-xl font-semibold text-foreground">
                          Our Mission
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-warm-gray">
                        Supporting healing communities worldwide with love, 
                        compassion, and natural wellness resources.
                      </p>
                    </CardContent>
                  </Card>
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

export default Contact;