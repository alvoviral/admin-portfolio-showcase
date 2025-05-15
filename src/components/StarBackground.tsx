
import { useEffect, useRef } from "react";

const StarBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create stars only if containerRef is available
    if (containerRef.current) {
      // Clean up any existing stars
      const existingStars = containerRef.current.querySelectorAll('.star');
      existingStars.forEach(star => star.remove());
      
      // Create new stars
      const starCount = 100;
      for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Random positioning
        const size = Math.random() * 3 + 1; // Between 1-4px
        const x = Math.random() * 100; // % position
        const y = Math.random() * 100; // % position
        
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        
        // Random animation delay
        star.style.animationDelay = `${Math.random() * 3}s`;
        
        containerRef.current.appendChild(star);
      }
    }
    
    // Clean up function
    return () => {
      if (containerRef.current) {
        const stars = containerRef.current.querySelectorAll('.star');
        stars.forEach(star => star.remove());
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 z-0 overflow-hidden pointer-events-none" />
  );
};

export default StarBackground;
