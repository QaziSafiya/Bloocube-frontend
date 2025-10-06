"use client";
import React from "react";
import { motion } from "framer-motion";

const AboutPage: React.FC = () => {
  return (
    <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-20 sm:pt-24 md:pt-28 pb-20 sm:pb-28">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          About <span className="text-gradient-primary">Bloocube</span>
        </h1>
        <p className="mt-4 text-sm md:text-base text-zinc-300 max-w-2xl mx-auto">
          We’re building the AI-powered operating system for social media growth—uniting brands and creators with
          automation, insights, and a seamless marketplace.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4 }}
          className="relative rounded-2xl p-6 bg-white/[0.04] border border-white/10 backdrop-blur"
        >
          <h3 className="text-white font-semibold mb-2">Our Mission</h3>
          <p className="text-sm text-zinc-400">Empower every team to create, collaborate, and grow—with clarity and speed.</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="relative rounded-2xl p-6 bg-white/[0.04] border border-white/10 backdrop-blur"
        >
          <h3 className="text-white font-semibold mb-2">What We’re Building</h3>
          <p className="text-sm text-zinc-400">An AI-first suite for planning, publishing, insights, and brand‑creator collaboration.</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative rounded-2xl p-6 bg-white/[0.04] border border-white/10 backdrop-blur"
        >
          <h3 className="text-white font-semibold mb-2">Why Now</h3>
          <p className="text-sm text-zinc-400">Content velocity is everything—AI makes quality and speed possible together.</p>
        </motion.div>
      </div>
    </main>
  );
};

export default AboutPage;


