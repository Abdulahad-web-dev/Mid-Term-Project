"use client";

import { motion } from "framer-motion";

export default function Background() {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none bg-[#050505]">
      {/* Mesh Gradient / Shapes */}
      <div className="absolute inset-0 opacity-40">
        <motion.div
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -100, 50, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] rounded-full bg-primary/20 blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, -80, 120, 0],
            y: [0, 150, -100, 0],
            scale: [1, 0.8, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-purple-600/15 blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, 50, -80, 0],
            y: [0, 100, 150, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-[10%] left-[20%] w-[45%] h-[45%] rounded-full bg-pink-600/10 blur-[120px]"
        />
      </div>

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.15]" 
        style={{ 
          backgroundImage: `linear-gradient(#ffffff0a 1px, transparent 1px), linear-gradient(90deg, #ffffff0a 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(circle at 50% 50%, black, transparent 80%)'
        }} 
      />

      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}
