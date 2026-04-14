import { ShoppingCart, Menu, X, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { cart } = useCart();
  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "How it Works", to: "/how-it-works" },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-white shadow-sm border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 hover:scale-[1.02] transition-all">
            <img 
              src="/logo 5 1-01 (1).png" 
              alt="Millet Mithai" 
              className="h-11 w-11 sm:h-12 sm:w-12 lg:h-14 lg:w-14 rounded-lg object-cover shadow-sm hover:shadow-md" 
            />
            <span className="font-bold text-base sm:text-lg lg:text-xl tracking-tight text-[#274d35]">
              Millet Mithai
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`py-3 px-3 text-sm font-semibold transition-all duration-300 hover:text-[#274d35] hover:pb-1 ${
                  location.pathname === link.to
                    ? "text-[#274d35] border-b-2 border-[#274d35]"
                    : "text-gray-700"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/cart" className="relative p-2 rounded-lg bg-gradient-to-r from-amber-400 to-orange-400 hover:scale-105 transition-all shadow-md">
              <ShoppingCart className="h-5 w-5 text-white" />
              {totalCartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-pulse">
                  {totalCartItems}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Icons */}
          <div className="lg:hidden flex items-center gap-3">
            <Link to="/cart" className="relative p-1.5 rounded-lg bg-gradient-to-r from-amber-400 to-orange-400 hover:scale-105 transition-all">
              <ShoppingCart className="h-3.5 w-3.5 text-white" />
              {totalCartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] rounded-full h-4 w-4 flex items-center justify-center font-bold">
                  {totalCartItems}
                </span>
              )}
            </Link>
            <button
              className="p-2 rounded-lg bg-white hover:bg-gray-50 hover:scale-105 transition-all shadow-sm border border-gray-200"
              onClick={() => setIsOpen(!isOpen)}
            >
{isOpen ? <X className="h-3.5 w-3.5 text-gray-800" /> : <Menu className="h-3.5 w-3.5 text-gray-800" />}
            </button>
          </div>
        </div>
      </div>

      {/* Compact Premium Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white shadow-lg border-b border-gray-100">
          <div className="px-6 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between py-3 px-4 text-sm font-semibold transition-all duration-300 hover:text-[#274d35] hover:pl-2 ${
                  location.pathname === link.to 
                    ? "text-[#274d35] font-bold border-l-4 border-[#274d35] pl-4 bg-[#274d35]/5"
                    : "text-gray-700"
                }`}
              >
                <span className="tracking-wide">{link.label}</span>
                <ChevronRight className="h-4 w-4 text-gray-400 group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
