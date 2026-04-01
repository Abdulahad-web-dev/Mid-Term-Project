"use client";

import MainLayout from "@/components/layout/MainLayout";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Share2, Flag, User, Phone, MessageSquare, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

// Mock data for a single ad
const MOCK_AD = {
  id: "1",
  title: "Premium Tech Workspace in Downtown",
  description: `Experience the best-in-class workspace designed for productivity and community. 
  Our facility offers high-speed internet, ergonomic furniture, and a vibrant atmosphere 
  located right in the heart of San Francisco.
  
  Features:
  - 24/7 Access
  - Dedicated Desks
  - High-speed Fiber Internet
  - Meeting Rooms
  - Free Coffee & Snacks`,
  category: "Real Estate",
  city: "San Francisco",
  price: "45,000",
  image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
  seller: {
    name: "Alex Johnson",
    joined: "Member since Jan 2024",
    isVerified: true,
    adsCount: 12
  },
  package: "Premium",
  expiry: "Oct 24, 2026",
  published: "Sep 24, 2025"
};

export default function AdDetailPage() {
  return (
    <MainLayout>
      <div className="pt-24 pb-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column: Media and Description */}
            <div className="lg:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="aspect-video rounded-3xl overflow-hidden border border-white/10"
              >
                <img src={MOCK_AD.image} alt={MOCK_AD.title} className="w-full h-full object-cover" />
              </motion.div>

              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge className="bg-primary text-white border-none px-4 py-1">{MOCK_AD.package} Ad</Badge>
                  <Badge variant="secondary" className="bg-white/5 border-white/10">{MOCK_AD.category}</Badge>
                  <Badge variant="outline" className="border-white/10 flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {MOCK_AD.city}
                  </Badge>
                </div>

                <h1 className="text-3xl md:text-5xl font-bold">{MOCK_AD.title}</h1>

                <div className="flex items-center gap-6 text-sm text-muted-foreground border-y border-white/5 py-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> Published: {MOCK_AD.published}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" /> Expires: {MOCK_AD.expiry}
                  </div>
                </div>

                <div className="prose prose-invert max-w-none">
                  <h3 className="text-xl font-semibold mb-4 text-white">Description</h3>
                  <div className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
                    {MOCK_AD.description}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Seller and Actions */}
            <div className="space-y-8">
              <div className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] sticky top-24">
                <div className="text-4xl font-bold mb-6 text-primary">Rs. {MOCK_AD.price}</div>

                <div className="space-y-4 mb-8">
                  <Button className="w-full h-12 gap-2 text-white bg-primary hover:bg-primary/90">
                    <Phone className="w-4 h-4" /> Call Seller
                  </Button>
                  <Button variant="outline" className="w-full h-12 gap-2 border-white/10 hover:bg-white/5">
                    <MessageSquare className="w-4 h-4" /> Send Message
                  </Button>
                </div>

                <div className="pt-6 border-t border-white/5">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center font-bold text-white">
                      {MOCK_AD.seller.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 font-semibold">
                        {MOCK_AD.seller.name}
                        {MOCK_AD.seller.isVerified && <ShieldCheck className="w-4 h-4 text-primary shadow-sm" />}
                      </div>
                      <div className="text-xs text-muted-foreground">{MOCK_AD.seller.joined}</div>
                    </div>
                  </div>
                  <Link href="/seller/1" className="text-sm text-primary hover:underline font-medium">
                    View Seller Profile ({MOCK_AD.seller.adsCount} Ads)
                  </Link>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  <Button variant="ghost" size="sm" className="gap-2 text-xs text-muted-foreground hover:text-white">
                    <Share2 className="w-4 h-4" /> Share
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2 text-xs text-muted-foreground hover:text-destructive">
                    <Flag className="w-4 h-4" /> Report
                  </Button>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-primary" /> 
                  Safe Buying Tips
                </h4>
                <ul className="text-xs text-muted-foreground space-y-2 list-disc pl-4">
                  <li>Meet in a public place.</li>
                  <li>Inspect the item before paying.</li>
                  <li>Use secure payment methods.</li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </MainLayout>
  );
}
