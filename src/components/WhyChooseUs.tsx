import { Wheat, Timer, ShieldCheck, ChefHat } from "lucide-react";

const reasons = [
  { icon: Wheat, title: "Millet-Based Nutrition", description: "Packed with essential nutrients from ancient grains." },
  { icon: Timer, title: "Ready in Minutes", description: "Quick preparation for your busy schedule." },
  { icon: ShieldCheck, title: "No Preservatives", description: "100% clean ingredients you can trust." },
  { icon: ChefHat, title: "Easy Preparation", description: "No cooking skills required." },
];

const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-medium text-accent mb-4 block">Why Us</span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground">
            Why Choose <span className="text-primary">Millet Mithai</span>?
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {reasons.map((r) => (
            <div key={r.title} className="text-center p-8 rounded-3xl bg-card border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300 group">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/8 text-primary mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <r.icon className="h-7 w-7" />
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-2 text-lg">{r.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{r.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
