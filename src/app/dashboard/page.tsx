"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Rocket, Clock, CheckCircle2, AlertCircle, ArrowUpRight, PlusCircle, ShoppingBag, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function DashboardOverview() {
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);

        if (user) {
          const { data, error } = await supabase
            .from('orders')
            .select('*')
            .eq('buyer_id', user.id)
            .order('created_at', { ascending: false })
            .limit(5);

          if (error) throw error;
          setOrders(data || []);
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
        <div className="h-full flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  const totalSpent = orders.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
  const activeOrders = orders.filter(o => o.status === 'Pending').length;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            Hello, <span className="text-primary font-black uppercase">{user?.user_metadata?.full_name || 'Buyer'}</span>
          </h1>
          <p className="text-muted-foreground">Welcome to your buyer dashboard. Track your purchases and explore new ads.</p>
        </div>

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
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg">Recent Purchases</h3>
                <Link href="/dashboard/payments">
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10">View All</Button>
                </Link>
              </div>
              
              <div className="space-y-4">
                {orders.length === 0 ? (
                  <div className="text-center py-10 text-muted-foreground italic">
                    No purchases yet. <Link href="/explore" className="text-primary hover:underline">Explore ads</Link> to get started!
                  </div>
                ) : (
                  orders.map((order, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "w-2 h-2 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.3)]",
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
                <Link href="/explore">
                  <Button variant="outline" className="w-full justify-between border-white/10 hover:bg-white/5 h-12">
                    Browse All Ads <ArrowUpRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/dashboard/settings">
                  <Button variant="outline" className="w-full justify-between border-white/10 hover:bg-white/5 h-12">
                    Update Profile <ArrowUpRight className="w-4 h-4" />
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
