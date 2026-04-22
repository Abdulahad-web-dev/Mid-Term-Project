"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ShoppingBag, 
  Clock, 
  CheckCircle2, 
  TrendingUp, 
  Truck,
  Loader2,
  Check
} from "lucide-react";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function SellerDashboard() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);
  const [stats, setStats] = useState({
    totalSales: 0,
    pendingOrders: 0,
    completedOrders: 0
  });

  const supabase = createClient();

  const fetchOrders = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('seller_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setOrders(data || []);
      
      // Calculate stats
      const total = data?.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0) || 0;
      const pending = data?.filter(o => o.status === 'Pending').length || 0;
      const completed = data?.filter(o => o.status === 'Completed' || o.status === 'On the Way').length || 0;

      setStats({
        totalSales: total,
        pendingOrders: pending,
        completedOrders: completed
      });

    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [supabase]);

  const handleApprove = async (orderId: string) => {
    setProcessing(orderId);
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: 'On the Way' })
        .eq('id', orderId);

      if (error) throw error;
      
      alert("Order approved! The buyer has been notified.");
      await fetchOrders(); // Refresh data
    } catch (err: any) {
      console.error("Error approving order:", err);
      alert("Failed to approve order: " + err.message);
    } finally {
      setProcessing(null);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Seller <span className="text-primary">Dashboard</span></h1>
          <p className="text-muted-foreground">Manage your sales and approve incoming purchase requests.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] flex items-center justify-between group hover:border-primary/50 transition-colors">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Total Revenue</p>
              <p className="text-2xl font-bold">Rs. {stats.totalSales.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-xl bg-green-500/10">
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] flex items-center justify-between group hover:border-primary/50 transition-colors">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Pending Orders</p>
              <p className="text-2xl font-bold">{stats.pendingOrders}</p>
            </div>
            <div className="p-3 rounded-xl bg-orange-500/10">
              <Clock className="w-5 h-5 text-orange-500" />
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] flex items-center justify-between group hover:border-primary/50 transition-colors">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Active Shipments</p>
              <p className="text-2xl font-bold">{stats.completedOrders}</p>
            </div>
            <div className="p-3 rounded-xl bg-primary/10">
              <Truck className="w-5 h-5 text-primary" />
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="p-6 rounded-3xl border border-white/10 bg-white/[0.02]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-primary" /> Recent Orders
            </h3>
            <Button variant="ghost" size="sm" className="text-primary font-bold">Export CSV</Button>
          </div>
          
          <div className="overflow-x-auto">
            {loading ? (
              <div className="py-20 flex justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : orders.length === 0 ? (
              <div className="py-20 text-center text-muted-foreground italic">
                No orders received yet.
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-xs uppercase tracking-widest font-semibold border-b border-white/10 text-muted-foreground">
                    <th className="px-4 py-3">Product / ID</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3 text-right">Amount</th>
                    <th className="px-4 py-3 text-right">Status</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {orders.map((order) => (
                    <tr key={order.id} className="group hover:bg-white/[0.02] transition-colors">
                      <td className="px-4 py-4">
                        <div className="font-medium text-sm text-white">{order.title || 'Product Purchase'}</div>
                        <div className="text-[10px] text-muted-foreground font-mono">ORD-{order.id.slice(0, 8)}</div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-400">
                        {new Date(order.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-4 text-right font-bold text-white">
                        Rs. {Number(order.amount).toLocaleString()}
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className="flex items-center justify-end">
                          <Badge className={cn(
                            "border-none gap-1 py-1",
                            order.status === "On the Way" ? "bg-blue-500/10 text-blue-500" : 
                            order.status === "Completed" ? "bg-green-500/10 text-green-500" : 
                            "bg-yellow-500/10 text-yellow-500"
                          )}>
                            {order.status === "On the Way" ? <Truck className="w-3 h-3" /> : 
                             order.status === "Completed" ? <CheckCircle2 className="w-3 h-3" /> : 
                             <Clock className="w-3 h-3" />}
                            {order.status}
                          </Badge>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-right">
                        {order.status === 'Pending' ? (
                          <Button 
                            onClick={() => handleApprove(order.id)}
                            disabled={processing === order.id}
                            size="sm" 
                            className="bg-primary hover:bg-primary/90 text-white font-bold gap-2 rounded-xl h-9"
                          >
                            {processing === order.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" />}
                            Approve
                          </Button>
                        ) : (
                          <span className="text-[10px] text-muted-foreground font-medium uppercase">Processed</span>
                        )}
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
