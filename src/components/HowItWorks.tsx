import { Droplets, Flame, UtensilsCrossed } from "lucide-react";

const steps = [
  { icon: Droplets, step: "1", title: "Add Water", description: "Just add the right amount of water to the mix." },
  { icon: Flame, step: "2", title: "Cook for 3–5 mins", description: "A quick stir on the stove or microwave." },
  { icon: UtensilsCrossed, step: "3", title: "Ready to Eat!", description: "Enjoy your hot, nutritious millet meal." },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground text-center mb-14">
          How It <span className="text-accent">Works</span>
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-4xl mx-auto">
          {steps.map((s, i) => (
            <div key={s.title} className="flex flex-col items-center text-center flex-1">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mb-4">
                  <s.icon className="h-9 w-9 text-primary-foreground" />
                </div>
                <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent text-accent-foreground font-heading font-bold text-sm flex items-center justify-center">
                  {s.step}
                </span>
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-1">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.description}</p>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute">
                  {/* connector line handled by flex gap */}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
