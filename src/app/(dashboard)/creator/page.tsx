"use client";

import React, { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/Components/ui/Button";
const Sidebar = dynamic(() => import("@/Components/Creater/Sidebar"), {
  ssr: false,
});
const Navbar = dynamic(() => import("@/Components/Creater/Navbar"), {
  ssr: false,
});
const Footer = dynamic(() => import("@/Components/Creater/Footer"), {
  ssr: false,
});

type ChartsSectionProps = {
  engagementData: Array<{
    month: string;
    likes: number;
    comments: number;
    shares: number;
  }>;
  platformData: Array<{ name: string; posts: number; color: string }>;
};

const ChartsSection = dynamic<ChartsSectionProps>(
  () => import("./sections/ChartsSection").then((m) => m.default),
  {
    ssr: false,
    loading: () => (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg p-6 shadow-sm h-[360px] animate-pulse" />
        <div className="bg-white rounded-lg p-6 shadow-sm h-[360px] animate-pulse" />
      </div>
    ),
  }
);
import { Plus } from "lucide-react";
const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(true);
  const engagementData = useMemo(
    () => [
      { month: "6/21", likes: 1200, comments: 200, shares: 150 },
      { month: "8/21", likes: 900, comments: 180, shares: 120 },
      { month: "10/21", likes: 1100, comments: 220, shares: 140 },
      { month: "12/21", likes: 800, comments: 160, shares: 110 },
      { month: "2/22", likes: 1300, comments: 250, shares: 180 },
      { month: "4/22", likes: 1000, comments: 200, shares: 160 },
      { month: "6/22", likes: 1400, comments: 280, shares: 200 },
      { month: "8/22", likes: 1100, comments: 230, shares: 170 },
      { month: "10/22", likes: 1200, comments: 240, shares: 180 },
      { month: "12/22", likes: 900, comments: 190, shares: 150 },
      { month: "2/23", likes: 1000, comments: 210, shares: 160 },
      { month: "4/23", likes: 800, comments: 170, shares: 130 },
      { month: "6/23", likes: 700, comments: 150, shares: 120 },
    ],
    []
  );

  const platformData = useMemo(
    () => [
      { name: "Instagram", posts: 680, color: "#E1306C" },
      { name: "Facebook", posts: 520, color: "#1877F2" },
      { name: "X", posts: 350, color: "#1DA1F2" },
      { name: "LinkedIn", posts: 180, color: "#0077B5" },
      { name: "YouTube", posts: 120, color: "#FF0000" },
    ],
    []
  );

  const topPosts = [
    {
      id: 1,
      thumbnail: "📸",
      content:
        "Our new campaign launch was a huge success! So much positive feedback. Feeling grateful for our community.",
      platform: "Instagram",
      engagement: "12,890",
      platformColor: "#E1306C",
    },
    {
      id: 2,
      thumbnail: "💡",
      content:
        "Behind the scenes: Brainstorming fresh content ideas for Q1! Get ready for some exciting announcements!",
      platform: "Facebook",
      engagement: "9,234",
      platformColor: "#1877F2",
    },
    {
      id: 3,
      thumbnail: "📊",
      content:
        "Understanding audience demographics is key to targeted marketing. Dive deep into our latest insights report.",
      platform: "LinkedIn",
      engagement: "7,891",
      platformColor: "#0077B5",
    },
    {
      id: 4,
      thumbnail: "🎯",
      content:
        "Quick thoughts about the industry trends is sparking some great conversations. What are your thoughts?",
      platform: "X",
      engagement: "5,678",
      platformColor: "#1DA1F2",
    },
    {
      id: 5,
      thumbnail: "👥",
      content:
        "User-generated content is our favorite! Thanks for sharing your amazing experiences with our platform!",
      platform: "Instagram",
      engagement: "4,123",
      platformColor: "#E1306C",
    },
  ];

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Navbar full width */}
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main Content: Sidebar + Dashboard */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar isOpen={isOpen} />

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="flex justify-end items-center mb-6">
            <Button className="bg-blue-600 text-white px-3 py-2 rounded-sm text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Create New Post
            </Button>
          </div>
          {/* Stats Cards */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-sm text-gray-500 mb-2">Total Posts</h3>
              <p className="text-3xl font-bold text-gray-800">1,567</p>
              <p className="text-xs text-green-600 mt-1">
                +12% from last month
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-sm text-gray-500 mb-2">Scheduled Posts</h3>
              <p className="text-3xl font-bold text-gray-800">245</p>
              <p className="text-xs text-blue-600 mt-1">+5% from last month</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-sm text-gray-500 mb-2">Engagement Rate</h3>
              <p className="text-3xl font-bold text-gray-800">8.7%</p>
              <p className="text-xs text-green-600 mt-1">
                +2.1% from last month
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-sm text-gray-500 mb-2">
                Avg. All Engagement Score
              </h3>
              <p className="text-3xl font-bold text-gray-800">78</p>
              <p className="text-xs text-red-600 mt-1">-3% from last month</p>
            </div>
          </div>

          {/* Charts Row - dynamically loaded to reduce initial bundle */}
          <ChartsSection
            engagementData={engagementData}
            platformData={platformData}
          />

          {/* Top Performing Posts */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Top Performing Posts
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Thumbnail
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Content
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Platform
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Engagement Score
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {topPosts.map((post) => (
                    <tr
                      key={post.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-4 px-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                          {post.thumbnail}
                        </div>
                      </td>
                      <td className="py-4 px-4 max-w-md">
                        <p className="text-sm text-gray-800 line-clamp-2">
                          {post.content}
                        </p>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className="px-2 py-1 rounded-full text-xs font-medium text-white"
                          style={{ backgroundColor: post.platformColor }}
                        >
                          {post.platform}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-semibold text-gray-800">
                          {post.engagement}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors flex items-center space-x-1">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
