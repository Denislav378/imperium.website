import { useEffect, useState } from 'react';

// Import uploaded review images
import reviewNew1 from '@/assets/review-new-1.png';
import reviewNew2 from '@/assets/review-new-2.png';
import reviewNew3 from '@/assets/review-new-3.png';
import reviewNew4 from '@/assets/review-new-4.png';
import reviewNew5 from '@/assets/review-new-5.png';
import reviewNew6 from '@/assets/review-new-6.png';
import reviewNew7 from '@/assets/review-new-7.png';
import reviewNew8 from '@/assets/review-new-8.png';
import reviewNew9 from '@/assets/review-new-9.png';
import reviewNew10 from '@/assets/review-new-10.png';

const AnimatedReviews = () => {
  const [randomizedReviews, setRandomizedReviews] = useState<string[]>([]);

  const allReviews = [
    reviewNew1, reviewNew2, reviewNew3, reviewNew4, reviewNew5,
    reviewNew6, reviewNew7, reviewNew8, reviewNew9, reviewNew10
  ];

  // Randomize reviews on component mount
  useEffect(() => {
    const shuffled = [...allReviews].sort(() => Math.random() - 0.5);
    // Duplicate the array to ensure smooth infinite scrolling
    const duplicated = [...shuffled, ...shuffled, ...shuffled];
    setRandomizedReviews(duplicated);
  }, []);

  return (
    <section id="testimonials" className="py-24 px-6 overflow-hidden">
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

        {/* 3x3 Grid with Infinite Scroll */}
        <div className="w-full max-w-4xl mx-auto">
          <div className="review-grid-container h-[600px] overflow-hidden relative">
            <div className="review-grid-scroll">
              {randomizedReviews.length > 0 && randomizedReviews.map((review, index) => (
                <div key={index} className="review-grid-item">
                  <div className="aspect-square rounded-xl overflow-hidden border-4 border-primary shadow-lg glow-effect">
                    <img
                      src={review}
                      alt={`Customer review ${(index % 10) + 1}`}
                      className="w-full h-full object-contain transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
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

export default AnimatedReviews;