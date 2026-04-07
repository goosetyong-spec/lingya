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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative h-full w-full overflow-hidden rounded-[36px] bg-[#b7d0e4]"
    >
      <img
        src="/splash/denim-bg.png"
        alt=""
        className="absolute inset-x-0 top-[72px] h-[699px] w-full object-cover"
      />
      <img src="/splash/top-strip.png" alt="" className="absolute inset-x-0 top-0 h-[223px] w-full object-cover" />
      <img
        src="/splash/bottom-strip.png"
        alt=""
        className="absolute inset-x-0 bottom-0 h-[193px] w-full object-cover"
      />

      <img
        src="/splash/logo.png"
        alt="灵芽"
        className="absolute left-[46px] top-[60px] w-[300px] rotate-[7deg] drop-shadow-[0_4px_9px_rgba(0,0,0,0.25)]"
      />
      <img
        src="/splash/brain.png"
        alt=""
        className="absolute left-[-10px] top-[285px] w-[120px] -rotate-[22deg] drop-shadow-[0_4px_8px_rgba(0,0,0,0.22)]"
      />
      <img
        src="/splash/eyes.png"
        alt=""
        className="absolute left-[36px] top-[550px] w-[104px] drop-shadow-[0_4px_8px_rgba(0,0,0,0.18)]"
      />
      <img
        src="/splash/slogan.png"
        alt="万物始于收藏"
        className="absolute left-[42px] top-[627px] w-[303px] drop-shadow-[0_4px_6px_rgba(0,0,0,0.25)]"
      />
      <img
        src="/splash/heart.png"
        alt=""
        className="absolute left-[125px] top-[770px] w-[150px] rotate-[20deg] drop-shadow-[0_4px_6px_rgba(0,0,0,0.22)]"
      />

      <motion.button
        type="button"
        onClick={onOpen}
        whileTap={{ scale: 0.96 }}
        animate={{
          scale: [1, 1.02, 1],
          boxShadow: [
            "0 10px 24px rgba(76, 108, 134, 0.12)",
            "0 16px 30px rgba(76, 108, 134, 0.22)",
            "0 10px 24px rgba(76, 108, 134, 0.12)",
          ],
        }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2.2 }}
        className="absolute left-[250px] top-[309px] h-[238px] w-[118px]"
        aria-label="打开灵芽笔记本"
      >
        <img src="/splash/buckle.png" alt="" className="h-full w-full object-contain" />
        <span className="absolute inset-x-0 -bottom-11 text-center text-[12px] tracking-[0.2em] text-white/80">
          TAP TO OPEN
        </span>
      </motion.button>
    </motion.div>
  );
}
