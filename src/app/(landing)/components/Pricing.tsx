"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/Components/ui/Button";
import { CheckCircle } from "lucide-react";
import { Sparkles } from "lucide-react";

type Plan = {
  name: string;
  price: number;
  features: string[];
  popular?: boolean;
};

const plans: Plan[] = [
  {
    name: "Starter",
    price: 29,
    features: [
      "5 Social Accounts",
      "Basic Analytics",
      "Content Calendar",
      "Email Support",
    ],
  },
  {
    name: "Pro",
    price: 79,
    features: [
      "15 Social Accounts",
      "Advanced Analytics",
      "Team Collaboration",
      "Priority Support",
      "Custom Reports",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: 199,
    features: [
      "Unlimited Accounts",
      "White-label Solution",
      "API Access",
      "Dedicated Manager",
      "Custom Integrations",
    ],
  },
];

const Pricing: React.FC = () => {
  return (
    <section
      id="pricing"
      className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28"
    >
      {/* Heading */}
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 text-white leading-tight">
          Flexible Plans for Every
          <span className="bg-clip-text text-transparent  bg-gradient-to-r from-purple-500 to-indigo-500 ml-3">
            Vision
          </span>
        </h2>
        <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
          Choose the perfect plan to accelerate your social media journey,
          tailored to scale with your ambitions and deliver unmatched value.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="w-full"
          >
            <div
              className={`relative h-full rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 
              transition-all duration-300 hover:scale-[1.02] backdrop-blur-xl
              ${
                plan.popular
                  ? "bg-gradient-to-br from-purple-900/40 via-black/50 to-fuchsia-900/30 border border-purple-500/40 shadow-[0_8px_40px_rgba(139,92,246,0.3)]"
                  : "bg-black/40 border border-white/10 hover:border-purple-500/30 shadow-[0_4px_25px_rgba(0,0,0,0.25)]"
              }`}
            >
              {/* Most Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 text-white bg-gradient-to-r from-fuchsia-500 to-purple-500 shadow-lg">
                  <Sparkles className="w-4 h-4" />
                  Most Popular
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8 mt-2">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 text-white">
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
                    ${plan.price}
                  </span>
                  <span className="text-sm sm:text-base lg:text-lg text-zinc-400">
                    / month
                  </span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 sm:space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <motion.li
                    key={feature}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />
                    <span className="text-sm sm:text-base lg:text-lg text-zinc-300">
                      {feature}
                    </span>
                  </motion.li>
                ))}
              </ul>

              {/* CTA */}
              <div>
                {plan.popular ? (
                  <Button
                    size="lg"
                    className="w-full text-sm sm:text-base lg:text-lg bg-gradient-to-r from-fuchsia-500 to-purple-500 hover:opacity-90"
                  >
                    Choose Pro
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    className="
    w-full
    text-sm sm:text-base lg:text-lg
    border border-gray-400
    bg-transparent
    backdrop-blur-md
    text-white
    hover:border-purple-400
    hover:bg-white/10
    transition-all
    rounded-md
    py-2
  "
                  >
                    Get Started
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Trust Badge */}
      {/* <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-center mt-12"
      >
        <p className="text-sm md:text-base text-zinc-400">
          No credit card required • Cancel anytime • 14-day money-back guarantee
        </p>
      </motion.div> */}
    </section>
  );
};

export default Pricing;
