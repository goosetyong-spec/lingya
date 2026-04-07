"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { Inspiration } from "@/lib/lingya-data";

const imgArchiveGlow = "https://www.figma.com/api/mcp/asset/d5f1911b-b546-4ddb-a444-ca6f62e2267f";
const imgBackArrow = "https://www.figma.com/api/mcp/asset/14462f0a-dd55-423f-929d-f90ea4e076c0";
const imgMoreDots = "https://www.figma.com/api/mcp/asset/18c95841-e4ce-413e-8349-fbf9c6a3c2e1";
const imgPlayBtn = "https://www.figma.com/api/mcp/asset/d63fb055-b2e9-4c03-ae75-19b77202bf18";
const imgSparkleIcon = "https://www.figma.com/api/mcp/asset/37397e39-94b3-4f1a-aa9f-96ed4ca084fc";
const imgPaperclip = "https://www.figma.com/api/mcp/asset/6c306f5a-2796-49d7-b6f8-b823e8099a26";
const imgPaperclipDeco = "https://www.figma.com/api/mcp/asset/181f9d3e-5235-4d46-aa9d-72b15d1ed9db";
const imgFallbackThumb = "https://www.figma.com/api/mcp/asset/dd596373-0f15-4f20-89cd-8ad936aa4521";

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
          className="absolute inset-0 z-40 flex items-center justify-center bg-[rgba(30,22,11,0.18)] backdrop-blur-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.22 }}
            className="relative h-full w-full max-w-[390px] overflow-hidden rounded-[36px] bg-[#fff3d3]"
          >
            <div className="pointer-events-none absolute left-[118px] top-[230px] h-[420px] w-[420px]">
              <img alt="" src={imgArchiveGlow} className="h-full w-full" />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(119deg,rgba(255,255,255,0.12)_25%,rgba(255,250,235,0.04)_53%,rgba(247,237,209,0.12)_117%)]" />
            <div className="relative flex h-full flex-col">
              <div className="flex items-center justify-between px-5 pt-[52px]">
                <button type="button" onClick={onClose} className="h-7 w-7">
                  <img alt="返回" src={imgBackArrow} className="h-full w-full" />
                </button>
                <button type="button" onClick={onClose} className="h-7 w-7">
                  <img alt="更多" src={imgMoreDots} className="h-full w-full" />
                </button>
              </div>

              <div className="px-5 pt-[5px]">
                <p className="text-[11px] tracking-[0.18em] text-[rgba(122,94,56,0.86)]">
                  No.001 INSPIRATION
                </p>
                <h2 className="mt-1 text-[32px] font-bold leading-[1.18] text-[#1a1a1a]">
                  {inspiration.title}
                </h2>
                <p className="mt-1 text-[11px] tracking-[0.15em] text-[rgba(122,94,56,0.72)]">
                  INTERACTION DESIGN THEORY
                </p>
              </div>

              <div className="relative mt-4 flex-1 px-3 pb-4">
                <div className="absolute inset-x-3 top-[22px] bottom-0 rounded-[34px] border border-white/60 bg-[rgba(255,254,249,0.76)] shadow-[0_16px_28px_rgba(77,59,26,0.08)]" />

                <div className="relative z-10 flex h-full flex-col overflow-y-auto px-[5px] pb-[92px] pt-9">
                  <div className="mb-[10px] text-center text-[10px] tracking-[0.22em] text-[rgba(120,97,66,0.48)]">
                    COLLECTED IDEA
                  </div>

                  <div className="relative rounded-[22px] border border-white/60 bg-[rgba(255,251,247,0.88)] p-2.5 shadow-[0_14px_24px_rgba(61,43,20,0.07)] rotate-[1.2deg]">
                    <div className="flex gap-3">
                      <div className="relative h-[130px] w-[120px] overflow-hidden rounded-[18px] bg-[linear-gradient(133deg,#424a73_21%,#2e3352_121%)]">
                        <img
                          alt=""
                          src={inspiration.thumbnailUrl || imgFallbackThumb}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/10" />
                        <img alt="" src={imgPlayBtn} className="absolute left-[42px] top-[47px] h-9 w-9" />
                      </div>
                      <div className="min-w-0 flex-1 py-1">
                        <p className="text-[12px] text-[rgba(117,102,143,0.82)]">
                          {sourcePrefix(inspiration.sourceType)} {inspiration.sourceName}
                        </p>
                        <p className="mt-3 text-[14px] font-medium leading-[20px] text-[#312552]">
                          {inspiration.sourceTitle || inspiration.title}
                        </p>
                        <a
                          href={inspiration.url}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-4 inline-block text-[12px] text-[rgba(138,102,204,0.88)]"
                        >
                          点击查看原帖 ↗
                        </a>
                      </div>
                    </div>
                    <div className="absolute right-[22px] top-[-11px] rotate-[-6deg] rounded-[9px] bg-[rgba(252,245,199,0.78)] px-[14px] py-[6px] text-[11px] text-[#5f4b24]">
                      原文原链接
                    </div>
                  </div>

                  <div className="relative mt-4 rounded-[24px] px-5 py-[13px] shadow-[0_18px_28px_rgba(46,26,77,0.18)] bg-[linear-gradient(168deg,#b9a9ff_15%,#e8ddfb_87%)]">
                    <div className="mb-[14px] flex items-center justify-between">
                      <p className="text-[18px] font-bold text-[#4a4a4a]">AI 摘录卡</p>
                      <div className="flex items-center gap-3">
                        <p className="text-[11px] tracking-[0.2em] text-[#613c9f]">
                          CURATED NOTES
                        </p>
                        <img alt="" src={imgSparkleIcon} className="h-7 w-7" />
                      </div>
                    </div>
                    <p className="whitespace-pre-line text-[14px] leading-[18px] text-[rgba(74,74,74,0.94)]">
                      {bulletize(inspiration.summary)}
                    </p>
                    <div className="absolute right-5 top-[-12px] rotate-[-6deg] rounded-[9px] bg-[rgba(252,245,199,0.78)] px-[14px] py-[6px] text-[11px] text-[#5f4b24]">
                      AI 帮你记住
                    </div>
                  </div>

                  <div className="relative mt-4 rotate-[-1.1deg] rounded-[24px] border border-white/60 bg-[rgba(255,251,247,0.92)] px-6 py-4 shadow-[0_12px_20px_rgba(61,41,20,0.06)]">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-[20px] font-bold text-[#2d1b5e]">前景展望</p>
                      <p className="text-[11px] tracking-[0.2em] text-[rgba(123,91,196,0.8)]">
                        OUTLOOK
                      </p>
                    </div>
                    <p className="text-[14px] leading-[25px] text-[#4a3c31]">{inspiration.outlook}</p>
                  </div>
                </div>

                <img
                  alt=""
                  src={imgPaperclip}
                  className="absolute right-8 top-[6px] z-20 h-[45px] w-[26px] rotate-[-7deg]"
                />

                <button
                  type="button"
                  onClick={onWriteNote}
                  className="absolute bottom-4 left-1/2 z-20 flex h-[62px] w-[353px] -translate-x-1/2 items-center justify-between rounded-[20px] border border-white/60 bg-white/82 px-5 shadow-[0_10px_18px_rgba(61,41,20,0.08)]"
                >
                  <span className="text-[16px] font-bold text-[#3c2e61]">🗒 写下我的想法</span>
                  <span className="text-[11px] tracking-[0.15em] text-[rgba(125,89,196,0.88)]">
                    SAVE A THOUGHT
                  </span>
                </button>
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
          className="absolute inset-0 z-50 flex items-end justify-center bg-[rgba(46,38,59,0.36)]"
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
            className="relative h-[560px] w-full max-w-[390px] rounded-t-[30px] border border-white/50 bg-[rgba(247,242,255,0.98)] shadow-[0_-8px_24px_rgba(31,20,61,0.18)]"
          >
            <img
              alt=""
              src={imgPaperclipDeco}
              className="absolute left-4 top-[-22px] h-[52px] w-[26px] rotate-[12deg]"
            />

            <div className="flex h-full flex-col gap-4 px-6 pb-9 pt-4">
              <div className="flex justify-center py-2">
                <div className="h-[5px] w-[44px] rounded-full bg-[#b0a1db]" />
              </div>

              <div className="flex items-center justify-between">
                <button type="button" onClick={onClose} className="text-[16px] text-[#7861c2]">
                  取消
                </button>
                <h3 className="text-[18px] font-bold text-[#34285a]">我的笔记</h3>
                <button type="button" onClick={onSave} className="text-[16px] text-[#7861c2]">
                  完成
                </button>
              </div>

              <div className="rounded-[22px] border border-[#f2edfc] bg-[rgba(255,255,255,0.94)] p-5 shadow-[0_10px_18px_rgba(56,46,87,0.06)]">
                <textarea
                  value={value}
                  onChange={(event) => onChange(event.target.value)}
                  placeholder="开始写吧，这闗种子的未来可能耧是丹..."
                  className="h-[290px] w-full resize-none border-0 bg-transparent text-[16px] leading-[32px] text-[#7e69b1] outline-none placeholder:text-[#bdaddb]"
                />
                <div className="mt-2 h-px w-full bg-[#ebe3fa]" />
              </div>

              <button
                type="button"
                onClick={onSave}
                className="mt-auto h-[54px] rounded-[18px] bg-[linear-gradient(90deg,#634fbd_0%,#4a3894_200%)] text-[16px] font-bold text-white shadow-[0_12px_18px_rgba(41,26,89,0.2)]"
              >
                保存笔记
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function sourcePrefix(type: Inspiration["sourceType"]) {
  if (type === "视频") return "📹";
  if (type === "帖子") return "📰";
  if (type === "教程") return "📚";
  return "🔕";
}

function bulletize(summary: string) {
  const parts = summary
    .split(/[。！�?\n]/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 3);

  if (parts.length === 0) return "£先把这条内容收藏下来，慢慢养成你自己的判断。";
  return parts.map((item) => `· ${item}`).join("\n\n");
}
