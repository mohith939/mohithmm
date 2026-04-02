import { Button } from "@/components/ui/button";
import { ShoppingCart, Star, Wheat, Leaf, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import productChutney from "@/assets/product-peanut-chutney.png";
import productMilk from "@/assets/product-millet-milk.png";

const products = [
  {
    id: "peanut-chutney-mix",
    name: "Instant Peanut Chutney Mix",
    image: productChutney,
    price: "₹120",
    originalPrice: "₹160",
    rating: 4.8,
    reviews: 124,
    benefits: ["No preservatives", "No palm oil", "Ready in 5 mins", "100% natural"],
    description: "A delicious peanut chutney mix made with peanuts, dry chilli, tamarind, curry leaves, cumin seeds & garlic. Just add water and enjoy!",
    tags: ["Bestseller", "500g Pack"],
    nutrition: { protein: "12g", fiber: "8g", calories: "180 kcal" },
  },
  {
    id: "millet-milk-mix",
    name: "Millet Milk Mix",
    image: productMilk,
    price: "₹149",
    originalPrice: "₹199",
    rating: 4.7,
    reviews: 98,
    benefits: ["Sprouted Jowar & Ragi", "Rich in calcium", "Natural sweetener", "No maida"],
    description: "Nutritious millet milk mix with sprouted jowar, ragi, cocoa powder, nuts & dry dates. Add 2 spoons to milk and enjoy a healthy drink.",
    tags: ["New", "High Protein"],
    nutrition: { protein: "14g", fiber: "6g", calories: "160 kcal" },
  },
];

const Products = () => {
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
            Simple, clean, and delicious millet-based meals crafted for your busy life.
          </p>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {products.map((product) => (
              <div key={product.id} className="bg-card rounded-3xl overflow-hidden border border-border hover:shadow-2xl transition-all duration-500 group">
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {product.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold shadow-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors">
                    <Heart className="h-5 w-5 text-foreground/60" />
                  </button>
                </div>

                <div className="p-8">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-border"}`} />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">{product.rating} ({product.reviews} reviews)</span>
                  </div>

                  <h2 className="font-heading text-2xl font-bold text-foreground mb-2">{product.name}</h2>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">{product.description}</p>

                  {/* Nutrition */}
                  <div className="flex gap-4 mb-5">
                    {Object.entries(product.nutrition).map(([key, val]) => (
                      <div key={key} className="text-center px-4 py-2 bg-background rounded-xl">
                        <p className="text-sm font-bold text-primary">{val}</p>
                        <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{key}</p>
                      </div>
                    ))}
                  </div>

                  {/* Benefits */}
                  <ul className="grid grid-cols-2 gap-2 mb-6">
                    {product.benefits.map((b) => (
                      <li key={b} className="text-sm text-muted-foreground flex items-center gap-2">
                        <Leaf className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-primary">{product.price}</span>
                      <span className="text-lg text-muted-foreground line-through">{product.originalPrice}</span>
                    </div>
                    <Link to="/checkout">
                      <Button className="gap-2 rounded-full px-8" size="lg">
                        <ShoppingCart className="h-4 w-4" />
                        Buy Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promise Banner */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
            {[
              { icon: Wheat, title: "100% Millet", desc: "Pure millet grains, no fillers" },
              { icon: Leaf, title: "Zero Preservatives", desc: "Clean label, clean eating" },
              { icon: ShoppingCart, title: "Free Delivery", desc: "On orders above ₹499" },
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <item.icon className="h-7 w-7" />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
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
