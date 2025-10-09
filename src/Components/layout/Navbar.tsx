"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Button from "@/Components/ui/Button";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import clsx from "clsx";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/#features", label: "Features" },
  { href: "/#pricing", label: "Pricing" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      initial={false} // disables mount animation
      className="sticky top-0 z-50 w-full"
    >
      <div className="relative w-full">
        {/* Navbar container */}
        <div className="relative backdrop-blur-xl bg-black/80 shadow-[0_8px_32px_rgba(0,0,0,0.3)] w-full transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)]">
          {/* Gradient hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-fuchsia-500/20 opacity-0 hover:opacity-100 transition-opacity duration-150" />

          <div className="relative z-10 w-full">
            <div className="max-w-full mx-auto px-3 sm:px-4 md:px-6">
              <div className="flex h-14 md:h-16 items-center justify-between w-full">
                {/* Logo */}
                <Link href="/" className="group">
                  <motion.div
                    whileHover={{ rotate: 6, scale: 1.05 }}
                    className="relative w-20 h-20 transition-all duration-300 overflow-hidden"
                  >
                    <Image
                      src="/logo.png"
                      alt="Bloocube Logo"
                      fill
                      className="object-contain p-1"
                      priority
                    />
                  </motion.div>
                </Link>

                {/* Desktop nav */}
                <div className="hidden md:flex items-center gap-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={(e) => {
                        const isHash =
                          item.href.startsWith("#") ||
                          item.href.startsWith("/#");
                        if (
                          isHash &&
                          typeof window !== "undefined" &&
                          window.location.pathname === "/"
                        ) {
                          e.preventDefault();
                          const hash = item.href.split("#")[1];
                          const el = hash
                            ? document.getElementById(hash)
                            : null;
                          if (el) {
                            el.scrollIntoView({
                              behavior: "smooth",
                              block: "start",
                            });
                            setOpen(false);
                          }
                        }
                      }}
                      className="group relative text-zinc-300/90 hover:text-white transition-all duration-300 py-2 px-4 rounded-none hover:bg-white/5"
                    >
                      <span className="font-medium">{item.label}</span>
                      <span className="absolute left-4 right-4 -bottom-1 h-px w-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-sky-500 transition-all duration-300 group-hover:w-[calc(100%-2rem)]" />
                    </Link>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="hidden md:flex items-center gap-3">
                  <Link href="/login">
                    <Button
                      variant="outline"
                      size="md"
                      className="px-4 py-2 border-white/20 rounded-xl hover:border-white/40 hover:bg-white/5 transition-all duration-300"
                    >
                      Sign In
                    </Button>
                  </Link>
                </div>

                {/* Mobile menu toggle */}
                <button
                  aria-label="Toggle navigation"
                  className="md:hidden inline-flex items-center justify-center p-5 text-white hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300 hover:scale-105 rounded-none"
                  onClick={() => setOpen(!open)}
                >
                  {open ? (
                    <X className="w-5 h-5" />
                  ) : (
                    <Menu className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.15 }}
          className="md:hidden mt-4 border border-white/10 bg-black/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] overflow-hidden rounded-none"
        >
          <div className="max-w-full mx-auto px-4 py-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block text-zinc-300 hover:text-white transition-all duration-200 py-2 px-3 rounded-none hover:bg-white/5"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-white/10 space-y-3">
              <Link href="/login" onClick={() => setOpen(false)}>
                <Button
                  variant="outline"
                  size="md"
                  className="w-full border-white/20 hover:border-white/40 rounded-3xl"
                >
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
