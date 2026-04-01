"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Users, MoreVertical, Shield, User as UserIcon, Mail, MapPin, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

const INITIAL_USERS = [
  { id: "1", name: "Alex Johnson", email: "alex@example.com", role: "Seller", status: "Active", location: "New York", joined: "2 days ago" },
  { id: "2", name: "Sarah Smith", email: "sarah@example.com", role: "Admin", status: "Active", location: "London", joined: "1 month ago" },
  { id: "3", name: "Mike Ross", email: "mike@example.com", role: "Seller", status: "Suspended", location: "Chicago", joined: "1 week ago" },
  { id: "4", name: "Harvey Specter", email: "harvey@example.com", role: "Moderator", status: "Active", location: "New York", joined: "3 weeks ago" },
  { id: "5", name: "Rachel Zane", email: "rachel@example.com", role: "Seller", status: "Active", location: "Toronto", joined: "5 days ago" },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

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
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">User <span className="text-primary font-black uppercase">Management</span></h1>
            <p className="text-muted-foreground">Monitor and control user accounts, permissions and platform access.</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-white gap-2 font-bold px-6">
            <Users className="w-4 h-4" /> Add New User
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
           <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search by name, email or city..." className="pl-10 h-12 bg-white/5 border-white/10 rounded-2xl focus:border-primary/50" />
           </div>
           <Button variant="outline" className="h-12 border-white/10 bg-white/5 rounded-2xl gap-2 px-6 hover:bg-white/10">
              <Filter className="w-4 h-4" /> Filters
           </Button>
        </div>

        <div className="p-8 rounded-[2rem] border border-white/10 bg-black/40 backdrop-blur-2xl">
           <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="text-[10px] uppercase tracking-[0.2em] font-black border-b border-white/10 text-muted-foreground">
                       <th className="px-4 py-4">User Details</th>
                       <th className="px-4 py-4 text-center">Role</th>
                       <th className="px-4 py-4 text-center">Status</th>
                       <th className="px-4 py-4 text-right">Joined</th>
                       <th className="px-4 py-4 text-right">Actions</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-white/5">
                    {users.map((user) => (
                       <tr key={user.id} className="group hover:bg-white/[0.02] transition-colors">
                          <td className="px-4 py-6">
                             <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-purple-600/20 flex items-center justify-center text-primary font-bold border border-primary/20">
                                   {user.name.charAt(0)}
                                </div>
                                <div>
                                   <div className="font-bold text-white group-hover:text-primary transition-colors">{user.name}</div>
                                   <div className="flex items-center gap-4 mt-1">
                                      <span className="text-[10px] text-muted-foreground flex items-center gap-1"><Mail className="w-2.5 h-2.5" /> {user.email}</span>
                                      <span className="text-[10px] text-muted-foreground flex items-center gap-1"><MapPin className="w-2.5 h-2.5" /> {user.location}</span>
                                   </div>
                                </div>
                             </div>
                          </td>
                          <td className="px-4 py-6 text-center">
                             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold">
                                {user.role === "Admin" ? <Shield className="w-3 h-3 text-red-500" /> : <UserIcon className="w-3 h-3 text-primary" />}
                                {user.role}
                             </div>
                          </td>
                          <td className="px-4 py-6 text-center">
                             <Badge className={cn(
                                "border-none py-1 h-6 px-3 rounded-md text-[9px] font-black uppercase tracking-widest",
                                user.status === "Active" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                             )}>
                                {user.status}
                             </Badge>
                          </td>
                          <td className="px-4 py-6 text-right">
                             <span className="text-xs text-muted-foreground font-medium">{user.joined}</span>
                          </td>
                          <td className="px-4 py-6 text-right">
                             <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white">
                                <MoreVertical className="w-4 h-4" />
                             </Button>
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
