"use client";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";
import LearningWidget from "./LearningWidget";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Hero Background Glows */}
      <div className="absolute top-0 left-1/2 -track-x-1/2 w-full h-full -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-center">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-2 text-left"
          >
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold border border-primary/20 mb-8 backdrop-blur-md">
                <Sparkles className="w-4 h-4" />
                Next-Gen Sponsored Listings
              </span>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-6xl md:text-8xl font-black tracking-tight mb-8 leading-[0.9]"
            >
              The Smarter Way to <br />
              <span className="gradient-text">Advertise</span> Your Business
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-xl md:text-2xl text-white/60 mb-12 max-w-2xl leading-relaxed"
            >
              AdFlow Pro offers a premium, moderated marketplace where quality meets visibility. 
              Get your business seen by thousands with our verified listing flow.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-6">
              <Link href="/explore">
                <Button size="lg" className="h-14 px-10 text-lg gap-2 bg-primary hover:bg-primary/90 shadow-2xl shadow-primary/30 rounded-2xl">
                  Explore Ads <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="#packages">
                <Button size="lg" variant="outline" className="h-14 px-10 text-lg border-white/10 hover:bg-white/5 rounded-2xl backdrop-blur-sm">
                  View Packages
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.6, duration: 0.8, type: "spring" }}
            className="hidden lg:block relative"
          >
            <div className="absolute inset-0 bg-primary/20 blur-[80px] -z-10 rounded-full" />
            <LearningWidget />
          </motion.div>
        </div>

        {/* Stats/Badges */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            { icon: ShieldCheck, title: "100% Moderated", desc: "Every listing is manually reviewed for quality." },
            { icon: Zap, title: "Instant Reach", desc: "Boost your visibility with our premium packages." },
            { icon: ArrowRight, title: "Verified Payments", desc: "Secure transaction verification for all ads." }
          ].map((feature, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -10, borderColor: 'rgba(var(--primary), 0.5)' }}
              className="p-8 rounded-3xl border border-white/5 bg-white/[0.03] backdrop-blur-md text-left group transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 border border-primary/20 group-hover:bg-primary group-hover:rotate-6 transition-all duration-500">
                <feature.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-white/50 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
