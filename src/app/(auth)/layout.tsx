import React from "react";
import Navbar from "@/Components/layout/Navbar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Gradient background blobs */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-gradient-to-br from-purple-600 via-blue-500 to-teal-400 opacity-30 rounded-full blur-[120px] animate-gradient-60" />
        <div className="absolute top-[30%] -left-20 w-[400px] h-[400px] bg-gradient-to-br from-purple-600 via-blue-500 to-teal-400 opacity-30 rounded-full blur-[120px] animate-gradient-60" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-500 via-fuchsia-500 to-pink-500 opacity-30 rounded-full blur-[140px] animate-gradient-60" />
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="relative z-10">{children}</main>
    </div>
  );
}
