"use client";
import React, { useEffect, useState } from 'react';
import { loadingManager } from '@/lib/loading';

export default function TopProgressBar() {
  const [activeCount, setActiveCount] = useState(0);
  const [width, setWidth] = useState(0);
  const isActive = activeCount > 0;

  useEffect(() => {
    const unsubscribe = loadingManager.subscribe(setActiveCount);
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!isActive) {
      setWidth(100);
      const t = setTimeout(() => setWidth(0), 200);
      return () => clearTimeout(t);
    }

    // When active, increment width gradually and cap below 90% to avoid full until done
    setWidth((w) => (w === 0 ? 15 : w));
    const interval = setInterval(() => {
      setWidth((prev) => {
        if (prev < 85) return prev + Math.random() * 10;
        if (prev < 92) return prev + Math.random() * 2;
        return prev;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[9999] h-0">
      <div
        className="h-0.5 bg-gradient-to-r from-fuchsia-500 via-blue-500 to-emerald-400 transition-[width,opacity] duration-200 ease-out shadow-[0_0_8px_2px_rgba(99,102,241,0.3)]"
        style={{ width: `${width}%`, opacity: isActive || width > 0 ? 1 : 0 }}
      />
      {/* Glow */}
      <div
        className="h-0.5 mt-[1px] bg-gradient-to-r from-fuchsia-500/25 via-blue-500/25 to-emerald-400/25 blur-sm transition-opacity"
        style={{ opacity: isActive || width > 0 ? 1 : 0 }}
      />
    </div>
  );
}


