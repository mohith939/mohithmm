import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ShieldCheck, Truck, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import productChutney from "@/assets/product-peanut-chutney.png";

const Checkout = () => {
  const [quantity, setQuantity] = useState(1);
  const price = 120;
  const total = price * quantity;
  const shipping = total >= 499 ? 0 : 49;
  const grandTotal = total + shipping;

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-28 pb-20 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <Link to="/products" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">Back to Products</span>
          </Link>

          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-10">Checkout</h1>

          <div className="grid lg:grid-cols-5 gap-10">
            {/* Form */}
            <div className="lg:col-span-3 space-y-8">
              {/* Contact */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h2 className="font-heading text-lg font-semibold text-foreground mb-4">Contact Information</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Your full name" className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="+91 98765 43210" className="mt-1.5" />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="you@example.com" className="mt-1.5" />
                  </div>
                </div>
              </div>

              {/* Shipping */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h2 className="font-heading text-lg font-semibold text-foreground mb-4">Shipping Address</h2>
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="address">Street Address</Label>
                    <Input id="address" placeholder="House no, street, area" className="mt-1.5" />
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input id="city" placeholder="City" className="mt-1.5" />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input id="state" placeholder="State" className="mt-1.5" />
                    </div>
                    <div>
                      <Label htmlFor="pincode">Pincode</Label>
                      <Input id="pincode" placeholder="560001" className="mt-1.5" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h2 className="font-heading text-lg font-semibold text-foreground mb-4">Payment Method</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    { label: "Cash on Delivery", desc: "Pay when delivered" },
                    { label: "UPI Payment", desc: "GPay, PhonePe, Paytm" },
                  ].map((method) => (
                    <button
                      key={method.label}
                      className="text-left p-4 rounded-xl border-2 border-border hover:border-primary transition-colors"
                    >
                      <p className="font-medium text-foreground">{method.label}</p>
                      <p className="text-xs text-muted-foreground">{method.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-2xl p-6 border border-border sticky top-28">
                <h2 className="font-heading text-lg font-semibold text-foreground mb-5">Order Summary</h2>

                <div className="flex gap-4 mb-5">
                  <img src={productChutney} alt="Peanut Chutney Mix" className="w-20 h-20 rounded-xl object-cover" />
                  <div className="flex-1">
                    <p className="font-medium text-foreground text-sm">Instant Peanut Chutney Mix</p>
                    <p className="text-xs text-muted-foreground">500g Pack</p>
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-7 h-7 rounded-lg bg-background border border-border flex items-center justify-center text-sm font-medium"
                      >
                        −
                      </button>
                      <span className="text-sm font-medium text-foreground">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-7 h-7 rounded-lg bg-background border border-border flex items-center justify-center text-sm font-medium"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <p className="font-semibold text-primary">₹{total}</p>
                </div>

                <Separator className="my-4" />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>₹{total}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-accent">Add ₹{499 - total} more for free delivery</p>
                  )}
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between font-semibold text-foreground text-lg">
                  <span>Total</span>
                  <span>₹{grandTotal}</span>
                </div>

                <Button className="w-full mt-6 rounded-full gap-2" size="lg">
                  <CreditCard className="h-4 w-4" />
                  Place Order
                </Button>

                <div className="mt-5 space-y-2">
                  {[
                    { icon: ShieldCheck, text: "100% Secure Payment" },
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
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Checkout;
