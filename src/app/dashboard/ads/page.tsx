"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreVertical, Eye, Edit, Trash2, Calendar, MapPin, PlusCircle } from "lucide-react";
import { normalizeMediaUrl } from "@/lib/media";
import Link from "next/link";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export default function MyAdsPage() {
  const [ads, setAds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAds() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('ads')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (data) {
        setAds(data);
      }
      setLoading(false);
    }
    loadAds();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">My <span className="text-primary">Listings</span></h1>
            <p className="text-muted-foreground">Manage and track the performance of your active ads.</p>
          </div>
          <Link href="/dashboard/submit">
            <Button className="bg-primary hover:bg-primary/90 text-white gap-2 font-bold">
              <PlusCircle className="w-4 h-4" /> Post New Ad
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center p-10"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div>
        ) : ads.length === 0 ? (
           <div className="text-center p-12 bg-white/[0.02] border border-white/5 rounded-2xl">
             <p className="text-muted-foreground mb-4">You have not posted any ads yet.</p>
             <Link href="/dashboard/submit"><Button variant="outline">Create Your First Ad</Button></Link>
           </div>
        ) : (
          <div className="grid gap-6">
            {ads.map((ad) => {
              const image = ad.media_urls?.[0] || "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800";
              const dateObj = new Date(ad.created_at);
              // Simple expiration display (assuming +30 days)
              dateObj.setDate(dateObj.getDate() + 30);
              const formattedDate = dateObj.toLocaleDateString();

              return (
                <div key={ad.id} className="p-4 rounded-2xl border border-white/5 bg-white/[0.02] flex flex-col md:flex-row gap-6 items-center group hover:border-primary/50 transition-colors">
                  <div className="w-full md:w-48 aspect-[16/10] rounded-xl overflow-hidden flex-shrink-0">
                    <img 
                      src={normalizeMediaUrl(image).thumbnail} 
                      alt={ad.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge variant={ad.status === "Active" ? "default" : "outline"} className={ad.status === "Active" ? "bg-green-500/10 text-green-500 border-none" : "bg-yellow-500/10 text-yellow-500 border-none"}>
                        {ad.status}
                      </Badge>
                      <Badge variant="outline" className="border-white/10 text-muted-foreground">{ad.category}</Badge>
                    </div>
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{ad.title}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {ad.city}</div>
                      <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Expires ~{formattedDate}</div>
                      <div className="font-bold text-white">Rs. {ad.price.toLocaleString()}</div>
                    </div>
                  </div>

                  <div className="flex flex-row md:flex-col gap-8 md:px-8 border-x border-white/5">
                    <div className="text-center">
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Views</p>
                      <p className="text-xl font-bold">{ad.views || 0}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Clicks</p>
                      <p className="text-xl font-bold">{ad.clicks || 0}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white"><Eye className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white"><Edit className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive"><Trash2 className="w-4 h-4" /></Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

