import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya S.",
    role: "Software Engineer",
    text: "Finally, a healthy breakfast option that fits my crazy schedule! The Idly mix is a lifesaver.",
    rating: 5,
  },
  {
    name: "Rahul M.",
    role: "Marketing Manager",
    text: "The millet noodles taste amazing. I've completely replaced instant noodles with these. No more guilt!",
    rating: 5,
  },
  {
    name: "Ananya K.",
    role: "Freelance Designer",
    text: "I love that it's preservative-free. My kids enjoy it too. It's become a staple in our kitchen.",
    rating: 4,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-80 h-80 rounded-full bg-accent blur-3xl" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-medium text-accent mb-4 block">Testimonials</span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-primary-foreground mb-3">
            What Our Customers Say
          </h2>
          <p className="text-primary-foreground/60 text-lg">Real stories from real people.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-background rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 relative"
            >
              <Quote className="absolute top-6 right-6 h-10 w-10 text-primary/10" />
              <div className="flex gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < t.rating ? "fill-accent text-accent" : "text-border"}`}
                  />
                ))}
              </div>
              <p className="text-foreground/80 mb-6 text-sm leading-relaxed italic font-body">
                "{t.text}"
              </p>
              <div className="border-t border-border pt-4">
                <p className="font-heading font-semibold text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
