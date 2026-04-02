import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowLeft, Leaf, ShieldCheck, Truck, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import productChutney from "@/assets/product-peanut-chutney.png";
import productMilk from "@/assets/product-millet-milk.png";

const allProducts = [
  {
    id: "peanut-chutney-mix",
    name: "Instant Peanut Chutney Mix",
    image: productChutney,
    price: "₹120",
    originalPrice: "₹160",
    weight: "500g",
    description: "A delicious peanut chutney mix made with peanuts, dry chilli, tamarind, curry leaves, cumin seeds & garlic. Just add 4 spoons of mix into a bowl, add a pinch of salt and water — ready in 5 minutes!",
    benefits: ["No preservatives", "No palm oil", "Ready in 5 mins", "100% natural", "FSSAI certified"],
    ingredients: ["Peanuts", "Dry Chilli", "Tamarind", "Curry Leaves", "Cumin Seeds", "Garlic"],
    howToUse: "Take 4 spoons of mix into a bowl, add a pinch of salt and water. Mix well and serve with idly, dosa, or rice.",
    nutrition: { protein: "12g", fiber: "8g", calories: "180 kcal" },
    tags: ["Bestseller", "500g Pack"],
  },
  {
    id: "millet-milk-mix",
    name: "Millet Milk Mix",
    image: productMilk,
    price: "₹149",
    originalPrice: "₹199",
    weight: "250g",
    description: "Nutritious millet milk mix made with sprouted jowar, sprouted ragi, cocoa powder, dry dates powder, nuts (almonds, cashews, pistachios) and natural cocoa powder. A healthy and delicious drink for the whole family.",
    benefits: ["Sprouted Jowar & Ragi", "Rich in calcium & iron", "Natural sweetener", "No maida", "Improves digestion"],
    ingredients: ["Sprouted Jowar", "Sprouted Ragi", "Cocoa Powder", "Dry Dates Powder", "Nuts (Almonds, Cashews, Pistachios)", "Natural Cocoa Powder"],
    howToUse: "Add 2 spoons of millet mix in a glass of milk. Use jaggery for better taste. Stir well and enjoy hot or cold.",
    nutrition: { protein: "14g", fiber: "6g", calories: "160 kcal" },
    tags: ["New", "High Protein"],
  },
];

const ProductDetail = () => {
  const { productId } = useParams();
  const product = allProducts.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-28 pb-20 text-center container mx-auto">
          <h1 className="font-heading text-3xl font-bold text-foreground mb-4">Product Not Found</h1>
          <Link to="/products" className="text-primary hover:underline">← Back to Products</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-28 pb-20 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <Link to="/products" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">Back to Products</span>
          </Link>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image */}
            <div className="bg-card rounded-3xl overflow-hidden border border-border">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div>
                <div className="flex gap-2 mb-3">
                  {product.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-semibold">
                      {tag}
                    </span>
                  ))}
                </div>
                <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">{product.name}</h1>
                <p className="text-muted-foreground text-sm">Net Weight: {product.weight}</p>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-primary">{product.price}</span>
                <span className="text-xl text-muted-foreground line-through">{product.originalPrice}</span>
                <span className="px-2 py-0.5 rounded bg-accent/20 text-accent text-xs font-semibold">
                  {Math.round((1 - parseInt(product.price.replace('₹', '')) / parseInt(product.originalPrice.replace('₹', ''))) * 100)}% OFF
                </span>
              </div>

              <p className="text-muted-foreground leading-relaxed">{product.description}</p>

              {/* Nutrition */}
              <div className="flex gap-4">
                {Object.entries(product.nutrition).map(([key, val]) => (
                  <div key={key} className="text-center px-5 py-3 bg-card rounded-2xl border border-border">
                    <p className="text-lg font-bold text-primary">{val}</p>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{key}</p>
                  </div>
                ))}
              </div>

              {/* Benefits */}
              <div>
                <h3 className="font-heading font-semibold text-foreground mb-3">Benefits</h3>
                <ul className="grid grid-cols-2 gap-2">
                  {product.benefits.map((b) => (
                    <li key={b} className="text-sm text-muted-foreground flex items-center gap-2">
                      <Leaf className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Ingredients */}
              <div>
                <h3 className="font-heading font-semibold text-foreground mb-3">Ingredients</h3>
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map((ing) => (
                    <span key={ing} className="px-3 py-1.5 rounded-full bg-card border border-border text-sm text-muted-foreground">
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* How to Use */}
              <div className="bg-card rounded-2xl p-5 border border-border">
                <h3 className="font-heading font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  How to Use
                </h3>
                <p className="text-sm text-muted-foreground">{product.howToUse}</p>
              </div>

              {/* Add to Cart */}
              <Button className="w-full gap-2 rounded-full text-base" size="lg">
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </Button>

              {/* Trust badges */}
              <div className="flex gap-6 pt-2">
                {[
                  { icon: ShieldCheck, text: "FSSAI Certified" },
                  { icon: Truck, text: "Free delivery above ₹499" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <item.icon className="h-4 w-4 text-primary" />
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductDetail;
