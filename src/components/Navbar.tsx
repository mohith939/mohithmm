import { ShoppingCart, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { cart } = useCart();
  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Products", to: "/products" },
    { label: "About", to: "/about" },
    { label: "How It Works", to: "/how-it-works" },
    { label: "Contact", to: "/contact" },
  ];

  const showTransparent = isHome && !scrolled;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${showTransparent ? "bg-transparent" : "bg-background/95 backdrop-blur-md shadow-sm border-b border-border"}`}>
      <div className="container mx-auto flex items-center justify-between h-18 px-4 py-2">
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo 5 1-01 (1).png" alt="Millet Mithai" className="h-14 w-14 rounded-full object-cover shadow-md border-2 border-accent/30" />
          <div className="flex flex-col">
            <span className={`font-heading text-xl font-bold tracking-tight shadow-lg ${showTransparent ? "text-foreground drop-shadow-lg" : "text-primary"}`}>
              Millet Mithai
            </span>
            <span className={`text-[10px] uppercase tracking-[0.2em] font-body font-medium shadow-md ${showTransparent ? "text-foreground/80 drop-shadow-md" : "text-muted-foreground"}`}>
              Healthy • Quick • Natural
            </span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors ${
                location.pathname === link.to
                  ? showTransparent ? "text-primary shadow-sm" : "text-primary font-semibold"
                  : showTransparent ? "text-foreground/90 hover:text-primary shadow-sm" : "text-foreground/70 hover:text-primary font-medium transition-all"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/cart">
            <Button variant="hero" size="sm" className="gap-2 rounded-full relative">
              <ShoppingCart className="h-4 w-4" />
              Shop Now
              {totalCartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {totalCartItems}
                </span>
              )}
            </Button>
          </Link>
        </div>

        <button
          className={`md:hidden shadow-lg ${showTransparent ? "text-foreground drop-shadow-lg" : "text-foreground"}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-background border-b border-border px-4 pb-4 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className={`block py-2.5 text-sm font-medium border-b border-border/50 last:border-0 ${
                location.pathname === link.to ? "text-primary" : "text-foreground/80 hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/cart" onClick={() => setIsOpen(false)}>
            <Button variant="hero" size="sm" className="mt-3 w-full gap-2 rounded-full relative">
              <ShoppingCart className="h-4 w-4" />
              Shop Now
              {totalCartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {totalCartItems}
                </span>
              )}
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

