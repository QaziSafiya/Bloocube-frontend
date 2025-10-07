"use client";
import React from "react";
import { motion } from "framer-motion";

const visualizations = [
  { label: "AI Analytics Dashboard" },
  { label: "Dynamic Content Planner" },
  { label: "Campaign Manager" },
];

const Visualization: React.FC = () => {
  return (
    <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-28">
      {/* Heading */}
      <div className="text-center mb-12 sm:mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4"
        >
          Visualize Your{" "}
          <span className="bg-clip-text text-transparent  bg-gradient-to-r from-purple-500 to-indigo-500">
            Success
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto px-4"
        >
          Explore our intuitive dashboards and powerful tools crafted to deliver
          a seamless and insightful user experience — bringing your data to
          life.
        </motion.p>
      </div>

      {/* Visualization Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
        {visualizations.map((card, index) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="group relative rounded-3xl border border-purple-700/20 bg-gradient-to-br from-black/30 via-black/20 to-black/30 backdrop-blur-md overflow-hidden hover:border-purple-500/40 transition-all duration-300 hover:shadow-[0_0_25px_rgba(128,0,255,0.4)]"
          >
            {/* Card Image Placeholder / Visual Section */}
            <div className="h-48 sm:h-56 w-full relative bg-gradient-to-br from-purple-700/20 via-indigo-600/10 to-pink-600/10 flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg sm:text-xl font-semibold text-purple-300/80"
              >
                ✦ Interactive Preview ✦
              </motion.div>
            </div>

            {/* Label Section */}
            <div className="relative px-4 sm:px-6 py-4 border-t border-purple-700/20 bg-black/40 backdrop-blur-md">
              <p className="text-sm sm:text-base font-semibold text-white">
                {card.label}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Visualization;
