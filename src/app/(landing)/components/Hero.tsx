"use client";
import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ArrowRight, Sparkles, Users } from "lucide-react";
import Button from "@/Components/ui/Button";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaShoppingBag,
  FaTiktok,
  FaCamera,
  FaPalette,
  FaPinterest,
  FaSlack,
  FaDiscord,
} from "react-icons/fa";

// Constants
const allIcons = [
  { icon: FaCamera, mode: "creator" },
  { icon: FaInstagram, mode: "creator" },
  { icon: FaTiktok, mode: "creator" },
  { icon: FaLinkedinIn, mode: "brand" },
  { icon: FaFacebookF, mode: "brand" },
  { icon: FaYoutube, mode: "creator" },
  { icon: FaTwitter, mode: "creator" },
  { icon: FaPalette, mode: "creator" },
  { icon: FaShoppingBag, mode: "brand" },
  { icon: FaPinterest, mode: "brand" },
  { icon: FaDiscord, mode: "creator" },
  { icon: FaSlack, mode: "brand" },
];

const outerPositions = [
  { top: "0%", left: "50%" },
  { top: "15%", left: "80%" },
  { top: "50%", left: "95%" },
  { top: "80%", left: "80%" },
  { top: "90%", left: "50%" },
  { top: "90%", left: "20%" },
  { top: "40%", left: "0%" },
  { top: "15%", left: "20%" },
  { top: "50%", left: "20%" },
  { top: "50%", left: "80%" },
  { top: "30%", left: "10%" },
  { top: "70%", left: "90%" },
];

// Animation Variants
const slideVariants: Variants = {
  hidden: (dir: number = 1) => ({
    opacity: 0,
    x: dir > 0 ? 25 : -25,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: (dir: number = 1) => ({
    opacity: 0,
    x: dir > 0 ? -25 : 25,
    transition: { duration: 0.25, ease: "easeIn" },
  }),
};

const Hero = React.memo(() => {
  const [activeMode, setActiveMode] = useState<"creator" | "brand">("creator");

  // Toggle every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMode((prev) => (prev === "creator" ? "brand" : "creator"));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const direction = activeMode === "creator" ? 1 : -1;

  const colorList = useMemo(
    () => [
      "text-cyan-400",
      "text-purple-400",
      "text-pink-400",
      "text-indigo-400",
      "text-blue-400",
    ],
    []
  );

  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    setIsFirstRender(false);
  }, []);
  return (
    <div className="min-h-screen relative overflow-hidden mt-16">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 md:w-96 h-72 md:h-96 rounded-full blur-3xl bg-cyan-500/10 animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-72 md:w-96 h-72 md:h-96 rounded-full blur-3xl bg-purple-500/10 animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-20 flex flex-col lg:flex-row items-start gap-10">
        {/* LEFT SECTION */}
        <div className="flex-1 text-center lg:text-left min-h-[280px]">
          {/* Toggle Button with animation */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeMode}
              custom={direction}
              initial={isFirstRender ? false : { opacity: 0, y: -10 }} // first render ke liye no animation
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15, ease: "easeInOut" }}
              className="flex justify-center lg:justify-start mb-6"
            >
              <button
                className={`flex items-center gap-2 px-5 py-2 rounded-full border shadow-lg transition-all duration-300 hover:scale-105 ${
                  activeMode === "creator"
                    ? "border-cyan-400 text-cyan-400 hover:shadow-cyan-500/40"
                    : "border-purple-400 text-purple-400 hover:shadow-purple-500/40"
                }`}
              >
                {activeMode === "creator" ? (
                  <Sparkles className="w-4 h-4" />
                ) : (
                  <Users className="w-4 h-4" />
                )}
                {activeMode === "creator" ? "Creator" : "Brand"}
              </button>
            </motion.div>
          </AnimatePresence>

          {/* Heading & Paragraph - No animation, immediate load */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 leading-snug">
            {activeMode === "creator"
              ? "Launch Your Next Creator Campaign in Minutes"
              : "Redefining How Brands & Creators Grow"}
          </h1>
          <p className="text-zinc-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0">
            {activeMode === "creator"
              ? "Discover verified creators, manage payments, and measure ROI — all in one platform."
              : "Join our exclusive private beta and experience smarter collaborations with AI technology."}
          </p>

          {/* Email Input */}
          <form className="w-full max-w-xl mb-8 mt-8 mx-auto lg:mx-0">
            <div className="relative w-full">
              <input
                type="email"
                placeholder="Enter your work email..."
                className="w-full rounded-xl pr-32 pl-5 py-3 sm:py-4 text-sm sm:text-base text-white placeholder-zinc-400 bg-white/10 backdrop-blur-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 transition-all duration-300"
              />
              <Button
                type="submit"
                className="absolute top-1/2 right-1.5 -translate-y-1/2 rounded-xl px-3 py-[9px] sm:py-[10px] text-[12px] sm:text-sm md:text-base font-medium flex items-center gap-2
             bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500"
              >
                Start Free Trial
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </form>

          <p className="text-xs text-zinc-500 text-center lg:text-left mt-3">
            By continuing you agree to our Terms and Privacy Policy.
          </p>

          {/* Brand badges */}
          <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-3">
            {["Acme Co.", "Vertex Labs", "Northstar", "Everline"].map(
              (brand) => (
                <span
                  key={brand}
                  className="px-4 py-2 rounded-md text-sm text-zinc-200 bg-white/5 border border-white/10 backdrop-blur-md"
                >
                  {brand}
                </span>
              )
            )}
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex-shrink-0 flex justify-center w-full lg:w-auto mt-10 lg:mt-0">
          <div className="relative w-[300px] md:w-[400px] h-[300px] md:h-[400px]">
            {/* Concentric Circles */}
            {/* Concentric Circles */}
            {[10, 20, 30].map((v, i) => (
              <div
                key={i}
                className={`absolute rounded-full border`}
                style={{
                  top: `${v}%`,
                  left: `${v}%`,
                  right: `${v}%`,
                  bottom: `${v}%`,
                  borderColor: `rgba(255,255,255,${(10 + i * 10) / 100})`,
                }}
              />
            ))}

            {/* Center Text */}
            <div className="absolute inset-0 flex items-center justify-center text-center">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-white">
                  20k+
                </div>
                <div className="text-sm text-zinc-400">Specialists</div>
              </div>
            </div>

            {/* Floating Icons */}
            {allIcons.map(({ icon: Icon, mode }, i) => {
              const color = colorList[i % colorList.length];
              const isActive = activeMode === mode;

              return (
                <motion.div
                  key={i}
                  animate={{
                    scale: isActive ? 1.1 : 0.9,
                    opacity: isActive ? 1 : 0.4,
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute w-9 md:w-12 h-9 md:h-12 flex items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-md"
                  style={{
                    ...outerPositions[i],
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <Icon className={`text-lg ${color}`} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
});

export default Hero;
