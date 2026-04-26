import { useParams, Link } from "react-router-dom";
import { groupProductsByName, type GroupedProduct, type ProductVariant } from "@/lib/utils";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Carousel,
  CarouselContent,
  CarouselItem 
} from "@/components/ui/carousel";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ShoppingCart, ArrowLeft, Heart, Truck, ShieldCheck, Star, Minus, Plus, 
  Clock, Dumbbell, Leaf, Award 
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import productsData from "../products.json";

interface Variant {
  sku: string;
  price: string;
  weight: string;
  originalPrice?: string;
}

export interface Product {
  id: string;
  name: string;
  frontImage: string;
  backImage: string;
  price?: string;
  originalPrice?: string;
  weight?: string;
  description: string;
  benefits: string[];
  ingredients: string[];
  howToUse: string;
  nutrition: Record<string, string>;
  tags: string[];
  variants?: Variant[];
}

const ProductDetail = () => {
  const { productId } = useParams();
  const { addItemWithQuantity } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);

const [product, setProduct] = useState<(Product | GroupedProduct) | null>(null);
  const [selectedVariant, setSelectedVariant] = useState(0);

  useEffect(() => {
    if (productId) {
      let foundProduct = productsData.find((p: any) => p.id === productId);
      
      // If no exact match or no variants, try to group by name or id prefix
      if (!foundProduct || !foundProduct.variants || foundProduct.variants.length === 0) {
        // Find all potential matches by name or id prefix
        const baseName = productsData.find(p => p.id === productId)?.name;
        const prefixMatches = productsData.filter((p: any) => 
          p.id.startsWith(productId!) || p.name === baseName
        );
        if (prefixMatches.length > 1) {
          const grouped = groupProductsByName(prefixMatches)[0];
          foundProduct = grouped;
        }
      }
      
      setProduct(foundProduct || null);
      if (foundProduct?.variants) {
        setSelectedVariant(0);
      }
    }
  }, [productId]);

  const currentVariant = product?.variants ? product.variants[selectedVariant] : null;
  const displayPrice = currentVariant?.price || product?.price || '₹0';
  const displayWeight = currentVariant?.weight || product?.weight || 'N/A';

  const handleAddToCart = async () => {
    if (!product) return;
    
      const itemData = {
        id: `${productId}-${currentVariant?.sku || 'default'}`,
        name: `${product.name} (${displayWeight})`,
        image: `/${product.frontImage.replace(/ /g, '%20')}`,
        price: displayPrice,
      };
    
    await addItemWithQuantity(itemData, quantity);
    
    toast({
      title: "Added to Cart!",
      description: `${quantity}x ${product.name} (${displayWeight})`,
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
      <section className="pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <Link 
            to="/products" 
            className="inline-flex items-center gap-2 text-primary/80 hover:text-primary font-medium mb-12 transition-colors group"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            All Millets
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              {/* Images & Gallery - Swipe Carousel */}
              <div className="space-y-4">
                <div className="w-full h-[1402px] max-w-[1121px] mx-auto rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-card to-muted/30">
                  <Carousel opts={{ align: 'start', loop: true }} className="w-full h-full">
                    <CarouselContent className="-ml-4 md:-ml-6 h-full">
                      <CarouselItem className="pl-4 md:pl-6 basis-full">
                        <img 
                          src={`/${product.frontImage.replace(/ /g, '%20')}`} 
                          alt={product.name}
                          className="w-full h-full object-contain rounded-3xl brightness-100 hover:scale-105 transition-transform duration-500"
                        />
                      </CarouselItem>
                      {product.backImage && (
                        <CarouselItem className="pl-4 md:pl-6 basis-full">
                          <img 
                          src={`/${product.backImage.replace(/ /g, '%20')}`} 
                          alt={`${product.name} back`}
                          className="w-full h-full object-contain rounded-3xl brightness-100 hover:scale-105 transition-transform duration-500"
                        />
                        </CarouselItem>
                      )}
                    </CarouselContent>
                    <div className="flex w-full justify-center py-2 gap-2 mt-2">
                      <div className="w-2 h-2 rounded-full bg-primary/50 hover:bg-primary cursor-pointer data-[active]:bg-primary data-[active]:w-4 data-[active]:h-4 transition-all duration-200" data-active="true" />
                      {product.backImage && (
                        <div className="w-2 h-2 rounded-full bg-primary/50 hover:bg-primary cursor-pointer data-[active]:bg-primary data-[active]:w-4 data-[active]:h-4 transition-all duration-200" data-active="false" />
                      )}
                    </div>
                  </Carousel>
                </div>
              </div>

            {/* Product Info */}
            <div className="lg:sticky lg:top-28 space-y-8">
              {/* Header */}
              <div>
                <h1 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight">
                  {product.name}
                </h1>
                <p className="text-sm md:text-base text-muted-foreground font-medium mt-2">{displayWeight}</p>
              </div>

              {/* Price */}
              <div className="bg-gradient-to-r from-primary/5 to-accent/10 p-4 rounded-xl border">
                <div className="flex flex-col sm:flex-row items-start sm:items-baseline gap-2 sm:gap-4">
<span className="text-xl md:text-2xl lg:text-3xl font-bold text-primary">{displayPrice}</span>
                  <span className="text-lg md:text-xl text-muted-foreground line-through">{currentVariant?.originalPrice || product.originalPrice}</span>
                  <span className="bg-primary/20 text-primary px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold ml-auto sm:ml-0">
                    Save 20%
                  </span>
                </div>
              </div>

              {/* SKU Selector */}
              {product?.variants && product.variants.length > 1 && (
                <div className="bg-muted/50 rounded-2xl p-6">
                  <span className="text-sm font-medium text-muted-foreground block mb-3">Select Size:</span>
                  <Select value={product.variants[selectedVariant]?.sku || ''} onValueChange={(value) => {
                    const index = product.variants.findIndex(v => v.sku === value);
                    setSelectedVariant(index);
                  }}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {product.variants.map((variant, index) => (
                        <SelectItem key={variant.sku} value={variant.sku}>
                          <div className="flex items-center justify-between w-full">
                            <span>{variant.weight}</span>
                            <span className="font-bold">{variant.price}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed text-base">{product.description}</p>

              {/* Quantity Selector */}
              <div className="bg-card rounded-xl p-4 border shadow-md">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-foreground font-semibold text-lg">Quantity:</span>
                  <div className="flex items-center bg-background rounded-xl p-2 border shadow-sm min-w-[140px]">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-10 w-10 rounded-lg p-0 border-accent/50 hover:bg-accent/50 -m-0.5 flex-shrink-0"
                      disabled={quantity === 1}
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="px-4 py-2 text-xl font-bold text-foreground min-w-[40px] text-center">
                      {quantity}
                    </span>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-10 w-10 rounded-lg p-0 border-accent/50 hover:bg-accent/50 -m-0.5 flex-shrink-0"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
<span className="text-primary font-bold text-xl">₹{(parseFloat(displayPrice.slice(1)) * quantity).toLocaleString()}</span>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-2">
                  <Button 
                    className="w-full h-14 text-base font-bold shadow-xl hover:shadow-2xl bg-gradient-to-r from-primary to-primary/90 rounded-2xl gap-2" 
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Add {quantity === 1 ? 'to' : `${quantity} to`} Cart
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
                  <Award className="h-8 w-8 text-accent" />
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

