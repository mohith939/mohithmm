import { Play } from "lucide-react";

const reels = [
  {
    id: "reel1",
    thumbnail: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=400&h=700&fit=crop",
    title: "Making Millet Idly",
  },
  {
    id: "reel2",
    thumbnail: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=700&fit=crop",
    title: "Quick Millet Noodles",
  },
  {
    id: "reel3",
    thumbnail: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=700&fit=crop",
    title: "Customer Review",
  },
  {
    id: "reel4",
    thumbnail: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=700&fit=crop",
    title: "Behind the Scenes",
  },
];

const InstagramReels = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
            Watch Our <span className="text-accent">Reels</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Follow us on Instagram for recipes, tips & more!
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {reels.map((reel) => (
            <a
              key={reel.id}
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-[9/16] rounded-2xl overflow-hidden bg-muted border border-border hover:shadow-xl transition-all"
            >
              <img
                src={reel.thumbnail}
                alt={reel.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-14 h-14 rounded-full bg-accent/90 flex items-center justify-center">
                  <Play className="h-6 w-6 text-accent-foreground fill-accent-foreground ml-0.5" />
                </div>
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-primary-foreground text-xs font-semibold">{reel.title}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramReels;
