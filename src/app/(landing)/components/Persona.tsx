"use client";
import React from "react";
import { motion } from "framer-motion";
import { User, Building2, CheckCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/Components/ui/card";

const personas = [
  {
    title: "Creators",
    icon: User,
    benefits: [
      "Smart Suggestions",
      "Auto-scheduling",
      "Audience Insights",
      "Performance Tracking",
    ],
  },
  {
    title: "Brands",
    icon: Building2,
    benefits: [
      "Competitor Analysis",
      "Campaign Manager",
      "Team Workflows",
      "Performance Reports",
    ],
  },
];

export default function Persona() {
  return (
    <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
      {/* Background Effects */}
      <div className="absolute inset-0  -z-10" />
      <div className="absolute -top-32 right-0 w-[45rem] h-[45rem]  blur-3xl -z-10" />
      <div className="absolute -bottom-32 left-0 w-[45rem] h-[45rem]  blur-3xl -z-10" />

      {/* Main Heading */}
      <div className="text-center mb-16 sm:mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white tracking-tight mb-4 sm:mb-6"
        >
          Customer{" "}
          <span className="bg-clip-text text-transparent  bg-gradient-to-r from-purple-500 to-indigo-500">
            Persona
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed"
        >
          Understand how creators and brands benefit from our platform.
        </motion.p>
      </div>

      {/* Persona Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
        {personas.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Card
              className="group relative rounded-2xl bg-white/[0.04] border border-white/10 
              backdrop-blur-xl shadow-[0_0_20px_rgba(0,0,0,0.3)]
              hover:shadow-[0_0_30px_rgba(168,85,247,0.25)]
              hover:border-white/20 hover:bg-white/[0.06]
              transition-all duration-500 ease-out p-6 sm:p-8 overflow-hidden"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-fuchsia-500/10" />
              </div>

              {/* Header */}
              <CardHeader className="relative flex flex-row items-center gap-4 sm:gap-6 pb-6 p-0 z-10">
                <div
                  className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-fuchsia-500 
                  flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.4)]
                  group-hover:shadow-[0_0_25px_rgba(236,72,153,0.5)]
                  transition-all duration-500 ease-out"
                >
                  <p.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-2xl sm:text-3xl font-bold text-white">
                  {p.title}
                </CardTitle>
              </CardHeader>

              {/* Benefits */}
              <CardContent className="relative z-10 p-0">
                <ul className="space-y-4">
                  {p.benefits.map((b) => (
                    <li
                      key={b}
                      className="flex items-center gap-4 group/item transition-all duration-300"
                    >
                      <div
                        className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-tr from-indigo-500/30 to-fuchsia-500/30
                        flex items-center justify-center group-hover/item:scale-110
                        transition-transform duration-300 ease-out"
                      >
                        <CheckCircle className="w-4 h-4 text-purple-400" />
                      </div>
                      <span className="text-base sm:text-lg text-zinc-300 group-hover/item:text-white transition-colors duration-300">
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
