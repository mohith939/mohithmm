import { Button } from "@/components/ui/button";
import { groupProductsByName } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShoppingCart, Heart, Star, Wheat, List, Search } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import productsData from "../products.json";

const Products = () => {
  const { addItem } = useCart();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const searchQuery = searchParams.get('q')?.toLowerCase() || '';

  const categories = [
    "All",
    "Instant Idly & Dosa Premix",
    "Millet Milk Mix",
    "Pre-soaked & Sprouted Millet Flours",
    "Miracle Millets",
    "Sweet Premixes",
    "Millet Snacks",
    "Millet Noodles"
  ];

  const filteredProducts = productsData.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery);
    const matchesCategory = selectedCategory === "All" || 
      product.name.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      product.tags?.some(tag => tag.toLowerCase().includes(selectedCategory.toLowerCase()));
    return matchesSearch && matchesCategory;
  });

  const groupedProducts = groupProductsByName(filteredProducts);

  const handleAddToCart = (product) => {
    addItem({
      id: product.id,
      name: product.name,
      image: `/${product.frontImage}`,
      price: product.price,
    });
    toast({
      title: "Added to Cart",
      description: `${product.name} (${product.variants?.[0]?.weight || product.weight}) added!`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      


      {/* Filters/Search */}
      <section className="pt-20 py-8">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-card/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-border/50 hover:shadow-3xl transition-all duration-500">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-lg font-semibold text-foreground">
                <Wheat className="h-6 w-6 text-primary" />
                Filter Products
              </div>
              <div className="flex flex-col xl:flex-row gap-4 items-stretch xl:items-end">
                <div className="relative flex-1 group">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/70 group-focus-within:text-primary transition-colors" />
                  <input
                    type="text"
                    placeholder="Search millets, premixes, snacks..."
                    className="w-full pl-14 pr-6 py-5 bg-background/50 hover:bg-background/80 focus:bg-background rounded-3xl border-2 border-border/50 hover:border-primary/50 focus-within:border-primary focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all duration-300 shadow-lg hover:shadow-xl"
                    defaultValue={searchQuery}
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full xl:w-[280px] h-[58px] rounded-3xl bg-gradient-to-r from-primary/5 to-accent/10 hover:from-primary/10 hover:to-accent/20 border-2 border-primary/20 hover:border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-lg hover:shadow-xl transition-all duration-300 group data-[state=open]:border-primary/50">
                    <List className="mr-3 h-5 w-5 text-primary/80 group-hover:text-primary group-focus:text-primary" />
                    <SelectValue placeholder="Select Category" className="font-semibold text-foreground" />
                  </SelectTrigger>
                  <SelectContent className="rounded-3xl border border-primary/20 bg-card/95 backdrop-blur-xl shadow-2xl min-w-[280px] p-2">
                    {categories.map((category) => (
                      <SelectItem 
                        key={category} 
                        value={category} 
                        className="rounded-2xl cursor-pointer hover:bg-primary/10 hover:text-primary font-medium text-sm py-4 mx-1 transition-all data-[highlighted]:bg-primary/20 data-[highlighted]:text-primary data-[state=checked]:bg-primary/10 data-[state=checked]:border-primary/30 data-[state=checked]:font-bold border-l-4 border-transparent hover:border-primary/50 data-[state=checked]:border-primary/50"
                      >
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="text-sm text-muted-foreground font-medium min-h-[58px] flex items-end pb-1">
                  {groupedProducts.length} {groupedProducts.length === 1 ? 'result' : 'results'} found
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-12 mb-12">
        <div className="container mx-auto px-4">
{groupedProducts.length === 0 ? (
            <div className="text-center py-32">
              <Wheat className="h-24 w-24 text-muted-foreground mx-auto mb-8 opacity-50 animate-pulse" />
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">No Products Found</h2>
              <p className="text-muted-foreground text-lg max-w-md mx-auto mb-8">
                Try adjusting your search or category filter to find what you're looking for.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  size="lg" 
                  className="rounded-2xl px-8 h-14 font-semibold shadow-xl hover:shadow-2xl bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:from-primary/90"
                  onClick={() => {
                    setSelectedCategory("All");
                    const url = new URL(window.location.href);
                    url.search = '';
                    window.history.replaceState({}, '', url);
                  }}
                >
                  <Wheat className="h-5 w-5 mr-2" />
                  Show All Products
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="rounded-2xl px-8 h-14 font-semibold border-2 hover:bg-accent hover:text-foreground hover:border-accent/50 shadow-lg"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
              {groupedProducts.map((product) => (
                <Link 
                  key={product.id} 
                  to={`/products/${product.id.split('-')[0] || product.id}`}
                  className="group bg-card rounded-3xl overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-border h-full flex flex-col hover:border-primary/30 ring-2 ring-accent/30"
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
                  <div className="p-6 md:p-8 flex flex-col flex-grow">

                    <h3 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-6 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                      {product.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-6 line-clamp-2 flex-grow leading-relaxed">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between mb-6">
                      <div>
                      <span className="text-xl md:text-2xl lg:text-3xl font-bold text-primary block leading-tight">{product.price}</span>
                      <span className="text-muted-foreground text-xs md:text-sm line-through block">{product.originalPrice || product.variants?.[0]?.originalPrice}</span>
                      </div>
                      <span className="text-xs bg-accent/30 text-accent px-3 py-1.5 rounded-full font-semibold shadow-sm">
                        {product.variants?.[0]?.weight || product.weight || 'N/A'}
                      </span>
                      {product.variants && product.variants.length > 1 && (
                        <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full font-bold">
                          {product.variants.length} sizes
                        </span>
                      )}
                    </div>
                    <Button 
                      className="gap-3 rounded-2xl h-14 font-semibold shadow-xl group-hover:shadow-2xl transition-all bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 text-primary-foreground hover:scale-[1.02] w-full"
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

