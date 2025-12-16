import { Check, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const plans = [
  {
    name: 'Guided Trader',
    badge: 'Plan 1',
    bestFor: 'Traders who want clear signals and structured guidance.',
    price: '$119 / month',
    priceSecondary: undefined,
    features: [
      'Discord access',
      'Daily trading signals',
      'Market analysis & lessons',
      'Wallet intelligence summaries (Top wallets overview)',
      'Community support',
    ],
    cta: 'Start With Guided Access',
  },
  {
    name: 'Smart Decisions',
    badge: 'Plan 2',
    bestFor: 'Traders who want to validate trades and reduce emotional mistakes.',
    price: '$249 / month',
    priceSecondary: '$999 lifetime (limited)',
    features: [
      'Everything in Guided Trader',
      'Echo Bot (Telegram)',
      'AI-powered bias & confidence analysis',
      'Deeper trade breakdowns',
    ],
    cta: 'Upgrade to Smart Decisions',
  },
  {
    name: 'Intelligence Edge',
    badge: 'Plan 3',
    bestFor: 'Traders who want earlier positioning and deeper market insight.',
    price: '$399 / month',
    priceSecondary: '$1,999 lifetime (limited)',
    features: [
      'Everything in Smart Decisions',
      'Advanced wallet intelligence automation',
      'Top wallets: daily, weekly & monthly rankings',
      'Early alerts & private channels',
    ],
    cta: 'Unlock Intelligence Edge',
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-24 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in-up">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Crown className="w-4 h-4 mr-2 text-primary" />
            <span className="text-sm font-medium text-primary">Choose Your Access Level</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Three Levels. <span className="text-gradient-gold">One Trading System.</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Whether you want guidance, validation or a true market edge — choose the level that matches how you trade.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="card-premium relative overflow-hidden group hover:shadow-glow-strong transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wide bg-primary/10 text-primary px-3 py-1 rounded-full">
                    {plan.badge}
                  </span>
                  <span className="text-sm text-muted-foreground">{plan.bestFor}</span>
                </div>

                <h3 className="text-2xl font-bold text-gradient-gold mb-2">{plan.name}</h3>
                <p className="text-lg text-foreground font-semibold mb-1">{plan.price}</p>
                {plan.priceSecondary && (
                  <p className="text-sm text-muted-foreground mb-4">{plan.priceSecondary}</p>
                )}

                <div className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start">
                      <Check className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  className="btn-premium w-full mt-auto"
                  onClick={() => window.location.href = '/payment'}
                >
                  {plan.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;