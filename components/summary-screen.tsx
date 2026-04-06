"use client";

import { motion } from "framer-motion";
import { ScreenTitle } from "@/components/lingya-ui";

export function SummaryScreen({
  highlightedKeywords,
  contentStats,
  summaryThemes,
  totalCount,
}: {
  highlightedKeywords: { label: string; count: number }[];
  contentStats: { type: string; count: number }[];
  summaryThemes: { label: string; count: number }[];
  totalCount: number;
}) {
  return (
    <motion.div
      key="summary"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35 }}
      className="relative z-10 flex flex-col gap-4 pt-3"
    >
      <ScreenTitle title="月度总结" subtitle="这个月的灵感偏好，慢慢长成了什么样子" />

      <section className="rounded-[34px] border border-white/70 bg-white/65 p-5 shadow-[0_14px_40px_rgba(215,188,98,0.18)]">
        <div className="relative rounded-[30px] bg-[linear-gradient(180deg,rgba(255,252,245,0.95),rgba(255,246,225,0.92))] px-5 pb-6 pt-8">
          <div className="absolute left-4 top-5 rounded-full bg-[#f0ffe4] px-3 py-1 text-xs font-semibold text-[#568648]">
            April Summary
          </div>
          <div className="absolute right-4 top-4 flex gap-2">
            {highlightedKeywords.slice(0, 2).map((keyword) => (
              <span
                key={keyword.label}
                className="rounded-full bg-white/84 px-3 py-1 text-xs font-medium text-stone-500"
              >
                {keyword.label}
              </span>
            ))}
          </div>

          <div className="mx-auto mt-10 flex size-36 items-center justify-center rounded-full bg-[radial-gradient(circle_at_top,#d9ffb7,#89d772_62%,#5db954)] shadow-[0_30px_70px_rgba(116,194,92,0.28)]">
            <div className="flex size-24 items-center justify-center rounded-full bg-white/55 text-5xl">🌱</div>
          </div>

          <div className="mt-5 text-center">
            <p className="text-2xl font-semibold tracking-tight text-stone-900">
              芽芽偏向 {summaryThemes[0]?.label ?? "教程"} 型成长
            </p>
            <p className="mt-2 text-sm leading-6 text-stone-500">
              本月你最常保存的是 {summaryThemes[0]?.label ?? "教程"}、{summaryThemes[1]?.label ?? "界面"} 和{" "}
              {summaryThemes[2]?.label ?? "编码"} 方向的内容。
            </p>
          </div>

          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {highlightedKeywords.map((keyword) => (
              <span
                key={keyword.label}
                className="rounded-full bg-white/88 px-4 py-2 text-sm font-medium text-stone-600 shadow-[0_6px_20px_rgba(215,188,98,0.12)]"
              >
                {keyword.label} {keyword.count}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[30px] border border-white/70 bg-white/65 p-5 shadow-[0_12px_34px_rgba(215,188,98,0.16)]">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-lg font-semibold text-stone-900">内容类型统计</p>
            <p className="mt-1 text-sm text-stone-500">你这个月最常分享的内容来源</p>
          </div>
          <span className="rounded-full bg-[#efffe6] px-3 py-1 text-xs font-semibold text-[#5d9046]">
            本月 {totalCount} 条
          </span>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-3">
          {contentStats.map((item) => (
            <div
              key={item.type}
              className="rounded-[22px] bg-white/82 p-4 text-center shadow-[0_8px_22px_rgba(215,188,98,0.12)]"
            >
              <p className="text-sm text-stone-500">{item.type}</p>
              <p className="mt-2 text-3xl font-semibold text-stone-900">{item.count}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[30px] border border-white/70 bg-white/65 p-5 shadow-[0_12px_34px_rgba(215,188,98,0.16)]">
        <p className="text-lg font-semibold text-stone-900">芽芽成长可视化</p>
        <p className="mt-1 text-sm text-stone-500">最高的那株，就是你这个月最偏爱的方向</p>
        <div className="mt-8 grid grid-cols-4 items-end gap-4">
          {summaryThemes.map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-3">
              <div className="relative flex items-end justify-center" style={{ height: `${92 + item.count * 10}px` }}>
                <div className="absolute bottom-0 h-full w-[4px] rounded-full bg-[#67c85b]" />
                <div className="absolute bottom-[44px] left-1/2 h-6 w-10 -translate-x-[90%] rounded-[100%_0_100%_0] border-2 border-[#67c85b] bg-transparent" />
                <div className="absolute bottom-[46px] left-1/2 h-6 w-10 rounded-[0_100%_0_100%] border-2 border-[#67c85b] bg-transparent" />
              </div>
              <span className="rounded-full bg-white/88 px-4 py-2 text-sm font-medium text-stone-600">
                {item.label} {item.count}
              </span>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
