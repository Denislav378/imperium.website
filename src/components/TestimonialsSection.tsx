import { Star, TrendingUp, DollarSign, Award } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Alex M.',
      role: 'Day Trader',
      avatar: '👨‍💼',
      rating: 5,
      profit: '+$12,450',
      timeframe: '2 months',
      content: 'The wallet tracking feature is insane. Made back my investment in the first week just following the smart money movements. Imperium Labs is the real deal.',
      verified: true
    },
    {
      name: 'Sarah K.',
      role: 'Crypto Investor',
      avatar: '👩‍🔬',
      rating: 5,
      profit: '+$8,920',
      timeframe: '6 weeks',
      content: 'I was completely new to futures trading. The daily lessons and safe signals helped me learn while making consistent profits. No regrets joining.',
      verified: true
    },
    {
      name: 'Mike R.',
      role: 'Full-time Trader',
      avatar: '🧑‍💻',
      rating: 5,
      profit: '+$23,780',
      timeframe: '3 months',
      content: 'The Binance insider info alone is worth 10x the price. Been following Imperium Labs signals for months and my portfolio has never looked better.',
      verified: true
    },
    {
      name: 'Jessica L.',
      role: 'Part-time Trader',
      avatar: '👩‍💼',
      rating: 5,
      profit: '+$5,670',
      timeframe: '1 month',
      content: 'Working full-time but still managing to profit from the signals. Echo Bot caught several breakouts I would have missed completely.',
      verified: true
    },
    {
      name: 'David C.',
      role: 'Swing Trader',
      avatar: '👨‍🔬',
      rating: 5,
      profit: '+$16,340',
      timeframe: '4 months',
      content: 'The risk management strategies saved me from several major losses. These aren\'t just signals, it\'s a complete trading education.',
      verified: true
    },
    {
      name: 'Emma T.',
      role: 'New Trader',
      avatar: '👩‍🎓',
      rating: 5,
      profit: '+$3,210',
      timeframe: '3 weeks',
      content: 'Started with just $200 and already seeing great returns. The community support and daily lessons make learning so much easier.',
      verified: true
    }
  ];

  const stats = [
    { label: 'Average Monthly Return', value: '78%', icon: TrendingUp },
    { label: 'Members Profitable', value: '94%', icon: Award },
    { label: 'Total Profits Generated', value: '$12.8M+', icon: DollarSign }
  ];

  return (
    <section id="testimonials" className="py-24 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Real Results from <span className="text-gradient-gold">Real Traders</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Imperium Labs members don't rely on luck. They rely on structure, data and discipline — and the results speak for themselves.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gradient-gold mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="card-premium group hover:shadow-glow transition-all duration-300 hover:transform hover:scale-105"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-xl mr-3">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground flex items-center">
                      {testimonial.name}
                      {testimonial.verified && (
                        <div className="w-4 h-4 rounded-full bg-primary ml-2 flex items-center justify-center">
                          <span className="text-xs text-primary-foreground">✓</span>
                        </div>
                      )}
                    </h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                
                {/* Profit Badge */}
                <div className="text-right">
                  <div className="text-lg font-bold text-primary">{testimonial.profit}</div>
                  <div className="text-xs text-muted-foreground">{testimonial.timeframe}</div>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-primary fill-current" />
                ))}
              </div>

              {/* Content */}
              <p className="text-muted-foreground leading-relaxed text-sm">
                "{testimonial.content}"
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="card-premium max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              Ready to Join the <span className="text-gradient-gold">Success Stories?</span>
            </h3>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Ready to trade with clarity? Join Imperium Labs and get the system that keeps you ahead.
            </p>
            <button 
              className="btn-premium text-lg px-12 py-5"
              onClick={() => window.location.href = '/payment'}
            >
              Join
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;