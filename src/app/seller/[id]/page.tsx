"use client";

import MainLayout from "@/components/layout/MainLayout";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, ShieldCheck, Mail, Phone, MessageSquare, Star } from "lucide-react";
import { motion } from "framer-motion";
import { AdCard } from "@/components/home/FeaturedAds";
import Link from "next/link";

// Mock seller data
const MOCK_SELLER = {
  id: "1",
  name: "Alex Johnson",
  business: "Alex Tech Solutions",
  joined: "Jan 2024",
  isVerified: true,
  city: "San Francisco",
  rating: 4.8,
  reviewsCount: 24,
  description: "Passionate about providing top-quality tech workspaces and expert full-stack development services. With over 10 years of experience in the industry, I ensure all my listings are premium and verified.",
  phone: "+1 (555) 123-4567",
  email: "alex.j@techsolutions.com"
};

const SELLER_ADS = [
  { id: "1", title: "Premium Tech Workspace in Downtown", category: "Real Estate", city: "San Francisco", price: "45,000", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800", package: "Premium", expiry: "Oct 24, 2026" },
  { id: "3", title: "Professional Full-Stack Development Service", category: "Services", city: "Remote", price: "150", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800", package: "Standard", expiry: "Oct 15, 2026" },
];

export default function SellerProfilePage() {
  return (
    <MainLayout>
      <div className="pt-24 pb-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Seller Sidebar */}
            <div className="lg:col-span-1">
              <div className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] space-y-6 sticky top-24">
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-4xl font-bold text-white mb-4">
                    {MOCK_SELLER.name.charAt(0)}
                  </div>
                  <h1 className="text-2xl font-bold flex items-center gap-2">
                    {MOCK_SELLER.name}
                    {MOCK_SELLER.isVerified && <ShieldCheck className="w-5 h-5 text-primary" />}
                  </h1>
                  <p className="text-sm text-muted-foreground">{MOCK_SELLER.business}</p>
                </div>

                <div className="space-y-4 pt-6 border-t border-white/5">
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-primary" />
                    {MOCK_SELLER.city}
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="w-4 h-4 text-primary" />
                    Joined {MOCK_SELLER.joined}
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    {MOCK_SELLER.rating} ({MOCK_SELLER.reviewsCount} Reviews)
                  </div>
                </div>

                <div className="space-y-3 pt-6 border-t border-white/5">
                  <Button className="w-full gap-2">
                    <MessageSquare className="w-4 h-4" /> Message
                  </Button>
                  <Button variant="outline" className="w-full gap-2 border-white/10">
                    <Phone className="w-4 h-4" /> Call Seller
                  </Button>
                </div>
              </div>
            </div>

            {/* Seller Content */}
            <div className="lg:col-span-3 space-y-12">
              <section>
                <h2 className="text-2xl font-bold mb-6">About Seller</h2>
                <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.01] text-muted-foreground leading-relaxed">
                  {MOCK_SELLER.description}
                </div>
              </section>

              <section>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold">Active Listings <span className="text-primary">({SELLER_ADS.length})</span></h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {SELLER_ADS.map((ad) => (
                    <AdCard key={ad.id} ad={ad} featured={ad.package === "Premium"} />
                  ))}
                </div>
              </section>
            </div>
          </div>
        </Container>
      </div>
    </MainLayout>
  );
}
