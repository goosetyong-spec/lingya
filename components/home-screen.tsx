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
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.28 }}
      className="relative z-10 flex h-full flex-col pt-5"
    >
      <div className="flex items-start justify-between">
        <h1 className="text-[30px] font-bold tracking-[-0.05em] text-[#2f2a28]">
          全部灵感<span className="ml-1 text-[28px]">🌱</span>
        </h1>
        <button
          type="button"
          onClick={onOpenSummary}
          className="rounded-[20px] bg-white/84 px-4 py-3 text-[14px] font-medium text-[#5d5248] shadow-[0_12px_20px_rgba(74,56,31,0.08)]"
        >
          <span className="mr-2 text-[#8ad15c]">✦</span>月度总结
        </button>
      </div>

      <div className="mt-5 rounded-[26px] bg-white px-4 py-4 shadow-[0_12px_24px_rgba(74,56,31,0.06)]">
        <div className="flex items-center gap-2">
          <Search className="size-5 text-[#c5bcb3]" />
          <input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="搜索内容..."
            className="w-full bg-transparent text-[15px] text-[#5c534c] outline-none placeholder:text-[#c5bcb3]"
          />
        </div>
      </div>

      <div className="mt-4 flex-1 overflow-y-auto pb-28 pr-1">
        {inspirations.length === 0 ? (
          <div className="mt-6 rounded-[28px] bg-white/80 p-6 text-center shadow-[0_12px_24px_rgba(74,56,31,0.08)]">
            <p className="text-[18px] font-semibold text-[#433833]">还没有找到匹配的灵感</p>
            <p className="mt-2 text-[14px] leading-7 text-[#776b62]">试试换个关键词，或者先新增一条链接。</p>
            <button
              type="button"
              onClick={onOpenAdd}
              className="mt-5 rounded-full bg-[#edf8dc] px-5 py-3 text-[14px] font-semibold text-[#628948]"
            >
              去新增灵感
            </button>
          </div>
        ) : (
          <div className="relative h-[560px] pt-2">
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
  const offsets = [
    { rotate: 1.2, top: 0, left: 8, width: 324, z: 30 },
    { rotate: -1.8, top: 156, left: 0, width: 326, z: 20 },
    { rotate: 1.4, top: 288, left: 12, width: 328, z: 10 },
  ];
  const layout = offsets[index % offsets.length];

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      initial={false}
      animate={{ opacity: 1, y: 0, rotate: layout.rotate }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="absolute block text-left"
      style={{ top: layout.top, left: layout.left, width: layout.width, zIndex: layout.z }}
    >
      <div className="overflow-hidden rounded-[28px] shadow-[0_18px_28px_rgba(66,46,20,0.10)]">
        <div
          className="flex min-h-[132px] items-start justify-between px-6 pb-5 pt-5"
          style={{ background: theme.surface }}
        >
          <div className="max-w-[66%]">
            <p className="text-[16px] font-bold leading-[1.45] text-[#22201f]">{item.title}</p>
          </div>
          <span
            className="rounded-full px-3 py-[6px] text-[11px]"
            style={{ background: theme.badge, color: theme.accent }}
          >
            #{item.keywords[0] ?? item.sourceType}
          </span>
        </div>

        <div className="relative rounded-t-[28px] bg-white/92 px-6 pb-7 pt-6">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onShare();
            }}
            className="absolute right-5 top-6 flex size-9 items-center justify-center rounded-full bg-white text-[#7f7368] shadow-[0_8px_16px_rgba(74,56,31,0.08)]"
            aria-label="分享这条灵感"
          >
            <Share2 className="size-4" />
          </button>

          <p className="pr-12 text-[14px] leading-[2.05] text-[#5e534b]">{item.summary}</p>

          <div className="mt-4 flex gap-2">
            {item.keywords.slice(0, 2).map((keyword) => (
              <span key={keyword} className="rounded-full bg-[#f5f1ea] px-3 py-1 text-[11px] text-[#8b7d6f]">
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.button>
  );
}
