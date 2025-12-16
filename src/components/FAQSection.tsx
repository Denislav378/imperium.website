import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'How quickly will I make money?',
      answer: 'If you already understand the basics, you can start making money the same day. If you\'re new, you\'ll be ready to profit within 3 days if you stay consistent with our lessons and signals.'
    },
    {
      question: 'How much money do I need to start trading?',
      answer: 'With our meme coin signals, you can even start with $20 or less using the right risk management strategies, which we\'ll teach you step by step.'
    },
    {
      question: 'Will I get access to all the courses once I join?',
      answer: 'Access depends on the plan you choose. Monthly and lifetime options are available for selected plans.'
    },
    {
      question: 'Can I cancel at any time?',
      answer: 'Access depends on the plan you choose. Monthly and lifetime options are available for selected plans.'
    },
    {
      question: 'Does my age really not matter?',
      answer: 'Age doesn\'t matter at all. If you\'re serious about learning and improving, you can succeed regardless of how old you are. We have successful members from teenagers to retirees.'
    },
    {
      question: 'I know nothing about trading. Is that a problem?',
      answer: 'Not at all. That\'s exactly the point. We give you all the tools AND teach you how to use them properly. Our daily lessons start from the basics and build up your skills systematically.'
    },
    {
      question: 'I don\'t have a lot of time. Can I still succeed?',
      answer: 'Trading is about freedom. Even with just 1 hour a day, you can learn and grow consistently. Our signals and lessons are designed for busy people who want maximum results with minimal time investment.'
    },
    {
      question: 'I live outside the US. Is that a problem?',
      answer: 'Not at all. Imperium Labs is 100% global and remote-friendly. Crypto markets never sleep, and neither do we. Our community spans across all time zones.'
    },
    {
      question: 'How do I access the Discord after payment?',
      answer: 'Immediately after your payment is confirmed, you\'ll receive an instant Discord invite link. The process is fully automated and takes less than 30 seconds.'
    },
    {
      question: 'What makes Imperium Labs different from other signal providers?',
      answer: 'We combine signals, wallet intelligence and AI validation to give traders structure and clarity. Access depends on the plan you choose — monthly and lifetime options are available for selected plans.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 px-6 bg-gradient-dark">
      <div className="container mx-auto max-w-4xl">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in-up">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <HelpCircle className="w-4 h-4 mr-2 text-primary" />
            <span className="text-sm font-medium text-primary">Got Questions?</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Frequently Asked <span className="text-gradient-gold">Questions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about Imperium Labs. Can't find the answer you're looking for? 
            Reach out to our support team.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="card-premium transition-all duration-300 hover:shadow-glow cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold pr-4 text-foreground">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  <ChevronDown 
                    className={`w-5 h-5 text-primary transition-transform duration-300 ${
                      openIndex === index ? 'transform rotate-180' : ''
                    }`}
                  />
                </div>
              </div>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 mt-4' : 'max-h-0'
                }`}
              >
                <div className="pt-4 border-t border-border">
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Still Have Questions */}
        <div className="mt-16 text-center">
          <div className="card-premium max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
            <p className="text-muted-foreground mb-6">
              Our support team is available 24/7 to help you with any questions or concerns.
            </p>
            <a 
              href="https://discord.gg/DRpMe6AC" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-premium inline-block"
            >
              Join Discord & Ask Questions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;