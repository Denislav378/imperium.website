import { useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import FeaturesSection from '@/components/FeaturesSection';
import EchoBotSection from '@/components/EchoBotSection';
import AnimatedReviews from '@/components/AnimatedReviews';
import PricingSection from '@/components/PricingSection';
import FAQSection from '@/components/FAQSection';
import JoinSection from '@/components/JoinSection';
import ScrollToTop from '@/components/ScrollToTop';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    // Smooth scroll animation on scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.fade-in-up');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main>
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
        <EchoBotSection />
        <AnimatedReviews />
        <JoinSection />
        <FAQSection />
        <Footer />
      </main>
      <ScrollToTop />
    </div>
  );
};

export default Index;
