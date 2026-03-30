import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CtaSection = () => {
  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
          Make your meals <span className="text-accent">healthier</span> today.
        </h2>
        <p className="text-primary-foreground/80 text-lg mb-8 max-w-md mx-auto">
          Try our millet-based mixes and taste the difference.
        </p>
        <Button variant="hero" size="lg" className="text-base px-10 gap-2">
          Shop Now <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </section>
  );
};

export default CtaSection;
