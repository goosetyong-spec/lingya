"use client";

import { motion } from "framer-motion";
import { Search, Share2 } from "lucide-react";
import { Inspiration, getThemeFromKey } from "@/lib/lingya-data";

export function HomeScreen({
  inspirations,
  searchQuery,
  setSearchQuery,
  onOpenDetail,
  onOpenSummary,
  onOpenAdd,
  onShare,
}: {
  inspirations: Inspiration[];
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  onOpenDetail: (item: Inspiration) => void;
  onOpenSummary: () => void;
  onOpenAdd: () => void;
  onShare: (item: Inspiration) => void;
}) {
  return (
    <motion.div
      key="home"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.35 }}
      className="relative z-10 flex h-full flex-col pt-6"
    >
      <div className="relative flex items-start justify-between">
        <div>
          <h1 className="text-[28px] font-bold tracking-[-0.04em] text-[#333333]">全部灵感🌱</h1>
        </div>
        <button
          type="button"
          onClick={onOpenSummary}
          className="mt-[3px] rounded-[18px] border border-white/60 bg-white/78 px-3 py-2 text-[13px] font-medium text-[#4c3d34] shadow-[0_8px_18px_rgba(74,56,31,0.10)]"
        >
          <span className="mr-2 text-[#80d658]">✦</span>月度总结
        </button>
      </div>

      <div className="mt-4 rounded-[28px] border border-white bg-white px-[18px] py-[14px] shadow-[0_10px_18px_rgba(74,56,31,0.06)]">
        <div className="flex items-center gap-2">
          <Search className="size-5 text-[#b6b0af]" />
          <input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="搜索灵感、关键词或笔记"
            className="w-full bg-transparent text-[15px] text-[#5b534d] outline-none placeholder:text-[#c7c2bf]"
          />
        </div>
      </div>

      <div className="relative mt-5 flex-1 overflow-y-auto pb-32">
        {inspirations.length === 0 ? (
          <div className="rounded-[28px] border border-white/70 bg-white/72 p-6 text-center shadow-[0_16px_28px_rgba(74,56,31,0.08)]">
            <p className="text-[16px] font-semibold text-[#4a4038]">还没有找到匹配的灵感</p>
            <p className="mt-2 text-[14px] leading-7 text-[#7e7268]">
              试试换个关键词，或者直接新增一条链接。
            </p>
            <button
              type="button"
              onClick={onOpenAdd}
              className="mt-5 rounded-full bg-[#eef9df] px-5 py-3 text-[14px] font-semibold text-[#4f7d41]"
            >
              去新增灵感
            </button>
          </div>
        ) : (
          <div className="relative pt-2">
            {inspirations.map((item, index) => (
              <ArchiveCard
                key={item.id}
                item={item}
                index={index}
                onOpen={() => onOpenDetail(item)}
                onShare={() => onShare(item)}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function ArchiveCard({
  item,
  index,
  onOpen,
  onShare,
}: {
  item: Inspiration;
  index: number;
  onOpen: () => void;
  onShare: () => void;
}) {
  const theme = getThemeFromKey(item.themeKey);
  const rotate = index % 3 === 0 ? 2.2 : index % 3 === 1 ? -2.4 : 3.4;
  const pullUp = index * 84;

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="relative block w-full text-left"
      style={{ marginTop: index === 0 ? 0 : -pullUp }}
    >
      <div className="rounded-[26px] shadow-[0_-2px_5px_rgba(255,255,255,0.34),0_16px_26px_rgba(59,41,20,0.09)]">
        <div
          className="flex w-[212px] items-start gap-3 rounded-t-[18px] border border-white/50 px-4 pb-3 pt-4"
          style={{ background: theme.surface }}
        >
          <p className="flex-1 text-[16px] font-bold text-[#1a1a1a]">{item.title}</p>
          <span
            className="rounded-full px-3 py-[5px] text-[12px]"
            style={{ background: theme.badge, color: theme.accent }}
          >
            #{item.keywords[0] || item.sourceType}
          </span>
        </div>

        <div
          className="relative rounded-b-[22px] rounded-tr-[22px] border border-white/50 px-5 py-[22px]"
          style={{ background: theme.panel }}
        >
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onShare();
            }}
            className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full bg-white/82 text-[#7c6c5e]"
            aria-label="分享这条灵感"
          >
            <Share2 className="size-4" />
          </button>

          <p className="pr-10 text-[14px] leading-[31px]" style={{ color: theme.deepInk }}>
            {item.summary}
          </p>

          <div
            className="absolute bottom-5 right-7 h-9 rounded-[18px]"
            style={{
              width: `${118 + Math.min(item.summary.length, 60)}px`,
              background: "linear-gradient(180deg, rgba(255,255,255,0.36), rgba(255,255,255,0))",
              opacity: 0.7,
            }}
          />
        </div>
      </div>
    </motion.button>
  );
}
