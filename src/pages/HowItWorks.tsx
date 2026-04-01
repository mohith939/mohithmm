import { Droplets, Flame, UtensilsCrossed, ShoppingCart, Package, Truck, CheckCircle, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const steps = [
  {
    icon: ShoppingCart,
    step: "01",
    title: "Order Online",
    description: "Browse our products and place your order through our website. Quick, easy, and secure.",
    color: "bg-accent/15 text-accent",
  },
  {
    icon: Package,
    step: "02",
    title: "We Pack Fresh",
    description: "Your order is packed fresh with care, ensuring maximum nutrition and flavor.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Truck,
    step: "03",
    title: "Fast Delivery",
    description: "We deliver right to your doorstep. Free shipping on orders above ₹499.",
    color: "bg-secondary/15 text-secondary",
  },
  {
    icon: CheckCircle,
    step: "04",
    title: "Enjoy in 5 Minutes",
    description: "Just add water, cook for a few minutes, and enjoy a hot, nutritious millet meal.",
    color: "bg-accent/15 text-accent",
  },
];

const cookingSteps = [
  { icon: Droplets, title: "Add Water", description: "Measure the right amount of water as mentioned on the pack." },
  { icon: Flame, title: "Cook 3–5 mins", description: "Quick stir on the stove or a zap in the microwave." },
  { icon: UtensilsCrossed, title: "Serve & Enjoy", description: "Your delicious, nutritious millet meal is ready!" },
];

const faqs = [
  { q: "How long does it take to prepare?", a: "All our products are ready in under 5 minutes. Just add water and cook!" },
  { q: "Are your products gluten-free?", a: "Yes, our millet-based products are naturally gluten-free and safe for those with gluten sensitivities." },
  { q: "Do you use any preservatives?", a: "Absolutely not. We use 100% natural ingredients with zero artificial preservatives, colors, or flavors." },
  { q: "What is the shelf life?", a: "Our products have a shelf life of 6 months when stored in a cool, dry place." },
  { q: "Do you deliver across India?", a: "Yes! We deliver pan-India. Orders above ₹499 get free delivery." },
];

const HowItWorksPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-60 h-60 rounded-full bg-accent blur-3xl" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="text-xs uppercase tracking-[0.25em] font-medium text-accent mb-4 block">Simple Process</span>
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-primary-foreground mb-4">
            How It Works
          </h1>
          <p className="text-primary-foreground/70 text-lg max-w-lg mx-auto">
            From order to plate in the simplest way possible.
          </p>
        </div>
      </section>

      {/* Journey Steps */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.25em] font-medium text-secondary mb-4 block">Your Journey</span>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground">
              Order to <span className="text-accent">Plate</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            {steps.map((s, i) => (
              <div key={s.title} className="flex gap-6 md:gap-10 mb-8 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className={`w-16 h-16 rounded-2xl ${s.color} flex items-center justify-center flex-shrink-0`}>
                    <s.icon className="h-7 w-7" />
                  </div>
                  {i < steps.length - 1 && <div className="w-px h-full bg-border mt-2 min-h-[40px]" />}
                </div>
                <div className="pb-8">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Step {s.step}</span>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-2 mt-1">{s.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cooking Guide */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-accent blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.25em] font-medium text-accent mb-4 block">Cooking Guide</span>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-primary-foreground">
              Ready in <span className="text-accent">3 Easy Steps</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {cookingSteps.map((s, i) => (
              <div key={s.title} className="bg-background rounded-3xl p-8 text-center relative">
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-accent text-accent-foreground font-heading font-bold text-sm flex items-center justify-center shadow-lg">
                  {i + 1}
                </span>
                <div className="w-20 h-20 rounded-2xl bg-primary/8 text-primary flex items-center justify-center mx-auto mb-5 mt-2">
                  <s.icon className="h-9 w-9" />
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.25em] font-medium text-secondary mb-4 block">Got Questions?</span>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground">
              Frequently Asked <span className="text-accent">Questions</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq) => (
              <details key={faq.q} className="group bg-card rounded-2xl border border-border overflow-hidden">
                <summary className="flex items-center gap-4 p-6 cursor-pointer list-none font-heading font-semibold text-foreground hover:text-primary transition-colors">
                  <HelpCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="flex-1">{faq.q}</span>
                  <span className="text-muted-foreground group-open:rotate-45 transition-transform text-xl">+</span>
                </summary>
                <div className="px-6 pb-6 pl-16">
                  <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to try? It's <span className="text-accent">that easy</span>.
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
            Order now and have your first healthy meal in under 5 minutes.
          </p>
          <Link to="/products">
            <Button variant="hero" size="lg" className="rounded-full px-10 gap-2 shadow-xl">
              <ShoppingCart className="h-5 w-5" />
              Shop Now
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HowItWorksPage;
