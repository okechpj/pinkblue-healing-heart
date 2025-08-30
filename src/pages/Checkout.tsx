import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CreditCard, Smartphone, Building2, ArrowLeft } from "lucide-react";

const Checkout = () => {
  const { items, getTotalAmount, clearCart } = useCart();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedPayment, setSelectedPayment] = useState<string>("");
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-soft flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect
  }

  const totalKsh = Math.round(getTotalAmount());

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedPayment) {
      toast({
        title: "Payment Method Required",
        description: "Please select a payment method to continue.",
        variant: "destructive",
      });
      return;
    }

    if (!customerDetails.name || !customerDetails.email) {
      toast({
        title: "Customer Information Required",
        description: "Please fill in your name and email address.",
        variant: "destructive",
      });
      return;
    }

    if (items.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Your cart is empty. Add items before checkout.",
        variant: "destructive",
      });
      return;
    }

    try {
      const orderData = {
        user_id: user.id,
        total_amount: getTotalAmount(),
        status: 'pending',
        customer_name: customerDetails.name,
        customer_email: customerDetails.email,
        customer_phone: customerDetails.phone,
        customer_address: customerDetails.address,
        payment_method: selectedPayment,
        order_items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        }))
      };

      const { error } = await supabase
        .from('orders')
        .insert(orderData);

      if (error) throw error;

      toast({
        title: "Order Placed Successfully!",
        description: "Thank you for your order. We'll process it shortly.",
      });

      clearCart();
      navigate('/');
    } catch (error) {
      console.error('Error placing order:', error);
      toast({
        title: "Order Failed",
        description: "There was an error placing your order. Please try again.",
        variant: "destructive",
      });
    }
  };

  const paymentMethods = [
    {
      id: 'mpesa',
      name: 'M-Pesa',
      description: 'Pay using your M-Pesa mobile money',
      icon: Smartphone,
      details: 'Send to: 0700 000 000'
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      description: 'Pay with Visa, Mastercard, or other cards',
      icon: CreditCard,
      details: 'Secure online payment'
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      description: 'Direct bank transfer',
      icon: Building2,
      details: 'Account: BluePink Wellness - 1234567890'
    }
  ];

  if (items.length === 0) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="pt-8">
          <section className="py-20 px-4">
            <div className="container mx-auto max-w-2xl text-center">
              <h1 className="font-heading text-3xl font-bold text-foreground mb-6">
                Your Cart is Empty
              </h1>
              <p className="text-warm-gray mb-8">
                Add some products to your cart before proceeding to checkout.
              </p>
              <Button onClick={() => navigate('/shop')}>
                Continue Shopping
              </Button>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-8">
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="flex items-center mb-8">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/shop')}
                className="mr-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Shop
              </Button>
              <h1 className="font-heading text-3xl font-bold text-foreground">
                Checkout
              </h1>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Customer Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleOrderSubmit} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">
                            Full Name *
                          </label>
                          <Input
                            value={customerDetails.name}
                            onChange={(e) => setCustomerDetails({...customerDetails, name: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">
                            Email *
                          </label>
                          <Input
                            type="email"
                            value={customerDetails.email}
                            onChange={(e) => setCustomerDetails({...customerDetails, email: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Phone Number *
                        </label>
                        <Input
                          value={customerDetails.phone}
                          onChange={(e) => setCustomerDetails({...customerDetails, phone: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Delivery Address
                        </label>
                        <Input
                          value={customerDetails.address}
                          onChange={(e) => setCustomerDetails({...customerDetails, address: e.target.value})}
                          placeholder="Enter your delivery address"
                        />
                      </div>
                    </form>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Payment Method</CardTitle>
                    <CardDescription>
                      Choose your preferred payment method
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {paymentMethods.map((method) => {
                      const IconComponent = method.icon;
                      return (
                        <div
                          key={method.id}
                          className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                            selectedPayment === method.id 
                              ? 'border-primary bg-primary/5' 
                              : 'border-gray-200 hover:border-primary/50'
                          }`}
                          onClick={() => setSelectedPayment(method.id)}
                        >
                          <div className="flex items-start space-x-3">
                            <div className="mt-1">
                              <IconComponent className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-foreground">
                                {method.name}
                              </h4>
                              <p className="text-sm text-warm-gray mb-1">
                                {method.description}
                              </p>
                              <p className="text-xs text-primary font-medium">
                                {method.details}
                              </p>
                            </div>
                            <div className={`w-4 h-4 rounded-full border-2 ${
                              selectedPayment === method.id 
                                ? 'border-primary bg-primary' 
                                : 'border-gray-300'
                            }`}>
                              {selectedPayment === method.id && (
                                <div className="w-full h-full rounded-full bg-white scale-50"></div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="sticky top-8">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {items.map((item) => (
                        <div key={item.id} className="flex justify-between items-start">
                          <div className="flex-1">
                            <p className="font-medium text-foreground">
                              {item.name}
                            </p>
                            <p className="text-sm text-warm-gray">
                              Qty: {item.quantity}
                            </p>
                          </div>
                          <p className="font-medium">
                            <span>Ksh {Math.round(item.price * item.quantity).toLocaleString()}</span>
                          </p>
                        </div>
                      ))}
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total</span>
                      <span className="text-primary">
                        Ksh {totalKsh.toLocaleString()}
                      </span>
                    </div>

                    <div className="pt-4">
                      <Button 
                        onClick={handleOrderSubmit}
                        className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-3 text-lg"
                        size="lg"
                      >
                        Place Order - Ksh {totalKsh.toLocaleString()}
                      </Button>
                    </div>

                    <div className="text-xs text-warm-gray text-center mt-4">
                      <p>
                        By placing your order, you agree to our Terms of Service and Privacy Policy.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;