"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Alert, AlertDescription } from "@/Components/ui/Alert";
import Button from "@/Components/ui/Button";
import { Input } from "@/Components/ui/Input";
import { Label } from "@/Components/ui/Label";
import { Checkbox } from "@/Components/ui/Checkbox";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!email || !password) {
      setError("Please enter both email and password");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      const mockToken = `dev_token_${Date.now()}`;
      const mockUser = { email, name: email.split("@")[0], role: "creator" };
      console.log("Token:", mockToken, "User:", mockUser);
      setIsLoading(false);
      router.push("/creator");
    }, 1500);
  };

  return (
    <section className="h-[calc(100vh-4rem)] flex items-center justify-center relative overflow-hidden px-2 py-6">
      {/* Glassmorphic card */}
      <div className="relative z-10 w-full max-w-lg">
        <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_0_40px_rgba(99,102,241,0.25)] p-6 sm:p-8 overflow-hidden">
          {/* Decorative glow corners */}
          <div className="pointer-events-none absolute -top-2 -left-2 w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-tl-3xl blur-2xl opacity-50" />
          <div className="pointer-events-none absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-tl from-pink-500 to-cyan-500 rounded-br-3xl blur-2xl opacity-50" />

          {/* Header */}
          <div className="text-center mb-4">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent inline-block">
              Login
            </h2>
            <p className="text-gray-400 text-sm mt-2">
              Sign in to continue to your account
            </p>
          </div>

          {/* Form */}
          <div className="space-y-3">
            {/* Email */}
            <div>
              <Label
                htmlFor="email"
                className="text-gray-300 text-sm mb-4 block mt-4"
              >
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-11 bg-white/5 border-white/10 text-white placeholder:text-gray-500 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <Label
                htmlFor="password"
                className="text-gray-300 text-sm mb-4 block mt-4"
              >
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-11 bg-white/5 border-white/10 text-white placeholder:text-gray-500 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 mt-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(Boolean(checked))}
                  className="border-white/20 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                />
                <label
                  htmlFor="remember"
                  className="text-sm text-gray-300 cursor-pointer"
                >
                  Remember me
                </label>
              </div>
              <a
                href="/forgot-password"
                className="text-sm text-indigo-400 hover:text-indigo-300"
              >
                Forgot password?
              </a>
            </div>

            {/* Error */}
            {error && (
              <Alert className="bg-red-500/10 border-red-500/20 rounded-xl">
                <AlertDescription className="text-red-400 text-sm">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {/* Submit button */}
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full h-11 mt-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 hover:from-indigo-500 hover:to-fuchsia-500 rounded-xl text-white font-semibold shadow-lg hover:shadow-[0_0_20px_rgba(147,51,234,0.4)] transition-all duration-300"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Signing in...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span>Sign In</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              )}
            </Button>

            {/* Google login */}
            <button
              type="button"
              className="mt-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all duration-300 hover:scale-105 w-full"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  fill="#FFC107"
                  d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36 16.8 36 11 30.2 11 23S16.8 10 24 10c3.2 0 6.1 1.2 8.3 3.2l5.7-5.7C34.6 4.2 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c12.1 0 21.6-8.8 21.6-22 0-1.2-.1-2.3-.3-3.5z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.3 14.7l6.6 4.8C14.9 16.3 19.1 14 24 14c3.2 0 6.1 1.2 8.3 3.2l5.7-5.7C34.6 4.2 29.6 2 24 2 15 2 7.5 7.2 6.3 14.7z"
                />
                <path
                  fill="#4CAF50"
                  d="M24 46c5.2 0 10-1.9 13.6-5.2l-6.3-5.2C29.1 37.2 26.7 38 24 38c-5.3 0-9.7-3.1-11.5-7.6l-6.6 5.1C7.5 40.8 15 46 24 46z"
                />
                <path
                  fill="#1976D2"
                  d="M43.6 20.5H42V20H24v8h11.3c-1.1 2.6-3.1 4.7-5.7 6.1l6.3 5.2C38.9 36.5 42 30.9 42 24c0-1.2-.1-2.3-.4-3.5z"
                />
              </svg>
              <span className="text-sm font-medium">Login with Google</span>
            </button>

            {/* Sign up link */}
            <p className="mt-4 text-center text-gray-400 text-sm">
              Don’t have an account?{" "}
              <a
                href="/signup"
                className="text-indigo-400 hover:text-indigo-300 font-semibold"
              >
                Sign up for free
              </a>
            </p>

            {/* Terms */}
            <p className="mt-1 text-center text-gray-500 text-xs">
              By signing in, you agree to our{" "}
              <a
                href="/terms"
                className="text-gray-400 hover:text-gray-300 underline"
              >
                Terms
              </a>{" "}
              and{" "}
              <a
                href="/privacy"
                className="text-gray-400 hover:text-gray-300 underline"
              >
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
