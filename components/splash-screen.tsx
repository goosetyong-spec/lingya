"use client";

import { motion } from "framer-motion";

const imgDenimBg = "/splash/denim-bg.png";
const imgLogo = "/splash/logo.png";
const imgBrain = "/splash/brain.png";
const imgEyes = "/splash/eyes.png";
const imgLamp = "/splash/heart.png";
const imgBottomStrip = "/splash/bottom-strip.png";
const imgSloganStrip = "/splash/slogan.png";
const imgBuckle = "/splash/buckle.png";

const imgLingyaHead = "https://www.figma.com/api/mcp/asset/dc874d83-d111-4c08-a7da-c461c975ab61";
const imgLingyaBody = "https://www.figma.com/api/mcp/asset/db8910d2-0803-4a80-9f63-ae0e9d51a0ca";
const imgLingyaLeafLeft = "https://www.figma.com/api/mcp/asset/6e168f76-abfc-4628-82d3-ac1b836ad03d";
const imgLingyaLeafRight = "https://www.figma.com/api/mcp/asset/3d7e4d76-425e-4383-ae53-a5dcd53f9b13";
const imgLingyaHandLeft = "https://www.figma.com/api/mcp/asset/b2df4963-05d3-4550-ada6-60110df7a2d5";
const imgLingyaHandRight = "https://www.figma.com/api/mcp/asset/aae8bffa-1098-48c8-86bd-21fe028bbf39";
const imgLingyaMouth = "https://www.figma.com/api/mcp/asset/6d7bfe5b-0e93-492a-b1b4-5419432678db";
const imgLingyaEye = "https://www.figma.com/api/mcp/asset/53bda5e2-5948-4cf7-bc5a-8ee936263054";

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
      <img alt="" src={imgDenimBg} className="pointer-events-none absolute inset-0 h-full w-full object-cover" />
      <img alt="" src={imgLogo} className="pointer-events-none absolute left-[42px] top-[96px] w-[252px]" />
      <img alt="" src={imgBuckle} className="pointer-events-none absolute left-[223px] top-[325px] w-[167px]" />
      <img alt="" src={imgBrain} className="pointer-events-none absolute left-[248px] top-[334px] w-[115px]" />
      <img alt="" src={imgEyes} className="pointer-events-none absolute left-[84px] top-[515px] w-[90px]" />
      <img alt="" src={imgLamp} className="pointer-events-none absolute left-[-2px] top-[303px] w-[95px]" />

      <div className="pointer-events-none absolute left-[148px] top-[26px] h-[74px] w-[72px]">
        <img src={imgLingyaHead} alt="" className="absolute left-[6px] top-[12px] w-[56px]" />
        <img src={imgLingyaBody} alt="" className="absolute left-[9px] top-[38px] w-[44px]" />
        <img src={imgLingyaLeafLeft} alt="" className="absolute left-[16px] top-[4px] w-[19px]" />
        <img src={imgLingyaLeafRight} alt="" className="absolute left-[5px] top-[11px] w-[16px] rotate-[133deg]" />
        <img src={imgLingyaHandLeft} alt="" className="absolute left-[50px] top-[42px] w-[18px] rotate-[-28deg]" />
        <img src={imgLingyaHandRight} alt="" className="absolute left-[-1px] top-[47px] w-[18px] rotate-[22deg]" />
        <img src={imgLingyaEye} alt="" className="absolute left-[28px] top-[49px] w-[7px]" />
        <img src={imgLingyaEye} alt="" className="absolute left-[38px] top-[48px] w-[7px]" />
        <img src={imgLingyaMouth} alt="" className="absolute left-[24px] top-[56px] w-[28px]" />
      </div>

      <img alt="" src={imgSloganStrip} className="pointer-events-none absolute left-[44px] top-[584px] w-[298px]" />
      <img alt="" src={imgBottomStrip} className="pointer-events-none absolute left-[92px] top-[690px] w-[202px]" />

      <p className="pointer-events-none absolute left-1/2 top-[635px] -translate-x-1/2 whitespace-nowrap text-[42px] leading-none text-white [font-family:var(--font-zixiao),_'KaiTi',serif]">
        万物始于收藏!
      </p>
      <div className="pointer-events-none absolute inset-x-0 bottom-[84px] flex justify-center">
        <div className="rounded-full bg-white/86 px-6 py-[10px] text-[34px] leading-none">💗</div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-[40px] flex justify-center">
        <div className="rounded-full bg-white/88 px-5 py-[10px] text-[13px] font-medium text-[#64584d]">
          点击任意位置进入
        </div>
      </div>
    </motion.button>
  );
}
