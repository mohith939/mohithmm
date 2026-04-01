import { Phone, Mail, MapPin, Instagram, Facebook, Twitter, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import logo from "@/assets/logo.png";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thanks for subscribing!");
    setEmail("");
  };

  return (
    <footer className="bg-foreground pt-20 pb-8">
      <div className="container mx-auto px-4">
        {/* Newsletter Bar */}
        <div className="bg-primary rounded-3xl p-8 md:p-12 mb-16 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-60 h-60 rounded-full bg-accent blur-3xl" />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-primary-foreground mb-2">
                Stay in the loop
              </h3>
              <p className="text-primary-foreground/60 text-sm">
                Get recipes, tips, and exclusive offers straight to your inbox.
              </p>
            </div>
            <form onSubmit={handleNewsletter} className="flex gap-3 w-full md:w-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-5 py-3 rounded-full bg-background/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-accent transition-colors"
              />
              <Button type="submit" variant="hero" className="rounded-full px-6 gap-2">
                Subscribe <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        {/* Main Footer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <img src={logo} alt="Millet Mithai" className="h-12 w-12 rounded-full object-cover border border-background/20" />
              <div>
                <span className="font-heading text-lg font-bold text-background block">Millet Mithai</span>
                <span className="text-[10px] uppercase tracking-[0.15em] text-background/40">Healthy • Quick • Natural</span>
              </div>
            </div>
            <p className="text-background/40 text-sm leading-relaxed mb-6">
              Healthy, quick, and convenient millet-based meals for busy professionals.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: "https://instagram.com" },
                { icon: Facebook, href: "https://facebook.com" },
                { icon: Twitter, href: "https://twitter.com" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-background/8 flex items-center justify-center text-background/50 hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-background mb-5 text-sm uppercase tracking-wider">Pages</h4>
            <div className="space-y-3">
              {[
                { label: "Home", to: "/" },
                { label: "Products", to: "/products" },
                { label: "About Us", to: "/about" },
                { label: "How It Works", to: "/how-it-works" },
                { label: "Contact", to: "/contact" },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block text-sm text-background/40 hover:text-accent hover:translate-x-1 transition-all duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-heading font-semibold text-background mb-5 text-sm uppercase tracking-wider">Products</h4>
            <div className="space-y-3">
              {["Idly/Dosa Mix", "Millet Noodles", "Coming Soon..."].map((product) => (
                <span key={product} className="block text-sm text-background/40">
                  {product}
                </span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-background mb-5 text-sm uppercase tracking-wider">Contact</h4>
            <div className="space-y-3.5">
              <a href="tel:+919876543210" className="flex items-center gap-2.5 text-sm text-background/40 hover:text-accent transition-colors">
                <Phone className="h-4 w-4 flex-shrink-0" />
                +91 98765 43210
              </a>
              <a href="mailto:hello@milletmithai.com" className="flex items-center gap-2.5 text-sm text-background/40 hover:text-accent transition-colors">
                <Mail className="h-4 w-4 flex-shrink-0" />
                hello@milletmithai.com
              </a>
              <div className="flex items-start gap-2.5 text-sm text-background/40">
                <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                Hyderabad, India
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-background/30">
            © 2026 Millet Mithai. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Refund Policy"].map((item) => (
              <a key={item} href="#" className="text-xs text-background/30 hover:text-background/60 transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
