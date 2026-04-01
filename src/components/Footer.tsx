import { Phone, Mail } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer id="contact" className="bg-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img src={logo} alt="Millet Mithai" className="h-12 w-12 rounded-full object-cover border border-background/20" />
              <span className="font-heading text-lg font-bold text-background">Millet Mithai</span>
            </div>
            <p className="text-background/50 text-sm leading-relaxed">
              Healthy, quick, and convenient millet-based meals for busy professionals.
            </p>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-background mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <div className="space-y-2.5">
              {["Home", "Products", "About", "How It Works"].map((link) => (
                <a key={link} href={`#${link.toLowerCase().replace(/ /g, '-')}`} className="block text-sm text-background/50 hover:text-accent transition-colors">
                  {link}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-background mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <div className="space-y-3">
              <a href="tel:+919876543210" className="flex items-center gap-2.5 text-sm text-background/50 hover:text-accent transition-colors">
                <Phone className="h-4 w-4" /> +91 98765 43210
              </a>
              <a href="mailto:hello@milletmithai.com" className="flex items-center gap-2.5 text-sm text-background/50 hover:text-accent transition-colors">
                <Mail className="h-4 w-4" /> hello@milletmithai.com
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-background/10 mt-10 pt-8 text-center text-sm text-background/30">
          © 2026 Millet Mithai. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
