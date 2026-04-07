"use client";

import { motion } from "framer-motion";
import type { Inspiration } from "@/lib/lingya-data";

const imgGlowA = "https://www.figma.com/api/mcp/asset/b34f204b-46e1-4e68-ac9f-dd3921835845";
const imgGlowB = "https://www.figma.com/api/mcp/asset/0d02eda9-3cba-4b4c-80d2-c7f9b9f53525";
const imgSearchIcon = "https://www.figma.com/api/mcp/asset/d5ca84ff-61da-465a-8c61-55ec3a4baa4c";

const homeCards = [
  {
    title: "交互设计原理",
    tag: "#基础原理",
    body:
      "交互设计不仅关乎界面的好看，更关乎使用的流畅。好的交互设计让用户可以凭直觉完成任务，而无需过度思考。这涉及到清晰的层级结构、合理的反馈机制……",
    rotate: "rotate-[2.2deg]",
    tabClass: "bg-[linear-gradient(175deg,#b9a9ff_15%,#e8ddfb_87%)] text-[#1a1a1a]",
    bodyClass:
      "bg-[linear-gradient(180deg,#f4eeff_0%,rgba(255,245,224,0.36)_200%)] text-[#4a4a4a]",
    tagClass: "bg-white/60 text-[#7d65a2]",
    top: "top-0",
  },
  {
    title: "色彩心理学",
    tag: "#颜色搭配",
    body:
      "冷色带给人宁静和科技感，而暖色带来活力和热情。在产品设计中，主色调的选择直接影响用户对品牌的感知。例如快餐品牌常用红色和黄色……",
    rotate: "-rotate-[2.38deg]",
    tabClass: "bg-[#113b66] text-white",
    bodyClass:
      "bg-[linear-gradient(180deg,#29537d_0%,rgba(255,245,224,0.06)_200%)] text-white/90",
    tagClass: "bg-white/20 text-[#daeaf7]",
    top: "top-[160px]",
  },
  {
    title: "时间管理心得",
    tag: "#效率提升",
    body:
      "每日睡前列出第二天的3件最重要的事情（MIT）。不必追求完美的日历排期，而是要在精力最充沛的清晨完成最有挑战的任务，这样一天的心情都会很好……",
    rotate: "rotate-[3.34deg]",
    tabClass: "bg-[linear-gradient(171deg,#ffcebf_19%,#ffdcd1_81%)] text-[#1a1a1a]",
    bodyClass:
      "bg-[linear-gradient(180deg,#fff0e9_0%,rgba(255,245,224,0.36)_200%)] text-[#4a4a4a]",
    tagClass: "bg-white/60 text-[#a07360]",
    top: "top-[300px]",
  },
] as const;

export function HomeScreen({
  inspirations,
  searchQuery,
  setSearchQuery,
  onOpenDetail,
  onOpenSummary,
}: {
  inspirations: Inspiration[];
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  onOpenDetail: (item: Inspiration) => void;
  onOpenSummary: () => void;
  onOpenAdd: () => void;
  onShare: (item: Inspiration) => void | Promise<void>;
}) {
  const visible = inspirations.length > 0 ? inspirations : fallbackItems;

  return (
    <motion.section
      key="home"
      initial={false}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative h-full w-full overflow-hidden bg-[#fff3d3]"
    >
      <img alt="" src={imgGlowA} className="pointer-events-none absolute -left-[110px] top-[200px] h-[430px] w-[430px]" />
      <img alt="" src={imgGlowB} className="pointer-events-none absolute left-[210px] top-[60px] h-[280px] w-[280px]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(119deg,rgba(255,255,255,0.12)_25%,rgba(255,250,235,0.04)_60%,rgba(245,235,204,0.12)_117%)]" />

      <div className="relative z-10 px-5 pt-14">
        <div className="flex items-start justify-between">
          <h1 className="text-[28px] leading-none tracking-[-0.03em] text-[#333]">
            <span className="font-black">全部灵感</span>
            <span className="text-[28px]">🌱</span>
          </h1>
          <button
            type="button"
            onClick={onOpenSummary}
            className="mt-[3px] flex h-[36px] items-center gap-2 rounded-[18px] border border-white/60 bg-white/80 px-3 text-[13px] text-[#4c3d34]"
          >
            <span className="text-[#80d658]">✦</span>
            <span>月度总结</span>
          </button>
        </div>

        <label className="relative mt-[14px] block h-[52px] w-full rounded-[28px] border border-white bg-white px-[18px] py-[14px]">
          <img alt="" src={imgSearchIcon} className="absolute left-[18px] top-1/2 h-5 w-5 -translate-y-1/2" />
          <input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="搜索内容..."
            className="h-full w-full border-0 bg-transparent pl-8 text-[14px] text-[#5d5145] outline-none placeholder:text-[#999]/70"
          />
        </label>
      </div>

      <div className="absolute inset-x-5 bottom-[96px] top-[176px] overflow-y-auto overflow-x-hidden">
        <div className="relative h-[560px]">
          {homeCards.map((card, index) => (
            <button
              key={card.title}
              type="button"
              onClick={() => onOpenDetail(visible[index] ?? visible[0])}
              className={`absolute left-0 w-full text-left ${card.top} ${card.rotate}`}
            >
              <article className="w-full rounded-[22px] shadow-[0_-2px_5px_rgba(255,255,255,0.34),0_16px_26px_rgba(59,41,20,0.09)]">
                <div className={`flex w-[212px] items-start gap-3 rounded-t-[18px] px-4 pb-3 pt-4 ${card.tabClass}`}>
                  <p className="flex-1 text-[16px] font-bold leading-[1.35]">{card.title}</p>
                  <span className={`shrink-0 rounded-full px-[10px] py-[5px] text-[12px] ${card.tagClass}`}>{card.tag}</span>
                </div>
                <div className={`relative h-[146px] overflow-hidden rounded-b-[22px] rounded-tr-[22px] px-[19px] py-[21px] ${card.bodyClass}`}>
                  <p className="pr-5 text-[14px] leading-[22px]">{card.body}</p>
                  <div className="absolute bottom-4 right-6 h-7 w-[160px] rounded-[18px] bg-white/20" />
                </div>
              </article>
            </button>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

const fallbackItems: Inspiration[] = [
  {
    id: "fallback-1",
    title: "交互设计原理",
    sourceName: "Bilibili",
    sourceTitle: "设计思维课：好的交互设计到底是什么？",
    sourceDescription: "关于交互设计底层逻辑与用户心智的分享。",
    sourceType: "视频",
    url: "https://www.bilibili.com",
    thumbnailUrl: "",
    summary: "好的交互让用户先完成任务，再注意界面。",
    outlook: "未来交互会向多感官、多模态演进。",
    notes: "",
    keywords: ["基础原理"],
    themeKey: "purple",
    createdAt: "2026-04-01",
  },
];
