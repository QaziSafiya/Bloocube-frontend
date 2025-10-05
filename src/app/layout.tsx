import type { Metadata } from "next";
import "./globals.css";
import { PerformanceDebugger } from "@/Components/PerformanceDebugger";
import TopProgressBar from "@/Components/ui/TopProgressBar";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { loadingManager } from "@/lib/loading";

export const metadata: Metadata = {
  title: "Bloocube",
  description: "A social media workspace powered by AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Detect route changes to show loader briefly between transitions
  // Note: This hook is a no-op during SSR
  const pathname = usePathname?.();
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!pathname) return;
    // Start loading and auto-complete shortly after to reflect navigation
    loadingManager.start();
    const t = setTimeout(() => loadingManager.done(), 300);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <TopProgressBar />
        {children}
        {process.env.NODE_ENV === 'development' && <PerformanceDebugger />}
      </body>
    </html>
  );
}
