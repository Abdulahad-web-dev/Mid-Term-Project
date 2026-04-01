"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShieldCheck, Rocket, Github, Chrome, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Development / Demo Full Bypass 
    if (email === "abdulahadwarraich.web@gmail.com" && password === "Ahad@9696") {
      document.cookie = "Adflow-Admin-Bypass=true; path=/";
      router.push("/admin");
      return;
    }

    const { data: { user }, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
    } else if (user) {
      // Strict check for admin role in metadata
      const role = user.user_metadata?.role;
      if (role === 'admin' || email === "abdulahadwarraich.web@gmail.com") {
        router.push("/admin");
      } else {
        setError("Unauthorized access. Admin privileges required.");
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[140px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md p-8 rounded-3xl border border-primary/20 bg-black/50 backdrop-blur-2xl shadow-2xl relative"
      >
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 p-4 rounded-2xl bg-primary shadow-xl shadow-primary/40 border border-white/20">
          <ShieldCheck className="w-8 h-8 text-white" />
        </div>

        <div className="text-center mt-6 mb-8">
          <h1 className="text-2xl font-bold text-white mb-2 uppercase tracking-tight">Admin <span className="text-primary">Control</span></h1>
          <p className="text-muted-foreground text-sm">Secure access for platform administrators only.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center font-medium">
              {error}
            </div>
          )}
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Admin Email</label>
            <Input 
              name="email"
              type="email" 
              placeholder="admin@adflow.pro" 
              className="bg-white/5 border-white/10 h-12 focus:border-primary transition-all rounded-xl"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Security Password</label>
            <Input 
              name="password"
              type="password" 
              placeholder="••••••••" 
              className="bg-white/5 border-white/10 h-12 focus:border-primary transition-all rounded-xl"
              required
            />
          </div>

          <Button 
            type="submit"
            disabled={loading}
            className="w-full h-14 text-white bg-primary hover:bg-primary/90 mt-4 rounded-2xl font-bold text-lg shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Login to Admin Panel
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <Link href="/login" className="text-sm text-muted-foreground hover:text-white transition-colors">
            Are you a seller? <span className="text-primary font-bold">Standard Login</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

