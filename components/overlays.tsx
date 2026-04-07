"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { Inspiration } from "@/lib/lingya-data";

const imgPaperclip = "https://www.figma.com/api/mcp/asset/6c306f5a-2796-49d7-b6f8-b823e8099a26";
const imgPlay = "https://www.figma.com/api/mcp/asset/d63fb055-b2e9-4c03-ae75-19b77202bf18";
const imgThumb = "https://www.figma.com/api/mcp/asset/dd596373-0f15-4f20-89cd-8ad936aa4521";

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
  onShare: (item: Inspiration) => void | Promise<void>;
}) {
  if (!inspiration) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="absolute inset-0 z-40 bg-[rgba(30,22,11,0.22)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 26 }}
            className="relative mx-auto h-full w-full max-w-[390px] overflow-hidden rounded-[36px] bg-[#fff3d3]"
          >
            <div className="absolute inset-0 bg-[linear-gradient(119deg,rgba(255,255,255,0.12)_25%,rgba(255,250,235,0.04)_53%,rgba(247,237,209,0.12)_117%)]" />

            <div className="relative z-10 flex h-full flex-col px-5 pt-[60px]">
              <div className="flex items-center justify-between">
                <button type="button" onClick={onClose} className="h-7 w-7 rounded-full bg-[#4f3a94] text-white">
                  ←
                </button>
                <button type="button" onClick={onClose} className="h-7 w-7 rounded-full bg-[#4f3a94] text-white">
                  •••
                </button>
              </div>

              <p className="mt-7 text-[11px] tracking-[0.22em] text-[#937f64]">No.001 INSPIRATION</p>
              <h2 className="mt-[6px] text-[48px] font-black leading-[1.2] text-[#1d1d1d]">{inspiration.title}</h2>
              <p className="mt-[6px] text-[11px] tracking-[0.2em] text-[#998368]">INTERACTION DESIGN THEORY</p>

              <div className="relative mt-4 flex-1 overflow-hidden rounded-[30px] border border-white/70 bg-[rgba(255,255,255,0.78)] px-2 pt-6">
                <div className="h-full overflow-y-auto pb-[100px]">
                  <div className="rounded-[22px] bg-[rgba(255,255,255,0.9)] p-2.5">
                    <div className="flex gap-3">
                      <div className="relative h-[132px] w-[122px] overflow-hidden rounded-[18px]">
                        <img alt="" src={inspiration.thumbnailUrl || imgThumb} className="h-full w-full object-cover" />
                        <img alt="" src={imgPlay} className="absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2" />
                      </div>
                      <div className="min-w-0 flex-1 pt-1">
                        <p className="text-[12px] text-[#8f7ab5]">📹 {inspiration.sourceName}</p>
                        <p className="mt-3 text-[14px] font-medium leading-[20px] text-[#312552]">
                          {inspiration.sourceTitle || inspiration.title}
                        </p>
                        <a href={inspiration.url} target="_blank" rel="noreferrer" className="mt-4 inline-block text-[12px] text-[#7a5ecc]">
                          点击查看原帖 ↗
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 rounded-[24px] bg-[linear-gradient(168deg,#b9a9ff_15%,#e8ddfb_87%)] px-5 py-4">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-[34px] font-black text-[#3e3660]">AI 摘录卡</p>
                      <p className="text-[11px] tracking-[0.18em] text-[#6a4cb4]">CURATED NOTES</p>
                    </div>
                    <p className="whitespace-pre-line text-[14px] leading-[25px] text-[#3f3b4f]">{inspiration.summary}</p>
                  </div>

                  <div className="mt-4 rounded-[24px] bg-[rgba(255,255,255,0.95)] px-6 py-4">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-[34px] font-black text-[#2d1b5e]">前景展望</p>
                      <p className="text-[11px] tracking-[0.2em] text-[#7c63c0]">OUTLOOK</p>
                    </div>
                    <p className="text-[14px] leading-[25px] text-[#4a3c31]">{inspiration.outlook}</p>
                  </div>
                </div>

                <img alt="" src={imgPaperclip} className="absolute right-6 top-2 h-[46px] w-[28px] rotate-[-8deg]" />

                <button
                  type="button"
                  onClick={onWriteNote}
                  className="absolute bottom-4 left-1/2 flex h-[62px] w-[353px] -translate-x-1/2 items-center justify-between rounded-[20px] border border-white/60 bg-white/84 px-5"
                >
                  <span className="text-[20px] font-bold text-[#3c2e61]">🗒 写下我的想法</span>
                  <span className="text-[11px] tracking-[0.15em] text-[#7d59c4]">SAVE A THOUGHT</span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function NoteOverlay({
  open,
  value,
  onChange,
  onClose,
  onSave,
  title,
  subtitle,
}: {
  open: boolean;
  theme: unknown;
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
          className="absolute inset-0 z-50 flex items-end bg-[rgba(20,16,10,0.48)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 40 }}
            animate={{ y: 0 }}
            exit={{ y: 40 }}
            transition={{ duration: 0.22 }}
            onClick={(event) => event.stopPropagation()}
            className="relative h-[560px] w-full max-w-[390px] rounded-t-[30px] bg-[#f5f0ff]"
          >
            <div className="mx-auto mt-4 h-[5px] w-[44px] rounded-full bg-[#b0a1db]" />
            <div className="mt-5 flex items-center justify-between px-6">
              <button type="button" onClick={onClose} className="text-[16px] text-[#7a66c8]">取消</button>
              <h3 className="text-[18px] font-bold text-[#34285a]">{title || "我的笔记"}</h3>
              <button type="button" onClick={onSave} className="text-[16px] text-[#7a66c8]">完成</button>
            </div>
            <p className="px-6 pt-2 text-[14px] text-[#7a7189]">{subtitle}</p>

            <div className="mx-6 mt-4 rounded-[22px] bg-white/90 p-5">
              <textarea
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder="开始写吧，这颗种子的未来可能性是..."
                className="h-[270px] w-full resize-none border-0 bg-transparent text-[16px] leading-[32px] text-[#6d60a7] outline-none placeholder:text-[#b8addb]"
              />
              <div className="h-px w-full bg-[#e9e1fb]" />
            </div>

            <button
              type="button"
              onClick={onSave}
              className="mx-6 mt-5 h-[54px] w-[calc(100%-48px)] rounded-[18px] bg-[linear-gradient(90deg,#684fd1_0%,#5743c0_100%)] text-[16px] font-bold text-white"
            >
              保存笔记
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
