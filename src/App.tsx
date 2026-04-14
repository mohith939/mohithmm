import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index.tsx";
import CategoryProducts from "./components/CategoryProducts.tsx";
import Products from "./pages/Products.tsx";

import AboutUs from "./pages/AboutUs.tsx";
import HowItWorks from "./pages/HowItWorks.tsx";
import Contact from "./pages/Contact.tsx";
import Checkout from "./pages/Checkout.tsx";
import ProductDetail from "./pages/ProductDetail.tsx";
import Cart from "./pages/Cart.tsx";
import TrackOrder from "./pages/TrackOrder.tsx";
import NotFound from "./pages/NotFound.tsx";
import { CartProvider } from "./contexts/CartContext.tsx";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <CartProvider>
<BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:category" element={<CategoryProducts />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:productId" element={<ProductDetail />} />

            <Route path="/checkout" element={<Checkout />} />
            <Route path="/track" element={<TrackOrder />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />

          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
