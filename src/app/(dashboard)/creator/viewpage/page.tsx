"use client";

import { useState } from "react";
import { Button } from "@/Components/ui/Button";
import { Card } from "@/Components/ui/card";
import { Bookmark, Mail, Sparkles } from "lucide-react";
import Sidebar from "@/Components/Creater/Sidebar";
import Navbar from "@/Components/Creater/Navbar";
import Footer from "@/Components/Creater/Footer";
import { SubmitBidForm } from "../submitform/page"; // import your dialog

const Viewpage = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isBidOpen, setIsBidOpen] = useState(false); // state for dialog

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Navbar */}
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar isOpen={isOpen} />

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="mx-auto max-w-5xl">
            {/* Header Breadcrumb */}
            <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
              <span>Marketplace</span>
              <span>/</span>
              <span>My Bids</span>
            </div>

            {/* Campaign Card */}
            <Card className="overflow-hidden border-border shadow-lg">
              {/* Campaign Header */}
              <div className="border-b border-border bg-card p-6 md:p-8">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    Echo Marketing
                  </span>
                </div>

                <h1 className="mb-6 text-2xl font-bold text-foreground md:text-3xl">
                  Launch Campaign for 'NexGen Fitness Tracker'
                </h1>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  {/* Place Bid button opens modal */}
                  <Button
                    className="gap-2 w-50 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 text-white font-medium rounded-md transition-all"
                    onClick={() => setIsBidOpen(true)}
                  >
                    Place Bid
                  </Button>

                  <Button variant="outline" className="gap-2">
                    <Bookmark className="h-4 w-4" />
                    Bookmark
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Mail className="h-4 w-4" />
                    Contact Brand
                  </Button>
                </div>
              </div>

              {/* Campaign Content */}
              <div className="grid gap-8 p-6 md:grid-cols-3 md:p-8">
                {/* Campaign Brief */}
                <div className="md:col-span-2">
                  <h2 className="mb-4 text-lg font-semibold text-foreground">
                    Campaign Brief
                  </h2>
                  <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
                    <p>
                      We are looking for enthusiastic and influential fitness
                      creators to help us launch our groundbreaking new
                      product...
                    </p>
                    <p>
                      We seek creators who can produce high-quality, authentic
                      content that resonates with health and fitness
                      enthusiasts...
                    </p>
                  </div>
                </div>

                {/* Details Sidebar */}
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-2 text-sm font-semibold text-foreground">
                      Budget
                    </h3>
                    <p className="text-lg font-semibold text-foreground">
                      $1,500 - $3,000
                    </p>
                  </div>

                  <div>
                    <h3 className="mb-2 text-sm font-semibold text-foreground">
                      Deadline
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      August 30, 2025
                    </p>
                  </div>
                </div>
              </div>

              {/* Campaign Footer */}
              <div className="border-t border-border bg-muted/30 p-6 md:p-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">
                      Echo Marketing
                    </h3>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button variant="ghost" size="sm">
                    See Website
                  </Button>
                  <Button variant="ghost" size="sm">
                    See Portfolio
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Submit Bid Dialog */}
      <SubmitBidForm open={isBidOpen} onOpenChange={setIsBidOpen} />
    </div>
  );
};

export default Viewpage;
