import { ShoppingCart, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Products", href: "#products" },
    { label: "About", href: "#about" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border" : "bg-transparent"}`}>
      <div className="container mx-auto flex items-center justify-between h-18 px-4 py-2">
        <a href="#home" className="flex items-center gap-3">
          <img src={logo} alt="Millet Mithai" className="h-14 w-14 rounded-full object-cover shadow-md border-2 border-accent/30" />
          <div className="flex flex-col">
            <span className={`font-heading text-xl font-bold tracking-tight ${scrolled ? "text-primary" : "text-primary-foreground"}`}>
              Millet Mithai
            </span>
            <span className={`text-[10px] uppercase tracking-[0.2em] font-body font-medium ${scrolled ? "text-muted-foreground" : "text-primary-foreground/60"}`}>
              Healthy • Quick • Natural
            </span>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${scrolled ? "text-foreground/70 hover:text-primary" : "text-primary-foreground/80 hover:text-accent"}`}
            >
              {link.label}
            </a>
          ))}
          <Button variant="hero" size="sm" className="gap-2">
            <ShoppingCart className="h-4 w-4" />
            Shop Now
          </Button>
        </div>

        <button
          className={`md:hidden ${scrolled ? "text-foreground" : "text-primary-foreground"}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-background border-b border-border px-4 pb-4 shadow-lg">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block py-2.5 text-sm font-medium text-foreground/80 hover:text-primary border-b border-border/50 last:border-0"
            >
              {link.label}
            </a>
          ))}
          <Button variant="hero" size="sm" className="mt-3 w-full gap-2">
            <ShoppingCart className="h-4 w-4" />
            Shop Now
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
