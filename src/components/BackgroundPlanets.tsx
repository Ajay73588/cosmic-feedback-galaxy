
import { useEffect, useState } from 'react';

const BackgroundPlanets = () => {
  const [planets, setPlanets] = useState<Array<{
    id: number;
    size: number;
    x: number;
    y: number;
    color1: string;
    color2: string;
    delay: number;
    duration: number;
  }>>([]);
  
  useEffect(() => {
    // Generate random planets
    const colors = [
      ['#805AD5', '#6B46C1'], // Purple
      ['#4299E1', '#3182CE'], // Blue
      ['#F56565', '#E53E3E'], // Red
      ['#68D391', '#48BB78'], // Green
      ['#F6AD55', '#ED8936'], // Orange
    ];
    
    const newPlanets = [];
    
    for (let i = 0; i < 5; i++) {
      const colorIndex = Math.floor(Math.random() * colors.length);
      const [color1, color2] = colors[colorIndex];
      
      newPlanets.push({
        id: i,
        size: 50 + Math.random() * 150,
        x: Math.random() * 100,
        y: Math.random() * 100,
        color1,
        color2,
        delay: Math.random() * 5,
        duration: 20 + Math.random() * 40
      });
    }
    
    setPlanets(newPlanets);
  }, []);
  
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      {planets.map((planet) => (
        <div
          key={planet.id}
          className="planet absolute animate-float"
          style={{
            width: `${planet.size}px`,
            height: `${planet.size}px`,
            left: `calc(${planet.x}% - ${planet.size / 2}px)`,
            top: `calc(${planet.y}% - ${planet.size / 2}px)`,
            background: `linear-gradient(to bottom right, ${planet.color1}, ${planet.color2})`,
            boxShadow: `0 0 ${planet.size / 4}px ${planet.size / 10}px rgba(${parseInt(planet.color1.slice(1, 3), 16)}, ${parseInt(planet.color1.slice(3, 5), 16)}, ${parseInt(planet.color1.slice(5, 7), 16)}, 0.2)`,
            opacity: 0.2,
            animationDelay: `${planet.delay}s`,
            animationDuration: `${planet.duration}s`,
            borderRadius: '50%',
            zIndex: -2,
          }}
        />
      ))}
    </div>
  );
};

export default BackgroundPlanets;
