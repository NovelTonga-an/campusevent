import { useState, useEffect, useRef } from 'react';

const useScrollDirection = () => {
  const [scrollDirection, setScrollDirection] = useState('up');
  const [scrollY, setScrollY] = useState(0);
  const lastScrollY = useRef(0);
  const scrollTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY.current + 10) {
        // Scrolling down
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY.current - 10) {
        // Scrolling up
        setScrollDirection('up');
      }

      lastScrollY.current = currentScrollY;
      setScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  return { scrollDirection, scrollY };
};

export default useScrollDirection;
