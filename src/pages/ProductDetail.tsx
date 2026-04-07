import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  ShoppingCart, ArrowLeft, Heart, Truck, ShieldCheck, Star, Minus, Plus, 
  Clock, Dumbbell, Leaf, Award, Nutrition 
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import productsData from "../products.json";

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
  const [selectedImage, setSelectedImage] = useState('front');
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (productId) {
      const foundProduct = productsData.find((p: Product) => p.id === productId) as Product;
      setProduct(foundProduct || null);
    }
  }, [productId]);

  const handleAddToCart = async () => {
    if (!product) return;
    
    await addItemWithQuantity({
      id: product.id,
      name: product.name,
      image: `/${product.frontImage}`,
      price: product.price,
      weight: product.weight
    }, quantity);
    
    toast({
      title: "Added to Cart!",
      description: `${quantity}x ${product.name} (${product.weight})`,
    });
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-28 pb-20 container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-32 h-32 bg-muted rounded-3xl flex items-center justify-center mx-auto mb-8">
              <ShoppingCart className="h-16 w-16 text-muted-foreground" />
            </div>
            <h1 className="font-heading text-4xl font-bold text-foreground mb-4">Product Not Found</h1>
            <p className="text-muted-foreground text-lg mb-12">The millet you are looking for doesn't exist.</p>
            <Link 
              to="/products" 
              className="inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl px-10 py-4 font-semibold text-lg shadow-xl hover:shadow-2xl transition-all"
            >
              <ArrowLeft className="h-5 w-5" />
              Browse All Millets
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Breadcrumb & Hero */}
      <section className="pt-28 pb-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <Link 
            to="/products" 
            className="inline-flex items-center gap-2 text-primary/80 hover:text-primary font-medium mb-12 transition-colors group"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            All Millets
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Images & Gallery */}
            <div className="space-y-6">
              {/* Main Image */}
              <div className="bg-gradient-to-br from-card to-muted/30 rounded-3xl overflow-hidden shadow-2xl aspect-square relative group">
                <img 
                  src={`/${selectedImage === 'front' ? product.frontImage : product.backImage}`} 
                  alt={`${product.name} ${selectedImage}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedImage('front')}
                  className={`flex-1 p-2 rounded-2xl border-4 transition-all ${
                    selectedImage === 'front' 
                      ? 'border-primary shadow-2xl shadow-primary/25' 
                      : 'border-border hover:border-accent'
                  }`}
                >
                  <img 
                    src={`/${product.frontImage}`} 
                    alt="Front" 
                    className="w-full h-24 object-cover rounded-xl"
                  />
                </button>
                <button
                  onClick={() => setSelectedImage('back')}
                  className={`flex-1 p-2 rounded-2xl border-4 transition-all ${
                    selectedImage === 'back' 
                      ? 'border-primary shadow-2xl shadow-primary/25' 
                      : 'border-border hover:border-accent'
                  }`}
                >
                  <img 
                    src={`/${product.backImage}`} 
                    alt="Back" 
                    className="w-full h-24 object-cover rounded-xl"
                  />
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="lg:sticky lg:top-28 space-y-8">
              {/* Header */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-6 w-6 fill-primary stroke-primary" />
                    ))}
                  </div>
                  <span className="text-primary font-bold">(258)</span>
                </div>
                <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground leading-tight">
                  {product.name}
                </h1>
                <p className="text-sm text-muted-foreground font-medium mt-2">{product.weight}</p>
              </div>

              {/* Price */}
              <div className="bg-gradient-to-r from-primary/5 to-accent/10 p-6 rounded-2xl border">
                <div className="flex items-baseline gap-4">
                  <span className="text-5xl font-bold text-primary">{product.price}</span>
                  <span className="text-2xl text-muted-foreground line-through">{product.originalPrice}</span>
                  <span className="ml-auto bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-bold">
                    Save 33%
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed text-lg">{product.description}</p>

              {/* Quantity Selector */}
              <div className="bg-card rounded-2xl p-6 border shadow-lg">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-foreground font-semibold text-lg">Quantity:</span>
                  <div className="flex items-center bg-background rounded-xl p-2 border shadow-sm min-w-[140px]">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-12 w-12 rounded-xl p-0 border-accent/50 hover:bg-accent/50 -m-1"
                      disabled={quantity === 1}
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus className="h-5 w-5" />
                    </Button>
                    <span className="px-6 py-3 text-2xl font-bold text-foreground min-w-[48px] text-center">
                      {quantity}
                    </span>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-12 w-12 rounded-xl p-0 border-accent/50 hover:bg-accent/50 -m-1"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="h-5 w-5" />
                    </Button>
                  </div>
                  <span className="text-primary font-bold text-2xl">₹{(parseFloat(product.price.slice(1)) * quantity).toLocaleString()}</span>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3">
                  <Button 
                    className="w-full h-16 text-lg font-bold shadow-2xl hover:shadow-3xl bg-gradient-to-r from-primary to-primary/90 rounded-3xl gap-3" 
                    size="lg"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="h-6 w-6" />
                    Add {quantity === 1 ? 'to' : `${quantity} to`} Cart
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full h-14 text-lg font-semibold rounded-2xl border-2 border-border hover:border-primary hover:bg-primary/5"
                  >
                    <Heart className="h-5 w-5 mr-2" />
                    Add to Wishlist
                  </Button>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-6 pt-4">
                {[
                  { icon: Truck, label: "Free Shipping > ₹499", color: "text-green-600" },
                  { icon: ShieldCheck, label: "FSSAI Certified", color: "text-blue-600" },
                  { icon: Clock, label: "Ready in 20 mins", color: "text-orange-600" },
                ].map(({ icon: Icon, label, color }, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-card rounded-2xl border shadow-sm min-w-[200px]">
                    <Icon className={`h-6 w-6 ${color}`} />
                    <span className="font-medium text-foreground">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Benefits */}
            <div className="bg-card p-8 rounded-3xl border shadow-xl hover:shadow-2xl transition-all">
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-primary/10 p-3 rounded-2xl">
                  <Leaf className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">{product.name} Benefits</h3>
                  <ul className="space-y-1 text-muted-foreground">
                    {product.benefits?.slice(0, 3).map((benefit, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {product.benefits?.length > 3 && (
                <Button variant="link" className="p-0 h-auto text-primary/80">
                  See All Benefits →
                </Button>
              )}
            </div>

            {/* Nutrition */}
            <div className="bg-card p-8 rounded-3xl border shadow-xl hover:shadow-2xl transition-all">
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-accent/10 p-3 rounded-2xl">
                  <Nutrition className="h-8 w-8 text-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-4">Nutrition (100g)</h3>
                  <div className="space-y-3">
                    {Object.entries(product.nutrition || {}).slice(0, 4).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="text-muted-foreground capitalize">{key.toLowerCase()}</span>
                        <span className="font-semibold">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Usage */}
            <div className="bg-card p-8 rounded-3xl border shadow-xl hover:shadow-2xl transition-all">
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-green-500/10 p-3 rounded-2xl">
                  <Dumbbell className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">How to Use</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{product.howToUse}</p>
                  <div className="flex flex-wrap gap-2">
                    {product.tags?.map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-muted text-xs rounded-full font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
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

export default ProductDetail;

