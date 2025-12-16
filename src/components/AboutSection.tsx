import { Shield, Target, TrendingUp, Users, Award, Zap } from 'lucide-react';

const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Why <span className="text-gradient-gold">Imperium Labs</span> Is Different
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Imperium Labs is not just a signal group. It's a complete decision-making system designed to help traders eliminate noise, control emotions and trade with confidence in fast-moving crypto markets.
          </p>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-gradient-gold mb-2">4500+</div>
            <div className="text-muted-foreground">Wallets Tracked</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-gradient-gold mb-2">24/7</div>
            <div className="text-muted-foreground">Market Monitoring</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-gradient-gold mb-2">AI + Human</div>
            <div className="text-muted-foreground">Decision Framework</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-gradient-gold mb-2">Global</div>
            <div className="text-muted-foreground">Community Access</div>
          </div>
        </div>


        {/* Value Proposition */}
        <div className="mt-20 card-premium text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-6">
            Structure Beats Guessing. Every Time.
          </h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Most traders fail not because of bad markets, but because of emotional decisions and lack of structure. Imperium Labs replaces chaos with clarity — combining real-time signals, wallet intelligence and AI validation into one system.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20">✓ No Noise</span>
            <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20">✓ Clear Bias</span>
            <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20">✓ Data-Driven Decisions</span>
            <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20">✓ Built for Consistency</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;