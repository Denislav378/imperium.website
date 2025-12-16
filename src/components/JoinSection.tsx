import { ArrowRight, Zap, Crown, MessageCircle } from 'lucide-react';

const JoinSection = () => {
  const redirectToPayment = () => {
    window.location.href = '/payment';
  };

  const benefits = [
    'Instant Discord access after payment',
    'All tools & strategies included',
    'Continuous updates while active',
    'Flexible memberships',
    '24/7 community support'
  ];

  return (
    <section id="join" className="py-24 px-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        {/* Main CTA Card */}
        <div className="card-premium text-center relative overflow-hidden group">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10">
            {/* Header */}
            <div className="mb-8">
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Crown className="w-5 h-5 mr-2 text-primary" />
                <span className="font-semibold text-primary">Time-Sensitive Opportunity</span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                The Market Moves Fast.<br />
                <span className="text-gradient-gold">So Should You.</span>
              </h2>
              
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Most traders hesitate. The disciplined ones act with clarity. Choose your access level and start trading with a system designed to remove emotion from decisions.
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12 max-w-4xl mx-auto">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center justify-center p-4 rounded-xl bg-card/50 border border-border">
                  <Zap className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                  <span className="text-sm font-medium text-foreground">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Main CTA Button */}
            <div className="mb-8">
              <button 
                onClick={redirectToPayment}
                className="btn-premium text-xl px-16 py-6 group inline-flex items-center"
              >
                <MessageCircle className="mr-3 h-6 w-6" />
                Join
                <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-2" />
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="text-sm text-muted-foreground">
              <p className="mb-4">Secure crypto payments • Instant access • Global community</p>
              <div className="flex flex-wrap justify-center gap-6">
                <span>✓ Transparent pricing</span>
                <span>✓ 4500+ Wallets Tracked</span>
                <span>✓ 24/7 Support Available</span>
              </div>
            </div>
          </div>
        </div>

        {/* Final Push */}
        <div className="mt-16 text-center max-w-3xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
            Don't Trade Harder. <span className="text-gradient-gold">Trade Smarter.</span>
          </h3>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Don’t Trade Harder. Trade Smarter.
          </p>
        </div>
      </div>
    </section>
  );
};

export default JoinSection;