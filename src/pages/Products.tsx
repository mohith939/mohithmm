import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Wheat, ShoppingCart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import productsData from "../products.json";
import catalogsData from "../data/catalogs.json";

const Products = () => {
  const catalogs = catalogsData;
  const totalProducts = productsData.length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Categories Hub */}
      <section className="pt-20 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="bg-card/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl border border-border/50 hover:shadow-3xl transition-all duration-500">
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-lg sm:text-xl md:text-2xl font-bold text-foreground">
                <Wheat className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-primary self-center sm:self-auto" />
                <span className="text-center sm:text-left">Our Millet Collections</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
                {catalogs.map((catalog) => {
                  const safeSlug = catalog.slug.toLowerCase().trim();
                  return (
                    <Link
                      key={catalog.slug}
                      to={`/products/${safeSlug}`}
                      className="group"
                    >
                      <Button
                        variant="outline"
                        className="h-28 sm:h-32 md:h-36 flex flex-col items-center justify-center gap-2 p-3 sm:p-4 rounded-2xl sm:rounded-3xl border-2 shadow-lg hover:shadow-2xl hover:bg-primary/5 hover:border-primary hover:scale-105 hover:-translate-y-1 transition-all duration-300 w-full h-full focus:outline-none text-xs sm:text-sm"
                      >
                        <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl border-2 border-border/30 bg-gradient-to-br from-background to-muted p-1.5 sm:p-2 md:p-3">
                          <img 
                            src={catalog.image}
                            alt={catalog.name}
                            className="w-full h-full object-cover rounded-lg sm:rounded-xl group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <span className="font-bold text-foreground text-center line-clamp-2 leading-tight px-1">
                          {catalog.name}
                        </span>
                      </Button>
                    </Link>
                  );
                })}
              </div>
              <div className="text-center pt-4">
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-semibold">
                  {totalProducts} premium millet products across {catalogs.length} collections
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;
