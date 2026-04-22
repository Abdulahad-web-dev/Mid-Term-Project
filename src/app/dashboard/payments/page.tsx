"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreditCard, Download, Receipt, ExternalLink, ShieldCheck, CheckCircle2, Clock, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function PaymentsPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('buyer_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setOrders(data || []);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [supabase]);

  const totalSpent = orders.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
  const pendingOrders = orders.filter(o => o.status === 'Pending').length;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">My <span className="text-primary">Purchases</span></h1>
            <p className="text-muted-foreground">Track your orders and payment history.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
            <p className="text-sm text-muted-foreground mb-1">Total Spent</p>
            <p className="text-2xl font-bold">Rs. {totalSpent.toLocaleString()}</p>
          </div>
          <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
            <p className="text-sm text-muted-foreground mb-1">Total Orders</p>
            <p className="text-2xl font-bold">{orders.length}</p>
          </div>
          <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
            <p className="text-sm text-muted-foreground mb-1">Pending Verification</p>
            <p className="text-2xl font-bold">{pendingOrders}</p>
          </div>
        </div>

        <div className="p-6 rounded-3xl border border-white/10 bg-white/[0.02]">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Receipt className="w-5 h-5 text-primary" /> Purchase History
          </h3>
          
          <div className="overflow-x-auto">
            {loading ? (
              <div className="py-10 flex justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : orders.length === 0 ? (
              <div className="py-10 text-center text-muted-foreground italic">
                No purchases found.
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-xs uppercase tracking-widest font-semibold border-b border-white/10 text-muted-foreground">
                    <th className="px-4 py-3">Product / Reference</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3 text-right">Amount</th>
                    <th className="px-4 py-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {orders.map((item) => (
                    <tr key={item.id} className="group hover:bg-white/[0.02]">
                      <td className="px-4 py-4">
                        <div className="font-medium text-sm">{item.title || 'Product Purchase'}</div>
                        <div className="text-[10px] text-muted-foreground font-mono">ORD-{item.id.slice(0, 8)}</div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-300">
                        {new Date(item.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-4 text-right font-bold text-white">Rs. {Number(item.amount).toLocaleString()}</td>
                      <td className="px-4 py-4 text-right">
                        <div className="flex items-center justify-end">
                          <Badge className={cn(
                            "border-none gap-1 py-1",
                            item.status === "Completed" ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500"
                          )}>
                            {item.status === "Completed" ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                            {item.status}
                          </Badge>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
