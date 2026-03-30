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
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
            What Our <span className="text-accent">Customers</span> Say
          </h2>
          <p className="text-muted-foreground text-lg">Real stories from real people.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-background rounded-2xl p-6 border border-border hover:shadow-lg transition-shadow relative"
            >
              <Quote className="absolute top-4 right-4 h-8 w-8 text-accent/20" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < t.rating ? "fill-accent text-accent" : "text-border"}`}
                  />
                ))}
              </div>
              <p className="text-foreground/80 mb-5 text-sm leading-relaxed italic">
                "{t.text}"
              </p>
              <div>
                <p className="font-heading font-semibold text-foreground text-sm">{t.name}</p>
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
