"use client";

import { Container } from "@/components/layout/Container";
import { motion } from "framer-motion";
import { 
  Laptop, 
  Car, 
  Home, 
  Briefcase, 
  Smartphone, 
  HeartPulse, 
  MoreHorizontal 
} from "lucide-react";
import Link from "next/link";

const CATEGORIES = [
  { name: "Electronics", icon: Laptop, color: "text-blue-500", bg: "bg-blue-500/10" },
  { name: "Vehicles", icon: Car, color: "text-green-500", bg: "bg-green-500/10" },
  { name: "Property", icon: Home, color: "text-purple-500", bg: "bg-purple-500/10" },
  { name: "Jobs", icon: Briefcase, color: "text-orange-500", bg: "bg-orange-500/10" },
  { name: "Mobiles", icon: Smartphone, color: "text-pink-500", bg: "bg-pink-500/10" },
  { name: "Services", icon: HeartPulse, color: "text-red-500", bg: "bg-red-500/10" },
  { name: "Others", icon: MoreHorizontal, color: "text-gray-500", bg: "bg-gray-500/10" },
];

export default function CategoryNav() {
  return (
    <section className="py-12 border-b border-white/5">
      <Container>
        <div className="flex items-center justify-between gap-8 overflow-x-auto pb-4 no-scrollbar">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link 
                href={`/explore?category=${cat.name.toLowerCase()}`}
                className="flex flex-col items-center gap-3 min-w-[100px] group"
              >
                <div className={`w-14 h-14 rounded-2xl ${cat.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-white/5`}>
                  <cat.icon className={`w-6 h-6 ${cat.color}`} />
                </div>
                <span className="text-sm font-medium text-muted-foreground group-hover:text-white transition-colors">
                  {cat.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
