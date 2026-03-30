import { Leaf, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="h-6 w-6 text-secondary" />
              <span className="font-heading text-lg font-bold text-background">Millet Mithai</span>
            </div>
            <p className="text-background/60 text-sm">
              Healthy, quick, and convenient millet-based meals for busy professionals.
            </p>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-background mb-3">Quick Links</h4>
            <div className="space-y-2">
              {["Home", "Products", "About", "How It Works"].map((link) => (
                <a key={link} href={`#${link.toLowerCase().replace(/ /g, '-')}`} className="block text-sm text-background/60 hover:text-accent transition-colors">
                  {link}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-heading font-semibold text-background mb-3">Contact</h4>
            <div className="space-y-2">
              <a href="tel:+919876543210" className="flex items-center gap-2 text-sm text-background/60 hover:text-accent transition-colors">
                <Phone className="h-4 w-4" /> +91 98765 43210
              </a>
              <a href="mailto:hello@milletmithai.com" className="flex items-center gap-2 text-sm text-background/60 hover:text-accent transition-colors">
                <Mail className="h-4 w-4" /> hello@milletmithai.com
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-background/10 mt-8 pt-6 text-center text-sm text-background/40">
          © 2026 Millet Mithai. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
