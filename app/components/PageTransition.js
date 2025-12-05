'use client';


import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

export default function CircleTransition({ children }) {
  const pathname = usePathname();
  const isFirstLoad = useRef(true);
  const [displayChildren, setDisplayChildren] = useState(children);
  const [showExit, setShowExit] = useState(false);
  const [showEnter, setShowEnter] = useState(false);

  // Handle route changes for animation
  useEffect(() => {
    if (isFirstLoad.current) {
      setDisplayChildren(children);
      isFirstLoad.current = false;
      return;
    }
    setShowExit(true);
    // Delay updating children until after exit animation
    const exitTimeout = setTimeout(() => {
      setShowExit(false);
      setShowEnter(true);
      setDisplayChildren(children); // update content after exit animation
      // After enter animation, hide enter
      setTimeout(() => setShowEnter(false), 700);
    }, 700);
    return () => clearTimeout(exitTimeout);
  }, [children, pathname]);

  return (
    <div style={{ position: 'relative' }}>
      {/* Exit animation: expanding circle */}
      {showExit && (
        <motion.div
          className="fixed inset-0 z-50 bg-black pointer-events-none"
          initial={{ clipPath: "circle(0% at 50% 50%)" }}
          animate={{ clipPath: "circle(150% at 50% 50%)" }}
          exit={{}}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        />
      )}
      {/* Enter animation: shrinking circle */}
      {showEnter && (
        <motion.div
          className="fixed inset-0 z-50 bg-black pointer-events-none"
          initial={{ clipPath: "circle(150% at 50% 50%)" }}
          animate={{ clipPath: "circle(0% at 50% 50%)" }}
          exit={{}}
          transition={{ duration: 0.7, delay: 0.05, ease: [0.76, 0, 0.24, 1] }}
        />
      )}
      {/* Content wrapper - fade in after transition */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: showEnter ? 0.8 : 0 }}
      >
        {displayChildren}
      </motion.div>
    </div>
  );
}