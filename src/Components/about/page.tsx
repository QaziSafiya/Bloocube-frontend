"use client";

import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0B1E] via-[#0E0F2A] to-[#14152F] relative overflow-hidden text-white">
      {/* Floating Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        />
      </div>

      {/* Content Section */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-24">
        {/* Heading */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6"
          >
            About{" "}
            <span className="bg-gradient-to-tr from-indigo-500 to-fuchsia-500 bg-clip-text text-transparent">
              Bloocube
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            We're building the AI-powered operating system for social media
            growth — uniting brands and creators with automation, insights, and
            a seamless marketplace.
          </motion.p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Our Mission",
              desc: "Empower every team to create, collaborate, and grow—with clarity and speed.",
              icon: (
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              ),
              gradient: "from-indigo-500 to-fuchsia-500",
            },
            {
              title: "What We're Building",
              desc: "An AI-first suite for planning, publishing, insights, and brand-creator collaboration.",
              icon: (
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              ),
              gradient: " from-indigo-500 to-fuchsia-500 ",
            },
            {
              title: "Why Now",
              desc: "Content velocity is everything — AI makes quality and speed possible together.",
              icon: (
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ),
              gradient: "from-indigo-500 to-fuchsia-500",
            },
          ].map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative rounded-3xl p-8 bg-[#0F101F]/60 border border-white/10 backdrop-blur-xl shadow-lg hover:shadow-purple-500/10 transition-all duration-300 overflow-hidden"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-tr ${card.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-3xl`}
              />
              <div className="relative z-10">
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${card.gradient} mb-6 shadow-md flex items-center justify-center`}
                >
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{card.title}</h3>
                <p className="text-gray-400 leading-relaxed">{card.desc}</p>
              </div>
              {/* Subtle shimmer */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[shimmer_2s_linear_infinite] pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
      </main>
    </div>
  );
};

export default About;
