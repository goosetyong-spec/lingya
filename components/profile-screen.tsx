"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Ellipsis } from "lucide-react";
import { ProfileCard } from "@/components/lingya-ui";
import { Inspiration } from "@/lib/lingya-data";

export function ProfileScreen({
  inspirations,
  onOpenSummary,
}: {
  inspirations: Inspiration[];
  onOpenSummary: () => void;
}) {
  return (
    <motion.div
      key="profile"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35 }}
      className="relative z-10 flex flex-col gap-4 pt-3"
    >
      <div className="flex items-center justify-between">
        <button type="button" className="flex size-11 items-center justify-center rounded-full bg-[#5caf3d] text-white">
          <ArrowLeft className="size-5" />
        </button>
        <p className="text-2xl font-semibold tracking-tight text-stone-900">我的</p>
        <button
          type="button"
          className="flex size-11 items-center justify-center rounded-full bg-white/80 text-stone-500"
        >
          <Ellipsis className="size-5" />
        </button>
      </div>

      <section className="flex items-center gap-4">
        <div className="flex size-16 items-center justify-center rounded-full bg-[linear-gradient(180deg,#c4ef8d,#74d66c)] text-2xl shadow-[0_18px_34px_rgba(118,208,95,0.25)]">
          🌱
        </div>
        <div>
          <p className="text-[2rem] font-semibold leading-none tracking-tight text-stone-900">新手芽芽</p>
          <p className="mt-2 text-sm leading-6 text-stone-500">收藏灵感，也把它慢慢养成自己的判断</p>
        </div>
      </section>

      <ProfileCard className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[1.4rem] font-semibold tracking-tight text-[#33286d]">本月量化打卡</p>
            <p className="text-xs uppercase tracking-[0.24em] text-[#b7aad7]">April Sharing Tracker</p>
          </div>
          <p className="max-w-24 text-right text-sm leading-5 text-[#8f83a6]">有分享的那天，就亮一格绿色</p>
        </div>
        <div className="mt-4 grid grid-cols-8 gap-3">
          {Array.from({ length: 31 }).map((_, index) => {
            const filled = [1, 4, 7, 10, 12, 15, 16, 19, 22, 24, 27, 30].includes(index + 1);
            return (
              <div
                key={index}
                className={`h-6 rounded-[8px] ${
                  filled ? "bg-[#77d56c] shadow-[0_8px_18px_rgba(119,213,108,0.26)]" : "bg-white/70"
                }`}
              />
            );
          })}
        </div>
        <div className="mt-4">
          <p className="text-[1.45rem] font-semibold text-stone-900">15 / 31 天已分享</p>
          <p className="text-sm text-[#8f83a6]">连续分享 3 天</p>
        </div>
      </ProfileCard>

      <ProfileCard className="space-y-2 p-4">
        <div>
          <p className="text-[1.35rem] font-semibold tracking-tight text-[#33286d]">灵感资产概览</p>
          <p className="text-xs uppercase tracking-[0.24em] text-[#b7aad7]">Your Archive</p>
        </div>
        <div className="grid grid-cols-2 gap-x-5 gap-y-4">
          {[
            { label: "累计收藏", value: inspirations.length + 123 },
            { label: "本月新增", value: inspirations.length + 28 },
            { label: "我的笔记", value: inspirations.filter((item) => item.notes).length + 45 },
            { label: "月度总结", value: 4 },
          ].map((item) => (
            <div key={item.label} className="rounded-[20px] bg-white/62 p-3">
              <p className="text-sm text-[#8f83a6]">{item.label}</p>
              <p className="mt-1 text-[1.9rem] font-semibold leading-none text-stone-900">{item.value}</p>
            </div>
          ))}
        </div>
      </ProfileCard>

      <ProfileCard className="flex items-center justify-between gap-4 p-4">
        <div>
          <p className="text-[1.35rem] font-semibold tracking-tight text-[#33286d]">查看月度总结</p>
          <p className="mt-1 text-sm text-stone-500">回看这个月你最常收藏的方向</p>
        </div>
        <button
          type="button"
          onClick={onOpenSummary}
          className="rounded-full bg-[#f4f0ff] px-4 py-2 text-sm font-semibold text-[#7b63d4]"
        >
          去看看
        </button>
      </ProfileCard>

      <ProfileCard className="space-y-3 p-4">
        <p className="text-[1.35rem] font-semibold tracking-tight text-[#33286d]">设置</p>
        {[
          ["回顾提醒", "每周日"],
          ["账号与同步", "已开启"],
          ["意见反馈", ">>"],
        ].map(([left, right]) => (
          <div key={left} className="flex items-center justify-between text-[0.96rem]">
            <span className="text-stone-700">{left}</span>
            <span className="text-[#8f83a6]">{right}</span>
          </div>
        ))}
      </ProfileCard>
    </motion.div>
  );
}
