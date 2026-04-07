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
        backgroundImage: "url('/splash/denim-bg.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.1),_transparent_32%)]" />
      <div className="pointer-events-none absolute inset-x-7 top-4 h-[24px] rounded-[24px] border border-white/40 bg-transparent" />
      <div className="pointer-events-none absolute inset-x-7 bottom-5 h-[24px] rounded-[24px] border border-white/30 bg-transparent" />

      <div className="pointer-events-none absolute left-1/2 top-[58px] w-[258px] -translate-x-1/2">
        <MiniLingya className="absolute left-[120px] top-[-34px] z-20 scale-[0.64]" />
        <img src="/splash/logo.png" alt="" className="w-full drop-shadow-[0_8px_14px_rgba(66,46,20,0.18)]" />
      </div>

      <img
        src="/splash/brain.png"
        alt=""
        className="pointer-events-none absolute left-[-24px] top-[298px] w-[156px] rotate-[6deg]"
      />
      <img
        src="/splash/buckle.png"
        alt=""
        className="pointer-events-none absolute right-[-10px] top-[330px] w-[182px]"
      />
      <img
        src="/splash/eyes.png"
        alt=""
        className="pointer-events-none absolute left-[54px] top-[498px] w-[88px] -rotate-[10deg]"
      />
      <img
        src="/splash/heart.png"
        alt=""
        className="pointer-events-none absolute left-1/2 top-[716px] w-[82px] -translate-x-1/2"
      />
      <img
        src="/splash/slogan.png"
        alt=""
        className="pointer-events-none absolute left-[58px] top-[605px] w-[254px]"
      />
      <img
        src="/splash/bottom-strip.png"
        alt=""
        className="pointer-events-none absolute left-[82px] top-[719px] w-[152px]"
      />
      <img
        src="/splash/top-strip.png"
        alt=""
        className="pointer-events-none absolute left-[167px] top-[610px] w-[88px]"
      />

      <p className="pointer-events-none absolute left-[72px] top-[647px] text-[22px] font-bold tracking-[0.1em] text-white drop-shadow-[0_2px_4px_rgba(35,25,16,0.18)]">
        万物始于收藏!
      </p>

      <div className="pointer-events-none absolute inset-x-0 bottom-20 flex justify-center">
        <div className="rounded-full bg-white/78 px-4 py-2 text-[13px] font-medium text-[#64584d] shadow-[0_10px_18px_rgba(60,42,20,0.10)]">
          点击任意位置进入
        </div>
      </div>
    </motion.button>
  );
}

function MiniLingya({ className }: { className?: string }) {
  return (
    <div className={`relative h-[78px] w-[72px] ${className ?? ""}`}>
      <div className="absolute left-1/2 top-[4px] h-[18px] w-[5px] -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,#59e0a9,#3bc8db)]" />
      <div className="absolute left-[18px] top-0 h-[18px] w-[26px] -rotate-[28deg] rounded-[100%_0_100%_0] bg-[linear-gradient(180deg,#8ef07c,#47d59d)]" />
      <div className="absolute right-[18px] top-[2px] h-[18px] w-[26px] rotate-[24deg] rounded-[0_100%_0_100%] bg-[linear-gradient(180deg,#8ef07c,#47d59d)]" />
      <div className="absolute bottom-0 left-1/2 h-[58px] w-[58px] -translate-x-1/2 rounded-[50%_50%_52%_48%/56%_56%_44%_44%] bg-[radial-gradient(circle_at_50%_38%,#b8ffbb_0,#8ff1cd_34%,#51d7dd_72%,#41bfc7_100%)] shadow-[0_8px_20px_rgba(55,205,170,0.22)]" />
      <div className="absolute bottom-[12px] left-1/2 h-[30px] w-[38px] -translate-x-1/2 rounded-[24px] bg-[radial-gradient(circle_at_50%_35%,#ffffff,#ddfff5_70%,transparent_72%)]" />
      <div className="absolute bottom-[28px] left-[23px] h-[12px] w-[12px] rounded-full bg-black" />
      <div className="absolute bottom-[28px] right-[23px] h-[12px] w-[12px] rounded-full bg-black" />
      <div className="absolute bottom-[30px] left-[27px] h-[4px] w-[4px] rounded-full bg-white" />
      <div className="absolute bottom-[30px] right-[27px] h-[4px] w-[4px] rounded-full bg-white" />
      <div className="absolute bottom-[18px] left-1/2 h-[10px] w-[22px] -translate-x-1/2 rounded-b-[20px] border-b-2 border-[#506171]" />
      <div className="absolute bottom-[20px] left-[8px] h-[18px] w-[14px] rotate-[-28deg] rounded-full bg-[radial-gradient(circle,#fff7ff,#cfe7ff_72%,transparent_74%)]" />
      <div className="absolute bottom-[20px] right-[8px] h-[18px] w-[14px] rotate-[28deg] rounded-full bg-[radial-gradient(circle,#fff7ff,#cfe7ff_72%,transparent_74%)]" />
    </div>
  );
}
