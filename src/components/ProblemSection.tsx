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
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Tired of choosing between{" "}
            <span className="text-accent">junk food</span> and{" "}
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
              className="text-center p-8 rounded-2xl bg-background border border-border hover:shadow-lg transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-destructive/10 text-destructive mb-5">
                <problem.icon className="h-7 w-7" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                {problem.title}
              </h3>
              <p className="text-muted-foreground text-sm">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
