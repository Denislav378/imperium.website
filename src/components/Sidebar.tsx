import { useState } from 'react';
import { Menu, X, BarChart3, Shield, TrendingUp, DollarSign, Users, MessageCircle, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import imperiumLabsLogo from '@/assets/image2_refined.png';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'hero', label: 'Home', icon: BarChart3 },
    { id: 'about', label: 'About', icon: Shield },
    { id: 'features', label: 'Features', icon: TrendingUp },
    { id: 'join', label: 'Pricing', icon: DollarSign },
    { id: 'testimonials', label: 'Reviews', icon: Users },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
    { id: 'join', label: 'Join Now', icon: MessageCircle },
  ];

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'join') {
      window.location.href = '/payment';
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Hamburger Menu Button */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsOpen(true)}
        className="fixed top-6 left-6 z-50 bg-card/80 backdrop-blur-sm border-border glow-effect"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Sidebar Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-sidebar border-r border-sidebar-border z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-sidebar-foreground hover:bg-sidebar-accent"
        >
          <X className="h-5 w-5" />
        </Button>

        {/* Logo and Brand */}
        <div className="p-8 pt-16 border-b border-sidebar-border">
          <div className="flex flex-col items-center space-y-4">
            <img
              src={imperiumLabsLogo}
              alt="Imperium Labs Logo"
              className="w-16 h-16 object-contain"
            />
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gradient-gold">Imperium Labs</h2>
              <p className="text-sm text-sidebar-foreground/70 mt-1">Premium Trading Signals</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-6 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => scrollToSection(item.id)}
                className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-primary transition-colors"
              >
                <Icon className="h-4 w-4 mr-3" />
                {item.label}
              </Button>
            );
          })}
        </nav>

        {/* CTA in Sidebar */}
        <div className="absolute bottom-6 left-6 right-6">
          <button 
            onClick={() => window.location.href = '/payment'}
            className="btn-premium w-full text-center"
          >
            Join
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;