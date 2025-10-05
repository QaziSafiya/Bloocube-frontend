"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { loadingManager } from "@/lib/loading";
import TopProgressBar from "@/Components/ui/TopProgressBar";

export default function RouteProgress() {
  const pathname = usePathname();

  useEffect(() => {
    // Immediate feedback on internal link clicks with a tiny fade cue
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const anchor = target.closest('a') as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute('href') || '';
      const isInternal = href.startsWith('/') && !href.startsWith('//');
      const isModified = e.metaKey || e.ctrlKey || e.shiftKey || e.altKey;
      const isNewTab = anchor.target === '_blank';
      if (isInternal && !isModified && !isNewTab) {
        loadingManager.start();
        // Safety timeout in case navigation is prevented
        const t = setTimeout(() => loadingManager.done(), 1500);
        // Clear timeout on next tick when pathname effect runs
        setTimeout(() => clearTimeout(t), 0);
      }
    };
    const options: AddEventListenerOptions = { capture: true, passive: true };
    document.addEventListener('click', handleClick, options);
    return () => document.removeEventListener('click', handleClick, options);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!pathname) return;
    // Delay done slightly to allow route content to paint and feel smooth
    loadingManager.start();
    const t = setTimeout(() => loadingManager.done(), 480);
    return () => clearTimeout(t);
  }, [pathname]);

  return <TopProgressBar />;
}


