'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function LeadPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasTriggeredExit, setHasTriggeredExit] = useState(false);

  useEffect(() => {
    // Entry Popup: Trigger slightly after page load
    const entryTimer = setTimeout(() => {
      if (!sessionStorage.getItem('popupShown')) {
        setIsOpen(true);
        sessionStorage.setItem('popupShown', 'true');
      }
    }, 4000);

    // Exit Intent Popup
    const handleMouseLeave = (e: MouseEvent) => {
      // If cursor moves top (clientY < 20) and we haven't triggered it yet
      if (e.clientY < 20 && !hasTriggeredExit) {
        setIsOpen(true);
        setHasTriggeredExit(true);
        // Only trigger once per session
        sessionStorage.setItem('popupShown', 'true');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimeout(entryTimer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasTriggeredExit]);

  const closePopup = () => setIsOpen(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closePopup}
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden z-10 p-8 border border-white/20"
          >
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors"
            >
              <X size={24} />
            </button>

            <div className="text-center">
              <span className="inline-block bg-accent/20 text-black px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                Limited Time Offer
              </span>
              <h3 className="text-2xl font-black text-purple mb-3 leading-tight">
                Book Your Free Assessment!
              </h3>
              <p className="text-gray-600 mb-6 font-medium">
                An expert trainer will visit you directly to build your personalised roadmap to success.
              </p>

              <a
                href="#contact"
                onClick={closePopup}
                className="block w-full text-center bg-accent text-dark font-bold py-4 rounded-xl shadow-lg hover:shadow-[0_0_20px_-5px_#F1FF03] hover:scale-[1.02] hover:bg-yellow transition-all duration-300"
              >
                Claim My Free Session
              </a>
              <button onClick={closePopup} className="mt-4 text-xs text-gray-400 underline hover:text-gray-600 transition-colors">
                No thanks, I'm already happy with my fitness level.
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
