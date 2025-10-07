"use client";

import { useState } from "react";
import { Badge } from "@/Components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import { Camera, Headphones, Dumbbell, Package, Utensils } from "lucide-react";

import Navbar from "@/Components/Creater/Navbar";
import Sidebar from "@/Components/Creater/Sidebar";
import Footer from "@/Components/Creater/Footer";

interface Bid {
  id: string;
  campaignName: string;
  bidAmount: number;
  submissionDate: string;
  status: "Accepted" | "Pending" | "Rejected";
  icon: React.ReactNode;
}

const MyBids = () => {
  const [isOpen, setIsOpen] = useState(true);

  const bids: Bid[] = [
    {
      id: "1",
      campaignName: "Summer Fashion Campaign 2024",
      bidAmount: 1500,
      submissionDate: "2024-07-20",
      status: "Accepted",
      icon: <Camera className="h-5 w-5 text-muted-foreground" />,
    },
    {
      id: "2",
      campaignName: "Tech Gadget Review Series",
      bidAmount: 2200,
      submissionDate: "2024-07-18",
      status: "Pending",
      icon: <Headphones className="h-5 w-5 text-muted-foreground" />,
    },
    {
      id: "3",
      campaignName: "Sustainable Living Product Launch",
      bidAmount: 1800,
      submissionDate: "2024-07-16",
      status: "Rejected",
      icon: <Package className="h-5 w-5 text-muted-foreground" />,
    },
    {
      id: "4",
      campaignName: "Fitness Challenge Promotion",
      bidAmount: 1200,
      submissionDate: "2024-07-12",
      status: "Accepted",
      icon: <Dumbbell className="h-5 w-5 text-muted-foreground" />,
    },
    {
      id: "5",
      campaignName: "Gourmet Snack Unboxing",
      bidAmount: 900,
      submissionDate: "2024-07-10",
      status: "Pending",
      icon: <Utensils className="h-5 w-5 text-muted-foreground" />,
    },
  ];

  const getStatusVariant = (status: Bid["status"]) => {
    switch (status) {
      case "Accepted":
        return "default";
      case "Pending":
        return "secondary";
      case "Rejected":
        return "destructive";
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={isOpen} />
        <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="mx-auto max-w-6xl">
            {/* Breadcrumb / Header */}
            <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
              <span>Marketplace</span>
              <span>/</span>
              <span>My Bids</span>
            </div>

            <h1 className="text-3xl font-bold mb-8 text-foreground">My Bids</h1>

            {/* Table */}
            <div className="bg-card rounded-lg border shadow-sm overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-100">
                    <TableHead className="py-5 px-4">Campaign Name</TableHead>
                    <TableHead className="py-5 px-4">Bid Amount</TableHead>
                    <TableHead className="py-5 px-4">Submission Date</TableHead>
                    <TableHead className="py-5 px-4">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bids.map((bid) => (
                    <TableRow key={bid.id} className="hover:bg-gray-50">
                      <TableCell className="py-5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="flex-shrink-0">{bid.icon}</div>
                          <span className="font-medium">
                            {bid.campaignName}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="py-3 px-4 font-medium">
                        ${bid.bidAmount.toLocaleString()}
                      </TableCell>
                      <TableCell className="py-3 px-4 text-muted-foreground">
                        {bid.submissionDate}
                      </TableCell>
                      <TableCell className="py-3 px-4">
                        <Badge variant={getStatusVariant(bid.status)}>
                          {bid.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyBids;
