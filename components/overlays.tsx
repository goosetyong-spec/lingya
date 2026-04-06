"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, BookOpenText, Share2 } from "lucide-react";
import { CardTheme, Inspiration, getThemeFromKey } from "@/lib/lingya-data";

export function DetailOverlay({
  open,
  inspiration,
  onClose,
  onWriteNote,
}: {
  open: boolean;
  inspiration: Inspiration | null;
  onClose: () => void;
  onWriteNote: () => void;
}) {
  return (
    <AnimatePresence>
      {open && inspiration && (
        <DetailContent inspiration={inspiration} onClose={onClose} onWriteNote={onWriteNote} />
      )}
    </AnimatePresence>
  );
}

function DetailContent({
  inspiration,
  onClose,
  onWriteNote,
}: {
  inspiration: Inspiration;
  onClose: () => void;
  onWriteNote: () => void;
}) {
  const theme = getThemeFromKey(inspiration.themeKey);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-40 bg-[rgba(24,18,10,0.42)] px-4 py-6 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.98 }}
        className="mx-auto flex h-full w-full max-w-[430px] flex-col overflow-hidden rounded-[38px] border border-white/60 bg-[rgba(255,250,239,0.9)] shadow-[0_28px_80px_rgba(33,24,15,0.25)]"
      >
        <div className="flex items-center justify-between px-5 pt-6">
          <button
            type="button"
            onClick={onClose}
            className="flex size-11 items-center justify-center rounded-full bg-[#2d2419] text-white"
          >
            <ArrowLeft className="size-5" />
          </button>
          <div className="flex gap-2">
            <button type="button" className="flex size-11 items-center justify-center rounded-full bg-white/82 text-stone-600">
              <Share2 className="size-4" />
            </button>
            <button type="button" className="flex size-11 items-center justify-center rounded-full bg-white/82 text-stone-600">
              <BookOpenText className="size-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 pb-7 pt-4">
          <section
            className="rounded-[34px] border border-white/80 p-4 shadow-[0_16px_38px_rgba(215,188,98,0.18)]"
            style={{ background: theme.surface }}
          >
            <div className="rounded-[28px] bg-white/70 p-4">
              <div className="flex flex-wrap gap-2">
                <span
                  className="rounded-full px-3 py-1.5 text-xs font-semibold"
                  style={{ backgroundColor: theme.pill, color: theme.accent }}
                >
                  {inspiration.sourceType}
                </span>
                <span className="rounded-full bg-white/88 px-3 py-1.5 text-xs text-stone-500">
                  {inspiration.sourceName}
                </span>
              </div>
              <p className="mt-4 max-w-[16rem] text-[2rem] font-semibold leading-[1.04] tracking-tight text-stone-900">
                {inspiration.title}
              </p>
              <div className="mt-5 flex gap-2 text-xs text-stone-500">
                <span className="rounded-full bg-white/82 px-3 py-1.5">
                  {inspiration.notes ? "1 条笔记" : "0 条笔记"}
                </span>
                <span className="rounded-full bg-white/82 px-3 py-1.5">
                  {Math.max(180, inspiration.summary.length * 4)} words
                </span>
              </div>
            </div>
          </section>

          <section className="mt-4 rounded-[30px] border border-white/70 bg-[#2d2720] p-5 text-[#f5f1e7] shadow-[0_16px_38px_rgba(54,40,21,0.18)]">
            <p className="text-xs uppercase tracking-[0.2em] text-[#cabca2]">AI 总结</p>
            <p className="mt-4 text-sm leading-7">{inspiration.summary}</p>
          </section>

          <section className="mt-4 rounded-[30px] border border-white/70 bg-white/74 p-5 shadow-[0_16px_38px_rgba(215,188,98,0.14)]">
            <p className="text-xs uppercase tracking-[0.2em] text-stone-400">未来展望</p>
            <p className="mt-4 text-sm leading-7 text-stone-700">{inspiration.outlook}</p>
          </section>

          <section className="mt-4 rounded-[30px] border border-white/70 bg-white/76 p-5 shadow-[0_16px_38px_rgba(215,188,98,0.14)]">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.2em] text-stone-400">我的笔记</p>
              <button type="button" onClick={onWriteNote} className="text-sm font-semibold" style={{ color: theme.accent }}>
                {inspiration.notes ? "继续补充" : "写下想法"}
              </button>
            </div>
            <p className="mt-4 text-sm leading-7 text-stone-700">
              {inspiration.notes || "先写下你想保留的判断、灵感火花，或者你想拿它去试的方向。"}
            </p>
          </section>

          <section className="mt-4 rounded-[30px] border border-white/70 bg-white/72 p-5 shadow-[0_16px_38px_rgba(215,188,98,0.14)]">
            <p className="text-xs uppercase tracking-[0.2em] text-stone-400">高频关键词</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {inspiration.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="rounded-full px-4 py-2 text-sm font-medium"
                  style={{ backgroundColor: theme.pill, color: theme.ink }}
                >
                  {keyword}
                </span>
              ))}
            </div>
          </section>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function NoteOverlay({
  open,
  theme,
  value,
  onChange,
  onClose,
  onSave,
  title,
  subtitle,
}: {
  open: boolean;
  theme: CardTheme;
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
  onSave: () => void;
  title: string;
  subtitle: string;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-[rgba(28,22,13,0.45)] px-4 py-6 backdrop-blur-sm"
        >
          <div className="mx-auto flex h-full w-full max-w-[430px] flex-col justify-end">
            <motion.section
              initial={{ y: 36, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              className="overflow-hidden rounded-[34px] border border-white/80 shadow-[0_24px_64px_rgba(25,17,8,0.25)]"
              style={{ background: theme.surface }}
            >
              <div className="border-b border-white/60 bg-white/24 px-5 py-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[1.6rem] font-semibold leading-tight tracking-tight text-stone-900">{title}</p>
                    <p className="mt-2 text-sm leading-6 text-stone-600">{subtitle}</p>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-full bg-white/82 px-3 py-2 text-xs font-semibold text-stone-500"
                  >
                    关闭
                  </button>
                </div>
              </div>

              <div className="space-y-4 bg-white/70 p-5">
                <div className="rounded-[26px] bg-white/88 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
                  <p className="mb-3 text-xs uppercase tracking-[0.2em] text-stone-400">我的补充</p>
                  <textarea
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    placeholder="例如：我为什么会被它打动、之后想拿去试什么、担心什么地方会失败。"
                    className="min-h-36 w-full resize-none bg-transparent text-sm leading-7 text-stone-700 outline-none placeholder:text-stone-400"
                  />
                </div>
                <button
                  type="button"
                  onClick={onSave}
                  className="w-full rounded-[24px] px-5 py-4 text-base font-semibold text-white shadow-[0_18px_28px_rgba(32,24,15,0.18)]"
                  style={{ backgroundColor: theme.accent }}
                >
                  保存这条想法
                </button>
              </div>
            </motion.section>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
