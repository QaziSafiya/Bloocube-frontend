"use client";
import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

type Testimonial = {
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Sarah Chen",
    role: "Marketing Director",
    company: "TechCorp",
    content:
      "This platform transformed our social media strategy completely. The analytics and automation features are game-changing.",
    avatar: "SC",
  },
  {
    name: "Mike Johnson",
    role: "Content Creator",
    company: "CreativeStudio",
    content:
      "The analytics insights helped us grow our audience by 300%. Best investment we've made for our content strategy.",
    avatar: "MJ",
  },
  {
    name: "Lisa Rodriguez",
    role: "Social Media Manager",
    company: "BrandForce",
    content:
      "Scheduling content has never been this intuitive and powerful. Our team's productivity increased dramatically.",
    avatar: "LR",
  },
];

const Testimonials: React.FC = () => {
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
          What Our{" "}
          <span className="bg-clip-text text-transparent  bg-gradient-to-r from-purple-500 to-indigo-500">
            Leaders
          </span>{" "}
          Say
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto px-4"
        >
          Hear from industry pioneers who trust us to elevate their social media
          presence
        </motion.p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="group relative rounded-xl p-6 sm:p-8 bg-gradient-to-br from-black/30 via-black/20 to-black/30 border border-purple-700/20 backdrop-blur-md hover:border-purple-500/40 transition-all duration-300 hover:shadow-[0_0_25px_rgba(128,0,255,0.4)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-300" />

            <div className="relative">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center text-sm sm:text-base font-bold text-white shrink-0 shadow-lg">
                  {testimonial.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-white text-base sm:text-lg mb-1 truncate">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-400">
                    {testimonial.role}
                  </p>
                  <p className="text-xs sm:text-sm text-purple-400 font-medium">
                    {testimonial.company}
                  </p>
                </div>
              </div>

              <p className="text-sm sm:text-base text-gray-200/90 leading-relaxed mb-4 line-clamp-3">
                "{testimonial.content}"
              </p>

              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
