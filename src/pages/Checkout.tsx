import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Truck, CheckCircle2, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    email: ""
  });

  const totalPrice = cart.reduce((sum, item) => {
    const priceNum = parseInt(item.price.replace('₹', ''));
    return sum + (priceNum * item.quantity);
  }, 0);
  const shipping = totalPrice >= 499 ? 0 : 49;
  const grandTotal = totalPrice + shipping;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const items = cart.map(item => ({
        id: item.id,
        name: item.name,
        price: parseInt(item.price.replace('₹', '')),
        quantity: item.quantity
      }));

      const address = `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`;

const response = await fetch('/gas', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          customerName: formData.customerName,
          phone: formData.phone,
          address,
          items,
          totalAmount: grandTotal
        })
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Order Placed Successfully!",
          description: `Order ID: ${data.orderId}. You'll receive confirmation soon.`,
          duration: 5000
        });
        clearCart();
        navigate('/?order-thanks=true');
      } else {
        throw new Error(data.error || 'Order failed');
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Order Failed",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-28 pb-20 container mx-auto px-4 text-center">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CheckCircle2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <CardTitle>No Items in Cart</CardTitle>
              <CardDescription>Cart is empty. Add items to place an order.</CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/">
                <Button className="w-full rounded-full">
                  Continue Shopping
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-28 pb-20 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <Link to="/cart" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">Back to Cart</span>
          </Link>

          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-10">Checkout</h1>

          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-5 gap-10">
              {/* Form */}
              <div className="lg:col-span-3 space-y-8">
                {/* Contact */}
                <div className="bg-card rounded-2xl p-6 border border-border">
                  <h2 className="font-heading text-lg font-semibold text-foreground mb-4">Contact Information</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="customerName">Full Name</Label>
                      <Input 
                        id="customerName" 
                        required 
                        placeholder="Your full name" 
                        className="mt-1.5"
                        value={formData.customerName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone" 
                        required 
                        placeholder="+91 98765 43210" 
                        className="mt-1.5"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Label htmlFor="email">Email (optional)</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="you@example.com" 
                        className="mt-1.5"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping */}
                <div className="bg-card rounded-2xl p-6 border border-border">
                  <h2 className="font-heading text-lg font-semibold text-foreground mb-4">Shipping Address</h2>
                  <div className="grid gap-4">
                    <div>
                      <Label htmlFor="address">Street Address</Label>
                      <Input 
                        id="address" 
                        required 
                        placeholder="House no, street, area" 
                        className="mt-1.5"
                        value={formData.address}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input 
                          id="city" 
                          required 
                          placeholder="City" 
                          className="mt-1.5"
                          value={formData.city}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Input 
                          id="state" 
                          required 
                          placeholder="State" 
                          className="mt-1.5"
                          value={formData.state}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="pincode">Pincode</Label>
                        <Input 
                          id="pincode" 
                          required 
                          placeholder="560001" 
                          className="mt-1.5"
                          value={formData.pincode}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-2">
                <div className="bg-card rounded-2xl p-6 border border-border sticky top-28">
                  <h2 className="font-heading text-lg font-semibold text-foreground mb-5">Order Summary</h2>

                  <div className="space-y-4 mb-6">
                    {cart.map((item) => {
                      const priceNum = parseInt(item.price.replace('₹', ''));
                      const itemTotal = priceNum * item.quantity;
                      return (
                        <div key={item.id} className="flex gap-3 p-3 bg-background rounded-xl">
                          <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-foreground text-sm line-clamp-2">{item.name}</p>
                            <p className="text-xs text-muted-foreground">₹{priceNum} x {item.quantity}</p>
                          </div>
                          <p className="font-semibold text-primary text-sm">₹{itemTotal}</p>
                        </div>
                      );
                    })}
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span>₹{totalPrice}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
                    </div>
                    {shipping > 0 && (
                      <p className="text-xs text-accent">Add ₹{499 - totalPrice} more for free delivery</p>
                    )}
                  </div>

                  <Separator className="my-4" />

                  <div className="flex justify-between font-semibold text-foreground text-lg">
                    <span>Total</span>
                    <span>₹{grandTotal}</span>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full mt-6 rounded-full gap-2" 
                    size="lg" 
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Truck className="h-4 w-4" />
                        Place Order (COD)
                      </>
                    )}
                  </Button>

                  <div className="mt-5 space-y-2">
                    {[
                      { icon: Truck, text: "Free delivery above ₹499" },
                    ].map((item) => (
                      <div key={item.text} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <item.icon className="h-3.5 w-3.5 text-primary" />
                        {item.text}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Checkout;
