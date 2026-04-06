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
        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-8 max-w-5xl mx-auto pb-12">
          {steps.map((s, i) => (
            <div key={s.title} className="flex flex-col items-center text-center w-full relative pt-8 pb-6">
              <div className="relative mb-8 w-full max-w-xs mx-auto">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-primary flex items-center justify-center shadow-lg mx-auto">
                  <s.icon className="h-8 w-8 md:h-10 md:w-10 text-primary-foreground" />
                </div>
                <span className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-accent text-accent-foreground font-heading font-bold text-xs md:text-sm flex items-center justify-center shadow-md">
                  {s.step}
                </span>
              </div>
              <h3 className="font-heading font-bold text-xl md:text-2xl mb-3 text-foreground">{s.title}</h3>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed px-4 max-w-md">{s.description}</p>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-[calc(50%+2rem)] right-0 w-px h-12 bg-muted" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
