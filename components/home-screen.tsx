"use client";

import { motion } from "framer-motion";
import { Search, Share2, Sparkles } from "lucide-react";
import { Inspiration, getThemeFromKey } from "@/lib/lingya-data";
import { TopBar } from "@/components/lingya-ui";

export function HomeScreen({
  inspirations,
  searchQuery,
  setSearchQuery,
  onOpenDetail,
  onOpenSummary,
  onOpenAdd,
}: {
  inspirations: Inspiration[];
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  onOpenDetail: (item: Inspiration) => void;
  onOpenSummary: () => void;
  onOpenAdd: () => void;
}) {
  return (
    <motion.div
      key="home"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35 }}
      className="relative z-10 flex flex-col gap-4 pt-3"
    >
      <TopBar
        title="灵芽"
        subtitle="把灵感慢慢养成自己的判断"
        left={
          <div className="flex size-12 items-center justify-center rounded-3xl bg-[linear-gradient(180deg,#c4ef8d,#74d66c)] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
            <span className="text-[20px]">🌱</span>
          </div>
        }
        right={
          <button
            type="button"
            onClick={onOpenAdd}
            className="flex size-11 items-center justify-center rounded-full bg-[#2a2218] text-white shadow-lg shadow-amber-950/10 transition hover:scale-[1.02]"
          >
            <Sparkles className="size-5" />
          </button>
        }
      />

      <motion.section
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.06, duration: 0.35 }}
        className="rounded-[28px] border border-white/70 bg-white/70 p-3 shadow-[0_12px_34px_rgba(215,188,98,0.18)] backdrop-blur-md"
      >
        <div className="flex items-center gap-3 rounded-[22px] bg-white/85 px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
          <Search className="size-4 text-stone-400" />
          <input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="搜索灵感、关键词或笔记"
            className="w-full bg-transparent text-sm text-stone-700 outline-none placeholder:text-stone-400"
          />
          <button
            type="button"
            onClick={onOpenSummary}
            className="shrink-0 rounded-full bg-[#f4f0ff] px-3 py-1.5 text-xs font-semibold text-[#7b63d4]"
          >
            月度总结
          </button>
        </div>
      </motion.section>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {[
          { label: "全部", count: inspirations.length },
          { label: "有笔记", count: inspirations.filter((item) => item.notes).length },
          { label: "视频", count: inspirations.filter((item) => item.sourceType === "视频").length },
          { label: "教程", count: inspirations.filter((item) => item.sourceType === "教程").length },
        ].map((pill, index) => (
          <motion.button
            key={pill.label}
            type="button"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 + index * 0.03 }}
            className={`rounded-full px-4 py-2 text-sm font-medium ${
              index === 0
                ? "bg-[#d8f0b9] text-[#35552f]"
                : "border border-[#f0d8bf] bg-white/70 text-stone-600"
            }`}
          >
            {pill.label} ({pill.count})
          </motion.button>
        ))}
      </div>

      <div className="space-y-4">
        {inspirations.map((item, index) => (
          <InspirationCard key={item.id} item={item} index={index} onOpen={() => onOpenDetail(item)} />
        ))}
      </div>

      {inspirations.length === 0 && (
        <section className="rounded-[28px] border border-dashed border-white/70 bg-white/55 p-6 text-center shadow-[0_12px_34px_rgba(215,188,98,0.12)]">
          <p className="text-base font-semibold text-stone-700">还没有匹配到灵感</p>
          <p className="mt-2 text-sm leading-6 text-stone-500">试试换个关键词，或者直接新增一条新的链接。</p>
        </section>
      )}
    </motion.div>
  );
}

function InspirationCard({
  item,
  index,
  onOpen,
}: {
  item: Inspiration;
  index: number;
  onOpen: () => void;
}) {
  const theme = getThemeFromKey(item.themeKey);

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      initial={{ opacity: 0, y: 16, rotate: index % 2 === 0 ? -1.3 : 1.1 }}
      animate={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? -1.3 : 1.1 }}
      whileHover={{ y: -4, rotate: 0 }}
      transition={{ duration: 0.36, delay: index * 0.04 }}
      className="group block w-full text-left"
    >
      <div
        className="relative overflow-hidden rounded-[34px] border border-white/70 p-5 shadow-[0_16px_38px_rgba(215,188,98,0.18)]"
        style={{ background: theme.surface }}
      >
        <div
          className="pointer-events-none absolute inset-x-10 top-0 h-20 rounded-full blur-3xl"
          style={{ backgroundColor: theme.glow }}
        />
        <div className="relative z-10 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">
              <span
                className="rounded-full px-2.5 py-1"
                style={{ backgroundColor: theme.pill, color: theme.accent }}
              >
                {item.sourceType}
              </span>
              <span>{item.sourceName}</span>
            </div>
            <p className="mt-4 max-w-[15rem] text-[1.7rem] font-semibold leading-[1.05] tracking-tight text-stone-900">
              {item.title}
            </p>
          </div>
          <div className="rounded-full bg-white/70 p-3 transition group-hover:translate-y-[-2px]">
            <Share2 className="size-4 text-stone-700" />
          </div>
        </div>

        <p className="relative z-10 mt-4 max-w-[16rem] text-sm leading-6 text-stone-600">{item.summary}</p>

        <div className="relative z-10 mt-5 flex flex-wrap gap-2">
          {item.keywords.slice(0, 3).map((keyword) => (
            <span
              key={keyword}
              className="rounded-full px-3 py-1.5 text-xs font-medium"
              style={{ backgroundColor: theme.pill, color: theme.ink }}
            >
              {keyword}
            </span>
          ))}
        </div>

        <div className="relative z-10 mt-5 flex items-center justify-between">
          <div className="flex gap-2 text-xs text-stone-500">
            <span className="rounded-full bg-white/78 px-3 py-1.5">
              {Math.max(180, item.summary.length * 4)} words
            </span>
            <span className="rounded-full bg-white/78 px-3 py-1.5">
              {item.notes ? "1 note" : "0 note"}
            </span>
          </div>
          <span className="flex size-12 items-center justify-center rounded-full bg-white/82 text-xl text-stone-700">
            ↗
          </span>
        </div>
      </div>
    </motion.button>
  );
}
