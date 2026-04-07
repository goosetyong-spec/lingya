"use client";

import { motion } from "framer-motion";

const imgDenimBg = "/splash/denim-bg.png";
const imgBuckle = "/splash/buckle.png";

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
      aria-label="鐐瑰嚮浠绘剰浣嶇疆杩涘叆鐏佃娊棣栭〉"
    >
      <img
        alt="鐏佃娊寮€灞忚儗鏅?
        src={imgDenimBg}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />
      <img
        alt=""
        src={imgBuckle}
        className="pointer-events-none absolute left-[184px] top-[300px] w-[220px] object-contain"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-[38px] flex justify-center">
        <div className="rounded-full bg-white/88 px-5 py-[10px] text-[13px] font-medium text-[#64584d]">
          鐐瑰嚮浠绘剰浣嶇疆杩涘叆
        </div>
      </div>
    </motion.button>
  );
}
