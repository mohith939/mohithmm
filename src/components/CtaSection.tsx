import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CtaSection = () => {
  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-accent blur-3xl" />
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-secondary blur-3xl" />
      </div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-primary-foreground mb-5 leading-tight">
          Make your meals <span className="text-accent">healthier</span> today.
        </h2>
        <p className="text-primary-foreground/70 text-lg mb-10 max-w-md mx-auto">
          Try our millet-based mixes and taste the difference.
        </p>
        <Button variant="hero" size="lg" className="text-base px-12 gap-2 rounded-full shadow-xl">
          Shop Now <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </section>
  );
};

export default CtaSection;
