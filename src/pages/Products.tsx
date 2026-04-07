import { Button } from "@/components/ui/button";
import { ShoppingCart, Wheat, Leaf, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

const Products = () => {
  const { addItem } = useCart();
  const { toast } = useToast();

  const placeholderProducts = [
    { id: 'millet-pack-1', name: 'Browntop Millet Pack', price: '₹199' },
    { id: 'millet-pack-2', name: 'Brown Millet Pack', price: '₹179' },
    { id: 'millet-pack-3', name: 'Barnyard Millet Pack', price: '₹189' },
  ];

  const handleAddToCart = (product) => {
    addItem({
      id: product.id,
      name: product.name,
      image: '', // no image
      price: product.price
    });
    toast({
      title: "Success",
      description: `${product.name} added to cart!`,
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-60 h-60 rounded-full bg-accent blur-3xl" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="text-xs uppercase tracking-[0.25em] font-medium text-accent mb-4 block">Our Collection</span>
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-primary-foreground mb-4">
            Our Products
          </h1>
          <p className="text-primary-foreground/70 text-lg max-w-lg mx-auto">
            Simple millet packs available now
          </p>
        </div>
      </section>

      {/* Product Grid - NO IMAGES */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {placeholderProducts.map((product) => (
              <div key={product.id} className="bg-card rounded-3xl p-8 border border-border hover:shadow-2xl transition-all group cursor-pointer h-full flex flex-col">
                <div className="h-48 bg-muted rounded-2xl mb-6 flex items-center justify-center">
                  <Wheat className="h-24 w-24 text-muted-foreground opacity-50" />
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-2">{product.name}</h3>
                <p className="text-muted-foreground mb-6 flex-grow">Premium millet pack</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">{product.price}</span>
                  <Button 
                    type="button"
                    className="gap-2 rounded-full px-6" 
                    size="sm" 
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;
