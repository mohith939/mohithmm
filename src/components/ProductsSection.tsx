import { Button } from "@/components/ui/button";
import { ShoppingCart, Minus, Plus, Heart, Star, BadgeCheck, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import productsData from "../products.json";

const ProductsSection = () => {
  const { addItemWithQuantity } = useCart();
  const [quantities, setQuantities] = useState({});

  const featuredProducts = productsData.slice(0, 3);

  const handleAddToCart = async (product, qty) => {
    await addItemWithQuantity({
      id: product.id,
      name: product.name,
      image: `/${product.frontImage.replace(/ /g, '%20')}`,
      price: product.price,
    }, qty);
  };

  return (
    <section id="products" className="py-20 bg-gradient-to-b from-[#274d35]/5 to-emerald-50/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 bg-[#274d35]/10 text-[#274d35] text-sm px-4 py-2 rounded-full font-bold mb-6 border border-[#274d35]/30">
            <BadgeCheck className="h-4 w-4" />
            Farm Fresh • Gluten-Free
          </span>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#274d35] to-emerald-600 bg-clip-text text-transparent mb-6">
            Our Featured Millets
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed font-light">
            Premium, unprocessed millets straight from the farm. Nutrient-dense superfoods perfect for your healthy lifestyle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {featuredProducts.map((product) => {
            const productQty = quantities[product.id] || 1;
            const updateQty = (newQty) => {
              if (newQty > 99) return;
              setQuantities(prev => ({ ...prev, [product.id]: newQty }));
            };

            return (
              <div key={product.id} className="bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 border border-[#274d35]/10 overflow-hidden group/card">
                <div className="h-64 relative overflow-hidden">
                  <Link to={`/product/${product.id}`}>
                    <img 
                      src={`/${product.frontImage.replace(/ /g, '%20')}`} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-700"
                    />
                  </Link>
                  <div className="absolute top-6 left-6 bg-[#274d35] text-white px-4 py-2.5 rounded-2xl text-sm font-bold shadow-2xl">
                    Featured
                  </div>
                  <button className="absolute top-6 right-6 p-3 bg-white/90 rounded-2xl shadow-2xl hover:shadow-3xl transition-all opacity-0 group-hover/card:opacity-100 hover:scale-110 border border-gray-200">
                    <Heart className="h-5 w-5 text-gray-700 hover:text-red-500" />
                  </button>
                </div>

                <div className="p-8">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 hover:text-[#274d35] transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-gray-600 mb-6 text-base leading-relaxed line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex items-baseline mb-8">
                    <span className="text-4xl font-black bg-gradient-to-r from-[#274d35] to-emerald-600 bg-clip-text text-transparent mr-3">{product.price}</span>
                    <span className="text-sm text-gray-500 uppercase tracking-wider font-medium">per {product.weight}</span>
                  </div>

                  {/* Compact Mobile-Friendly Stepper */}
                  <div className="flex items-stretch mb-8 bg-gray-50 rounded-2xl p-1.5 border-2 border-gray-200 shadow-inner">
                    <Button
                      type="button"
                      variant="ghost"
                      className="h-14 w-14 rounded-2xl hover:bg-[#274d35]/10 hover:text-[#274d35] border-r border-gray-300 flex-shrink-0 transition-all shadow-sm hover:shadow-md m-0"
                      disabled={productQty === 1}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        updateQty(Math.max(1, productQty - 1));
                      }}
                    >
                      <Minus className="h-4 w-4 stroke-[2.5px]" />
                    </Button>
                    
                    <div className="flex-1 flex items-center justify-center px-6 border-l border-r border-gray-300 bg-white rounded-xl shadow-sm mx-0.5 min-h-[52px]">
                      <span className="text-2xl font-black text-gray-900 tracking-wide">
                        {productQty}
                      </span>
                    </div>
                    
                    <Button
                      type="button"
                      variant="ghost"
                      className="h-14 w-14 rounded-2xl hover:bg-[#274d35]/10 hover:text-[#274d35] border-l border-gray-300 flex-shrink-0 transition-all shadow-sm hover:shadow-md m-0"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        updateQty(productQty + 1);
                      }}
                    >
                      <Plus className="h-4 w-4 stroke-[2.5px]" />
                    </Button>
                  </div>

                  <Button 
                    className="w-full h-16 text-lg font-bold bg-gradient-to-r from-[#274d35] to-emerald-600 hover:from-emerald-600 hover:to-[#274d35] text-white rounded-3xl shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300 border border-[#274d35]/50 flex items-center justify-center gap-2.5 tracking-wide"
                    size="lg"
                    onClick={async (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      await handleAddToCart(product, productQty);
                    }}
                  >
                    <ShoppingCart className="h-6 w-6" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            );
          })}
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

