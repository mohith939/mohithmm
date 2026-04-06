import { Phone, Mail, MapPin, Instagram, Facebook, Twitter, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";

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


        {/* Main Footer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <img src="/logo 5 1-01 (1).png" alt="Millet Mithai" className="h-12 w-12 rounded-full object-cover border border-background/20" />
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
                { label: "Track Order", to: "/track" },
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
<a href="tel:+918309612785" className="flex items-center gap-2.5 text-sm text-background/40 hover:text-accent transition-colors">
                <Phone className="h-4 w-4 flex-shrink-0" />
                +91 83096 12785

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

