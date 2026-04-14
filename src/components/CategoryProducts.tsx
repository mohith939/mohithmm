import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import { groupProductsByName } from "@/lib/utils";
import productsData from "../products.json";
import catalogsData from "../data/catalogs.json";
import { ArrowLeft } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

interface Catalog {
  slug: string;
  name: string;
  image: string;
  folder: string;
  products: string[];
}

const CategoryProducts = () => {
  const { category: slug } = useParams<{ category?: string }>();
  const { addItem } = useCart();
  const { toast } = useToast();

  // Debug logging
  console.log('CategoryProducts - slug:', slug);
  console.log('CategoryProducts - catalogsData:', catalogsData);
  console.log('Available slugs:', catalogsData.map(c => c.slug));

  const catalog = catalogsData.find(c => c.slug === slug || c.slug.toLowerCase() === slug?.toLowerCase()) as Catalog;
  if (!catalog) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-12 bg-card rounded-3xl shadow-2xl border">
          <div className="w-24 h-24 bg-destructive/10 rounded-2xl mx-auto mb-8 flex items-center justify-center text-destructive">
            ❌
          </div>
          <h1 className="text-3xl font-bold mb-4 text-destructive">Category Not Found</h1>
          <p className="text-muted-foreground mb-8 text-lg">We couldn't find "{slug}" in our collections.</p>
          <Link to="/products" className="inline-flex items-center gap-2">
            <Button size="lg" className="rounded-2xl">
              Browse All Categories
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const categoryProducts = productsData.filter(p => catalog.products.includes(p.id));
  const groupedProducts = groupProductsByName(categoryProducts);

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      image: `/${product.frontImage.replace(/ /g, '%20')}`,
      price: product.price,
      weightKg: 0.5, // Default for 500g products
    });
    toast({
      title: "Added to Cart",
      description: `${product.name} added!`,
    });
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-[#274d35] text-white py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <Link to="/" className="inline-flex items-center gap-2 mb-8 text-white/80 hover:text-white transition-all">
            <ArrowLeft className="h-5 w-5" />
            Back to Home
          </Link>
          <div className="text-center">
            <img src={catalog.image} alt={catalog.name} className="w-32 h-32 mx-auto rounded-2xl shadow-2xl mb-6 object-cover" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{catalog.name}</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">Premium products from our {catalog.folder}</p>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 max-w-7xl py-16">
        {groupedProducts.length === 0 ? (
          <div className="text-center py-32">
            <div className="w-24 h-24 bg-muted rounded-2xl mx-auto mb-8 flex items-center justify-center">
              📦
            </div>
            <h2 className="text-3xl font-bold mb-4">No Products Yet</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
              Products for {catalog.name} coming soon. Check back later!
            </p>
            <Link to="/products">
              <Button size="lg" className="rounded-2xl px-8">
                Browse All Categories
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {groupedProducts.map((product) => (
              <Link 
                key={product.id} 
                to={`/product/${product.id}`}
                className="group bg-card rounded-3xl overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-border hover:border-primary/30 h-full flex flex-col"
              >
                <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-muted to-background group-hover:from-muted/50">
                  <img 
                    src={`/${product.frontImage.replace(/ /g, '%20')}`} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute top-4 right-4 bg-primary/95 backdrop-blur-sm text-primary-foreground px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                    {product.tags?.[0] || 'New'}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-bold text-lg mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                    {product.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6 line-clamp-2 flex-grow leading-relaxed">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-2xl font-bold text-primary">{product.price}</span>
                    <span className="text-xs bg-accent px-2 py-1 rounded-full font-semibold">
                      {product.variants?.[0]?.weight || product.weight}
                    </span>
                  </div>
                  <Button 
                    className="gap-2 rounded-2xl font-semibold w-full"
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddToCart(product);
                    }}
                  >
                    Add to Cart
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;

