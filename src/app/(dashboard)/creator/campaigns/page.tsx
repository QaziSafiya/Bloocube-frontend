"use client";
import {
  Tag,
  Calendar,
  DollarSign,
  Filter,
  Grid3x3,
  TrendingDown,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/Components/ui/Button";
import { Card } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { toast } from "sonner";
import Sidebar from "@/Components/Creater/Sidebar";
import Navbar from "@/Components/Creater/Navbar";
import Footer from "@/Components/Creater/Footer";
import Link from "next/link";
interface Campaign {
  id: string;
  title: string;
  description: string;
  icon: string;
  budgetMin: number;
  budgetMax: number;
  deadline: string;
  platforms: string[];
}

interface RecommendedCampaign {
  id: string;
  title: string;
  budget: number;
}

const campaigns: Campaign[] = [
  {
    id: "1",
    title: "Summer Influencer Campaign",
    description:
      "Promote our new summer collection across social media platforms",
    icon: "🌞",
    budgetMin: 2500,
    budgetMax: 5000,
    deadline: "2024-07-31",
    platforms: ["Instagram", "TikTok"],
  },
  {
    id: "2",
    title: "Healthy Eating Challenge",
    description:
      "Launch a 7-day healthy eating challenge featuring nutritious recipes",
    icon: "🥗",
    budgetMin: 1800,
    budgetMax: 3000,
    deadline: "2024-08-15",
    platforms: ["YouTube", "Blog"],
  },
  {
    id: "3",
    title: "Next-Gen Gadget Review",
    description:
      "Review our innovative smart home device, highlighting its key features",
    icon: "⚡",
    budgetMin: 3000,
    budgetMax: 6000,
    deadline: "2024-09-01",
    platforms: ["YouTube", "Instagram"],
  },
  {
    id: "4",
    title: "Fall Fashion Lookbook",
    description:
      "Create a series of fashionable outfits using our autumn collection",
    icon: "👗",
    budgetMin: 2000,
    budgetMax: 4000,
    deadline: "2024-09-30",
    platforms: ["Instagram", "Pinterest"],
  },
  {
    id: "5",
    title: "Sustainable Living Tips",
    description:
      "Share practical tips for sustainable living while promoting eco-friendly products",
    icon: "🌱",
    budgetMin: 1500,
    budgetMax: 2800,
    deadline: "2024-10-10",
    platforms: ["Blog", "TikTok"],
  },
  {
    id: "6",
    title: "Home Workout Series",
    description:
      "Develop a mini home workout series showcasing fitness equipment",
    icon: "💪",
    budgetMin: 2200,
    budgetMax: 4500,
    deadline: "2024-10-25",
    platforms: ["YouTube", "Instagram"],
  },
];

const recommendedCampaigns: RecommendedCampaign[] = [
  {
    id: "r1",
    title: "Winter Adventure Gear",
    budget: 3500,
  },
  {
    id: "r2",
    title: "Productivity App Launch",
    budget: 2800,
  },
  {
    id: "r3",
    title: "Art Supplies Showcase",
    budget: 1900,
  },
  {
    id: "r4",
    title: "Luxury Travel Destinations",
    budget: 5000,
  },
];

const CampaignPage = () => {
  const handlePlaceBid = (campaignId: string) => {
    const campaign = campaigns.find((c) => c.id === campaignId);
    toast.success(`Bid placed for "${campaign?.title}"`, {
      description: "You'll receive a confirmation email shortly.",
    });
  };

  const handleViewDetails = (campaignId: string) => {
    const campaign = recommendedCampaigns.find((c) => c.id === campaignId);
    toast.info(`Viewing details for "${campaign?.title}"`);
  };

  const formatBudget = (min: number, max: number) => {
    return `$${(min / 1000).toFixed(1)}k - $${(max / 1000).toFixed(1)}k`;
  };

  const formatBudgetShort = (amount: number) => {
    return `$${(amount / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  };

  const formatDeadline = (date: string) => {
    return new Date(date)
      .toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\//g, "-");
  };

  const filterButtons = [
    "All Platforms",
    "Any Budget",
    "Anytime",
    "All Categories",
  ];
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50 ">
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={isOpen} />
        <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-gray-50 to-blue-50">
          <h1 className="text-4xl font-bold text-foreground mb-8">
            Explore Campaigns
          </h1>

          <div className="flex gap-8 flex-col lg:flex-row ">
            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Filter Bar */}
              <div className="space-y-4">
                {/* Filter Buttons */}
                <div className="flex items-center gap-3 flex-wrap">
                  <button className="flex items-center gap-2 text-sm px-4 py-2 rounded-md border border-gray-300 text-black bg-white hover:bg-gray-100 transition-all">
                    <Filter className="w-4 h-4 text-gray-600" />
                    Filters
                  </button>

                  {filterButtons.map((filter) => (
                    <button
                      key={filter}
                      className="text-sm px-4 py-2 rounded-md border border-gray-300 text-black bg-white hover:bg-gray-100 transition-all"
                    >
                      {filter}
                    </button>
                  ))}
                </div>

                {/* Sort Section */}
                <div className="flex items-center gap-3">
                  <button className="text-sm font-medium px-4 py-2 rounded-xl border border-gray-200 bg-white text-gray-800 hover:bg-gray-100 transition-all">
                    Sort by: Newest
                  </button>

                  <div className="flex gap-2">
                    <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:opacity-90 transition-all">
                      <Grid3x3 className="w-4 h-4" />
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-800 hover:bg-gray-100 transition-all">
                      <TrendingDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Campaign Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
                {campaigns.map((campaign) => (
                  <Card
                    key={campaign.id}
                    className="p-6 hover:shadow-[var(--shadow-hover)] transition-all duration-300 border border-border bg-card"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center text-2xl flex-shrink-0">
                        {campaign.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg text-foreground mb-2 leading-tight">
                          {campaign.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {campaign.description}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-foreground">
                        <DollarSign className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">Budget:</span>
                        <span>
                          {formatBudget(campaign.budgetMin, campaign.budgetMax)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-foreground">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">Deadline:</span>
                        <span>{formatDeadline(campaign.deadline)}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {campaign.platforms.map((platform) => (
                        <Badge
                          key={platform}
                          variant="secondary"
                          className="text-xs px-3 py-1"
                        >
                          {platform}
                        </Badge>
                      ))}
                    </div>

                    <Button
                      onClick={() => handlePlaceBid(campaign.id)}
                      className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 text-white font-medium rounded-md transition-all"
                    >
                      Place Bid
                    </Button>
                  </Card>
                ))}
              </div>
            </div>

            {/* Recommended Sidebar */}
            <aside className="lg:w-80 flex-shrink-0">
              <div className="rounded p-6 bg-accent/30 shadow-lg ">
                <div className="flex items-center gap-2 mb-6">
                  <Tag className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-semibold text-foreground">
                    Recommended for you
                  </h2>
                </div>

                <div className="space-y-4">
                  {recommendedCampaigns.map((campaign) => (
                    <Card
                      key={campaign.id}
                      className="p-4 border border-border hover:shadow-md transition-all duration-200"
                    >
                      <h3 className="font-semibold text-base text-foreground mb-1">
                        {campaign.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Budget: {formatBudgetShort(campaign.budget)}
                      </p>
                      <Link href="/creator/viewpage">
                        <Button
                          variant="outline"
                          className="w-full font-medium rounded-md shadow hover:shadow-lg hover:opacity-90 transition-all"
                        >
                          View Details
                        </Button>
                      </Link>
                    </Card>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CampaignPage;
