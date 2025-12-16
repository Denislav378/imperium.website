const Footer = () => {
  return (
    <footer className="bg-background text-foreground py-12 px-6 mt-20">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center md:text-left">
          {/* Brand */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gradient-gold mb-2">Imperium Labs</h3>
            <p className="text-muted-foreground">Professional Trading Intelligence</p>
          </div>

          {/* Support Section */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-gradient-gold mb-3">Support:</h4>
            <p className="text-muted-foreground mb-2">
              If you have any issues accessing the platform, contact the Imperium Labs team here:
            </p>
            <a 
              href="mailto:join.echo.trades@proton.me" 
              className="text-gradient-gold hover:underline font-medium"
            >
              📩 join.echo.trades@proton.me
            </a>
          </div>

          {/* Legal Section */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-gradient-gold mb-3">Legal:</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">
              All content provided by Imperium Labs is for educational purposes only. Trading involves risk and results may vary.
            </p>
          </div>

          {/* Copyright */}
          <div className="pt-6 border-t border-border text-center">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Imperium Labs. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;