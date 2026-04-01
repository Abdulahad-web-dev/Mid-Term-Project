"use client";

import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MapPin, Calendar, ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { normalizeMediaUrl } from "@/lib/media";

// Mock data for featured ads
const FEATURED_ADS = [
  {
    id: "1",
    title: "Premium Tech Workspace in Downtown",
    category: "Real Estate",
    city: "San Francisco",
    price: "45,000",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
    package: "Premium",
    expiry: "Oct 24, 2026",
  },
  {
    id: "2",
    title: "2024 Luxury Electric SUV - Limited Edition",
    category: "Vehicles",
    city: "New York",
    price: "85,000",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800",
    package: "Premium",
    expiry: "Oct 19, 2026",
  },
  {
    id: "3",
    title: "Professional Full-Stack Development Service",
    category: "Services",
    city: "Remote",
    price: "150",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
    package: "Standard",
    expiry: "Oct 15, 2026",
  },
];

export function AdCard({ ad, featured = false }: { ad: any, featured?: boolean }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      whileHover={{ y: -8, scale: 1.02 }}
      className={cn(
        "group relative rounded-3xl overflow-hidden border transition-all duration-500 flex flex-col h-full backdrop-blur-sm",
        featured 
          ? "border-primary/40 bg-primary/5 shadow-2xl shadow-primary/10" 
          : "border-white/10 bg-white/[0.03] hover:border-white/20"
      )}
    >
      {/* Premium Glow Effect on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      <Link href={`/ads/${ad.id}`} className="flex-1 flex flex-col relative z-10">
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={normalizeMediaUrl(ad.image).thumbnail}
            alt={ad.title}
            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
          
          <div className="absolute top-4 left-4 flex gap-2">
            {featured && (
              <Badge className="bg-primary hover:bg-primary text-white border-none shadow-lg shadow-primary/40 px-3 py-1 font-bold">
                FEATURED
              </Badge>
            )}
            <Badge variant="secondary" className="bg-black/40 backdrop-blur-md text-white border-white/10 px-3">
              {ad.category}
            </Badge>
          </div>
        </div>

        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-start justify-between gap-4 mb-4">
            <h3 className="font-bold text-xl leading-snug group-hover:text-primary transition-colors line-clamp-2">
              {ad.title}
            </h3>
          </div>

          <div className="flex flex-col gap-3 mb-6 text-sm text-white/50">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-white/5 text-primary">
                <MapPin className="w-4 h-4" />
              </div>
              {ad.city}
            </div>
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-white/5 text-white/60">
                <Calendar className="w-4 h-4" />
              </div>
              Expires {ad.expiry}
            </div>
          </div>

          <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
            <div className="text-2xl font-black text-white">
              ${ad.price}
            </div>
            <div className="flex items-center gap-2 text-primary text-sm font-black group-hover:gap-3 transition-all uppercase tracking-wider">
              Explore <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function FeaturedAds() {
  return (
    <section className="py-32 relative">
      <Container>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6"
        >
          <div className="max-w-2xl text-left">
            <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">Featured <br /><span className="gradient-text">Listings</span></h2>
            <p className="text-xl text-white/50">
              Hand-picked premium ads from our most trusted sellers across the globe.
            </p>
          </div>
          <Link href="/explore">
            <Button variant="ghost" className="hidden md:flex items-center gap-3 text-primary font-bold hover:bg-primary/5 px-6 py-6 text-lg group">
              View All Ads <ExternalLink className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </Button>
          </Link>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          transition={{ staggerChildren: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {FEATURED_ADS.map((ad) => (
            <AdCard key={ad.id} ad={ad} featured={ad.package === "Premium"} />
          ))}
        </motion.div>

        <div className="mt-16 text-center md:hidden">
          <Link href="/explore">
            <Button size="lg" variant="outline" className="w-full border-white/10 rounded-2xl h-14 font-bold text-lg">
              Explore all 2,000+ ads
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
