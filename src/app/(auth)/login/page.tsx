"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/Components/ui/Button";
import { apiRequest } from "@/lib/apiClient";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { config } from "@/lib/config"; // Unused import

// Use centralized API client to avoid bad base URL concatenation

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Simple validation
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      const data = await apiRequest<{ success: boolean; data: { tokens: { accessToken: string; refreshToken?: string }; user: { role: string } }; message?: string }>(
        '/api/auth/login',
        {
          method: 'POST',
          body: JSON.stringify({ email, password }),
          headers: { 'Content-Type': 'application/json' }
        }
      );

      // Store tokens for authenticated API calls and refresh flow
      localStorage.setItem("token", data.data.tokens.accessToken);
      if (data.data.tokens.refreshToken) {
        localStorage.setItem("refreshToken", data.data.tokens.refreshToken);
      }
      localStorage.setItem("user", JSON.stringify(data.data.user));
      
      // Clear auth cache to ensure fresh token is used
      const { authUtils } = await import('@/lib/auth');
      authUtils.clearCache();
      
      console.log('🔑 Login successful - Token stored:', {
        hasToken: !!data.data.tokens.accessToken,
        tokenLength: data.data.tokens.accessToken?.length || 0,
        user: data.data.user
      });
      

      const role = data.data.user?.role;
      if (role === 'brand') {
        router.push('/brand');
      } else {
        router.push('/creator');
      }
    } catch (err: unknown) {
      setError("Network error. Please try again later.");
      console.error("Login error:", err instanceof Error ? err.message : 'Unknown error');
    }
  };

  const handleGoogle = async () => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      if (!token) {
        localStorage.setItem('token', 'guest');
      }
      const callbackUrl = `${window.location.origin}/auth/google/callback`;
      const data = await apiRequest<{ success: boolean; authURL?: string; state?: string; message?: string; error?: string }>(
        '/api/google/auth-url',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token') || 'guest'}` },
          body: JSON.stringify({ redirectUri: callbackUrl })
        }
      );
      if (!data.success || !data.authURL) {
        setError(data.message || data.error || 'Failed to start Google auth');
        return;
      }
      localStorage.setItem('google_state', data.state || '');
      window.location.href = data.authURL;
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : 'Failed to start Google auth';
      setError(errorMessage);
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
              Welcome Back to BlooCube
            </h1>
            <p className="text-xl text-zinc-300 mb-8 leading-relaxed">
              Your AI-powered social media workspace is waiting. Manage campaigns, connect with creators, and scale your brand.
            </p>
            
            {/* Feature highlights */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">🤖</span>
                </div>
                <span className="text-zinc-300">AI-powered content creation</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">📊</span>
                </div>
                <span className="text-zinc-300">Advanced analytics & insights</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">🚀</span>
                </div>
                <span className="text-zinc-300">Creator marketplace access</span>
              </div>
            </div>
          </motion.div>
        </div>

          {/* Right Side - Login Form */}
          <div className="w-full lg:w-1/2 xl:w-2/5 flex items-center justify-center pl-8 xl:pl-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md bg-black/80 backdrop-blur-xl rounded-3xl p-8 text-white border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Login to Your Account</h2>
              <p className="text-zinc-400">Welcome back! Please sign in to continue</p>
            </div>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
              <Button type="submit" size="md" className="w-full mt-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                Sign In
              </Button>
            </form>
            
            {error && <p className="text-red-400 mt-4 text-sm text-center">{error}</p>}
            
            <div className="mt-6 flex justify-between text-sm text-white/70">
              <Link href="/forgot-password" className="hover:text-white transition-colors">
                Forgot Password?
              </Link>
              <Link href="/signup" className="hover:text-white transition-colors">
                Create Account
              </Link>
            </div>
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-black/80 text-zinc-400">Or continue with</span>
                </div>
              </div>
              <button 
                onClick={handleGoogle} 
                className="w-full mt-4 bg-white text-black rounded-xl py-3 font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
              >
                <span>🔍</span>
                Continue with Google
              </button>
            </div>
          </motion.div>
          </div>
        </div>
    </section>
  );
};

export default LoginPage;
