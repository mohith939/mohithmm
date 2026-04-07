import { Button } from "@/components/ui/button";
import { ShoppingCart, Minus, Plus, Wheat } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const ProductsSection = () => {
  const { addItemWithQuantity } = useCart();
  const { toast } = useToast();
  const [quantities, setQuantities] = useState({});

  const placeholderProducts = [
    { id: 'millet-1', name: 'Millet Pack 1', price: '₹199' },
    { id: 'millet-2', name: 'Millet Pack 2', price: '₹179' },
  ];

  const handleAddToCart = (productId, qty) => {
    const product = placeholderProducts.find(p => p.id === productId);
    if (product) {
      addItemWithQuantity({
        id: product.id,
        name: product.name,
        image: '',
        price: product.price
      }, qty);
      toast({
        title: "Success",
        description: `${product.name} added to cart!`,
      });
    }
  };

  return (
    <section id="products" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-medium text-secondary mb-4 block">What We Offer</span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-3">
            Our Products
          </h2>
          <p className="text-muted-foreground text-lg">
            Simple millet packs - no images or complex data.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 max-w-3xl mx-auto">
          {placeholderProducts.map((product) => {
            const productQty = quantities[product.id] || 1;
            const setProductQty = (newQty) => setQuantities(prev => ({ ...prev, [product.id]: newQty }));
            return (
              <Link
                to={`/products/${product.id}`}
                key={product.id}
                className="rounded-3xl overflow-hidden bg-background border border-border hover:shadow-2xl transition-all group block"
              >
                <div className="aspect-square bg-muted flex items-center justify-center">
                  <Wheat className="h-32 w-32 text-muted-foreground opacity-50" />
                </div>
                <div className="p-7">
                  <h3 className="font-heading text-xl font-bold text-foreground mb-1">
                    {product.name}
                  </h3>
                  <p className="text-2xl font-bold text-primary mb-5">
                    {product.price}
                  </p>
                  <div className="flex gap-3 items-center">
                    <div className="flex items-center bg-card rounded-xl p-2 border shadow-sm min-w-[100px]">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={productQty === 1}
                        className="h-8 w-8 rounded-lg p-0 border-accent/50"
                        onClick={() => setProductQty(Math.max(1, productQty - 1))}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-lg font-bold w-8 text-center mx-1">{productQty}</span>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 rounded-lg p-0 border-accent/50"
                        onClick={() => setProductQty(productQty + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <Button 
                      type="button"
                      className="flex-1 gap-2 rounded-full" 
                      size="lg"
                      onClick={(e) => {
                        e.preventDefault();
                        handleAddToCart(product.id, productQty);
                      }}
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;

