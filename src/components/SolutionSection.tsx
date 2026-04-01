import { Sparkles } from "lucide-react";

const SolutionSection = () => {
  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-accent blur-3xl" />
        <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-secondary blur-3xl" />
      </div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/15 mb-8">
          <Sparkles className="h-8 w-8 text-accent" />
        </div>
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-primary-foreground mb-6 leading-tight">
          We made healthy eating <span className="text-accent">effortless</span>.
        </h2>
        <p className="text-primary-foreground/75 text-lg max-w-xl mx-auto leading-relaxed">
          Quick millet mixes designed for busy lives. Just add water, cook for a few minutes, and enjoy a nutritious meal.
        </p>
      </div>
    </section>
  );
};

export default SolutionSection;
