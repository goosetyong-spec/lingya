"use client";

import { motion } from "framer-motion";

const imgSplashFull = "https://www.figma.com/api/mcp/asset/e797d820-f5f8-46bf-bfd6-1ab4b6fd247d";

export function SplashScreen({ onOpen }: { onOpen: () => void }) {
  return (
    <motion.button
      key="splash"
      type="button"
      initial={false}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onOpen}
      className="relative block h-full w-full overflow-hidden rounded-[36px] bg-[#fff6db] text-left"
      aria-label="点击任意位置进入灵芽首页"
    >
      <img
        alt="灵芽开屏"
        src={imgSplashFull}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-[38px] flex justify-center">
        <div className="rounded-full bg-white/88 px-5 py-[10px] text-[13px] font-medium text-[#64584d]">
          点击任意位置进入
        </div>
      </div>
    </motion.button>
  );
}
