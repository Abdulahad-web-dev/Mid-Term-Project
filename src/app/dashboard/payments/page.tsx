"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreditCard, Download, Receipt, ExternalLink, ShieldCheck, CheckCircle2, Clock } from "lucide-react";

const PAYMENTS = [
  { id: "1", ad: "Premium Tech Workspace in Downtown", date: "Jan 24, 2024", amount: "45,000", method: "JazzCash", ref: "TXN943210", status: "Verified" },
  { id: "2", ad: "Gaming Laptop RTX 4080", date: "Jan 19, 2024", amount: "1,800", method: "EasyPaisa", ref: "TXN827163", status: "Verified" },
  { id: "3", ad: "Professional Full-Stack Development Service", date: "Jan 15, 2024", amount: "150", method: "Bank Transfer", ref: "TXN716254", status: "Pending" },
];

export default function PaymentsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Billing & <span className="text-primary">Payments</span></h1>
            <p className="text-muted-foreground">Manage your ad subscriptions and transaction history.</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-white gap-2">
            <CreditCard className="w-4 h-4" /> Add Payment Method
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
            <p className="text-sm text-muted-foreground mb-1">Total Spent</p>
            <p className="text-2xl font-bold">Rs. 46,950</p>
          </div>
          <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
            <p className="text-sm text-muted-foreground mb-1">Active Packages</p>
            <p className="text-2xl font-bold">2</p>
          </div>
          <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
            <p className="text-sm text-muted-foreground mb-1">Pending Verification</p>
            <p className="text-2xl font-bold">1</p>
          </div>
        </div>

        <div className="p-6 rounded-3xl border border-white/10 bg-white/[0.02]">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Receipt className="w-5 h-5 text-primary" /> Transition history
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-xs uppercase tracking-widest font-semibold border-b border-white/10 text-muted-foreground">
                  <th className="px-4 py-3">Ad / Reference</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Method</th>
                  <th className="px-4 py-3 text-right">Amount</th>
                  <th className="px-4 py-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {PAYMENTS.map((item) => (
                  <tr key={item.id} className="group hover:bg-white/[0.02]">
                    <td className="px-4 py-4">
                      <div className="font-medium text-sm">{item.ad}</div>
                      <div className="text-[10px] text-muted-foreground font-mono">{item.ref}</div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-300">{item.date}</td>
                    <td className="px-4 py-4 text-sm text-gray-300">{item.method}</td>
                    <td className="px-4 py-4 text-right font-bold text-white">Rs. {item.amount}</td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex items-center justify-end">
                        {item.status === "Verified" ? (
                          <Badge className="bg-green-500/10 text-green-500 border-none gap-1 py-1">
                            <CheckCircle2 className="w-3 h-3" /> {item.status}
                          </Badge>
                        ) : (
                          <Badge className="bg-yellow-500/10 text-yellow-500 border-none gap-1 py-1">
                            <Clock className="w-3 h-3" /> {item.status}
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

        <div className="p-8 rounded-3xl bg-primary/5 border border-primary/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h4 className="font-bold text-lg">Secure Payment Verification</h4>
              <p className="text-sm text-muted-foreground">All payments are manually verified by our team for maximum security.</p>
            </div>
          </div>
          <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary hover:text-white gap-2">
            View Policy <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
