import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, Heart, Leaf } from "lucide-react";

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: "Healing Yoga Bags",
      description: "Soft, eco-friendly yoga mats and bags for your healing journey",
      price: "$49.99",
      icon: <ShoppingBag className="w-8 h-8 text-primary" />,
      color: "bg-healing-pink-light"
    },
    {
      id: 2,
      name: "Comfort Fleece Blankets", 
      description: "Ultra-soft fleece blankets for warmth and comfort during recovery",
      price: "$34.99",
      icon: <Heart className="w-8 h-8 text-secondary" />,
      color: "bg-healing-blue-light"
    },
    {
      id: 3,
      name: "Natural Wellness Oils",
      description: "Pure Neem, Castor, and healing oils for natural skincare and wellness",
      price: "$24.99",
      icon: <Leaf className="w-8 h-8 text-healing-pink-dark" />,
      color: "bg-calm-gray"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-soft">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 animate-gentle-fade">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
            Featured Wellness Products
          </h2>
          <p className="text-lg text-warm-gray max-w-2xl mx-auto">
            Carefully curated healing products to support your wellness journey and bring comfort to those who need it most.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {products.map((product, index) => (
            <Card 
              key={product.id} 
              className={`${product.color} border-0 shadow-card hover-lift animate-gentle-fade`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-gentle">
                  {product.icon}
                </div>
                <CardTitle className="font-heading text-xl font-semibold text-foreground">
                  {product.name}
                </CardTitle>
                <CardDescription className="text-warm-gray">
                  {product.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
               
                <Button 
                  className="w-full bg-secondary hover:bg-secondary-hover text-secondary-foreground font-semibold rounded-lg shadow-gentle"
                >
                  Shop Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            variant="outline" 
            size="lg"
            className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 text-lg font-semibold rounded-xl shadow-gentle hover-lift"
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;