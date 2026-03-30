const BrandStory = () => {
  return (
    <section id="about" className="py-20 bg-card">
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
          Our Story
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed mb-4">
          We created <span className="font-semibold text-primary">Millet Mithai</span> to solve a problem we faced every day — the struggle to eat healthy when life gets busy.
        </p>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Our mission is simple: make nutritious, millet-based meals so easy that anyone can enjoy them without sacrificing time or taste. Because healthy eating shouldn't be hard.
        </p>
      </div>
    </section>
  );
};

export default BrandStory;
