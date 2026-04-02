"use client";

import { Container } from "@/components/layout/Container";
import { motion } from "framer-motion";
import { HelpCircle, ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    question: "How do I post an ad?",
    answer: "You can post an ad by clicking the 'Post Ad' button in the header. You'll need to create an account or log in first. Once logged in, choose a package and fill in your ad details."
  },
  {
    question: "Is moderation required for all ads?",
    answer: "Yes, to maintain high quality and trust in our marketplace, every ad is manually reviewed by our moderation team before it goes live."
  },
  {
    question: "What are the benefits of Premium packages?",
    answer: "Premium packages give you homepage visibility, 3x featured weight, and auto-refresh features, ensuring your ad gets the maximum possible reach."
  },
  {
    question: "How long does my ad stay active?",
    answer: "Depending on the package you choose, your ad can stay active for 7, 15, or 30 days. You can renew your package anytime before it expires."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-32 relative overflow-hidden" id="faq">
      <Container>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-black border border-primary/20 mb-6 uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            Support Center
          </span>
          <h2 className="text-4xl md:text-6xl font-black mb-6">Frequently Asked <span className="gradient-text">Questions</span></h2>
          <p className="text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about AdFlow Pro. Can't find the answer? Contact our 24/7 support.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "rounded-2xl border transition-all duration-300 overflow-hidden",
                openIndex === i 
                  ? "border-primary/30 bg-primary/5" 
                  : "border-white/10 bg-white/[0.02] hover:border-white/20"
              )}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-6 text-left flex items-center justify-between gap-4"
              >
                <span className="text-lg font-bold">{faq.question}</span>
                <ChevronDown className={cn(
                  "w-5 h-5 text-primary transition-transform duration-300",
                  openIndex === i ? "rotate-180" : ""
                )} />
              </button>
              <div className={cn(
                "px-6 pb-6 text-white/60 leading-relaxed transition-all duration-300",
                openIndex === i ? "block" : "hidden"
              )}>
                {faq.answer}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
