"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronRight, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const QUESTIONS = [
  { q: "What is the primary role of a Moderator in AdFlow Pro?", a: "To review content quality and policy fit.", topic: "Workflow" },
  { q: "Which package offers homepage visibility?", a: "Premium Package.", topic: "Packages" },
  { q: "How is payment verified for an ad?", a: "Admin verifies transaction details and screenshots.", topic: "Payments" },
];

export default function LearningWidget() {
  const [current, setCurrent] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="p-6 rounded-3xl border border-primary/20 bg-primary/5 backdrop-blur-sm max-w-sm mx-auto md:mx-0">
      <div className="flex items-center gap-2 mb-4 text-primary font-bold text-sm tracking-widest uppercase">
        <HelpCircle className="w-4 h-4" /> Learning Hub
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-4"
        >
          <p className="text-white font-medium leading-relaxed">
            {QUESTIONS[current].q}
          </p>

          {showAnswer ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-500 text-sm"
            >
              <div className="flex items-center gap-2 mb-1 font-bold">
                <CheckCircle2 className="w-4 h-4" /> Correct Answer:
              </div>
              {QUESTIONS[current].a}
            </motion.div>
          ) : (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowAnswer(true)}
              className="w-full border-primary/20 hover:bg-primary/10 text-primary text-xs"
            >
              Reveal Answer
            </Button>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-6 flex items-center justify-between">
        <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
          Topic: {QUESTIONS[current].topic}
        </span>
        <button 
          onClick={() => {
            setCurrent((current + 1) % QUESTIONS.length);
            setShowAnswer(false);
          }}
          className="text-primary hover:text-white transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
