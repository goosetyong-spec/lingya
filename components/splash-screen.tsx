"use client";

import { motion } from "framer-motion";

const splashCoverUrl = "https://www.figma.com/api/mcp/asset/d9004889-2e35-4c4d-a3ba-90da1a23c5e7";

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
        src={splashCoverUrl}
        alt="灵芽开屏封面"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <motion.button
        type="button"
        onClick={onOpen}
        whileTap={{ scale: 0.97 }}
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2.2 }}
        className="absolute left-[252px] top-[300px] h-[246px] w-[118px] rounded-[36px] focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-transparent"
        aria-label="打开灵芽笔记本"
      >
        <span className="sr-only">点击扣子进入首页</span>
      </motion.button>
    </motion.div>
  );
}
