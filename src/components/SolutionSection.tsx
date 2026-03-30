import { Sparkles } from "lucide-react";

const SolutionSection = () => {
  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-4 text-center">
        <Sparkles className="h-10 w-10 text-accent mx-auto mb-6" />
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
          We made healthy eating <span className="text-accent">effortless</span>.
        </h2>
        <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto">
          Quick millet mixes designed for busy lives. Just add water, cook for a few minutes, and enjoy a nutritious meal.
        </p>
      </div>
    </section>
  );
};

export default SolutionSection;
