"use client";
import React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/Components/ui/card";
import { Link as LinkIcon, LineChart, Megaphone } from "lucide-react";

const steps = [
  {
    icon: LinkIcon,
    title: "Connect Accounts",
    desc: "Securely link your social profiles and unify your data pipeline.",
  },
  {
    icon: LineChart,
    title: "AI-Driven Insights",
    desc: "Unlock patterns and recommendations with predictive analytics.",
  },
  {
    icon: Megaphone,
    title: "Amplify & Grow",
    desc: "Schedule, publish, and iterate with intelligent automation.",
  },
];

const Automation: React.FC = () => {
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
          Seamlessly Integrate and{" "}
          <span className="bg-clip-text text-transparent  bg-gradient-to-r from-purple-500 to-indigo-500">
            Automate
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto px-4"
        >
          Get started in three simple steps and revolutionize your social
          presence — optimizing workflows and maximizing impact with intelligent
          automation.
        </motion.p>
      </div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
          >
            <Card
              className="group h-full rounded-3xl border border-purple-700/20 bg-gradient-to-br from-black/30 via-black/20 to-black/30 
              backdrop-blur-md hover:border-purple-500/40 transition-all duration-300 
              hover:shadow-[0_0_25px_rgba(128,0,255,0.4)] hover:scale-[1.02]"
            >
              <CardHeader className="flex flex-col items-center space-y-4 pb-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center shadow-[0_0_20px_rgba(128,0,255,0.5)] group-hover:scale-105 transition-transform duration-300">
                  <step.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
                <CardTitle className="text-lg sm:text-xl md:text-2xl font-semibold text-white text-center">
                  {step.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="pt-0 px-4 sm:px-6 pb-6">
                <p className="text-sm sm:text-base text-gray-300 text-center leading-relaxed">
                  {step.desc}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Automation;
