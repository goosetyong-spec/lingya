"use client";

import { motion } from "framer-motion";

export function SplashScreen({
  onOpen,
}: {
  onOpen: () => void;
}) {
  return (
    <motion.div
      key="splash"
      initial={false}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative h-full w-full overflow-hidden rounded-[36px] bg-[#b7d0e4]"
    >
      <img
        src="/splash/denim-bg.png"
        alt="灵芽开屏封面"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <img
        src="/splash/logo.png"
        alt=""
        className="absolute left-[34px] top-[52px] w-[308px] rotate-[6deg] drop-shadow-[0_8px_18px_rgba(0,0,0,0.22)]"
      />

      <img
        src="/splash/brain.png"
        alt=""
        className="absolute -left-[62px] top-[242px] w-[176px] rotate-[-28deg] drop-shadow-[0_6px_12px_rgba(0,0,0,0.2)]"
      />

      <img
        src="/splash/eyes.png"
        alt=""
        className="absolute left-[42px] top-[466px] w-[108px] drop-shadow-[0_6px_10px_rgba(0,0,0,0.18)]"
      />

      <img
        src="/splash/heart.png"
        alt=""
        className="absolute left-[96px] top-[700px] w-[128px] rotate-[18deg] drop-shadow-[0_10px_16px_rgba(0,0,0,0.2)]"
      />

      <img
        src="/splash/slogan.png"
        alt=""
        className="absolute left-[48px] top-[596px] w-[292px] drop-shadow-[0_10px_20px_rgba(0,0,0,0.2)]"
      />

      <img
        src="/splash/buckle.png"
        alt=""
        className="absolute left-[232px] top-[316px] w-[124px] drop-shadow-[0_8px_18px_rgba(0,0,0,0.18)]"
      />

      <motion.button
        type="button"
        onClick={onOpen}
        whileTap={{ scale: 0.97 }}
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2.2 }}
        className="absolute left-[228px] top-[298px] h-[272px] w-[130px] rounded-[32px] focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-transparent"
        aria-label="打开灵芽笔记本"
      >
        <span className="sr-only">点击扣子进入首页</span>
      </motion.button>
    </motion.div>
  );
}
