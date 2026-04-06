import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowLeft, Leaf, ShieldCheck, Truck, Clock, Minus, Plus } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import productsData from '../products.json';

const allProducts = productsData;

interface Product {
  id: string;
  name: string;
  frontImage: string;
  backImage: string;
  price: string;
  originalPrice: string;
  weight: string;
  description: string;
  benefits: string[];
  ingredients: string[];
  howToUse: string;
  nutrition: Record<string, string>;
  tags: string[];
}

const ProductDetail = () => {
  const { productId } = useParams();
  const { addItemWithQuantity } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [viewBack, setViewBack] = useState(false);
  const product = allProducts.find((p: Product) => p.id === productId) as Product | undefined;


  if (!product) {
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

  const currentPrice = parseInt(product.price.replace(/[^0-9]/g, '')) || 0;
  const originalPrice = parseInt(product.originalPrice.replace(/[^0-9]/g, '')) || 1;
  const discount = originalPrice > currentPrice ? Math.round((1 - currentPrice / originalPrice) * 100) : 0;

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
            {/* Image */}
            <div className="bg-card rounded-3xl overflow-hidden border border-border relative">
              <img
                src={viewBack ? (product.backImage || product.frontImage) : product.frontImage}
                alt={product.name}
                className="w-full h-[500px] object-cover"
              />
              {product.backImage && (
                <div className="absolute top-4 right-4 flex gap-1 bg-background/95 backdrop-blur-sm p-1 rounded-xl border">
                  <button
                    onClick={() => setViewBack(false)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      !viewBack
                        ? 'bg-primary text-primary-foreground shadow-md'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Front
                  </button>
                  <button
                    onClick={() => setViewBack(true)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      viewBack
                        ? 'bg-primary text-primary-foreground shadow-md'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Back
                  </button>
                </div>
              )}
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div>
                <div className="flex gap-2 mb-3">
                  {product.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold">
                      {tag}
                    </span>
                  ))}
                </div>
                <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">{product.name}</h1>
                <p className="text-muted-foreground text-sm">Net Weight: {product.weight}</p>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-primary">{product.price}</span>
                <span className="text-xl text-muted-foreground line-through">{product.originalPrice}</span>
                <span className="px-2 py-0.5 rounded bg-accent/20 text-accent text-xs font-semibold">
                  {discount}% OFF
                </span>
              </div>

              <p className="text-muted-foreground leading-relaxed">{product.description}</p>

              {/* Nutrition */}
              <div className="flex gap-4">
                {Object.entries(product.nutrition).map(([key, val]) => (
                  <div key={key} className="text-center px-5 py-3 bg-card rounded-2xl border border-border">
                    <p className="text-lg font-bold text-primary">{val}</p>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{key}</p>
                  </div>
                ))}
              </div>

              {/* Benefits */}
              <div>
                <h3 className="font-heading font-semibold text-foreground mb-3">Benefits</h3>
                <ul className="grid grid-cols-2 gap-2">
                  {product.benefits.map((b) => (
                    <li key={b} className="text-sm text-muted-foreground flex items-center gap-2">
                      <Leaf className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Ingredients */}
              <div>
                <h3 className="font-heading font-semibold text-foreground mb-3">Ingredients</h3>
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map((ing) => (
                    <span key={ing} className="px-3 py-1.5 rounded-full bg-card border border-border text-sm text-muted-foreground">
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* How to Use */}
              <div className="bg-card rounded-2xl p-5 border border-border">
                <h3 className="font-heading font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  How to Use
                </h3>
                <p className="text-sm text-muted-foreground">{product.howToUse}</p>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-2 bg-card rounded-xl p-2 mb-6 border border-border shadow-sm min-w-[100px]">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={quantity === 1}
                  className="h-8 w-8 rounded-lg hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed p-0 border-accent/50 shadow-none"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="text-lg font-bold text-foreground w-8 text-center mx-1">{quantity}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 rounded-lg hover:bg-accent p-0 border-accent/50 shadow-none"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>

              {/* Add to Cart */}
              <Button 
                type="button"
                className="w-full gap-2 rounded-full text-base" 
                size="lg"
                disabled={isLoading}
                onClick={async () => {
                  if (product && !isLoading) {
                    setIsLoading(true);
                    addItemWithQuantity({
                      id: product.id,
                      name: product.name,
                      image: product.frontImage,
                      price: product.price
                    }, quantity);

                    toast({
                      title: "Success",
                      description: `${quantity > 1 ? quantity + ' x ' : ''}${product.name} added to cart!`,
                      duration: 3000
                    });
                    setTimeout(() => setIsLoading(false), 1000);
                  }
                }}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" pathLength="1" className="opacity-25" />
                      <path d="M12 12" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" pathLength="1" className="opacity-75" />
                    </svg>
                    Adding...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5" />
                    Add {quantity > 1 ? `${quantity} to ` : ''}Cart
                  </>
                )}
              </Button>

              {/* Trust badges */}
              <div className="flex gap-6 pt-2">
                {[
                  { icon: ShieldCheck as any, text: "FSSAI Certified" },
                  { icon: Truck as any, text: "Free delivery above ₹499" },
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
