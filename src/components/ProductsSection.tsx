import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import productIdly from "@/assets/product-idly-mix.jpg";
import productNoodles from "@/assets/product-noodles.jpg";

const products = [
  {
    name: "Instant Idly/Dosa Mix",
    image: productIdly,
    price: "₹120",
    benefits: ["Rich in fiber", "No preservatives", "Ready in 5 mins"],
  },
  {
    name: "Millet Noodles",
    image: productNoodles,
    price: "₹99",
    benefits: ["High protein", "Gluten-free option", "Quick preparation"],
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
            <div
              key={product.name}
              className="rounded-3xl overflow-hidden bg-background border border-border hover:shadow-2xl transition-all duration-500 group"
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
                <Button className="w-full gap-2 rounded-full" size="lg">
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
