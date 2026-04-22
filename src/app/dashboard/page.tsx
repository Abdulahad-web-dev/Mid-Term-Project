"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Rocket, Clock, CheckCircle2, ShoppingBag, Loader2, ArrowRight, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function DashboardOverview() {
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [newAds, setNewAds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);

        if (user) {
          // Fetch Recent Purchases
          const { data: orderData } = await supabase
            .from('orders')
            .select('*')
            .eq('buyer_id', user.id)
            .order('created_at', { ascending: false })
            .limit(3);
          
          setOrders(orderData || []);

          // Fetch New Approved Ads (The ones to show after approval)
          const { data: adData } = await supabase
            .from('ads')
            .select('*')
            .eq('status', 'Approved')
            .order('created_at', { ascending: false })
            .limit(4);
          
          setNewAds(adData || []);
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [supabase]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="h-full flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  const totalSpent = orders.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
  const activeOrders = orders.filter(o => o.status === 'Pending').length;

  return (
    <DashboardLayout>
      <div className="space-y-8 pb-10">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            Hello, <span className="text-primary font-black uppercase">{user?.user_metadata?.full_name || 'Buyer'}</span>
          </h1>
          <p className="text-muted-foreground">Welcome to your buyer dashboard. Discover newly approved products below.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] flex items-center justify-between group hover:border-primary/50 transition-colors">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Total Spent</p>
              <p className="text-2xl font-bold">Rs. {totalSpent.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-xl bg-green-500/10">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            </div>
          </div>
          <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] flex items-center justify-between group hover:border-primary/50 transition-colors">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Active Orders</p>
              <p className="text-2xl font-bold">{activeOrders}</p>
            </div>
            <div className="p-3 rounded-xl bg-orange-500/10">
              <Clock className="w-5 h-5 text-orange-500" />
            </div>
          </div>
          <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] flex items-center justify-between group hover:border-primary/50 transition-colors">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Total Purchases</p>
              <p className="text-2xl font-bold">{orders.length}</p>
            </div>
            <div className="p-3 rounded-xl bg-primary/10">
              <ShoppingBag className="w-5 h-5 text-primary" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Purchases */}
          <div className="lg:col-span-2 space-y-8">
            <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg flex items-center gap-2">
                   <ShoppingBag className="w-5 h-5 text-primary" /> Recent Purchases
                </h3>
                <Link href="/dashboard/payments">
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10">View All</Button>
                </Link>
              </div>
              
              <div className="space-y-4">
                {orders.length === 0 ? (
                  <div className="text-center py-10 text-muted-foreground italic text-sm">
                    No purchases yet. Start exploring!
                  </div>
                ) : (
                  orders.map((order, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "w-2 h-2 rounded-full",
                          order.status === 'Completed' ? 'bg-green-500' : 'bg-orange-500'
                        )} />
                        <div>
                          <p className="font-medium text-sm text-white">{order.title || 'Product Purchase'}</p>
                          <p className="text-xs text-muted-foreground">{new Date(order.created_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-white">Rs. {Number(order.amount).toLocaleString()}</p>
                        <span className="text-[10px] font-semibold px-2 py-1 rounded bg-white/5 border border-white/10 uppercase tracking-wider">{order.status}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* 🔥 NEW APPROVED ADS SECTION 🔥 */}
            <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg flex items-center gap-2">
                  <Tag className="w-5 h-5 text-purple-500" /> New Approved Ads
                </h3>
                <Link href="/explore">
                  <Button variant="ghost" size="sm" className="text-purple-500 hover:text-purple-500 hover:bg-purple-500/10">Explore All</Button>
                </Link>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {newAds.length === 0 ? (
                  <div className="col-span-full text-center py-10 text-muted-foreground italic text-sm">
                    No newly approved ads available.
                  </div>
                ) : (
                  newAds.map((ad) => (
                    <Link key={ad.id} href={`/ads/${ad.id}`} className="group p-3 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all flex gap-3">
                      <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-white/10">
                        <img 
                          src={ad.media_urls?.[0] || "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=200"} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm text-white truncate group-hover:text-primary transition-colors">{ad.title}</p>
                        <p className="text-xs text-primary font-black mt-1">Rs. {Number(ad.price).toLocaleString()}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{ad.category}</span>
                          <ArrowRight className="w-3 h-3 text-white/20 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-8 rounded-3xl bg-gradient-to-br from-primary to-purple-600 text-white relative overflow-hidden group shadow-2xl shadow-primary/20">
              <Rocket className="absolute -bottom-4 -right-4 w-32 h-32 text-white/10 group-hover:scale-110 transition-transform duration-500" />
              <h3 className="text-xl font-bold mb-2">Need Help?</h3>
              <p className="text-sm text-white/80 mb-6">Our support team is available 24/7 to assist you with your purchases.</p>
              <Button className="w-full bg-white text-primary hover:bg-white/90 font-bold">Contact Support</Button>
            </div>

            <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
              <h3 className="font-bold text-lg mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 gap-2">
                <Link href="/explore" className="w-full">
                  <Button variant="outline" className="w-full justify-between border-white/10 hover:bg-white/5 h-12 text-sm">
                    Browse All Ads <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/dashboard/settings" className="w-full">
                  <Button variant="outline" className="w-full justify-between border-white/10 hover:bg-white/5 h-12 text-sm">
                    Update Profile <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
