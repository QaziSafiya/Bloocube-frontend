"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/Button";
import { Badge } from "@/Components/ui/badge";
import { Input } from "@/Components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Navbar from "@/Components/Creater/Navbar";
import Sidebar from "@/Components/Creater/Sidebar";
import Footer from "@/Components/Creater/Footer";

// Sample data
const followerGrowthData = [
  { month: "Jan", competitorA: 80000, yourBrand: 95000 },
  { month: "Feb", competitorA: 100000, yourBrand: 110000 },
  { month: "Mar", competitorA: 130000, yourBrand: 145000 },
  { month: "Apr", competitorA: 155000, yourBrand: 170000 },
  { month: "May", competitorA: 175000, yourBrand: 195000 },
  { month: "Jun", competitorA: 190000, yourBrand: 215000 },
  { month: "Jul", competitorA: 200000, yourBrand: 230000 },
  { month: "Aug", competitorA: 215000, yourBrand: 250000 },
];

const engagementByPostType = [
  { type: "Images", competitorA: 4.2, yourBrand: 5.8 },
  { type: "Videos", competitorA: 5.1, yourBrand: 6.2 },
  { type: "Carousels", competitorA: 5.5, yourBrand: 4.8 },
  { type: "Stories", competitorA: 3.8, yourBrand: 3.2 },
  { type: "Reels", competitorA: 7.2, yourBrand: 5.9 },
];

const contentTypeData = [
  { name: "Product Posts", value: 35, color: "hsl(217, 91%, 60%)" },
  { name: "Carousel Posts", value: 30, color: "hsl(173, 58%, 39%)" },
  { name: "Reels", value: 25, color: "hsl(262, 83%, 58%)" },
  { name: "Stories", value: 10, color: "hsl(43, 74%, 66%)" },
];

const CompitatorAnalysisPage = () => {
  const [competitorHandle, setCompetitorHandle] = useState("");
  const [platform, setPlatform] = useState("instagram");
  const [isOpen, setIsOpen] = useState(true);

  const handleAnalyze = () => {
    console.log("Analyzing competitor:", competitorHandle, "on", platform);
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Navbar */}
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar isOpen={isOpen} />

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Page Heading */}
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Competitor Analysis
          </h1>

          {/* Analyze Competitors Section */}
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Analyze Competitors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    Competitor Handle
                  </label>
                  <Input
                    placeholder="e.g., @competitor_brand"
                    value={competitorHandle}
                    onChange={(e) => setCompetitorHandle(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    Platform
                  </label>
                  <Select value={platform} onValueChange={setPlatform}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="twitter">Twitter</SelectItem>
                      <SelectItem value="facebook">Facebook</SelectItem>
                      <SelectItem value="linkedin">LinkedIn</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-center items-center mt-6">
                  <Button
                    onClick={handleAnalyze}
                    className="w-full h-12 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                  >
                    Analyze
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Overview */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Performance Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                ["Average Followers", "1.2M", "Your: 850K"],
                ["Avg. Engagement Rate", "3.8%", "Your: 3.2%"],
                ["Avg. Likes per Post", "18.5K", "Your: 15.2K"],
                ["Avg. Comments per Post", "780", "Your: 620"],
              ].map(([label, value, yours], i) => (
                <Card
                  key={i}
                  className="shadow hover:shadow-lg transition-all duration-300"
                >
                  <CardContent className="py-2 px-5">
                    <p className="text-sm text-gray-500 mb-1">{label}</p>
                    <p className="text-3xl font-bold text-gray-800">{value}</p>
                    <p className="text-xs text-blue-500 mt-1">{yours}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Charts */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Follower Growth */}
            <Card className="shadow">
              <CardHeader>
                <CardTitle>Follower Growth Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={followerGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="competitorA"
                      stroke="#8884d8"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="yourBrand"
                      stroke="#82ca9d"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Engagement Rate */}
            <Card className="shadow">
              <CardHeader>
                <CardTitle>Engagement Rate by Post Type</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={engagementByPostType}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="type" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="competitorA" fill="#8884d8" />
                    <Bar dataKey="yourBrand" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* AI Hashtag Suggestions */}
            <Card className="shadow-[var(--shadow-card)]">
              <CardHeader>
                <CardTitle className="text-lg">
                  AI Hashtag Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {[
                    "#SocialMediaMarketing",
                    "#DigitalStrategy",
                    "#ContentCreatorTips",
                    "#MarketingTrends",
                    "#BusinessEngagement",
                    "#GrowYourBusiness",
                    "#InfluencerInsights",
                  ].map((tag, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="border-none bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
                 text-white px-3 py-2 rounded-md text-sm font-medium 
                 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-pink-500/30"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Content Strategy */}
            <Card className="shadow-[var(--shadow-card)]">
              <CardHeader>
                <CardTitle className="text-lg">AI Content Strategy</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-foreground">
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">•</span>
                    <span>
                      Focus on short-form video content (Reels, TikToks) as
                      competitors show high engagement
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">•</span>
                    <span>
                      Post during peak hours: 10 AM - 2 PM EST for maximum reach
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">•</span>
                    <span>Run Q&A sessions to boost comments</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">•</span>
                    <span>
                      Utilize user-generated content to build community and
                      trust
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Best Posting Times */}
            <Card className="shadow-[var(--shadow-card)]">
              <CardHeader>
                <CardTitle className="text-lg">Best Posting Times</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-foreground">
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">•</span>
                    <span>
                      <strong>Instagram:</strong> Weekdays, 10 AM - 2 PM EST
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">•</span>
                    <span>
                      <strong>Facebook:</strong> Tuesdays/Thursdays, 9 AM - 1 PM
                      EST
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-primary">•</span>
                    <span>
                      <strong>Twitter:</strong> Mondays/Wednesdays, 11 AM - 3 PM
                      EST
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Content Type Distribution */}
          <Card className="shadow mb-12">
            <CardHeader>
              <CardTitle>Competitor Content Type Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={contentTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={100}
                    outerRadius={150}
                    dataKey="value"
                    label={(entry) => `${entry.name}: ${entry.value}%`}
                  >
                    {contentTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default CompitatorAnalysisPage;
