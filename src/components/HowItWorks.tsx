import { Droplets, Flame, UtensilsCrossed } from "lucide-react";

const steps = [
  { icon: Droplets, step: "01", title: "Add Water", description: "Just add the right amount of water to the mix." },
  { icon: Flame, step: "02", title: "Cook 3–5 mins", description: "A quick stir on the stove or microwave." },
  { icon: UtensilsCrossed, step: "03", title: "Ready to Eat!", description: "Enjoy your hot, nutritious millet meal." },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-medium text-secondary mb-4 block">Simple Steps</span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground">
            How It <span className="text-accent">Works</span>
          </h2>
        </div>
        <div className="flex flex-col md:flex-row items-start justify-center gap-6 max-w-4xl mx-auto">
          {steps.map((s, i) => (
            <div key={s.title} className="flex flex-col items-center text-center flex-1 relative">
              <div className="relative mb-6">
                <div className="w-24 h-24 rounded-3xl bg-primary flex items-center justify-center shadow-lg">
                  <s.icon className="h-10 w-10 text-primary-foreground" />
                </div>
                <span className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-accent text-accent-foreground font-heading font-bold text-sm flex items-center justify-center shadow-md">
                  {s.step}
                </span>
              </div>
              <h3 className="font-heading font-bold text-foreground mb-2 text-lg">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-[200px]">{s.description}</p>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 -right-3 w-6 h-[2px] bg-border" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
