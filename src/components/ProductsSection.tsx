import { Button } from "@/components/ui/button";
import { ShoppingCart, Minus, Plus, Heart, Star, BadgeCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import productsData from "../products.json";

const ProductsSection = () => {
  const { addItemWithQuantity } = useCart();
  const { toast } = useToast();
  const [quantities, setQuantities] = useState({});

  // Show first 4 featured products
  const featuredProducts = productsData.slice(0, 4);

  const handleAddToCart = async (product, qty) => {
    await addItemWithQuantity({
      id: product.id,
      name: product.name,
      image: `/${product.frontImage}`,
      price: product.price,
      weight: product.weight
    }, qty);
    toast({
      title: "Added to Cart",
      description: `${product.name} x${qty} added!`,
    });
  };

  return (
    <section id="products" className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <span className="inline-flex items-center gap-2 text-primary text-sm uppercase tracking-[0.25em] font-medium mb-6 block">
            <BadgeCheck className="h-4 w-4" />
            100% Natural Millets
          </span>
          <h2 className="font-heading text-4xl md:text-6xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent mb-6">
            Our Featured Millets
          </h2>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed">
            Premium, unprocessed millets straight from the farm. Gluten-free, 
            nutrient-dense, and perfect for your healthy lifestyle.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {featuredProducts.map((product) => {
            const productQty = quantities[product.id] || 1;
            const updateQty = (newQty) => setQuantities(prev => ({ ...prev, [product.id]: newQty }));

            return (
              <Link
                to={`/products/${product.id}`}
                key={product.id}
                className="group bg-card hover:bg-background rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-border/50 h-full flex flex-col"
              >
                {/* Image */}
                <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-muted to-muted/50">
                  <img 
                    src={`/${product.frontImage}`} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-100 group-hover:brightness-105"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 bg-primary/95 backdrop-blur-sm text-primary-foreground px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                    {product.tags?.[0] || 'Popular'}
                  </div>
                  <div className="absolute top-4 right-4 bg-accent/90 text-accent-foreground px-2 py-1 rounded-full text-xs font-medium">
                    4.9⭐
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-1">
                  <div className="mb-4">
                    <h3 className="font-heading text-xl font-bold text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {product.description}
                    </p>
                  </div>

                  {/* Price & Weight */}
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-2xl font-bold text-primary">{product.price}</span>
                    <span className="text-xs text-muted-foreground font-medium">{product.weight}</span>
                  </div>

                  {/* Quantity & Add to Cart */}
                  <div className="flex gap-3 mt-auto">
                    <div className="flex items-center bg-background/50 backdrop-blur-sm rounded-2xl p-2 border border-border shadow-inner flex-shrink-0 min-w-[110px]">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-9 w-9 rounded-xl p-0 hover:bg-accent/50 border border-border hover:border-accent/50 -ml-1"
                        disabled={productQty === 1}
                        onClick={(e) => {
                          e.preventDefault();
                          updateQty(productQty - 1);
                        }}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="px-3 py-1 text-lg font-bold text-foreground min-w-[36px] text-center">
                        {productQty}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-9 w-9 rounded-xl p-0 hover:bg-accent/50 border border-border hover:border-accent/50 -mr-1"
                        onClick={(e) => {
                          e.preventDefault();
                          updateQty(productQty + 1);
                        }}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button 
                      className="flex-1 h-14 gap-2 rounded-2xl font-semibold shadow-lg hover:shadow-xl bg-gradient-to-r from-primary to-primary/90 text-primary-foreground border-0 transition-all" 
                      size="lg"
                      onClick={async (e) => {
                        e.preventDefault();
                        await handleAddToCart(product, productQty);
                      }}
                    >
                      <ShoppingCart className="h-5 w-5" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-20">
          <Link to="/products">
            <Button size="lg" className="text-lg px-12 rounded-full gap-3 shadow-2xl hover:shadow-3xl hover:-translate-y-1 bg-gradient-to-r from-primary to-accent hover:from-primary hover:to-accent/90">
              View All 9+ Millets
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;

