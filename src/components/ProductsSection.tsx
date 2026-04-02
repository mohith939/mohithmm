import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import productChutney from "@/assets/product-peanut-chutney.png";
import productMilk from "@/assets/product-millet-milk.png";

const products = [
  {
    id: "peanut-chutney-mix",
    name: "Instant Peanut Chutney Mix",
    image: productChutney,
    price: "₹120",
    benefits: ["No preservatives", "No palm oil", "Ready in 5 mins"],
  },
  {
    id: "millet-milk-mix",
    name: "Millet Milk Mix",
    image: productMilk,
    price: "₹149",
    benefits: ["Sprouted Jowar & Ragi", "Rich in calcium", "Natural sweetener"],
  },
];

const ProductsSection = () => {
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
              <div className="aspect-square overflow-hidden bg-muted">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  width={640}
                  height={640}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
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
                <Button className="w-full gap-2 rounded-full" size="lg" onClick={(e) => e.preventDefault()}>
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
