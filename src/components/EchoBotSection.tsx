import { Bot, TrendingUp, Target, ArrowRight } from 'lucide-react';

const EchoBotSection = () => {
  return (
    <section id="echo-bot" className="py-24 px-6 relative overflow-hidden bg-gradient-dark">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in-up">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Bot className="w-4 h-4 mr-2 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Validation</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Echo Bot — Trade With Confidence, Not Hope
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-6">
            Echo Bot is a proprietary AI-powered prediction engine available via Telegram. Paste the contract address of any token and receive instant analysis including market bias, key zones and confidence scoring — designed to help you validate ideas before entering trades.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground mb-8">
            <span>AI-powered market structure analysis</span>
            <span>•</span>
            <span>Instant bias & confidence scoring</span>
            <span>•</span>
            <span>Built on Imperium Labs proprietary research</span>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="card-premium group hover:shadow-glow transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <Bot className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">AI-Powered Analysis</h3>
            <p className="text-muted-foreground leading-relaxed">
              Advanced models process thousands of data points to detect market behavior patterns.
            </p>
          </div>

          <div className="card-premium group hover:shadow-glow transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Instant Predictions</h3>
            <p className="text-muted-foreground leading-relaxed">
              Clear, actionable insights in seconds — no noise.
            </p>
          </div>

          <div className="card-premium group hover:shadow-glow transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Proprietary Formula</h3>
            <p className="text-muted-foreground leading-relaxed">
              Built and refined by the Imperium Labs research team through years of live market data.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={() => window.open('https://t.me/echo_trades_bot', '_blank')}
            className="btn-premium text-lg px-10 py-5 group inline-flex items-center"
          >
            Get Access to Echo Bot
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default EchoBotSection;
