"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { BarChart3, TrendingUp, Users, DollarSign, Target, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function AdminStatsPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 600);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const STATS = [
    { label: "Monthly Revenue", value: "Rs. 4.2M", trend: "+12.5%", positive: true, icon: DollarSign },
    { label: "Conversion Rate", value: "3.2%", trend: "+2.1%", positive: true, icon: Target },
    { label: "Active Users", value: "1,204", trend: "-0.4%", positive: false, icon: Users },
    { label: "Ad Visibility", value: "85k views", trend: "+18.2%", positive: true, icon: BarChart3 },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Platform <span className="text-primary font-black uppercase">Stats</span></h1>
            <p className="text-muted-foreground">Deep dive into platform performance and user growth.</p>
          </div>
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 p-1 rounded-xl">
             <button className="px-4 py-2 text-xs font-bold bg-primary text-white rounded-lg shadow-lg shadow-primary/20 transition-all">7 Days</button>
             <button className="px-4 py-2 text-xs font-bold text-muted-foreground hover:text-white transition-all">30 Days</button>
             <button className="px-4 py-2 text-xs font-bold text-muted-foreground hover:text-white transition-all">All Time</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat) => (
            <div key={stat.label} className="p-6 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-xl relative overflow-hidden group hover:border-primary/50 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-white/5 rounded-2xl">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full ${stat.positive ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}`}>
                  {stat.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {stat.trend}
                </div>
              </div>
              <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
              <h3 className="text-2xl font-black mt-1">{stat.value}</h3>
              
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 p-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl min-h-[400px] flex flex-col justify-center items-center relative overflow-hidden group">
             <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
             <div className="relative z-10 text-center">
                <TrendingUp className="w-16 h-16 text-primary/20 mb-4 mx-auto animate-pulse" />
                <h4 className="text-lg font-bold">Revenue Analytics Chart</h4>
                <p className="text-sm text-muted-foreground mt-2 max-w-xs">Connecting to real-time analytics engine to display historical trends...</p>
             </div>
             
             {/* Mock Chart Grid */}
             <div className="absolute inset-x-8 bottom-8 h-48 flex items-end justify-between gap-4 opacity-10">
                {[40, 70, 45, 90, 65, 80, 55, 95, 75, 85, 60, 100].map((h, i) => (
                  <div key={i} className="flex-1 bg-primary rounded-t-lg transition-all" style={{ height: `${h}%` }} />
                ))}
             </div>
          </div>

          <div className="p-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl space-y-6">
             <h4 className="text-xl font-bold">Top Categories</h4>
             <div className="space-y-4">
                {[
                  { name: "Real Estate", value: "45%", color: "bg-blue-500" },
                  { name: "Automotive", value: "28%", color: "bg-purple-500" },
                  { name: "Electronics", value: "12%", color: "bg-green-500" },
                  { name: "Services", value: "15%", color: "bg-orange-500" },
                ].map((cat) => (
                  <div key={cat.name} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{cat.name}</span>
                      <span className="text-muted-foreground">{cat.value}</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className={`h-full ${cat.color} rounded-full`} style={{ width: cat.value }} />
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
