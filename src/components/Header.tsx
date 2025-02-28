
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Star, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);
  
  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 transition-all duration-300 hover:opacity-80">
          <Star className="h-6 w-6 text-nebula-400" />
          <span className="text-xl font-semibold text-glow">Cosmic Feedback</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-4">
            <Link to="/" className="text-sm font-medium text-gray-200 hover:text-white transition-colors">Home</Link>
            <Link to="/feedback" className="text-sm font-medium text-gray-200 hover:text-white transition-colors">Submit Feedback</Link>
            <Link to="/insights" className="text-sm font-medium text-gray-200 hover:text-white transition-colors">Insights</Link>
          </nav>
          
          <Button size="sm" variant="outline" className="text-sm bg-nebula-600/60 border-nebula-500/50 hover:bg-nebula-500 transition-all duration-200">
            Log In
          </Button>
        </div>
        
        <button 
          className="md:hidden text-gray-200 hover:text-white transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full glass py-4 animate-fade-in md:hidden">
            <nav className="flex flex-col gap-3 container mx-auto px-4">
              <Link 
                to="/" 
                className="text-sm font-medium text-gray-200 hover:text-white transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/feedback" 
                className="text-sm font-medium text-gray-200 hover:text-white transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Submit Feedback
              </Link>
              <Link 
                to="/insights" 
                className="text-sm font-medium text-gray-200 hover:text-white transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Insights
              </Link>
              <Button 
                size="sm" 
                variant="outline" 
                className="text-sm bg-nebula-600/60 border-nebula-500/50 hover:bg-nebula-500 transition-all duration-200 mt-2 w-full"
              >
                Log In
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
