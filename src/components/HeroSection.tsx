import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import heroImage from "@/assets/hero-food.jpg";
import productIdly from "@/assets/product-idly-mix.jpg";
import productNoodles from "@/assets/product-noodles.jpg";

const slides = [
  {
    image: heroImage,
    tag: "🌾 Millet-Powered Nutrition",
    title: "Healthy Meals in",
    highlight: "5 Minutes",
    description: "No junk. No long cooking. Just clean millet-based food designed for your busy life.",
  },
  {
    image: productIdly,
    tag: "⚡ Quick & Nutritious",
    title: "Instant Idly &",
    highlight: "Dosa Mix",
    description: "Rich in fiber, zero preservatives. A wholesome breakfast ready in minutes.",
  },
  {
    image: productNoodles,
    tag: "🍜 Healthy Comfort Food",
    title: "Millet",
    highlight: "Noodles",
    description: "High protein, gluten-free noodles that taste amazing. Your guilt-free snack.",
  },
];

const HeroSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();

    const autoplay = setInterval(() => emblaApi.scrollNext(), 5000);
    return () => {
      clearInterval(autoplay);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <section id="home" className="relative pt-16">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, i) => (
            <div key={i} className="relative min-h-[90vh] flex items-center flex-[0_0_100%]">
              <div className="absolute inset-0 z-0">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                  width={1280}
                  height={720}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/75 to-primary/40" />
              </div>
              <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-2xl">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent font-semibold text-sm mb-6">
                    {slide.tag}
                  </span>
                  <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-extrabold text-primary-foreground leading-tight mb-6">
                    {slide.title}{" "}
                    <span className="text-accent">{slide.highlight}</span>
                  </h1>
                  <p className="text-lg md:text-xl text-primary-foreground/85 mb-8 max-w-lg">
                    {slide.description}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button variant="hero" size="lg" className="text-base px-8">
                      Shop Now
                    </Button>
                    <Button variant="heroOutline" size="lg" className="text-base px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                      Explore Products
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <button onClick={scrollPrev} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-background/40 transition-colors">
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button onClick={scrollNext} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-background/20 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-background/40 transition-colors">
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              i === selectedIndex ? "bg-accent w-8" : "bg-primary-foreground/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
