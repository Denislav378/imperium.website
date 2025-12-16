import { ArrowLeft, Zap, Bot, TrendingUp, Crown, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import imperiumLabsLogo from '@/assets/image2_refined.png';

// NOWPayments Payment Links
// Replace these with your actual Payment Links from NOWPayments Dashboard
// To get Payment Links:
// 1. Go to NOWPayments Dashboard → Payment Links
// 2. Create a Payment Link for each plan
// 3. Copy the Payment Link URL and paste it here

// NOWPayments Payment Links - Configured
const NOWPAYMENTS_DISCORD_MONTHLY_URL = 'https://nowpayments.io/payment/?iid=5002333092';
const NOWPAYMENTS_ECHOBOT_MONTHLY_URL = 'https://nowpayments.io/payment/?iid=5274831336';
const NOWPAYMENTS_WALLET_MONTHLY_URL = 'https://nowpayments.io/payment/?iid=6069675036';
const NOWPAYMENTS_ALLIN_MONTHLY_URL = 'https://nowpayments.io/payment/?iid=5130672221';
const NOWPAYMENTS_SMART_TRADER_URL = 'https://nowpayments.io/payment/?iid=4401705666';
const NOWPAYMENTS_MARKET_WATCHER_URL = 'https://nowpayments.io/payment/?iid=4621386074';

const Payment = () => {
  const goBack = () => window.history.back();

  const handleCheckout = (url: string, planName: string) => {
    // Special handling for Echo Bot - redirect to Telegram
    if (planName === 'Echo Bot (Telegram AI)') {
      const telegramBotUrl = 'https://t.me/echo_trades_bot';
      console.log('=== Redirecting to Telegram Bot ===');
      console.log('Bot URL:', telegramBotUrl);
      console.log('Timestamp:', new Date().toISOString());
      console.log('==================================');
      window.open(telegramBotUrl, '_blank');
      return;
    }
    
    // Check if URL is still placeholder
    if (url.includes('YOUR_PAYMENT_LINK_ID')) {
      alert(`⚠️ Payment Link not configured!\n\nPlease add your NOWPayments Payment Link for:\n${planName}\n\nSee NOWPAYMENTS_SETUP.md for instructions.`);
      console.error('Payment Link not configured:', planName, url);
      return;
    }
    
    // Log for debugging
    console.log('=== NOWPayments Checkout ===');
    console.log('Plan:', planName);
    console.log('URL:', url);
    console.log('Timestamp:', new Date().toISOString());
    console.log('========================');
    
    // Redirect to NOWPayments checkout
    window.location.href = url;
  };

  return (
    <div className="min-h-screen bg-background py-12 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12">
          <Button
            variant="outline"
            onClick={goBack}
            className="mb-6 glow-effect"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Imperium Labs
          </Button>

          <div className="text-center">
            <img
              src={imperiumLabsLogo}
              alt="Imperium Labs Logo"
              className="w-20 h-20 mx-auto mb-6 object-contain"
            />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Complete Your <span className="text-gradient-gold">Purchase</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Choose a plan and continue to secure checkout.
            </p>
          </div>
        </div>

        {/* Main Pricing Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Card 1: Discord Trading Group */}
          <div className="card-premium relative group hover:shadow-glow transition-all duration-300">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <Zap className="w-6 h-6 text-primary mr-2" />
                <h3 className="text-xl font-bold text-gradient-gold">Imperium Labs Discord</h3>
              </div>

              <div className="mb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-gradient-gold">$249.99</span>
                  <span className="text-sm text-muted-foreground line-through">$299.99</span>
                  <span className="text-sm text-muted-foreground">/ month</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                Professional trading signals, market analysis, daily lessons, and a private Discord community.
              </p>

              <div className="space-y-2 mb-6 text-sm text-muted-foreground">
                <div className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>High-risk & safe signals</span>
                </div>
                <div className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Futures analysis</span>
                </div>
                <div className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Daily lessons & breakdowns</span>
            </div>
                <div className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Wallet summaries (Top traders insights)</span>
                </div>
                <div className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>24/7 Discord community</span>
                </div>
              </div>

              <button
                onClick={() => handleCheckout(NOWPAYMENTS_DISCORD_MONTHLY_URL, 'Imperium Labs Discord')}
                className="btn-premium w-full text-center"
              >
                Join Discord
              </button>
            </div>
          </div>

          {/* Card 2: Echo Bot (Telegram AI) */}
          <div className="card-premium relative group hover:shadow-glow transition-all duration-300">
            <div className="absolute top-4 right-4">
              <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-destructive/10 border border-destructive/20">
                <AlertTriangle className="w-3 h-3 text-destructive" />
                <span className="text-xs font-medium text-destructive">Limited — 4 spots</span>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center mb-4">
                <Bot className="w-6 h-6 text-primary mr-2" />
                <h3 className="text-xl font-bold text-gradient-gold">Echo Bot (Telegram AI)</h3>
              </div>
              
              <div className="mb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-gradient-gold">$349.99</span>
                  <span className="text-sm text-muted-foreground line-through">$399.99</span>
                  <span className="text-sm text-muted-foreground">/ month</span>
                    </div>
                  </div>

              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                AI-powered trade validation and market bias engine delivered via Telegram.
              </p>

              <div className="space-y-2 mb-6 text-sm text-muted-foreground">
                <div className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Instant token analysis</span>
                </div>
                <div className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Market bias & confidence scoring</span>
                    </div>
                <div className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Volatility & structure insights</span>
                  </div>
                <div className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Separate Telegram access</span>
                    </div>
                  </div>

              <p className="text-xs text-muted-foreground mb-4 italic">
                Access is limited due to the precision of the system. Too many users may impact market behavior.
              </p>

                <button
                onClick={() => handleCheckout(NOWPAYMENTS_ECHOBOT_MONTHLY_URL, 'Echo Bot (Telegram AI)')}
                className="btn-premium w-full text-center"
              >
                Get Echo Bot
              </button>
                    </div>
                  </div>

          {/* Card 3: Featured - All-In Trader (Most Popular) */}
          <div className="card-premium relative group hover:shadow-glow-strong transition-all duration-300 border-2 border-primary/30 md:col-span-2 lg:col-span-1 lg:row-span-2 transform hover:scale-105">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
              <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-primary/20 border border-primary/40">
                <Crown className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold text-primary">Most Popular</span>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center mb-4">
                <Crown className="w-6 h-6 text-primary mr-2" />
                <h3 className="text-xl font-bold text-gradient-gold">All-In Trader</h3>
                    </div>
              
              <div className="mb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-gradient-gold">$449.99</span>
                  <span className="text-sm text-muted-foreground line-through">$749.99</span>
                  <span className="text-sm text-muted-foreground">/ month</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                Everything you need. No compromises.
              </p>

              <div className="space-y-2 mb-6 text-sm text-muted-foreground">
                <div className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Imperium Labs Discord</span>
                  </div>
                <div className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Echo Bot (Telegram AI)</span>
                </div>
                <div className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Wallet Intelligence Engine</span>
                </div>
                <div className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Priority access & support</span>
                </div>
              </div>

              <div className="mb-6 p-3 rounded-lg bg-primary/5 border border-primary/20">
                <p className="text-xs font-medium text-primary text-center">
                  Save $300+ per month compared to buying separately
                </p>
              </div>

              <button
                onClick={() => handleCheckout(NOWPAYMENTS_ALLIN_MONTHLY_URL, 'All-In Trader')}
                className="btn-premium w-full text-center text-lg py-4"
              >
                Become All-In Trader
              </button>
            </div>
          </div>

          {/* Card 4: Wallet Intelligence Engine */}
          <div className="card-premium relative group hover:shadow-glow transition-all duration-300">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <TrendingUp className="w-6 h-6 text-primary mr-2" />
                <h3 className="text-xl font-bold text-gradient-gold">Wallet Intelligence Engine</h3>
            </div>

              <div className="mb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-gradient-gold">$149.99</span>
                  <span className="text-sm text-muted-foreground line-through">$199.99</span>
                  <span className="text-sm text-muted-foreground">/ month</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                Track smart money before it moves the market.
              </p>

              <div className="space-y-2 mb-6 text-sm text-muted-foreground">
                <div className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Tracking of 4500+ wallets</span>
                </div>
                <div className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Daily / weekly / monthly top wallets</span>
                </div>
                <div className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Filtered high-quality alerts</span>
                </div>
                <div className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span>Delivered inside Discord</span>
                </div>
              </div>

              <button
                onClick={() => handleCheckout(NOWPAYMENTS_WALLET_MONTHLY_URL, 'Wallet Intelligence Engine')}
                className="btn-premium w-full text-center"
              >
                Unlock Wallet Intelligence
              </button>
            </div>
          </div>
        </div>

        {/* Secondary Bundles Row */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Smart Trader Pack */}
          <div className="card-premium relative group hover:shadow-glow transition-all duration-300">
            <div className="p-6">
              <h3 className="text-lg font-bold text-gradient-gold mb-2">Smart Trader Pack</h3>
              <p className="text-xs text-muted-foreground mb-4">Discord + Echo Bot</p>
              
              <div className="mb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-gradient-gold">$399.99</span>
                  <span className="text-sm text-muted-foreground line-through">$649.99</span>
                  <span className="text-sm text-muted-foreground">/ month</span>
                </div>
              </div>

              <button
                onClick={() => handleCheckout(NOWPAYMENTS_SMART_TRADER_URL, 'Smart Trader Pack')}
                className="btn-premium w-full text-center"
              >
                Get Smart Trader Pack
              </button>
            </div>
          </div>

          {/* Market Watcher Pack */}
          <div className="card-premium relative group hover:shadow-glow transition-all duration-300">
            <div className="p-6">
              <h3 className="text-lg font-bold text-gradient-gold mb-2">Market Watcher Pack</h3>
              <p className="text-xs text-muted-foreground mb-4">Discord + Wallet Intelligence</p>
              
              <div className="mb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-gradient-gold">$299.99</span>
                  <span className="text-sm text-muted-foreground line-through">$449.99</span>
                  <span className="text-sm text-muted-foreground">/ month</span>
                </div>
              </div>

              <button
                onClick={() => handleCheckout(NOWPAYMENTS_MARKET_WATCHER_URL, 'Market Watcher Pack')}
                className="btn-premium w-full text-center"
              >
                Get Market Watcher Pack
              </button>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Secure checkout powered by <span className="text-primary font-medium">NOWPayments</span>
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Crypto payments • Instant access after confirmation
          </p>
        </div>
      </div>
    </div>
  );
};

export default Payment;
