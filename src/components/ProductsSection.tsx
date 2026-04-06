import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Minus, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import productsData from '../../products.json';

const products = productsData;

  const ProductsSection = () => {
   const { addItem, addItemWithQuantity } = useCart();
   const { toast } = useToast();
   const [quantities, setQuantities] = useState<Record<string, number>>({});
  return (
    <section id="products" className="py-24 bg-card">

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-medium text-secondary mb-4 block">What We Offer</span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-3">
            Our Products
          </h2>
          <p className="text-muted-foreground text-lg">
            Simple, clean, and delicious millet-based meals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 max-w-3xl mx-auto">
          {products.map((product) => (
            <Link
              to={`/products/${product.id}`}
              key={product.id}
              className="rounded-3xl overflow-hidden bg-background border border-border hover:shadow-2xl transition-all duration-500 group block"
            >
              <div className="aspect-square overflow-hidden bg-muted relative">
                <img
                  src={product.frontImage}
                  alt={`${product.name} front`}
                  loading="lazy"
                  width={640}
                  height={640}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-100 group-hover:opacity-0 absolute inset-0 z-10"
                />
                <img
                  src={product.backImage || product.frontImage}
                  alt={`${product.name} back`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 opacity-0 group-hover:opacity-100 absolute inset-0 z-0"
                />

              </div>
              <div className="p-7">
                <h3 className="font-heading text-xl font-bold text-foreground mb-1">
                  {product.name}
                </h3>
                <p className="text-2xl font-bold text-primary mb-5">
                  {product.price}
                </p>
                <ul className="space-y-2 mb-6">
                  {product.benefits.map((b) => (
                    <li key={b} className="text-sm text-muted-foreground flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      {b}
                    </li>
                  ))}
                </ul>
              {(() => {
                const productQty = quantities[product.id] || 1;
                const setProductQty = (newQty: number) => setQuantities(prev => ({ ...prev, [product.id]: newQty }));
                return (
                      <div className="flex gap-3 items-center">
                      <div className="flex items-center bg-card rounded-xl p-2 border shadow-sm min-w-[100px]">

                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          disabled={productQty === 1}
                          className="h-8 w-8 rounded-lg hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent p-0 border-accent/50 shadow-none"
                          onClick={() => setProductQty(Math.max(1, productQty - 1))}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-lg font-bold text-foreground w-8 text-center mx-1">{productQty}</span>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 rounded-lg hover:bg-accent p-0 border-accent/50 shadow-none"
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
                          addItemWithQuantity({
                            id: product.id,
                            name: product.name,
                            image: product.frontImage,
                            price: product.price
                          }, productQty);

                          toast({
                            title: "Success",
                            description: `${productQty > 1 ? productQty + ' x ' : ''}${product.name} added to cart!`,
                            duration: 3000
                          });
                        }}
                      >
                        <ShoppingCart className="h-4 w-4" />
                        Add to Cart
                      </Button>
                    </div>
                );
              })()}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
