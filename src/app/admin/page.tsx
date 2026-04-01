"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { CheckCircle, XCircle, DollarSign, Users, BarChart3, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";


const INITIAL_PAYMENTS = [
  { id: "1", ad: "Premium Tech Workspace", amount: "45,000", ref: "TXN123456", sender: "Alex Johnson", status: "Pending" },
  { id: "2", ad: "Luxury Electric SUV", amount: "85,000", ref: "TXN789012", sender: "Sarah Smith", status: "Pending" },
  { id: "3", ad: "Gaming Laptop RTX 4080", amount: "1,800", ref: "TXN345678", sender: "Mike Ross", status: "Pending" },
];

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [payments, setPayments] = useState(INITIAL_PAYMENTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Demo admin check: In a real app, this would check the Supabase session/role
    const checkAdmin = async () => {
      // Small delay for realism
      await new Promise(r => setTimeout(r, 500));
      setLoading(false);
    };
    checkAdmin();
  }, [router]);

  const handleAction = (id: string, newStatus: string) => {
    setPayments(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground animate-pulse font-bold tracking-widest text-xs uppercase">Verifying Admin Access...</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin <span className="text-primary font-black uppercase">Panel</span></h1>
            <p className="text-muted-foreground">Platform oversight, payment verification, and system analytics.</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-white gap-2 font-bold">
            <Activity className="w-4 h-4" /> System Health
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: "Total Revenue", value: "Rs. 1,452,000", icon: DollarSign, color: "text-green-500", bg: "bg-green-500/10" },
            { name: "Verified Payments", value: "342", icon: CheckCircle, color: "text-blue-500", bg: "bg-blue-500/10" },
            { name: "Total Users", value: "1,204", icon: Users, color: "text-primary", bg: "bg-primary/10" },
            { name: "Active Ads", value: "856", icon: BarChart3, color: "text-purple-500", bg: "bg-purple-500/10" },
          ].map((stat) => (
            <div key={stat.name} className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] flex items-center justify-between group hover:border-primary/50 transition-colors">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">{stat.name}</p>
                <p className="text-xl font-bold">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 rounded-3xl border border-white/10 bg-white/[0.02]">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-500" /> Payment Verification Queue
              </h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-xs uppercase tracking-widest font-semibold border-b border-white/10 text-muted-foreground">
                      <th className="px-4 py-3">Ad / Reference</th>
                      <th className="px-4 py-3">Sender</th>
                      <th className="px-4 py-3 text-right">Amount</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {payments.map((item) => (
                      <tr key={item.id} className="group hover:bg-white/[0.02]">
                        <td className="px-4 py-4">
                          <div className="font-medium text-sm">{item.ad}</div>
                          <div className="text-[10px] text-muted-foreground font-mono">{item.ref}</div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-300">{item.sender}</td>
                        <td className="px-4 py-4 text-right font-bold text-green-500">Rs. {item.amount}</td>
                        <td className="px-4 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {item.status === "Pending" ? (
                              <>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="text-xs text-green-500 hover:bg-green-500/10"
                                  onClick={() => handleAction(item.id, "Verified")}
                                >
                                  Verify
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="text-xs text-destructive hover:bg-destructive/10"
                                  onClick={() => handleAction(item.id, "Rejected")}
                                >
                                  Reject
                                </Button>
                              </>
                            ) : (
                              <Badge className={cn(
                                "border-none py-1 h-7",
                                item.status === "Verified" ? "bg-green-500/10 text-green-500" : "bg-destructive/10 text-destructive"
                              )}>
                                {item.status}
                              </Badge>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl border border-white/10 bg-white/[0.02]">
            <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {[
                { name: "John Realty", role: "Seller", action: "Posted new ad", time: "Just now" },
                { name: "Sarah Smith", role: "Admin", action: "Verified payment", time: "5 mins ago" },
                { name: "TechResale", role: "Moderator", action: "Hidden reported ad", time: "12 mins ago" },
                { name: "Mike Ross", role: "Seller", action: "Purchased Premium", time: "45 mins ago" },
              ].map((user, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-[10px] text-muted-foreground">{user.action} • {user.time}</p>
                    </div>
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
