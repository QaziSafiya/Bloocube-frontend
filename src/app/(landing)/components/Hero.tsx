"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/Components/ui/Button";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaSlack,
  FaGithub,
  FaDiscord,
  FaRedditAlien,
} from "react-icons/fa";

const Hero: React.FC = () => {
  const words = ["workspace", "center", "OS"];
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index];
    const atWordEnd = subIndex === current.length;
    const atWordStart = subIndex === 0;

    const timeout = setTimeout(
      () => {
        setSubIndex((prev) => prev + (deleting ? -1 : 1));
        if (!deleting && atWordEnd) {
          setDeleting(true);
        } else if (deleting && atWordStart) {
          setDeleting(false);
          setIndex((prev) => (prev + 1) % words.length);
        }
      },
      deleting ? 75 : 105
    );

    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index]);

  return (
    <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 md:pt-20 pb-16 sm:pb-20 md:pb-28">
      {/* Floating icons */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Top Left Cluster */}
        <FaFacebookF className="hidden sm:block absolute top-12 left-8 text-indigo-400/30 text-2xl md:text-4xl animate-drift-a glow delay-0" />
        <FaInstagram className="hidden sm:block absolute top-24 left-1/4 text-fuchsia-400/30 text-2xl md:text-4xl animate-drift-b glow delay-1" />
        <FaLinkedinIn className="hidden sm:block absolute top-80 left-1/8 text-sky-400/30 text-2xl md:text-4xl animate-drift-c glow delay-2" />

        {/* Top Right Cluster */}
        <FaYoutube className="hidden sm:block absolute top-16 right-10 text-rose-400/30 text-3xl md:text-5xl animate-drift-a glow delay-3" />
        <FaTwitter className="hidden sm:block absolute top-32 right-1/4 text-sky-300/30 text-2xl md:text-4xl animate-drift-b glow delay-4" />
        <FaGithub className="hidden sm:block absolute top-82 right-12 text-neutral-300/30 text-2xl md:text-4xl animate-drift-c glow delay-5" />

        {/* Bottom Area for More Depth */}
        <FaDiscord className="hidden sm:block absolute bottom-20 left-1/5 text-indigo-400/25 text-2xl md:text-4xl animate-drift-a glow delay-6" />
        <FaRedditAlien className="hidden sm:block absolute bottom-28 right-1/-6 text-orange-400/25 text-2xl md:text-4xl animate-drift-b glow delay-7" />
        <FaSlack className="hidden sm:block absolute bottom-10 right-1/8 text-pink-400/25 text-2xl md:text-4xl animate-drift-c glow delay-8" />
      </div>

      <div className="text-center">
        {/* Hero Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className=" bg-clip-text text-transparent  bg-gradient-to-r from-purple-500 to-indigo-500
             text-[2.2rem] sm:text-[3.2rem] md:text-[3.8rem] lg:text-[4.2rem] xl:text-[4.6rem] 
             font-extrabold mb-4 leading-snug tracking-tight max-w-5xl mx-auto px-2"
        >
          Your Social media
          <br className="block sm:hidden" />
          <span className="bg-clip-text text-transparent  bg-gradient-to-r from-purple-500 to-indigo-500 ml-4">
            {words[index].substring(0, subIndex)}
          </span>
          <span className="ml-1 inline-block h-[1em] w-px align-middle bg-white/70 animate-caret" />
        </motion.h1>

        {/* Sub-heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mx-auto mb-6 inline-flex flex-wrap items-center justify-center gap-2 px-4 py-2 text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto px-4 text-zinc-300 backdrop-blur-md"
        >
          AI-powered social marketing OS
          <span className="h-1 w-1 rounded-full bg-emerald-400/80" />
          Ship content with confidence
        </motion.div>

        {/* Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto px-4"
        >
          Operate campaigns, insights, and publishing from one streamlined
          system. Enterprise-grade security, delightful UX.
        </motion.p>

        {/* Attractive Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={(e) => e.preventDefault()}
          className="mx-auto mt-12 flex w-full max-w-md sm:max-w-xl lg:max-w-2xl flex-row gap-2 sm:gap-3 rounded-xl border border-white/10 bg-white/[0.05] p-1 sm:p-2 backdrop-blur-md shadow-lg hover:shadow-xl transition flex-nowrap"
        >
          <input
            type="email"
            placeholder="Enter your work email..."
            className="flex-1 min-w-0 bg-transparent px-3 sm:px-4 py-2 text-sm sm:text-base md:text-base text-white placeholder:text-zinc-400 focus:outline-none rounded-full"
          />
          <Button
            // size="md"
            className="w-auto rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
                       hover:opacity-90 transition text-white font-semibold 
                       px-2 sm:px-4 py-3 sm:py-2 flex items-center justify-center gap-1 sm:gap-2 whitespace-nowrap text-sm sm:text-base"
          >
            Start free trial
            <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.form>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 sm:mt-2 text-center"
        >
          <span className="!text-xs sm:!text-sm text-zinc-500 whitespace-nowrap">
            By continuing you agree to our Terms and Privacy Policy.
          </span>
        </motion.p>

        {/* Trusted By */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mx-auto mt-12 flex flex-col items-center gap-2 sm:gap-3 opacity-90 max-w-full"
        >
          {/* Trusted by text */}
          <span className="text-sm sm:text-base text-zinc-500 mb-2">
            Trusted by teams at
          </span>

          {/* Brand names */}
          <div className="flex flex-row flex-wrap justify-center gap-3 overflow-x-auto w-full sm:w-auto">
            {["Acme Co.", "Vertex Labs", "Northstar", "Everline"].map(
              (brand) => (
                <span
                  key={brand}
                  className="whitespace-nowrap rounded-md border border-white/10 bg-white/[0.08] px-4 py-1.5 text-sm sm:text-base text-zinc-200"
                >
                  {brand}
                </span>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
