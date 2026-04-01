import { Target, Eye, Heart, Users, Award, Sprout } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import logo from "@/assets/logo.png";

const values = [
  { icon: Heart, title: "Health First", description: "Every product is crafted to nourish your body with the goodness of millets." },
  { icon: Users, title: "Community Driven", description: "Built by people who understand the daily struggle of eating healthy." },
  { icon: Award, title: "Quality Promise", description: "No shortcuts, no preservatives — just pure, honest millet food." },
  { icon: Sprout, title: "Sustainability", description: "Millets use 70% less water to grow, making them eco-friendly." },
];

const team = [
  { name: "Founders", role: "The Duo Behind Millet Mithai", description: "Two passionate food lovers on a mission to make healthy eating accessible to every busy professional in India." },
];

const AboutUs = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-accent blur-3xl" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="text-xs uppercase tracking-[0.25em] font-medium text-accent mb-4 block">Our Story</span>
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-primary-foreground mb-4">
            About Millet Mithai
          </h1>
          <p className="text-primary-foreground/70 text-lg max-w-lg mx-auto">
            Making nutritious meals effortless, one millet at a time.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img src={logo} alt="Millet Mithai Founders" className="w-full max-w-sm mx-auto rounded-3xl shadow-2xl" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-[0.25em] font-medium text-secondary mb-4 block">How It Started</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
                Born from a <span className="text-primary">real problem</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                As working professionals ourselves, we faced the same struggle every day — choosing between unhealthy fast food and spending hours cooking. We knew there had to be a better way.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                That's when we discovered the power of millets — ancient grains packed with nutrition, easy to cook, and incredibly versatile. We spent months perfecting recipes that taste amazing and take less than 5 minutes to prepare.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, <span className="font-semibold text-primary">Millet Mithai</span> is on a mission to make healthy eating the easiest choice for every busy Indian.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            <div className="bg-background rounded-3xl p-10 border border-border">
              <div className="w-14 h-14 rounded-2xl bg-primary/8 text-primary flex items-center justify-center mb-6">
                <Target className="h-7 w-7" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-foreground mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To make nutritious, millet-based meals so convenient that healthy eating becomes the default choice — not the hard one. We're eliminating the trade-off between health and time.
              </p>
            </div>
            <div className="bg-background rounded-3xl p-10 border border-border">
              <div className="w-14 h-14 rounded-2xl bg-accent/15 text-accent flex items-center justify-center mb-6">
                <Eye className="h-7 w-7" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-foreground mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To become India's most trusted millet food brand — present in every kitchen, loved by every family, and known for making healthy meals that people actually enjoy eating.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.25em] font-medium text-secondary mb-4 block">What Drives Us</span>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground">Our Values</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {values.map((v) => (
              <div key={v.title} className="text-center p-8 rounded-3xl bg-card border border-border hover:shadow-xl transition-all duration-300 group">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/8 text-primary mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <v.icon className="h-7 w-7" />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2 text-lg">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            {[
              { number: "2+", label: "Products" },
              { number: "500+", label: "Happy Customers" },
              { number: "100%", label: "Natural Ingredients" },
              { number: "5 min", label: "Avg Prep Time" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-heading text-4xl md:text-5xl font-bold text-accent mb-2">{stat.number}</p>
                <p className="text-primary-foreground/60 text-sm uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;
