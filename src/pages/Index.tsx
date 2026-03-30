import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import ProductsSection from "@/components/ProductsSection";
import InstagramReels from "@/components/InstagramReels";
import WhyChooseUs from "@/components/WhyChooseUs";
import HowItWorks from "@/components/HowItWorks";
import TestimonialsSection from "@/components/TestimonialsSection";
import BrandStory from "@/components/BrandStory";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <ProductsSection />
      <InstagramReels />
      <WhyChooseUs />
      <HowItWorks />
      <TestimonialsSection />
      <BrandStory />
      <CtaSection />
      <Footer />
    </div>
  );
};

export default Index;
