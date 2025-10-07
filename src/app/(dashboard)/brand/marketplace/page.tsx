"use client";
import { Button } from "@/Components/ui/Button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { useState } from "react";
import { Badge } from "@/Components/ui/badge";
import { ShoppingCart, Star } from "lucide-react";
import Navbar from "@/Components/Creater/Navbar";
import Sidebar from "@/Components/Brand/Sidebar";
import Footer from "@/Components/Creater/Footer";

const products = [
  {
    id: 1,
    name: "Premium Analytics Tool",
    price: "$99/mo",
    rating: 4.8,
    category: "Analytics",
    description: "Advanced analytics and reporting for your brand",
  },
  {
    id: 2,
    name: "Social Media Manager",
    price: "$149/mo",
    rating: 4.9,
    category: "Marketing",
    description: "Manage all your social media campaigns in one place",
  },
  {
    id: 3,
    name: "Email Automation Pro",
    price: "$79/mo",
    rating: 4.7,
    category: "Automation",
    description: "Powerful email marketing automation tools",
  },
  {
    id: 4,
    name: "Brand Design Kit",
    price: "$199",
    rating: 4.6,
    category: "Design",
    description: "Complete design system for your brand identity",
  },
  {
    id: 5,
    name: "SEO Optimizer",
    price: "$129/mo",
    rating: 4.8,
    category: "SEO",
    description: "Boost your search engine rankings",
  },
  {
    id: 6,
    name: "Content Calendar",
    price: "$59/mo",
    rating: 4.5,
    category: "Content",
    description: "Plan and schedule your content effectively",
  },
];

const BrandMarketplacePage = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={isOpen} />

        <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-purple-100 to-blue-100">
          <div className="mb-5">
            <h1 className="text-3xl font-bold mb-2">Marketplace</h1>
            <p className="text-muted-foreground">
              Discover tools and services to grow your brand
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Card
                key={product.id}
                className="shadow-card hover:shadow-hover transition-smooth border-border flex flex-col"
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="secondary">{product.category}</Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">
                        {product.rating}
                      </span>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-sm text-muted-foreground">
                    {product.description}
                  </p>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">
                    {product.price}
                  </span>
                  <Button size="sm" variant="outline">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BrandMarketplacePage;
