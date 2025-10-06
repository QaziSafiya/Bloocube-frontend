import React from 'react';

export default function CreatorDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-8">
        {children}
      </div>
    </div>
  );
}


