"use client";

import { motion } from "framer-motion";

export function SplashScreen({ onOpen }: { onOpen: () => void }) {
  return (
    <motion.button
      key="splash"
      type="button"
      initial={false}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onOpen}
      className="relative block h-full w-full overflow-hidden rounded-[36px] bg-[#b7d0e4] text-left"
      aria-label="进入灵芽首页"
      style={{
        backgroundImage:
          "url('/splash/logo.png'), url('/splash/brain.png'), url('/splash/eyes.png'), url('/splash/heart.png'), url('/splash/slogan.png'), url('/splash/buckle.png'), url('/splash/denim-bg.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition:
          "50% 10%, -8% 42%, 18% 63%, 50% 94%, 50% 78%, 82% 46%, center",
        backgroundSize: "48% auto, 26% auto, 22% auto, 24% auto, 66% auto, 32% auto, cover",
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.14),_transparent_38%)]" />
      <div className="absolute inset-x-0 bottom-10 flex justify-center">
        <div className="rounded-full bg-white/72 px-4 py-2 text-[13px] font-medium text-[#64584d] shadow-[0_10px_18px_rgba(60,42,20,0.10)]">
          点击任意位置进入
        </div>
      </div>
    </motion.button>
  );
}
