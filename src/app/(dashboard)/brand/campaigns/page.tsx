"use client";
import { Button } from "@/Components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { Plus, MoreVertical } from "lucide-react";
import Navbar from "@/Components/Creater/Navbar";
import Sidebar from "@/Components/Brand/Sidebar";
import Footer from "@/Components/Creater/Footer";
import { useState } from "react";
const campaigns = [
  {
    id: 1,
    name: "Summer Sale 2024",
    status: "active",
    reach: "45.2K",
    engagement: "12.4%",
    budget: "$5,000",
  },
  {
    id: 2,
    name: "Product Launch",
    status: "active",
    reach: "32.8K",
    engagement: "18.7%",
    budget: "$8,000",
  },
  {
    id: 3,
    name: "Brand Awareness",
    status: "scheduled",
    reach: "0",
    engagement: "0%",
    budget: "$3,500",
  },
  {
    id: 4,
    name: "Email Campaign",
    status: "completed",
    reach: "28.1K",
    engagement: "9.2%",
    budget: "$2,000",
  },
];

const BrandCampaignsPage = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={isOpen} />
        <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-purple-100 to-blue-100">
          <div className="flex justify-end items-center mb-6">
            {/* <h1 className="text-3xl font-bold mb-2">Campaigns</h1>
          <p className="text-muted-foreground">
            Manage and track your marketing campaigns
          </p> */}
            <Button className="bg-blue-600 text-white px-3 py-2 rounded-sm text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
              <Plus className="mr-2 h-4 w-4" />
              New Campaign
            </Button>
          </div>

          <div className="grid gap-6">
            {campaigns.map((campaign) => (
              <Card
                key={campaign.id}
                className="shadow-card hover:shadow-hover transition-smooth border-border"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{campaign.name}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          campaign.status === "active"
                            ? "default"
                            : campaign.status === "scheduled"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {campaign.status}
                      </Badge>
                      <Button variant="ghost">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Reach
                      </p>
                      <p className="text-2xl font-bold">{campaign.reach}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Engagement
                      </p>
                      <p className="text-2xl font-bold">
                        {campaign.engagement}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Budget
                      </p>
                      <p className="text-2xl font-bold">{campaign.budget}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BrandCampaignsPage;
