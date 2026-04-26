import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-food.jpg";

const slide = {
  image: heroImage,
  tag: "🌾 Millet-Powered Nutrition",
  title: "Healthy Meals in",
  highlight: "5 Minutes",
  description: "No junk. No long cooking. Just clean millet-based food designed for your busy life.",
};

const HeroSection = () => {
  return (
    <section id="home" className="relative pt-20">
      <div className="relative min-h-[70vh] md:min-h-[80vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
            width={1280}
            height={720}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <span className="inline-block px-5 py-2 rounded-full bg-accent/15 text-accent font-semibold text-sm mb-8 backdrop-blur-sm border border-accent/20">
              {slide.tag}
            </span>
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-extrabold text-primary-foreground leading-[1.1] mb-6 tracking-tight">
              {slide.title}{" "}
              <span className="text-accent drop-shadow-lg">{slide.highlight}</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-lg font-body leading-relaxed">
              {slide.description}
            </p>
            <div className="flex flex-wrap gap-4">

<Button 
              variant="heroOutline" 
              size="lg" 
              className="text-base px-10 rounded-full border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Products
            </Button>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
