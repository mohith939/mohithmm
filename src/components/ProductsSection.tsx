import catalogsData from "@/data/catalogs.json";
import { Button } from "@/components/ui/button";
import { BadgeCheck, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ProductsSection = () => {
  return (
    <section id="products" className="py-20 bg-gradient-to-b from-[#274d35]/5 to-emerald-50/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 bg-[#274d35]/10 text-[#274d35] text-sm px-4 py-2 rounded-full font-bold mb-6 border border-[#274d35]/30">
            <BadgeCheck className="h-4 w-4" />
            Farm Fresh • Gluten-Free
          </span>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#274d35] to-emerald-600 bg-clip-text text-transparent mb-6">
            Our Millet Categories
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed font-light">
            Discover our premium millet categories. Nutrient-dense superfoods perfect for every lifestyle.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
          {catalogsData.map((category) => (
            <Link 
              key={category.slug}
              to={`/products/${category.slug}`}
              className="group/card bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 border border-[#274d35]/10 overflow-hidden block"
            >
              <div className="relative h-80 overflow-hidden">
                <img 
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-3xl font-bold text-white drop-shadow-2xl mb-4">
                    {category.name}
                  </h3>
                  <Button className="bg-white text-[#274d35] hover:bg-emerald-50 font-bold rounded-2xl px-8 py-3 text-lg shadow-2xl hover:shadow-3xl transition-all border border-white/50 group-hover/card:scale-105">
                    Shop Now
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-24">
          <Link to="/products" className="inline-flex items-center gap-2 group">
            <Button className="text-lg px-16 py-8 bg-[#274d35] hover:bg-emerald-700 text-white font-bold rounded-3xl shadow-3xl hover:shadow-4xl hover:-translate-y-2 transition-all duration-500 h-20 border border-[#274d35]/50 group-hover:scale-[1.02]">
              <span className="uppercase tracking-wide">Shop All Millets</span>
              <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-all" />
            </Button>
          </Link>
          <p className="mt-8 text-gray-600 text-lg font-medium">Free shipping over ₹499 • 100% Natural & Organic</p>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;

