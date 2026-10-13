import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 left-6 z-30 p-3 rounded-full bg-white/90 hover:bg-white text-[#591C32] hover:text-[#591C32] shadow-lg border border-[#C6A56B]/30 hover:border-[#591C32] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-xs"
      aria-label="Scroll to top of page"
      title="Back to Top"
    >
      <ArrowUp className="w-4 h-4 text-[#591C32]" />
    </button>
  );
};
