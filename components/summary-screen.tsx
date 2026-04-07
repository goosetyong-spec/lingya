"use client";

import { motion } from "framer-motion";

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
  const displayThemes =
    summaryThemes.length >= 4
      ? summaryThemes.slice(0, 4)
      : [
          { label: "运营", count: 5 },
          { label: "绘画", count: 8 },
          { label: "编码", count: 12 },
          { label: "UI", count: 6 },
        ];

  const displayKeywords =
    highlightedKeywords.length > 0
      ? highlightedKeywords.slice(0, 5)
      : [
          { label: "变现", count: 8 },
          { label: "原型", count: 6 },
          { label: "UI", count: 6 },
          { label: "灵感", count: 5 },
          { label: "教程", count: 8 },
        ];

  return (
    <motion.div
      key="summary"
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.3 }}
      className="flex h-full flex-col overflow-y-auto pt-4 pb-28"
    >
      <div className="flex items-center justify-between">
        <button className="flex size-9 items-center justify-center rounded-full bg-[#66b237] text-white">‹</button>
        <p className="text-[30px] font-bold tracking-[-0.05em] text-[#272524]">月度总结</p>
        <button className="flex size-9 items-center justify-center rounded-full bg-white/86 text-[#8cd667]">↗</button>
      </div>

      <p className="mt-5 text-[12px] tracking-[0.28em] text-[#a38f75]">APRIL 2026 GROWTH REPORT</p>
      <h2 className="mt-2 text-[22px] font-bold leading-[1.25] text-[#2d2a28]">芽芽这个月最爱什么？</h2>
      <p className="mt-2 text-[14px] leading-6 text-[#8f806f]">你的灵感分享偏好，正在把芽芽养成自己的样子</p>

      <section className="mt-5 rounded-[30px] bg-white/82 px-4 pb-5 pt-6 shadow-[0_14px_24px_rgba(74,56,31,0.08)]">
        <div className="relative rounded-[28px] border border-[#ece3fa] bg-[linear-gradient(180deg,#fffdf8,#fff9ee)] px-4 pb-5 pt-5">
          <KeywordPill className="left-3 top-4 bg-[#c7e3b7] text-[#4b7d3b]" label={`${displayThemes[2]?.label ?? "编码"} ${displayThemes[2]?.count ?? 12}`} />
          <KeywordPill className="right-3 top-4 bg-[#f4d2c4] text-[#9e684c]" label={`${displayThemes[1]?.label ?? "绘画"} ${displayThemes[1]?.count ?? 8}`} />
          <KeywordPill className="left-3 top-[108px] bg-[#cfe0f6] text-[#5372a2]" label={`${displayThemes[3]?.label ?? "UI"} ${displayThemes[3]?.count ?? 6}`} />
          <KeywordPill className="right-3 top-[112px] bg-[#dcd1fb] text-[#7062be]" label={`${displayThemes[0]?.label ?? "运营"} ${displayThemes[0]?.count ?? 5}`} />

          <div className="mx-auto mt-6 flex h-[220px] w-[220px] items-center justify-center rounded-full border border-[#e7def7]">
            <LingyaIp />
          </div>
          <p className="mt-3 text-center text-[18px] font-medium text-[#746960]">本月主偏好</p>
          <div className="mt-4 flex justify-center">
            <span className="rounded-full bg-white px-5 py-2 text-[14px] text-[#6d6259] shadow-[0_8px_16px_rgba(74,56,31,0.08)]">
              本月已收藏 {totalCount || 31} 条
            </span>
          </div>
        </div>
      </section>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <section className="rounded-[28px] bg-white/82 p-5 shadow-[0_12px_22px_rgba(74,56,31,0.08)]">
          <p className="text-[18px] font-bold text-[#362a68]">内容类型统计</p>
          <p className="mt-1 text-[11px] tracking-[0.22em] text-[#b09a84]">CONTENT TYPE</p>
          <div className="mt-4 space-y-3">
            {contentStats.slice(0, 3).map((item, index) => (
              <div key={item.type} className="grid grid-cols-[44px_1fr_24px] items-center gap-2 text-[14px] text-[#534b45]">
                <span>{item.type}</span>
                <div className="h-3 rounded-full bg-[#f4efe6]">
                  <div
                    className={`h-3 rounded-full ${index === 0 ? "bg-[#f1a49a]" : index === 1 ? "bg-[#8fb8df]" : "bg-[#b8ddb1]"}`}
                    style={{ width: `${Math.min(100, 20 + item.count * 4)}%` }}
                  />
                </div>
                <span>{item.count}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[28px] bg-white/82 p-5 shadow-[0_12px_22px_rgba(74,56,31,0.08)]">
          <p className="text-[18px] font-bold text-[#362a68]">高频关键词</p>
          <p className="mt-1 text-[11px] tracking-[0.22em] text-[#b09a84]">KEYWORD CLOUD</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {displayKeywords.map((item, index) => (
              <span
                key={item.label}
                className={`rounded-full px-4 py-2 text-[13px] ${
                  index === 0
                    ? "bg-[#ffd5ef] text-[#a65785]"
                    : index === 1
                      ? "bg-[#e2d6ff] text-[#7360b0]"
                      : index === 2
                        ? "bg-[#d8e6ff] text-[#5675ac]"
                        : index === 3
                          ? "bg-[#f9ddc7] text-[#9c6d4a]"
                          : "bg-[#d8e9be] text-[#5c8643]"
                }`}
              >
                {item.label}
              </span>
            ))}
          </div>
        </section>
      </div>

      <section className="mt-4 rounded-[28px] bg-white/82 p-5 shadow-[0_12px_22px_rgba(74,56,31,0.08)]">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[18px] font-bold text-[#362a68]">芽芽成长可视化</p>
            <p className="mt-1 text-[13px] text-[#b09a84]">分享越多，芽芽越高</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-4 items-end gap-4">
          {displayThemes.map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-3">
              <SimpleSprout height={50 + item.count * 5} />
              <span className="rounded-full bg-[#eef5e4] px-3 py-2 text-[13px] text-[#5a664d]">
                {item.label} {item.count}
              </span>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}

function KeywordPill({ className, label }: { className: string; label: string }) {
  return <span className={`absolute rounded-full px-4 py-2 text-[13px] ${className}`}>{label}</span>;
}

function SimpleSprout({ height }: { height: number }) {
  return (
    <div className="relative flex items-end justify-center" style={{ height }}>
      <div className="absolute bottom-0 h-full w-[4px] rounded-full bg-[#77c653]" />
      <div className="absolute bottom-[60%] left-1/2 h-5 w-8 -translate-x-[90%] rounded-[100%_0_100%_0] border-2 border-[#77c653] bg-[#e5f4d8]" />
      <div className="absolute bottom-[60%] left-1/2 h-5 w-8 rounded-[0_100%_0_100%] border-2 border-[#77c653] bg-[#e5f4d8]" />
    </div>
  );
}

function LingyaIp() {
  return (
    <div className="relative h-[130px] w-[112px]">
      <div className="absolute left-1/2 top-0 h-8 w-2 -translate-x-1/2 rounded-full bg-[linear-gradient(180deg,#31d59f,#45c8dd)]" />
      <div className="absolute left-[30px] top-0 h-6 w-9 -rotate-[24deg] rounded-[100%_0_100%_0] bg-[linear-gradient(180deg,#8ef07c,#47d59d)]" />
      <div className="absolute right-[30px] top-0 h-6 w-9 rotate-[24deg] rounded-[0_100%_0_100%] bg-[linear-gradient(180deg,#8ef07c,#47d59d)]" />
      <div className="absolute bottom-0 left-1/2 h-[108px] w-[100px] -translate-x-1/2 rounded-[52%_48%_56%_44%/60%_60%_40%_40%] bg-[radial-gradient(circle_at_50%_42%,#baffb7_0,#84f2c9_36%,#4dd2d8_68%,#41bfc7_100%)] shadow-[0_12px_24px_rgba(55,205,170,0.24)]" />
      <div className="absolute bottom-[38px] left-1/2 h-[54px] w-[72px] -translate-x-1/2 rounded-[40px] bg-[radial-gradient(circle_at_50%_35%,#f7fff6,#d5fff4_70%,transparent_72%)]" />
      <div className="absolute bottom-[66px] left-[34px] size-4 rounded-full bg-black" />
      <div className="absolute bottom-[66px] right-[34px] size-4 rounded-full bg-black" />
      <div className="absolute bottom-[68px] left-[38px] size-1.5 rounded-full bg-white" />
      <div className="absolute bottom-[68px] right-[38px] size-1.5 rounded-full bg-white" />
      <div className="absolute bottom-[48px] left-1/2 h-6 w-10 -translate-x-1/2 rounded-b-[20px] border-b-2 border-[#4d5c6f]" />
      <div className="absolute bottom-[56px] left-[4px] h-8 w-6 rotate-[-32deg] rounded-full bg-[radial-gradient(circle,#fdf7ff,#bfe7ff_72%,transparent_74%)] blur-[0.2px]" />
      <div className="absolute bottom-[56px] right-[4px] h-8 w-6 rotate-[32deg] rounded-full bg-[radial-gradient(circle,#fdf7ff,#bfe7ff_72%,transparent_74%)] blur-[0.2px]" />
    </div>
  );
}
