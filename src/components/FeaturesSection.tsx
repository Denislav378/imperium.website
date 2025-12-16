import { TrendingUp, Shield, Zap, Target, Users, Bell, BarChart3, Crown } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: TrendingUp,
      title: 'High-Risk Signals',
      description: 'Calculated opportunities for traders seeking higher upside.',
      color: 'from-red-500/20 to-orange-500/20'
    },
    {
      icon: Shield,
      title: 'Safe Signals & Risk Management',
      description: 'Structured plays focused on consistency and capital protection.',
      color: 'from-green-500/20 to-emerald-500/20'
    },
    {
      icon: Zap,
      title: 'Futures Trading Insights',
      description: 'Professional futures analysis with clear directional bias.',
      color: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      icon: Target,
      title: 'Daily Lessons & Market Analysis',
      description: 'Continuous education to improve decision-making.',
      color: 'from-purple-500/20 to-pink-500/20'
    },
    {
      icon: Crown,
      title: 'Echo Bot (Telegram)',
      description: 'On-demand AI-powered analysis for any token.',
      color: 'from-yellow-500/20 to-amber-500/20'
    },
    {
      icon: Users,
      title: 'Wallet Intelligence Engine',
      description: 'Automated tracking of top-performing wallets and smart money flows.',
      color: 'from-indigo-500/20 to-purple-500/20'
    },
    {
      icon: Bell,
      title: 'Insider Market Signals',
      description: 'Early insights from exchange and ecosystem activity.',
      color: 'from-orange-500/20 to-red-500/20'
    },
    {
      icon: BarChart3,
      title: 'Daily News & Context',
      description: 'Market-moving updates without the noise.',
      color: 'from-teal-500/20 to-green-500/20'
    }
  ];

  return (
    <section id="features" className="py-24 px-6 bg-gradient-dark">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Everything You Need to <span className="text-gradient-gold">Trade With Confidence</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Imperium Labs gives you the tools to understand what's happening, why it's happening, and how to act — without overtrading or chasing hype.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-card/50 backdrop-blur-sm border border-border p-6 hover:shadow-glow transition-all duration-300 hover:transform hover:scale-105"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Full Access Highlight */}
        <div className="card-premium text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <Crown className="w-8 h-8 text-primary mr-3" />
            <h3 className="text-2xl md:text-3xl font-bold">
              Full Access to All Current & Future Tools
            </h3>
          </div>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Your membership includes access to all existing tools, signals and strategies — plus any future releases during your active plan.
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div className="flex items-center justify-center p-4 rounded-xl bg-primary/5 border border-primary/20">
              <span className="text-primary font-medium">✓ All current features</span>
            </div>
            <div className="flex items-center justify-center p-4 rounded-xl bg-primary/5 border border-primary/20">
              <span className="text-primary font-medium">✓ Ongoing tool upgrades</span>
            </div>
            <div className="flex items-center justify-center p-4 rounded-xl bg-primary/5 border border-primary/20">
              <span className="text-primary font-medium">✓ Priority support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;