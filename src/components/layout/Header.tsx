"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Rocket, User, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Explore", href: "/explore" },
    { name: "Packages", href: "/#packages" },
    { name: "FAQ", href: "/#faq" },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled 
          ? "h-16 border-b border-white/10 bg-black/60 backdrop-blur-xl py-2" 
          : "h-20 bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div 
            whileHover={{ rotate: 12, scale: 1.1 }}
            className="p-2 bg-primary rounded-xl shadow-lg shadow-primary/20"
          >
            <Rocket className="w-5 h-5 text-white" />
          </motion.div>
          <span className="text-xl font-bold tracking-tight">
            AdFlow <span className="text-primary text-2xl italic">PRO</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="relative text-sm font-medium text-white/70 hover:text-white transition-colors group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
          
          <Link href="/login">
            <Button variant="ghost" className="hidden md:flex gap-2 hover:bg-white/5">
              <User className="w-4 h-4" />
              Login
            </Button>
          </Link>
          
          <Link href="/dashboard/submit">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 font-bold px-6">
                Post Ad
              </Button>
            </motion.div>
          </Link>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 bg-black/95 backdrop-blur-2xl overflow-hidden"
          >
            <div className="container mx-auto px-4 py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  href={link.href} 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl font-bold hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <hr className="border-white/10" />
              <Link href="/login" onClick={() => setIsMenuOpen(false)} className="text-xl font-medium">
                Login
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
