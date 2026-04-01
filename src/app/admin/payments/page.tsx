"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { CheckCircle, XCircle, DollarSign, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const INITIAL_PAYMENTS = [
  { id: "1", ad: "Premium Tech Workspace", amount: "45,000", ref: "TXN123456", sender: "Alex Johnson", status: "Pending" },
  { id: "2", ad: "Luxury Electric SUV", amount: "85,000", ref: "TXN789012", sender: "Sarah Smith", status: "Pending" },
  { id: "3", ad: "Gaming Laptop RTX 4080", amount: "1,800", ref: "TXN345678", sender: "Mike Ross", status: "Pending" },
  { id: "4", ad: "Modern Minimalist Villa", amount: "120,000", ref: "TXN901234", sender: "Elena Gilbert", status: "Pending" },
];

export default function AdminPaymentsPage() {
  const router = useRouter();
  const [payments, setPayments] = useState(INITIAL_PAYMENTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      await new Promise(r => setTimeout(r, 400));
      setLoading(false);
    };
    checkAdmin();
  }, []);

  const handleAction = (id: string, newStatus: string) => {
    setPayments(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Verify <span className="text-primary font-black uppercase">Payments</span></h1>
          <p className="text-muted-foreground">Manage and verify incoming transaction proofs from sellers.</p>
        </div>

        <div className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md">
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
                  <tr key={item.id} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="px-4 py-6">
                      <div className="font-bold text-sm text-white group-hover:text-primary transition-colors">{item.ad}</div>
                      <div className="text-[10px] text-muted-foreground font-mono mt-1">{item.ref}</div>
                    </td>
                    <td className="px-4 py-6 text-sm text-gray-300">{item.sender}</td>
                    <td className="px-4 py-6 text-right font-black text-green-500">Rs. {item.amount}</td>
                    <td className="px-4 py-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {item.status === "Pending" ? (
                          <>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-xs font-bold text-green-500 hover:bg-green-500/10 border border-green-500/20"
                              onClick={() => handleAction(item.id, "Verified")}
                            >
                              Verify Proof
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-xs font-bold text-destructive hover:bg-destructive/10 border border-destructive/20"
                              onClick={() => handleAction(item.id, "Rejected")}
                            >
                              Reject
                            </Button>
                          </>
                        ) : (
                          <Badge className={cn(
                            "border-none py-1 h-8 px-4 font-bold uppercase tracking-widest text-[10px]",
                            item.status === "Verified" ? "bg-green-500 text-black shadow-lg shadow-green-500/20" : "bg-destructive text-white"
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
    </DashboardLayout>
  );
}
