"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, MoreHorizontal, Share2 } from "lucide-react";
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
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="mx-auto flex h-full w-full max-w-[430px] flex-col overflow-hidden rounded-[38px] border border-white/60 bg-[#f7eddc] shadow-[0_28px_80px_rgba(33,24,15,0.22)]"
          >
            <div className="flex-1 overflow-y-auto px-5 pt-5 pb-28">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex size-9 items-center justify-center rounded-full bg-[#6047b3] text-white"
                >
                  <ArrowLeft className="size-4" />
                </button>
                <button
                  type="button"
                  className="flex size-9 items-center justify-center rounded-full bg-[#6047b3] text-white"
                >
                  <MoreHorizontal className="size-4" />
                </button>
              </div>

              <p className="mt-6 text-[12px] tracking-[0.26em] text-[#9b866d]">No.001 INSPIRATION</p>
              <h2 className="mt-3 text-[28px] font-bold leading-[1.18] tracking-[-0.05em] text-[#2e2928]">
                {inspiration.title}
              </h2>
              <p className="mt-3 text-[12px] tracking-[0.2em] text-[#ad9880]">
                {inspiration.sourceTitle.toUpperCase()}
              </p>

              <div className="relative mt-4 rounded-[30px] bg-[rgba(255,254,250,0.82)] px-4 pb-5 pt-8 shadow-[0_14px_24px_rgba(61,41,20,0.08)]">
                <div className="absolute right-5 top-3 text-[34px] text-[#6c52c8]">📏</div>
                <SourceCard draft={inspiration} />
                <InsightCard inspiration={inspiration} />

                <div className="mt-4 rounded-[24px] bg-white/92 p-5 shadow-[0_8px_18px_rgba(61,41,20,0.06)]">
                  <div className="flex items-center justify-between">
                    <p className="text-[20px] font-bold text-[#372a67]">前景展望</p>
                    <p className="text-[11px] tracking-[0.2em] text-[#8e7cd6]">OUTLOOK</p>
                  </div>
                  <p className="mt-4 text-[14px] leading-[2] text-[#564941]">{inspiration.outlook}</p>
                </div>

                <button
                  type="button"
                  onClick={() => onShare(inspiration)}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-[20px] bg-white/92 py-3 text-[14px] font-medium text-[#6d6158]"
                >
                  <Share2 className="size-4" />
                  分享这条灵感
                </button>
              </div>
            </div>

            <div className="absolute inset-x-8 bottom-8 z-10">
              <button
                type="button"
                onClick={onWriteNote}
                className="w-full rounded-[22px] bg-[#6047b3] px-5 py-4 text-[18px] font-semibold text-white shadow-[0_16px_28px_rgba(60,41,140,0.28)]"
              >
                写下我的笔记
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function InsightCard({ inspiration }: { inspiration: Inspiration }) {
  const theme = getThemeFromKey(inspiration.themeKey);

  return (
    <div className="mt-4 rounded-[24px] p-5 shadow-[0_14px_24px_rgba(61,41,20,0.08)]" style={{ background: theme.surface }}>
      <div className="flex items-center justify-between">
        <p className="text-[20px] font-bold text-[#2f2c2b]">AI 理解卡</p>
        <p className="text-[11px] tracking-[0.2em] text-[#8a77cf]">CURATED NOTES</p>
      </div>
      <p className="mt-4 whitespace-pre-line text-[14px] leading-[2] text-[#4a423d]">
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
          className="fixed inset-0 z-50 bg-[rgba(16,12,8,0.36)] backdrop-blur-[2px]"
        >
          <div className="flex h-full items-end justify-center px-4 pb-0 pt-20">
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 18 }}
              className="w-full max-w-[430px] rounded-t-[30px] bg-[linear-gradient(180deg,#f5f0ff,#f8f4ff)] px-5 pb-6 pt-3 shadow-[0_-12px_40px_rgba(41,28,98,0.12)]"
            >
              <div className="mx-auto h-1.5 w-14 rounded-full bg-[#c9bcf3]" />

              <div className="mt-5 flex items-center justify-between text-[16px] text-[#6959b9]">
                <button type="button" onClick={onClose}>取消</button>
                <p className="text-[18px] font-bold text-[#473d7f]">{title}</p>
                <button type="button" onClick={onSave}>完成</button>
              </div>

              <div className="mt-5 rounded-[24px] bg-white px-5 py-4 shadow-[0_10px_20px_rgba(70,56,130,0.06)]">
                <textarea
                  value={value}
                  onChange={(event) => onChange(event.target.value)}
                  placeholder="开始写吧，这颗种子的未来可能性是..."
                  className="min-h-[240px] w-full resize-none bg-transparent text-[14px] leading-[2] text-[#4e475f] outline-none placeholder:text-[#b7addd]"
                />
                <div className="mt-4 h-1 rounded-full bg-[#ded4fb]" />
              </div>

              <button
                type="button"
                onClick={onSave}
                className="mt-5 h-14 w-full rounded-[20px] text-[18px] font-semibold text-white shadow-[0_18px_28px_rgba(60,41,140,0.2)]"
                style={{ backgroundColor: theme.key === "navy" ? "#4e6ea6" : "#6047b3" }}
              >
                保存笔记
              </button>

              <p className="mt-3 text-[13px] leading-6 text-[#9186b0]">{subtitle}</p>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
