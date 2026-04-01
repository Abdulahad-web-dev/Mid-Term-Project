"use client";

import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  PlusCircle, 
  ListOrdered, 
  CreditCard, 
  Settings, 
  LogOut, 
  Bell,
  Search,
  User,
  ShieldCheck,
  BarChart3,
  Users
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

const USER_NAV_ITEMS = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Ads", href: "/dashboard/ads", icon: ListOrdered },
  { name: "Post New Ad", href: "/dashboard/submit", icon: PlusCircle },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

const ADMIN_NAV_ITEMS = [
  { name: "Admin Home", href: "/admin", icon: ShieldCheck },
  { name: "Verify Payments", href: "/admin/payments", icon: CreditCard },
  { name: "Platform Stats", href: "/admin/stats", icon: BarChart3 },
  { name: "User Management", href: "/admin/users", icon: Users },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminPath = pathname.startsWith("/admin");
  const navItems = isAdminPath ? ADMIN_NAV_ITEMS : USER_NAV_ITEMS;

  return (
    <div className="min-h-screen bg-[#050505] flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-black/50 backdrop-blur-xl hidden md:flex flex-col">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2 mb-8">
            <span className="text-xl font-bold tracking-tight text-white">AdFlow <span className="text-primary">PRO</span></span>
          </Link>
          
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link 
                  key={item.name + item.href} 
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                    isActive 
                      ? "bg-primary text-white shadow-lg shadow-primary/20" 
                      : "text-muted-foreground hover:text-white hover:bg-white/5"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-white/5">
          <Button 
            onClick={async () => {
              const { createClient } = await import("@/lib/supabase/client");
              const supabase = createClient();
              await supabase.auth.signOut();
              document.cookie = "Adflow-Admin-Bypass=; Max-Age=0; path=/";
              window.location.href = "/login";
            }}
            variant="ghost" 
            className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive hover:bg-destructive/5 font-bold"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-16 border-b border-white/5 bg-black/50 backdrop-blur-md px-8 flex items-center justify-between">
          <h2 className="font-semibold text-lg flex items-center gap-2">
            {isAdminPath ? "Admin" : "Dashboard"} <span className="text-white/20">/</span> 
            <span className="text-primary font-bold">
              {navItems.find(item => item.href === pathname)?.name || (isAdminPath ? "Overview" : "Overview")}
            </span>
          </h2>

          <div className="flex items-center gap-4">
            <div className="relative hidden lg:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search dashboard..." 
                className="bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-1.5 text-sm focus:outline-none focus:border-primary w-64 transition-all"
              />
            </div>
            <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-white">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border border-black"></span>
            </Button>
            <Link href="/dashboard/settings">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-purple-600 border border-white/10 cursor-pointer hover:ring-2 hover:ring-primary transition-all flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-primary/20" title="View Profile">
                P
              </div>
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
}
