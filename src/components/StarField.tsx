
import { useEffect, useRef } from 'react';

const StarField = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    
    // Create stars
    const starCount = Math.min(Math.floor(width * height / 2000), 200);
    
    // Remove existing stars
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    
    // Create new stars
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.setProperty('--duration', `${3 + Math.random() * 5}s`);
      star.style.setProperty('--delay', `${Math.random() * 5}s`);
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.width = `${1 + Math.random() * 2}px`;
      star.style.height = star.style.width;
      container.appendChild(star);
    }
    
    // Create shooting stars
    for (let i = 0; i < 5; i++) {
      const shootingStar = document.createElement('div');
      shootingStar.className = 'shooting-star';
      shootingStar.style.setProperty('--delay', `${Math.random() * 15}s`);
      shootingStar.style.setProperty('--offset-x', `${Math.random() * 200 - 100}px`);
      shootingStar.style.setProperty('--offset-y', `${Math.random() * 200 - 100}px`);
      container.appendChild(shootingStar);
    }
    
    // Handle resize
    const handleResize = () => {
      // Recreate stars on resize
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      
      const newWidth = container.offsetWidth;
      const newHeight = container.offsetHeight;
      const newStarCount = Math.min(Math.floor(newWidth * newHeight / 2000), 200);
      
      for (let i = 0; i < newStarCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.setProperty('--duration', `${3 + Math.random() * 5}s`);
        star.style.setProperty('--delay', `${Math.random() * 5}s`);
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.width = `${1 + Math.random() * 2}px`;
        star.style.height = star.style.width;
        container.appendChild(star);
      }
      
      for (let i = 0; i < 5; i++) {
        const shootingStar = document.createElement('div');
        shootingStar.className = 'shooting-star';
        shootingStar.style.setProperty('--delay', `${Math.random() * 15}s`);
        shootingStar.style.setProperty('--offset-x', `${Math.random() * 200 - 100}px`);
        shootingStar.style.setProperty('--offset-y', `${Math.random() * 200 - 100}px`);
        container.appendChild(shootingStar);
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return <div ref={containerRef} className="star-container" />;
};

export default StarField;
