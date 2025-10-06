"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Button from "@/Components/ui/Button";
import Link from "next/link";
import { apiRequest } from "@/lib/apiClient";

// Use centralized API client to avoid bad base URL concatenation

const SignupPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [role, setRole] = useState("creator"); // default role
  const [error, setError] = useState<string | null>(null);

  // Auto-fill email from URL parameter
  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(decodeURIComponent(emailParam));
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // ✅ Basic validation
    if (!name || !email || !password || !confirm) {
      setError("All fields are required");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      const data = await apiRequest<{ success: boolean; data: { tokens?: { accessToken: string; refreshToken?: string }; user?: { role: string } }; message?: string }>(
        '/api/auth/register',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password, role })
        }
      );

      console.log("✅ Signup successful:", data);

      // If backend returns tokens and user, auto-login; else fallback to login
      if (data?.data?.tokens?.accessToken && data?.data?.user) {
        localStorage.setItem('token', data.data.tokens.accessToken);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        const role = data.data.user?.role;
        router.push(role === 'brand' ? '/brand' : '/creator');
      } else {
        router.push('/login');
      }
    } catch (err: unknown) {
      console.error("Signup error:", err instanceof Error ? err.message : 'Unknown error');
      setError("Network error. Please try again later.");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-8 lg:px-16 xl:px-24">
        <div className="w-full max-w-7xl flex">
          {/* Left Side - Banner Section */}
          <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 flex-col justify-center pr-8 xl:pr-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-lg"
          >
            <h1 className="text-4xl xl:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-300 via-purple-300 to-sky-300 bg-clip-text text-transparent">
              Join the BlooCube Revolution
            </h1>
            <p className="text-xl text-zinc-300 mb-8 leading-relaxed">
              Start your journey with AI-powered social media management. Connect with creators, grow your brand, and scale your impact.
            </p>
            
            {/* Feature highlights */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">🎯</span>
                </div>
                <span className="text-zinc-300">Smart campaign management</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">💡</span>
                </div>
                <span className="text-zinc-300">AI content suggestions</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">🤝</span>
                </div>
                <span className="text-zinc-300">Connect with top creators</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">📈</span>
                </div>
                <span className="text-zinc-300">Real-time performance tracking</span>
              </div>
            </div>
          </motion.div>
        </div>

          {/* Right Side - Signup Form */}
          <div className="w-full lg:w-1/2 xl:w-2/5 flex items-center justify-center pl-8 xl:pl-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md bg-black/80 backdrop-blur-xl rounded-3xl p-8 text-white border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Create Your Account</h2>
              <p className="text-zinc-400">Join thousands of creators and brands</p>
              {searchParams.get('email') && (
                <div className="mt-3 px-3 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                  <p className="text-sm text-emerald-300">
                    ✨ Email pre-filled from landing page
                  </p>
                </div>
              )}
            </div>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 border border-white/10"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 border border-white/10"
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 border border-white/10"
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 border border-white/10"
                />
              </div>
              <div>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 border border-white/10"
                >
                  <option value="creator" className="bg-black text-white">Creator</option>
                  <option value="brand" className="bg-black text-white">Brand</option>
                </select>
              </div>
              <Button type="submit" size="md" className="w-full mt-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                Create Account
              </Button>
            </form>

            {error && <p className="text-red-400 mt-4 text-sm text-center">{error}</p>}

            <div className="mt-6 text-sm text-white/70 text-center">
              Already have an account?{" "}
              <Link href="/login" className="hover:text-white font-medium transition-colors">
                Sign In
              </Link>
            </div>
          </motion.div>
          </div>
        </div>
    </section>
  );
};

export default SignupPage;
