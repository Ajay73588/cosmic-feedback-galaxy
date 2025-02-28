
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket, Star, BarChart3, MessageSquare } from 'lucide-react';
import StarField from '@/components/StarField';
import BackgroundPlanets from '@/components/BackgroundPlanets';
import Header from '@/components/Header';
import AnimatedButton from '@/components/AnimatedButton';
import { Button } from '@/components/ui/button';
import { useFeedbackStore } from '@/lib/feedbackStore';

const Index = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const feedbackItems = useFeedbackStore((state) => state.feedbackItems);
  
  useEffect(() => {
    setVisible(true);
  }, []);
  
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <StarField />
      <BackgroundPlanets />
      <Header />
      
      <main className="pt-24 px-4 container mx-auto">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center min-h-[80vh] text-center max-w-5xl mx-auto">
          <div className={`transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="inline-block mb-4 px-3 py-1 text-xs font-semibold bg-nebula-900/50 text-nebula-300 rounded-full">
              CUSTOMER INSIGHTS PLATFORM
            </p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-glow leading-tight">
              Stellar Customer Feedback for <span className="text-nebula-400">Cosmic Insights</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Navigate the universe of customer opinions. Collect, analyze, and visualize feedback with our space-inspired platform for actionable insights.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <AnimatedButton 
                variant="cosmic"
                size="lg"
                icon={<Rocket className="w-5 h-5" />}
                onClick={() => navigate('/feedback')}
                className="w-full sm:w-auto"
              >
                Submit Feedback
              </AnimatedButton>
              
              <Button 
                variant="outline"
                size="lg"
                onClick={() => navigate('/insights')}
                className="w-full sm:w-auto bg-cosmic-900/50 border-cosmic-700/50 hover:bg-cosmic-800/50"
              >
                View Insights
              </Button>
            </div>
          </div>
          
          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mx-auto">
            {[
              {
                icon: <Star className="w-10 h-10 text-yellow-400" />,
                title: "Intuitive Ratings",
                description: "Rate products across multiple dimensions with our interactive star rating system."
              },
              {
                icon: <BarChart3 className="w-10 h-10 text-nebula-400" />,
                title: "Visual Insights",
                description: "Transform feedback into actionable data with beautiful, space-inspired visualizations."
              },
              {
                icon: <MessageSquare className="w-10 h-10 text-green-400" />,
                title: "Detailed Comments",
                description: "Express detailed opinions to provide companies with comprehensive feedback."
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className={`card-cosmic p-6 text-center transition-all duration-700 delay-${index * 200} ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              >
                <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-cosmic-800/50 animate-pulse-glow">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
        
        {/* Stats Section */}
        <section className="py-24">
          <div className="glass rounded-2xl p-8 md:p-12 max-w-5xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12 text-glow">Our Cosmic Feedback Universe</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="flex flex-col items-center">
                <div className="text-4xl font-bold text-nebula-400 mb-2">{feedbackItems.length}</div>
                <div className="text-gray-400">Total Reviews</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-4xl font-bold text-nebula-400 mb-2">
                  {Array.from(new Set(feedbackItems.map(item => item.brand))).length}
                </div>
                <div className="text-gray-400">Brands</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-4xl font-bold text-nebula-400 mb-2">
                  {(feedbackItems.reduce((acc, item) => acc + item.overallRating, 0) / feedbackItems.length).toFixed(1)}
                </div>
                <div className="text-gray-400">Avg. Rating</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-4xl font-bold text-nebula-400 mb-2">
                  {Array.from(new Set(feedbackItems.map(item => item.productType))).length}
                </div>
                <div className="text-gray-400">Product Types</div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-12 mb-20">
          <div className="relative overflow-hidden rounded-2xl bg-nebula-gradient p-8 md:p-12 max-w-5xl mx-auto text-center">
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4">Ready to Launch Your Feedback?</h2>
              <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
                Join our constellation of users providing valuable insights that help shape the future of products and services.
              </p>
              <AnimatedButton
                variant="default"
                size="lg"
                icon={<Rocket className="w-5 h-5" />}
                onClick={() => navigate('/feedback')}
              >
                Start Now
              </AnimatedButton>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="py-8 px-4 border-t border-cosmic-800">
        <div className="container mx-auto text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Cosmic Feedback. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
