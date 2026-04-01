"use client";

import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { motion } from "framer-motion";

const PACKAGES = [
  {
    name: "Basic",
    price: "500",
    duration: "7 days",
    features: [
      "7 Days Duration",
      "Standard Visibility",
      "1x Featured Weight",
      "Email Support",
    ],
    isFeatured: false,
  },
  {
    name: "Standard",
    price: "1,200",
    duration: "15 days",
    features: [
      "15 Days Duration",
      "Category Priority",
      "2x Featured Weight",
      "Manual Refresh",
      "Priority Support",
    ],
    isFeatured: true,
  },
  {
    name: "Premium",
    price: "2,500",
    duration: "30 days",
    features: [
      "30 Days Duration",
      "Homepage Visibility",
      "3x Featured Weight",
      "Auto Refresh (3 days)",
      "24/7 Dedicated Support",
      "Premium Badge",
    ],
    isFeatured: false,
  },
];

export default function PackagesSection() {
  return (
    <section className="py-32 relative overflow-hidden" id="packages">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/5 blur-[120px] -z-10" />
      
      <Container>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-black border border-primary/20 mb-6 uppercase tracking-wider">
            <Star className="w-4 h-4" />
            Pricing Plans
          </span>
          <h2 className="text-4xl md:text-6xl font-black mb-6">Choose Your <span className="gradient-text">Plan</span></h2>
          <p className="text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
            Select the perfect package to boost your visibility and reach more customers with our premium listing features.
          </p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {PACKAGES.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
              }}
              whileHover={{ y: -12, transition: { duration: 0.3 } }}
              className={`relative p-10 rounded-[2.5rem] border transition-all duration-500 overflow-hidden flex flex-col group ${
                pkg.isFeatured 
                  ? "border-primary bg-primary/10 shadow-3xl shadow-primary/20" 
                  : "border-white/10 bg-white/[0.04] backdrop-blur-xl hover:bg-white/[0.06] hover:border-white/20"
              }`}
            >
              {pkg.isFeatured && (
                <>
                  <div className="absolute top-0 right-0 p-6">
                    <div className="bg-primary text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg shadow-primary/40 animate-pulse">
                      Popular
                    </div>
                  </div>
                  <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
                </>
              )}

              <div className="mb-10">
                <h3 className="text-2xl font-black mb-4 group-hover:text-primary transition-colors">{pkg.name}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black tracking-tighter">Rs. {pkg.price}</span>
                  <span className="text-white/40 font-medium">/{pkg.duration}</span>
                </div>
              </div>

              <ul className="space-y-5 mb-12 flex-1">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-4 text-white/70 group-hover:text-white transition-colors">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center border border-primary/20">
                      <Check className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <span className="text-sm font-medium tracking-wide">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                variant={pkg.isFeatured ? "default" : "outline"} 
                className={`w-full h-14 rounded-2xl font-black text-lg transition-all duration-300 ${
                  pkg.isFeatured 
                    ? "bg-primary hover:bg-primary/90 shadow-xl shadow-primary/30" 
                    : "border-white/10 hover:bg-white/5 hover:border-white/30"
                }`}
              >
                Get Started
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
