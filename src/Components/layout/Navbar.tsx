"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Menu, X } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import { Button } from "../ui/Button";

const navItems = [
  { href: "#hero", label: "Home" },
  { href: "/component/about", label: "About" },
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#resources", label: "Resources" },
  { href: "#product", label: "Product" },
];

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close menu on scroll for better UX
  useEffect(() => {
    const handleScroll = () => setOpen(false);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={clsx(
        "sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-md transition duration-500",
        mounted ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
      )}
    >
      <div className="max-w-7xl mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2">
          <motion.div
            whileHover={{ rotate: 8 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="w-9 h-9 bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-lg flex items-center justify-center shadow-[0_0_24px_rgba(99,102,241,0.25)]"
          >
            <Zap className="w-4 h-4 text-white" />
          </motion.div>
          <span className="text-lg font-semibold bg-gradient-to-r from-indigo-300 via-purple-300 to-sky-300 bg-clip-text text-transparent tracking-tight">
            Bloocube
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-7 text-lg">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group relative text-zinc-300/90 hover:text-white transition-colors"
            >
              {item.label}
              <span className="absolute left-0 -bottom-1 h-px w-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-sky-500 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
          <Link href="/signup">
            <Button
              // size="sm"
              className="px-5 py-3  rounded-sm bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white shadow-md hover:opacity-90 transition"
            >
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          aria-label="Toggle navigation"
          onClick={() => setOpen((prev) => !prev)}
          className="md:hidden inline-flex items-center justify-center rounded-md border border-white/10 bg-white/[0.06] p-2 text-white hover:bg-white/[0.1] transition"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden border-t border-white/10 bg-black/70 backdrop-blur-sm"
          >
            <div className="flex flex-col gap-3 px-5 py-3 text-sm">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-zinc-300 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <Link href="/signup" onClick={() => setOpen(false)}>
                <Button
                  size="sm"
                  className="mt-8 w-full px-4 py-2 font-medium 
               bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white 
               shadow hover:opacity-90 transition 
               rounded-xl md:rounded-xl" // 🌟 Added this line
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gradient Border */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-blue-500/0 via-purple-500/60 to-blue-500/0" />
    </motion.nav>
  );
};

export default Navbar;
