import { Play, TrendingUp, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroBackground from '@/assets/hero-video-bg.jpg';

const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat hero-video-bg"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full animate-pulse" />
        <div className="absolute top-40 right-20 w-1 h-1 bg-primary/50 rounded-full animate-pulse delay-1000" />
        <div className="absolute bottom-32 left-20 w-1.5 h-1.5 bg-primary/70 rounded-full animate-pulse delay-500" />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 text-center relative z-10 max-w-4xl">
        <div className="fade-in-up animate">
          {/* Hero Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 glow-effect">
            <TrendingUp className="w-4 h-4 mr-2 text-primary" />
            <span className="text-sm font-medium text-primary">4500+ Wallets Tracked Daily</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-foreground">Trade</span>{' '}
            <span className="text-gradient-gold">smarter</span>,{' '}
            <span className="text-foreground">not harder.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-4 font-medium">
            We are not here to be nice. We are here to make you better.
          </p>

          {/* Description */}
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Imperium Labs is a professional trading ecosystem combining signals, market intelligence and AI-powered validation — built for traders who want structure, clarity and an edge.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button 
              onClick={() => window.location.href = '/payment'}
              className="btn-premium text-lg px-10 py-5 group"
            >
              Join Imperium Labs
            </button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToSection('about')}
              className="bg-card/80 backdrop-blur-sm border-border text-foreground hover:bg-card glow-effect"
            >
              <Play className="mr-2 h-4 w-4" />
              Learn More
            </Button>
          </div>

          {/* Trust Bar */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span>4500+ Wallets Tracked</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              <span>Global Access</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;