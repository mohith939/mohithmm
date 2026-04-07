import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Star, Wheat } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import productsData from "../products.json";

const Products = () => {
  const { addItem } = useCart();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q')?.toLowerCase() || '';

  const filteredProducts = productsData.filter(product =>
    product.name.toLowerCase().includes(searchQuery)
  );

  const handleAddToCart = (product) => {
    addItem({
      id: product.id,
      name: product.name,
      image: `/${product.frontImage}`,
      price: product.price,
      // weight: product.weight
    });
    toast({
      title: "Added to Cart",
      description: `${product.name} (${product.weight}) added!`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-28 pb-20 bg-gradient-to-br from-primary to-primary/80 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-accent blur-3xl animate-pulse" />
          <div className="absolute bottom-20 left-20 w-64 h-64 rounded-full bg-accent/50 blur-2xl" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="inline-flex items-center gap-2 text-accent text-sm uppercase tracking-wider font-medium mb-6">
            <Wheat className="h-4 w-4" />
            Premium Millet Collection
          </span>
          <h1 className="font-heading text-5xl md:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
            Our Millets
          </h1>
          <p className="text-primary-foreground/90 text-xl max-w-2xl mx-auto leading-relaxed">
            Ancient supergrains packed with nutrition. Gluten-free, sustainable, 
            and perfect for modern healthy living.
          </p>
        </div>
      </section>

      {/* Filters/Search */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-card rounded-3xl p-8 shadow-xl border">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-96">
                <input
                  type="text"
                  placeholder="Search millets (e.g., Ragi, Jowar)..."
                  className="w-full pl-12 pr-4 py-4 bg-background rounded-2xl border border-border focus:ring-2 focus:ring-primary focus:border-transparent"
                  defaultValue={searchQuery}
                />
                <Wheat className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>
              <div className="text-sm text-muted-foreground">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'millet' : 'millets'} found
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-20 mb-20">
        <div className="container mx-auto px-4">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-32">
              <Wheat className="h-24 w-24 text-muted-foreground mx-auto mb-8 opacity-50" />
              <h2 className="text-3xl font-bold text-foreground mb-4">No Millets Found</h2>
              <p className="text-muted-foreground text-lg max-w-md mx-auto">
                Try searching for "Ragi", "Jowar", or browse all products.
              </p>
              <Link to="/products" className="mt-8 inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-full px-8 py-4 font-semibold hover:bg-primary/90 transition-all">
                Browse All Millets
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {filteredProducts.map((product) => (
                <Link 
                  key={product.id} 
                  to={`/products/${product.id}`}
                  className="group bg-card rounded-3xl overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-border h-full flex flex-col"
                >
                  <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-muted to-background">
                    <img 
                      src={`/${product.frontImage}`} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute top-4 right-4 bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                      {product.tags?.[0] || 'New'}
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-primary stroke-primary" />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">(4.9)</span>
                    </div>
                    <h3 className="font-heading text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-6 line-clamp-2 flex-grow">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <span className="text-3xl font-bold text-primary block">{product.price}</span>
                        <span className="text-muted-foreground text-sm line-through">{product.originalPrice}</span>
                      </div>
                      <span className="text-xs bg-accent/20 text-accent px-3 py-1 rounded-full font-medium">
                        {product.weight}
                      </span>
                    </div>
                    <Button 
                      className="gap-2 rounded-2xl h-14 font-semibold shadow-lg group-hover:shadow-xl transition-all w-full"
                      onClick={(e) => {
                        e.preventDefault();
                        handleAddToCart(product);
                      }}
                    >
                      <ShoppingCart className="h-5 w-5" />
                      Add to Cart
                    </Button>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;

