"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Rocket,
  Github,
  Chrome,
  ShieldCheck,
  Loader2,
  ArrowRight,
  User,
  Store,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleQuickLogin = (role: "buyer" | "seller") => {
    if (role === "buyer") {
      setEmail("abdulahad.web9@gmail.com");
      setPassword("12345678");
    } else {
      setEmail("abdulahad.web96@gmail.com");
      setPassword("12345678");
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    const role = data.user?.user_metadata?.role;

    if (role === "admin") router.push("/admin");
    else if (role === "seller") router.push("/dashboard");
    else router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-md p-8 rounded-3xl border border-white/10 bg-black/50"
      >
        <h1 className="text-xl text-white mb-4 text-center">Login</h1>

        <div className="grid grid-cols-2 gap-3 mb-5">
          <Button onClick={() => handleQuickLogin("buyer")}>
            <User className="mr-2 h-4 w-4" /> Buyer
          </Button>
          <Button onClick={() => handleQuickLogin("seller")}>
            <Store className="mr-2 h-4 w-4" /> Seller
          </Button>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button className="w-full">
            {loading ? <Loader2 className="animate-spin" /> : "Login"}
          </Button>
        </form>

        <p className="text-sm text-gray-400 mt-4 text-center">
          No account? <Link href="/register">Register</Link>
        </p>
      </motion.div>
    </div>
  );
}
