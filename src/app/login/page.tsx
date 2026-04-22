"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔐 Login Function
  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");

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

    // 🎯 Role based redirect
    if (role === "admin") {
      router.push("/admin");
    } else if (role === "seller") {
      router.push("/seller-dashboard");
    } else {
      router.push("/dashboard");
    }
  };

  // ⚡ Quick Login
  const quickLogin = (type: "buyer" | "seller") => {
    if (type === "buyer") {
      setEmail("abdulahad.web9@gmail.com");
      setPassword("12345678");
    } else {
      setEmail("abdulahad.web96@gmail.com");
      setPassword("12345678");
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center px-4">
      
      {/* Glow */}
      <div className="absolute w-[500px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full"></div>

      {/* Card */}
      <div className="relative w-full max-w-md p-8 rounded-3xl border border-white/10 bg-black/60 backdrop-blur-xl shadow-2xl">

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-white text-2xl font-bold">
            🚀 AdFlow <span className="text-purple-500">PRO</span>
          </h1>
          <h2 className="text-white text-xl mt-4 font-semibold">
            Welcome Back
          </h2>
          <p className="text-gray-400 text-sm">
            Please enter your details to sign in.
          </p>
        </div>

        {/* ⚡ Quick Login */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <button
            onClick={() => quickLogin("buyer")}
            className="py-2 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-300 hover:bg-blue-500/20"
          >
            Buyer
          </button>

          <button
            onClick={() => quickLogin("seller")}
            className="py-2 rounded-lg bg-green-500/10 border border-green-500/30 text-green-300 hover:bg-green-500/20"
          >
            Seller
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">

          {error && (
            <div className="text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          {/* Email */}
          <div>
            <label className="text-sm text-gray-400">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between text-sm">
              <label className="text-gray-400">Password</label>
              <Link href="#" className="text-purple-500 hover:underline">
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold hover:opacity-90 transition"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-white/10"></div>
          <span className="px-3 text-xs text-gray-500">OR CONTINUE WITH</span>
          <div className="flex-1 h-px bg-white/10"></div>
        </div>

        {/* Social */}
        <div className="grid grid-cols-2 gap-4">
          <button className="py-3 rounded-xl border border-white/10 text-white hover:bg-white/5">
            Github
          </button>
          <button className="py-3 rounded-xl border border-white/10 text-white hover:bg-white/5">
            Google
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-400 mt-6">
          Don’t have an account?{" "}
          <Link href="/register" className="text-purple-500 hover:underline">
            Sign up for free
          </Link>
        </p>
      </div>
    </div>
  );
}
