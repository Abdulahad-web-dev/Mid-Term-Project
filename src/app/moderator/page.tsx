"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { CheckCircle, XCircle, Eye, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { useState } from "react";
import { cn } from "@/lib/utils";

const INITIAL_REVIEW_QUEUE = [
  { id: "1", title: "Luxury Beachfront Villa", client: "John Realty", date: "10 mins ago", status: "Pending" },
  { id: "2", title: "Refurbished iPhone 15 Pro", client: "TechResale", date: "1 hour ago", status: "Suspicious" },
  { id: "3", title: "English Tutoring Services", client: "Sarah Edu", date: "2 hours ago", status: "Pending" },
];

export default function ModeratorQueue() {
  const [queue, setQueue] = useState(INITIAL_REVIEW_QUEUE);

  const handleAction = (id: string, newStatus: string) => {
    setQueue(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Moderation <span className="text-primary font-black uppercase">Queue</span></h1>
          <p className="text-muted-foreground">Review and approve submitted listings to maintain platform quality.</p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.02] overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 text-xs uppercase tracking-widest font-semibold border-b border-white/10 text-muted-foreground">
                <th className="px-6 py-4">Listing Title</th>
                <th className="px-6 py-4">Submitted By</th>
                <th className="px-6 py-4">Time</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {queue.map((item) => (
                <tr key={item.id} className="group hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium group-hover:text-primary transition-colors">{item.title}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">{item.client}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">{item.date}</td>
                  <td className="px-6 py-4">
                    <Badge variant={item.status === "Suspicious" ? "destructive" : "secondary"} className={cn(
                      "text-[10px] uppercase border-none py-1 h-6",
                      item.status === "Approved" ? "bg-green-500/10 text-green-500" : 
                      item.status === "Rejected" ? "bg-destructive/10 text-destructive" : ""
                    )}>
                      {item.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" className="hover:text-primary"><Eye className="w-4 h-4" /></Button>
                      {item.status !== "Approved" && item.status !== "Rejected" && (
                        <>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="hover:text-green-500"
                            onClick={() => handleAction(item.id, "Approved")}
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="hover:text-destructive"
                            onClick={() => handleAction(item.id, "Rejected")}
                          >
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-dashed border-white/10 bg-white/[0.01] flex flex-col items-center text-center">
            <CheckCircle className="w-8 h-8 text-green-500 mb-4" />
            <h4 className="font-bold mb-1">Weekly Approvals</h4>
            <p className="text-2xl font-bold text-white">142</p>
          </div>
          <div className="p-6 rounded-2xl border border-dashed border-white/10 bg-white/[0.01] flex flex-col items-center text-center">
            <AlertTriangle className="w-8 h-8 text-orange-500 mb-4" />
            <h4 className="font-bold mb-1">Flagged Items</h4>
            <p className="text-2xl font-bold text-white">12</p>
          </div>
          <div className="p-6 rounded-2xl border border-dashed border-white/10 bg-white/[0.01] flex flex-col items-center text-center">
            <XCircle className="w-8 h-8 text-destructive mb-4" />
            <h4 className="font-bold mb-1">Rejections</h4>
            <p className="text-2xl font-bold text-white">24</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
