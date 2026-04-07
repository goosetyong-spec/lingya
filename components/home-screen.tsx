"use client";

import { motion } from "framer-motion";
import type { Inspiration } from "@/lib/lingya-data";

const imgGlowA = "https://www.figma.com/api/mcp/asset/1b342475-4d1a-4049-9edd-ae582590dbb5";
const imgGlowB = "https://www.figma.com/api/mcp/asset/cf45eda0-fa20-4a1c-b59b-fe3e9725ebad";
const imgSearchIcon = "https://www.figma.com/api/mcp/asset/65bce00f-8476-4e51-87ba-5d251ba1f9cb";

type HomeCardPreset = {
  key: string;
  angle: number;
  offsetY: number;
  tabClass: string;
  bodyClass: string;
  tagClass: string;
  bodyHighlightClass: string;
};

const cardPresets: HomeCardPreset[] = [
  {
    key: "purple",
    angle: 2.2,
    offsetY: 0,
    tabClass:
      "bg-[linear-gradient(175deg,#b9a9ff_15%,#e8ddfb_87%)] border border-white/50",
    bodyClass:
      "bg-[linear-gradient(180deg,#f4eeff_0%,rgba(255,245,224,0.36)_200%)] border border-white/60",
    tagClass: "bg-white/55 text-[#7d65a2]",
    bodyHighlightClass:
      "bg-[linear-gradient(180deg,rgba(255,255,255,0.34)_0%,rgba(255,255,255,0)_200%)]",
  },
  {
    key: "blue",
    angle: -2.38,
    offsetY: -66,
    tabClass: "bg-[#113b66] border border-white/15 text-white",
    bodyClass:
      "bg-[linear-gradient(180deg,#29537d_0%,rgba(255,245,224,0.06)_200%)] border border-white/10",
    tagClass: "bg-white/20 text-[#daeaf7]",
    bodyHighlightClass:
      "bg-[linear-gradient(180deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0)_200%)]",
  },
  {
    key: "orange",
    angle: 3.34,
    offsetY: -132,
    tabClass:
      "bg-[linear-gradient(171deg,#ffcebf_19%,#ffdcd1_81%)] border border-white/50",
    bodyClass:
      "bg-[linear-gradient(180deg,#fff0e9_0%,rgba(255,245,224,0.36)_200%)] border border-white/60",
    tagClass: "bg-white/55 text-[#a07360]",
    bodyHighlightClass:
      "bg-[linear-gradient(180deg,rgba(255,255,255,0.34)_0%,rgba(255,255,255,0)_200%)]",
  },
];

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
  const displayItems =
    inspirations.slice(0, 3).length === 3 ? inspirations.slice(0, 3) : fallbackItems;

  return (
    <motion.section
      key="home"
      initial={false}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative h-full w-full overflow-hidden bg-[#fff3d3]"
    >
      <div className="pointer-events-none absolute -left-[110px] top-[200px] h-[430px] w-[430px]">
        <img alt="" src={imgGlowA} className="h-full w-full" />
      </div>
      <div className="pointer-events-none absolute left-[210px] top-[60px] h-[280px] w-[280px]">
        <img alt="" src={imgGlowB} className="h-full w-full" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(119deg,rgba(255,255,255,0.12)_25%,rgba(255,250,235,0.04)_60%,rgba(245,235,204,0.12)_117%)]" />

      <div className="relative z-10 flex h-full flex-col px-5 pt-14">
        <div className="flex items-start justify-between">
          <div className="min-w-0">
            <h1 className="text-[28px] font-black leading-none tracking-[-0.03em] text-[#333]">
              全部灵感<span className="font-normal">🌱</span>
            </h1>
          </div>
          <button
            type="button"
            onClick={onOpenSummary}
            className="flex h-[46px] items-center gap-2 rounded-[18px] border border-white/55 bg-white/80 px-3 shadow-[0_8px_18px_rgba(74,56,31,0.1)]"
          >
            <span className="text-[13px] text-[#80d658]">✦</span>
            <span className="text-[13px] font-medium tracking-[0.02em] text-[#4c3d34]">
              月度总结
            </span>
          </button>
        </div>

        <label className="relative mt-[14px] block h-[52px] w-full overflow-hidden rounded-[28px] border border-white bg-white px-[18px] py-[14px] shadow-[0_6px_16px_rgba(74,56,31,0.05)]">
          <img
            alt=""
            src={imgSearchIcon}
            className="absolute left-[18px] top-1/2 h-5 w-5 -translate-y-1/2"
          />
          <input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="搜索内容..."
            className="h-full w-full border-0 bg-transparent pl-8 text-[14px] text-[#5d5145] outline-none placeholder:text-[#999]/70"
          />
        </label>

        <div className="relative mt-6 h-[560px]">
          {displayItems.map((item, index) => {
            const preset = cardPresets[index] ?? cardPresets[cardPresets.length - 1];
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onOpenDetail(item)}
                className="absolute left-0 w-full text-left"
                style={{
                  transform: `translateY(${preset.offsetY}px) rotate(${preset.angle}deg)`,
                  transformOrigin: "top center",
                  zIndex: displayItems.length - index,
                }}
              >
                <article className="w-full rounded-[22px] shadow-[0_-2px_5px_rgba(255,255,255,0.34),0_16px_26px_rgba(59,41,20,0.09)]">
                  <div
                    className={`flex w-[212px] items-start gap-3 rounded-t-[18px] px-4 pb-3 pt-4 ${preset.tabClass}`}
                  >
                    <p
                      className={`min-h-[48px] flex-1 text-[16px] font-bold leading-[1.35] ${
                        index === 1 ? "text-white" : "text-[#1a1a1a]"
                      }`}
                    >
                      {item.title}
                    </p>
                    <span
                      className={`shrink-0 rounded-full px-[10px] py-[5px] text-[12px] ${preset.tagClass}`}
                    >
                      #{item.keywords[0] ?? "灵感整理"}
                    </span>
                  </div>
                  <div
                    className={`relative h-[146px] overflow-hidden rounded-b-[22px] rounded-tr-[22px] px-[19px] py-[21px] ${preset.bodyClass}`}
                  >
                    <p
                      className={`pr-5 text-[14px] leading-[22px] ${
                        index === 1 ? "text-white/92" : "text-[#4a4a4a]/92"
                      }`}
                    >
                      {item.summary}
                    </p>
                    <div
                      className={`absolute bottom-4 right-6 h-7 w-[160px] rounded-[18px] ${preset.bodyHighlightClass}`}
                    />
                  </div>
                </article>
              </button>
            );
          })}
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
    sourceTitle: "交互设计原理",
    sourceDescription: "好的交互设计让用户可以凭直觉完成任务。",
    sourceType: "视频",
    url: "https://www.bilibili.com",
    thumbnailUrl: "",
    summary:
      "交互设计不仅关乎界面的好看，更关乎使用的流畅。好的交互设计让用户可以凭直觉完成任务，而无需过度思考。",
    outlook: "",
    notes: "",
    keywords: ["基础原理"],
    themeKey: "purple",
    createdAt: "2026-04-01",
  },
  {
    id: "fallback-2",
    title: "色彩心理学",
    sourceName: "小红书",
    sourceTitle: "色彩心理学",
    sourceDescription: "冷暖色如何影响品牌感知与情绪氛围。",
    sourceType: "帖子",
    url: "https://www.xiaohongshu.com",
    thumbnailUrl: "",
    summary:
      "冷色带给人宁静和科技感，而暖色带来活力和热情。在产品设计中，主色调的选择直接影响用户对品牌的感知。",
    outlook: "",
    notes: "",
    keywords: ["颜色搭配"],
    themeKey: "blue",
    createdAt: "2026-04-02",
  },
  {
    id: "fallback-3",
    title: "时间管理心得",
    sourceName: "网页",
    sourceTitle: "时间管理心得",
    sourceDescription: "围绕优先级、MIT 和节奏感的做事方式。",
    sourceType: "网页",
    url: "https://example.com",
    thumbnailUrl: "",
    summary:
      "每日睡前列出第二天的 3 件最重要的事情。不必追求完美排期，而是要在精力最充沛的时候先完成最难的任务。",
    outlook: "",
    notes: "",
    keywords: ["效率提升"],
    themeKey: "orange",
    createdAt: "2026-04-03",
  },
];
