"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MoreHorizontal, Share2 } from "lucide-react";
import { SourceCard } from "@/components/add-screen";
import { CardTheme, Inspiration, getThemeFromKey } from "@/lib/lingya-data";

export function DetailOverlay({
  open,
  inspiration,
  onClose,
  onWriteNote,
  onShare,
}: {
  open: boolean;
  inspiration: Inspiration | null;
  onClose: () => void;
  onWriteNote: () => void;
  onShare: (item: Inspiration) => void;
}) {
  return (
    <AnimatePresence>
      {open && inspiration ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-[rgba(24,18,10,0.28)] px-4 py-6 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            className="mx-auto flex h-full w-full max-w-[430px] flex-col overflow-hidden rounded-[38px] border border-white/60 bg-[#fff3d3] shadow-[0_28px_80px_rgba(33,24,15,0.25)]"
          >
            <div className="relative flex-1 overflow-y-auto px-5 pt-14">
              <div className="absolute left-[118px] top-[230px] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(255,233,159,0.6),rgba(255,233,159,0)_65%)]" />

              <div className="relative flex items-center justify-between">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex size-8 items-center justify-center rounded-full bg-[#5b4698] text-white"
                >
                  ←
                </button>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => onShare(inspiration)}
                    className="flex size-8 items-center justify-center rounded-full bg-[#5b4698] text-white"
                  >
                    <Share2 className="size-4" />
                  </button>
                  <button type="button" className="flex size-8 items-center justify-center rounded-full bg-[#5b4698] text-white">
                    <MoreHorizontal className="size-4" />
                  </button>
                </div>
              </div>

              <div className="relative mt-4">
                <p className="text-[11px] tracking-[0.2em] text-[rgba(122,94,56,0.86)]">No.001 INSPIRATION</p>
                <h2 className="mt-2 text-[32px] font-bold tracking-[-0.04em] text-[#1a1a1a]">
                  {inspiration.title}
                </h2>
                <p className="mt-2 text-[11px] tracking-[0.15em] text-[rgba(122,94,56,0.72)]">
                  {inspiration.sourceTitle.toUpperCase()}
                </p>
              </div>

              <div className="relative mt-4 rounded-[34px] border border-white/60 bg-[rgba(255,254,249,0.76)] px-3 pb-24 pt-8 shadow-[0_16px_28px_rgba(77,59,26,0.08)]">
                <div className="absolute right-4 top-[-18px] rotate-[-7deg] text-[42px] text-[#5b4698]">📎</div>

                <SourceCard draft={inspiration} />

                <DetailInsightCard inspiration={inspiration} />

                <div className="mt-4 rounded-[24px] bg-[rgba(255,251,247,0.92)] p-5 shadow-[0_12px_20px_rgba(61,41,20,0.06)]">
                  <div className="flex items-center justify-between">
                    <p className="text-[20px] font-bold text-[#2d1b5e]">前景展望</p>
                    <p className="text-[11px] tracking-[0.2em] text-[rgba(123,91,196,0.8)]">OUTLOOK</p>
                  </div>
                  <p className="mt-4 text-[14px] leading-[27px] text-[#4a3c31]">{inspiration.outlook}</p>
                </div>

                <button
                  type="button"
                  onClick={onWriteNote}
                  className="absolute inset-x-4 bottom-4 flex h-[62px] items-center justify-between rounded-[20px] border border-white/60 bg-white/82 px-5 shadow-[0_10px_18px_rgba(61,41,20,0.08)]"
                >
                  <span className="text-[16px] font-bold text-[#3c2e61]">🗒️ 写下我的想法</span>
                  <span className="text-[11px] tracking-[0.15em] text-[rgba(125,89,196,0.88)]">
                    SAVE A THOUGHT
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function DetailInsightCard({ inspiration }: { inspiration: Inspiration }) {
  const theme = getThemeFromKey(inspiration.themeKey);

  return (
    <div className="relative mt-4 rounded-[24px] p-5 shadow-[0_18px_28px_rgba(46,26,77,0.18)]" style={{ background: theme.surface }}>
      <div className="absolute right-5 top-[-11px] -rotate-6 rounded-[9px] bg-[rgba(252,245,199,0.78)] px-4 py-[6px] text-[11px] text-[#5f4b24]">
        AI 帮你记住
      </div>
      <div className="flex items-center justify-between">
        <p className="text-[18px] font-bold text-[#4a4a4a]">AI 摘录卡</p>
        <p className="text-[11px] tracking-[0.2em] text-[#613c9f]">CURATED NOTES</p>
      </div>
      <p className="mt-4 whitespace-pre-line text-[14px] leading-[30px] text-[rgba(74,74,74,0.94)]">
        {inspiration.summary}
      </p>
    </div>
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
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-[rgba(14,11,8,0.52)] px-4 py-6 backdrop-blur-[2px]"
        >
          <div className="mx-auto flex h-full w-full max-w-[430px] flex-col justify-end">
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 18 }}
              className="overflow-hidden rounded-[30px] border border-white/70 shadow-[0_24px_64px_rgba(25,17,8,0.25)]"
              style={{ background: theme.surface }}
            >
              <div className="bg-white/30 px-5 py-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[24px] font-bold leading-tight text-[#1e1a17]">{title}</p>
                    <p className="mt-2 text-[14px] leading-6 text-[#5f544d]">{subtitle}</p>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-full bg-white/78 px-3 py-2 text-[12px] font-medium text-[#6f655f]"
                  >
                    关闭
                  </button>
                </div>
              </div>

              <div className="bg-white/76 p-5">
                <textarea
                  value={value}
                  onChange={(event) => onChange(event.target.value)}
                  placeholder="比如：它为什么打动我、我想把哪一步拿去试、或者我觉得它真正可行的地方在哪里。"
                  className="min-h-[180px] w-full resize-none rounded-[24px] bg-white/88 p-4 text-[14px] leading-7 text-[#4d433b] outline-none placeholder:text-[#b0a59d]"
                />

                <button
                  type="button"
                  onClick={onSave}
                  className="mt-4 h-14 w-full rounded-[20px] text-[16px] font-semibold text-white shadow-[0_18px_28px_rgba(32,24,15,0.18)]"
                  style={{ backgroundColor: theme.accent }}
                >
                  保存这条想法
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
