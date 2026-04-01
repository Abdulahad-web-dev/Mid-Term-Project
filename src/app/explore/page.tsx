"use client";

import MainLayout from "@/components/layout/MainLayout";
import { Container } from "@/components/layout/Container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { AdCard } from "@/components/home/FeaturedAds";
import { useState } from "react";

// More mock data for exploration
const ALL_ADS = [
  { id: "1", title: "Premium Tech Workspace in Downtown", category: "Real Estate", city: "San Francisco", price: "45,000", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800", package: "Premium", expiry: "Oct 24, 2026" },
  { id: "2", title: "2024 Luxury Electric SUV - Limited Edition", category: "Vehicles", city: "New York", price: "85,000", image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800", package: "Premium", expiry: "Oct 19, 2026" },
  { id: "3", title: "Professional Full-Stack Development Service", category: "Services", city: "Remote", price: "150", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800", package: "Standard", expiry: "Oct 15, 2026" },
  { id: "4", title: "Gaming Laptop RTX 4080 - Barely Used", category: "Electronics", city: "Austin", price: "1,800", image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=800", package: "Basic", expiry: "Oct 10, 2026" },
  { id: "5", title: "Modern Apartment with City View", category: "Real Estate", city: "Chicago", price: "3,200", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800", package: "Standard", expiry: "Oct 22, 2026" },
  { id: "6", title: "Classic Vintage Camera - Mint Condition", category: "Others", city: "Portland", price: "450", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800", package: "Basic", expiry: "Oct 12, 2026" },
];

export default function ExplorePage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredAds = ALL_ADS.filter((ad) => {
    const matchesSearch = ad.title.toLowerCase().includes(search.toLowerCase()) || 
                         ad.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory ? ad.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <MainLayout>
      <div className="pt-24 pb-12 bg-white/[0.02] border-b border-white/5">
        <Container>
          <h1 className="text-3xl font-bold mb-8">Explore <span className="text-primary">Listings</span></h1>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                className="pl-10 h-12 bg-black/50 border-white/10 focus:ring-primary" 
                placeholder="Search for ads (e.g. 'Laptop', 'Apartment')..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="h-12 border-white/10 gap-2">
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </Button>
              <Button className="h-12 px-8 bg-primary hover:bg-primary/90">Search</Button>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Badge 
              variant={selectedCategory === null ? "default" : "outline"}
              className="cursor-pointer py-1 px-4 transition-all"
              onClick={() => setSelectedCategory(null)}
            >
              All
            </Badge>
            {["Electronics", "Vehicles", "Real Estate", "Services", "Others"].map((cat) => (
              <Badge 
                key={cat} 
                variant={selectedCategory === cat ? "default" : "outline"}
                className="cursor-pointer py-1 px-4 transition-all border-white/10"
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </Badge>
            ))}
          </div>
        </Container>
      </div>

      <section className="py-12">
        <Container>
          <div className="flex items-center justify-between mb-8 text-sm text-muted-foreground">
            <p>Showing {filteredAds.length} results</p>
            <div className="flex items-center gap-2">
              <span>Sort by:</span>
              <select className="bg-transparent border-none text-white focus:ring-0 cursor-pointer font-medium">
                <option>Newest First</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Most Recent</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
            {filteredAds.length > 0 ? (
              filteredAds.map((ad) => (
                <AdCard key={ad.id} ad={ad} featured={ad.package === "Premium"} />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
                <div className="p-4 rounded-full bg-white/5 mb-4">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">No matching ads found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filters to find what you're looking for.</p>
                <Button variant="link" onClick={() => { setSearch(""); setSelectedCategory(null); }} className="text-primary mt-2">Clear all filters</Button>
              </div>
            )}
          </div>

          {filteredAds.length > 0 && (
            <div className="mt-16 flex justify-center gap-2">
              <Button variant="outline" disabled className="border-white/10">Prev</Button>
              <Button variant="outline" className="border-primary text-primary">1</Button>
              <Button variant="outline" className="border-white/10">Next</Button>
            </div>
          )}
        </Container>
      </section>
    </MainLayout>
  );
}

