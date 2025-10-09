"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Button from "@/Components/ui/Button";

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setIsLoading(true);

    if (!email) {
      setError("Please enter your email");
      setIsLoading(false);
      return;
    }

    try {
      const base = process.env.NEXT_PUBLIC_API_URL as string;
      const res = await fetch(`${base}/api/auth/request-password-reset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || data.error || "Failed to send reset email"
        );
      }

      setMessage(
        "If an account exists, a reset link has been sent to your email."
      );
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_0_25px_rgba(99,102,241,0.25)] p-6 overflow-hidden"
      >
        {/* Glowing elements */}
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-tl-2xl blur-3xl opacity-40 pointer-events-none" />
        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-tl from-fuchsia-600 to-cyan-600 rounded-br-2xl blur-3xl opacity-40 pointer-events-none" />

        <h2 className="text-3xl font-semibold text-center bg-gradient-to-r from-indigo-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent mb-6">
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 placeholder:text-white/50 text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
          />

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-11 bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 hover:from-indigo-500 hover:to-fuchsia-500 rounded-lg text-white font-semibold shadow-md hover:shadow-[0_0_15px_rgba(147,51,234,0.4)] transition-all duration-300 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Sending...
              </div>
            ) : (
              <>
                Send Reset Link
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </form>

        {message && (
          <p className="text-green-400 mt-4 text-center">{message}</p>
        )}
        {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
      </motion.div>
    </section>
  );
};

export default ForgotPasswordPage;
