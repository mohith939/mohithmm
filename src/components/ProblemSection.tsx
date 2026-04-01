import { Clock, Frown, UtensilsCrossed } from "lucide-react";

const problems = [
  {
    icon: Clock,
    title: "No time after work",
    description: "Long hours leave you drained with zero energy to cook healthy meals.",
  },
  {
    icon: Frown,
    title: "Eating unhealthy food",
    description: "Fast food and packaged snacks have become your daily go-to.",
  },
  {
    icon: UtensilsCrossed,
    title: "No quick healthy options",
    description: "Healthy food always seems to require effort and time you don't have.",
  },
];

const ProblemSection = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-medium text-secondary mb-4 block">The Problem</span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
            Tired of choosing between{" "}
            <span className="text-destructive">junk food</span> and{" "}
            <span className="text-secondary">long cooking</span>?
          </h2>
          <p className="text-muted-foreground text-lg">
            You're not alone. Millions of professionals face this daily.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {problems.map((problem) => (
            <div
              key={problem.title}
              className="text-center p-8 rounded-2xl bg-card border border-border hover:shadow-xl hover:border-secondary/30 transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-destructive/8 text-destructive mb-6">
                <problem.icon className="h-7 w-7" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                {problem.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
