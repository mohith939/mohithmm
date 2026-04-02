import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import heroImage from "@/assets/hero-food.jpg";
import productChutney from "@/assets/product-peanut-chutney.png";
import productMilk from "@/assets/product-millet-milk.png";

const slides = [
  {
    image: heroImage,
    tag: "🌾 Millet-Powered Nutrition",
    title: "Healthy Meals in",
    highlight: "5 Minutes",
    description: "No junk. No long cooking. Just clean millet-based food designed for your busy life.",
  },
  {
    image: productChutney,
    tag: "⚡ Quick & Nutritious",
    title: "Instant Idly &",
    highlight: "Dosa Mix",
    description: "Rich in fiber, zero preservatives. A wholesome breakfast ready in minutes.",
  },
  {
    image: productMilk,
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
    <section id="home" className="relative pt-20">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, i) => (
            <div key={i} className="relative min-h-[70vh] md:min-h-[80vh] flex items-center flex-[0_0_100%]">
              <div className="absolute inset-0 z-0">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                  width={1280}
                  height={720}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/50" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-primary/20" />
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
                    <Button variant="hero" size="lg" className="text-base px-10 rounded-full shadow-xl">
                      Shop Now
                    </Button>
                    <Button variant="heroOutline" size="lg" className="text-base px-10 rounded-full border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground hover:text-primary">
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
      <button onClick={scrollPrev} className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-background/10 backdrop-blur-md flex items-center justify-center text-primary-foreground hover:bg-background/25 transition-all border border-primary-foreground/10">
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button onClick={scrollNext} className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-background/10 backdrop-blur-md flex items-center justify-center text-primary-foreground hover:bg-background/25 transition-all border border-primary-foreground/10">
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-2.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === selectedIndex ? "bg-accent w-10" : "bg-primary-foreground/30 w-2.5 hover:bg-primary-foreground/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
