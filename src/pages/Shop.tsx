import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Shop = () => {
  const products = [
    {
      id: 1,
      name: "Premium Yoga Mat & Bag Set",
      description: "Eco-friendly, non-slip yoga mat with matching healing-themed carry bag",
      price: "$49.99",
      category: "Yoga & Movement",
      image: "/placeholder-yoga.jpg"
    },
    {
      id: 2,
      name: "Comfort Fleece Blanket",
      description: "Ultra-soft fleece blanket for warmth during treatments and recovery",
      price: "$34.99", 
      category: "Comfort Items",
      image: "/placeholder-blanket.jpg"
    },
    {
      id: 3,
      name: "Pure Neem Oil",
      description: "100% natural neem oil for skincare and healing properties",
      price: "$19.99",
      category: "Natural Oils",
      image: "/placeholder-oil.jpg"
    },
    {
      id: 4,
      name: "Healing Castor Oil",
      description: "Cold-pressed castor oil for therapeutic and skincare use",
      price: "$22.99",
      category: "Natural Oils", 
      image: "/placeholder-castor.jpg"
    },
    {
      id: 5,
      name: "Baobab Powder Supplement",
      description: "Natural immune-boosting baobab powder rich in vitamin C",
      price: "$28.99",
      category: "Supplements",
      image: "/placeholder-baobab.jpg"
    },
    {
      id: 6,
      name: "Moringa Capsules",
      description: "Premium moringa leaf capsules for natural energy and wellness",
      price: "$32.99",
      category: "Supplements",
      image: "/placeholder-moringa.jpg"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-8">
        <section className="py-20 px-4 bg-gradient-soft">
          <div className="container mx-auto max-w-6xl text-center">
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-6 animate-gentle-fade">
              Wellness{" "}
              <span className="bg-gradient-healing bg-clip-text text-blue-950 rounded-2xl p-2">
                Shop
              </span>
            </h1>
            <p className="text-xl text-warm-gray mb-8 animate-gentle-fade">
              Carefully curated natural products to support your healing journey
            </p>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, index) => (
                <Card 
                  key={product.id}
                  className="shadow-card hover-lift animate-gentle-fade border-0 bg-white"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="w-full h-48 bg-calm-gray rounded-lg mb-4 flex items-center justify-center">
                      <span className="text-warm-gray">Product Image</span>
                    </div>
                    <CardTitle className="font-heading text-xl font-semibold text-foreground">
                      {product.name}
                    </CardTitle>
                    <CardDescription className="text-warm-gray">
                      {product.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm bg-healing-pink-light px-3 py-1 rounded-full">
                        {product.category}
                      </span>
                      <span className="font-heading text-2xl font-bold text-primary">
                        {product.price}
                      </span>
                    </div>
                    <Button className="w-full bg-secondary hover:bg-secondary-hover text-secondary-foreground font-semibold rounded-lg shadow-gentle">
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Shop;