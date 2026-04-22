"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Rocket, Github, Chrome, ShieldCheck, Loader2, ArrowRight, User, Store } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleQuickLogin = (quickEmail: string, quickPassword: string) => {
    setEmail(quickEmail);
    setPassword(quickPassword);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const emailValue = email || (formData.get("email") as string);
    const passwordValue = password || (formData.get("password") as string);

    const { data: { user }, error: signInError } = await supabase.auth.signInWithPassword({
      email: emailValue,
      password: passwordValue,
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
    } else if (user) {
      // Redirect based on role metadata
      const role = user.user_metadata?.role;
      if (role === 'admin') {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
      {/* Background Decor */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md p-8 rounded-3xl border border-white/10 bg-black/50 backdrop-blur-xl shadow-2xl"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <Rocket className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold tracking-tight text-white flex items-center">
              AdFlow <span className="text-primary text-3xl ml-1">PRO</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
          <p className="text-muted-foreground text-sm">Please enter your details to sign in.</p>
        </div>

        {/* Quick Login Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => handleQuickLogin("abdulahad.web9@gmail.com", "12345678")}
            className="flex flex-col items-center gap-2 p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 hover:bg-blue-500/20 hover:border-blue-500/50 transition-all duration-300"
          >
            <User className="w-5 h-5 text-blue-400" />
            <span className="text-xs font-bold text-blue-300">Buyer</span>
            <span className="text-[10px] text-blue-200/60">Quick Login</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => handleQuickLogin("abdulahad.web96@gmail.com", "12345678")}
            className="flex flex-col items-center gap-2 p-4 rounded-xl bg-green-500/10 border border-green-500/30 hover:bg-green-500/20 hover:border-green-500/50 transition-all duration-300"
          >
            <Store className="w-5 h-5 text-green-400" />
            <span className="text-xs font-bold text-green-300">Seller</span>
            <span className="text-[10px] text-green-200/60">Quick Login</span>
          </motion.button>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center font-medium">
              {error}
            </div>
          )}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Email Address</label>
            <Input 
              name="email"
              type="email" 
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/5 border-white/10 h-12 focus:border-primary transition-all rounded-xl" 
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-gray-400">Password</label>
              <Link href="/forgot-password" className="text-xs text-primary hover:underline font-bold">Forgot password?</Link>
            </div>
            <Input 
              name="password"
              type="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white/5 border-white/10 h-12 focus:border-primary transition-all rounded-xl" 
              required
            />
          </div>

          <Button 
            type="submit"
            disabled={loading}
            className="w-full h-14 text-white bg-primary hover:bg-primary/90 mt-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 group shadow-xl shadow-primary/20"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Sign In
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#050505] px-2 text-muted-foreground font-medium">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="h-12 border-white/10 hover:bg-white/5 gap-2 rounded-xl text-sm">
            <Github className="w-4 h-4" /> Github
          </Button>
          <Button variant="outline" className="h-12 border-white/10 hover:bg-white/5 gap-2 rounded-xl text-sm">
            <Chrome className="w-4 h-4" /> Google
          </Button>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Don't have an account?{" "}
          <Link href="/register" className="text-primary hover:underline font-bold">Sign up for free</Link>
        </p>

        <div className="mt-6 pt-6 border-t border-white/5 text-center">
          <Link href="/admin/login" className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center justify-center gap-2">
            <ShieldCheck className="w-3 h-3" /> Area for Administrators Only
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
