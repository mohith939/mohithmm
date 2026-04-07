import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowLeft, Wheat, Truck, Minus, Plus, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

const ProductDetail = () => {
  const { productId } = useParams();
  const { addItemWithQuantity } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  // Placeholder product - no external data
  const product = {
    id: productId || 'default',
    name: 'Premium Millet Pack',
    price: '₹199',
    weight: '500g'
  };

  if (!productId) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-28 pb-20 text-center container mx-auto">
          <h1 className="font-heading text-3xl font-bold text-foreground mb-4">Product Not Found</h1>
          <Link to="/products" className="text-primary hover:underline">← Back to Products</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-28 pb-20 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <Link to="/products" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">Back to Products</span>
          </Link>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Placeholder Image */}
            <div className="bg-card rounded-3xl border border-border h-[500px] flex items-center justify-center">
              <Wheat className="h-48 w-48 text-muted-foreground opacity-50" />
            </div>

            {/* Simple Details */}
            <div className="space-y-6">
              <div>
                <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">{product.name}</h1>
                <p className="text-muted-foreground text-sm">Net Weight: {product.weight}</p>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-primary">{product.price}</span>
              </div>

              <p className="text-muted-foreground leading-relaxed">Premium quality millet pack for healthy meals.</p>

              {/* Quantity Selector */}
              <div className="flex items-center gap-2 bg-card rounded-xl p-2 mb-6 border border-border shadow-sm min-w-[100px]">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={quantity === 1}
                  className="h-8 w-8 rounded-lg hover:bg-accent p-0 border-accent/50"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="text-lg font-bold text-foreground w-8 text-center mx-1">{quantity}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 rounded-lg hover:bg-accent p-0 border-accent/50"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>

              {/* Add to Cart */}
              <Button 
                type="button"
                className="w-full gap-2 rounded-full" 
                size="lg"
                disabled={isLoading}
                onClick={() => {
                  setIsLoading(true);
                  addItemWithQuantity({
                    id: product.id,
                    name: product.name,
                    image: '',
                    price: product.price
                  }, quantity);
                  toast({
                    title: "Success",
                    description: `${quantity > 1 ? quantity + ' x ' : ''}${product.name} added to cart!`,
                  });
                  setTimeout(() => setIsLoading(false), 1000);
                }}
              >
                {isLoading ? 'Adding...' : (
                  <>
                    <ShoppingCart className="h-5 w-5" />
                    Add {quantity > 1 ? `${quantity} to ` : ''}Cart
                  </>
                )}
              </Button>

              {/* Trust badges */}
              <div className="flex gap-6 pt-2">
                {[
                  { icon: ShieldCheck, text: "FSSAI Certified" },
                  { icon: Truck, text: "Free delivery above ₹499" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <item.icon className="h-4 w-4 text-primary" />
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductDetail;

