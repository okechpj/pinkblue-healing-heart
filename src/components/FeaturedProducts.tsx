import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, Heart, Leaf } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const FeaturedProducts = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await supabase
          .from('products')
          .select('*')
          .limit(3)
          .order('created_at', { ascending: false });
        
        if (data) {
          setProducts(data.map((product, index) => ({
            ...product,
            icon: index === 0 ? <ShoppingBag className="w-8 h-8 text-primary" /> :
                  index === 1 ? <Heart className="w-8 h-8 text-secondary" /> :
                  <Leaf className="w-8 h-8 text-healing-pink-dark" />,
            color: index === 0 ? "bg-healing-pink-light" :
                   index === 1 ? "bg-healing-blue-light" :
                   "bg-calm-gray"
          })));
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

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
               
                <Link to="/shop">
                  <Button 
                    className="w-full bg-secondary hover:bg-secondary-hover text-secondary-foreground font-semibold rounded-lg shadow-gentle"
                  >
                    Shop Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/shop">
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 text-lg font-semibold rounded-xl shadow-gentle hover-lift"
            >
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;