"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Rocket, ShieldCheck, User, Store, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function RegisterPage() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [role, setRole] = useState<"seller" | "buyer">("buyer");

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const fullName = formData.get("fullName") as string;

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: role,
        },
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
    } else {
      // Typically redirects to a confirmation page or dashboard
      // Next.js middleware will handle the session once confirmed
      alert("Registration successful! Please check your email for confirmation.");
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
      {/* Background Decor */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px]" />
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
          <h1 className="text-2xl font-bold text-white">Create Account</h1>
          <p className="text-muted-foreground text-sm">Join the premium marketplace today.</p>
        </div>

        {/* Role Selection */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <button
            type="button"
            onClick={() => setRole("buyer")}
            className={cn(
              "flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all duration-300",
              role === "buyer" 
                ? "bg-primary border-primary shadow-lg shadow-primary/20" 
                : "bg-white/5 border-white/10 hover:border-white/20"
            )}
          >
            <User className={cn("w-6 h-6", role === "buyer" ? "text-white" : "text-muted-foreground")} />
            <span className={cn("text-sm font-bold", role === "buyer" ? "text-white" : "text-muted-foreground")}>Buyer</span>
          </button>
          <button
            type="button"
            onClick={() => setRole("seller")}
            className={cn(
              "flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all duration-300",
              role === "seller" 
                ? "bg-primary border-primary shadow-lg shadow-primary/20" 
                : "bg-white/5 border-white/10 hover:border-white/20"
            )}
          >
            <Store className={cn("w-6 h-6", role === "seller" ? "text-white" : "text-muted-foreground")} />
            <span className={cn("text-sm font-bold", role === "seller" ? "text-white" : "text-muted-foreground")}>Seller</span>
          </button>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center font-medium">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Full Name</label>
            <Input 
              name="fullName"
              type="text" 
              placeholder="John Doe" 
              className="bg-white/5 border-white/10 h-12 focus:border-primary transition-all rounded-xl"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Email Address</label>
            <Input 
              name="email"
              type="email" 
              placeholder="name@example.com" 
              className="bg-white/5 border-white/10 h-12 focus:border-primary transition-all rounded-xl"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Password</label>
            <Input 
              name="password"
              type="password" 
              placeholder="••••••••" 
              className="bg-white/5 border-white/10 h-12 focus:border-primary transition-all rounded-xl"
              required
              minLength={6}
            />
          </div>

          <div className="flex items-center gap-2 p-4 rounded-xl bg-primary/5 border border-primary/10 mb-6">
            <ShieldCheck className="w-5 h-5 text-primary" />
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              By signing up, you agree to our Terms of Service and Privacy Policy. Your data is encrypted and secure.
            </p>
          </div>

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full h-14 text-white bg-primary hover:bg-primary/90 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 group shadow-xl shadow-primary/20"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Create {role.charAt(0).toUpperCase() + role.slice(1)} Account
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline font-bold">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
}

