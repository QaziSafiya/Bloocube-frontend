"use client";
import React from "react";
import { motion } from "framer-motion";
import { Target, Globe, Shield, Bolt, BarChart3, Users } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/Components/ui/card";

const features = [
  {
    icon: Target,
    title: "Smart Targeting",
    desc: "AI-powered audience segmentation for maximum impact.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    desc: "Expand your presence across all major social platforms.",
  },
  {
    icon: Shield,
    title: "Brand Safety",
    desc: "Protect your brand with intelligent content monitoring.",
  },
  {
    icon: Bolt,
    title: "Automation",
    desc: "Streamline workflows with intelligent automation.",
  },
  {
    icon: BarChart3,
    title: "Deep Analytics",
    desc: "Comprehensive insights into your social performance.",
  },
  {
    icon: Users,
    title: "Team Sync",
    desc: "Collaborate seamlessly with your entire team.",
  },
];

const Features: React.FC = () => {
  return (
    <section
      id="features"
      className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28"
    >
      {/* Background Glow */}
      <div className="absolute inset-0opacity-90 -z-10" />
      <div className="absolute -top-24 right-0 w-[40rem] h-[40rem] blur-3xl -z-10" />
      <div className="absolute -bottom-24 left-0 w-[40rem] h-[40rem]  blur-3xl -z-10" />

      {/* Section Heading */}
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-6"
        >
          Unleash the Power of{" "}
          <span className="bg-clip-text text-transparent  bg-gradient-to-r from-purple-500 to-indigo-500">
            AI-Driven
          </span>{" "}
          Marketing
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed"
        >
          Transform your social media strategy with intelligent tools that give
          you predictive insights, creative freedom, and full control — all in
          one place.
        </motion.p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
          >
            <Card
              className="group relative rounded-2xl bg-white/[0.04] border border-white/10 
              backdrop-blur-xl shadow-[0_0_20px_rgba(0,0,0,0.3)]
              hover:shadow-[0_0_30px_rgba(168,85,247,0.25)]
              hover:border-white/20 hover:bg-white/[0.06]
              transition-all duration-500 ease-out p-6 overflow-hidden"
            >
              {/* Subtle gradient overlay on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-fuchsia-500/10" />
              </div>

              <CardHeader className="flex flex-col items-start space-y-4 p-0 pb-3 relative z-10">
                <div
                  className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-fuchsia-500 
                  flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.4)]
                  group-hover:shadow-[0_0_25px_rgba(236,72,153,0.5)]
                  transition-all duration-500 ease-out"
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl sm:text-2xl font-semibold text-white">
                  {feature.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="relative z-10 p-0">
                <p className="text-zinc-400 text-base leading-relaxed">
                  {feature.desc}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Features;
