import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-food.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16">
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Delicious millet-based meals"
          className="w-full h-full object-cover"
          width={1280}
          height={720}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/40" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent font-semibold text-sm mb-6 animate-fade-up">
            🌾 Millet-Powered Nutrition
          </span>
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-extrabold text-primary-foreground leading-tight mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Healthy Meals in{" "}
            <span className="text-accent">5 Minutes</span>
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/85 mb-8 max-w-lg animate-fade-up" style={{ animationDelay: '0.2s' }}>
            No junk. No long cooking. Just clean millet-based food designed for your busy life.
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <Button variant="hero" size="lg" className="text-base px-8">
              Shop Now
            </Button>
            <Button variant="heroOutline" size="lg" className="text-base px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              Explore Products
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
