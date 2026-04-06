"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Ellipsis, Link2, Sparkles, StickyNote } from "lucide-react";
import { Inspiration, getThemeFromKey } from "@/lib/lingya-data";

export function AddScreen({
  addMode,
  setAddMode,
  inputUrl,
  setInputUrl,
  isAnalyzing,
  draft,
  noteValue,
  onBack,
  onAnalyze,
  onOpenNote,
  onSave,
}: {
  addMode: "paste" | "share";
  setAddMode: (mode: "paste" | "share") => void;
  inputUrl: string;
  setInputUrl: (value: string) => void;
  isAnalyzing: boolean;
  draft: Inspiration | null;
  noteValue: string;
  onBack: () => void;
  onAnalyze: () => void;
  onOpenNote: () => void;
  onSave: () => void;
}) {
  return (
    <motion.div
      key="add"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35 }}
      className="relative z-10 flex flex-col gap-4 pt-3"
    >
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="flex size-11 items-center justify-center rounded-full bg-[#5b4698] text-white shadow-lg shadow-violet-200/30"
        >
          <ArrowLeft className="size-5" />
        </button>
        <div className="text-center">
          <p className="text-2xl font-semibold tracking-tight text-stone-900">新增灵感</p>
          <p className="text-sm text-stone-500">
            {addMode === "paste" ? "复制链接后继续整理" : "分享进来后直接生成"}
          </p>
        </div>
        <button
          type="button"
          className="flex size-11 items-center justify-center rounded-full bg-white/80 text-stone-500"
        >
          <Ellipsis className="size-5" />
        </button>
      </div>

      <section className="rounded-[32px] border border-white/80 bg-white/65 p-2 shadow-[0_12px_34px_rgba(215,188,98,0.16)] backdrop-blur-md">
        <div className="grid grid-cols-2 gap-2">
          {[
            { key: "paste", label: "粘贴链接" },
            { key: "share", label: "分享直达" },
          ].map((mode) => (
            <button
              key={mode.key}
              type="button"
              onClick={() => setAddMode(mode.key as "paste" | "share")}
              className={`rounded-[22px] px-4 py-3 text-sm font-semibold transition ${
                addMode === mode.key
                  ? "bg-[#2d2419] text-white shadow-[0_14px_24px_rgba(58,38,17,0.18)]"
                  : "bg-white/65 text-stone-600"
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-[32px] border border-white/80 bg-white/78 p-4 shadow-[0_14px_38px_rgba(215,188,98,0.16)]">
        <div className="rounded-[24px] border border-[#f2e2ce] bg-[#fffdfa] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
          <div className="mb-3 flex items-center gap-2 text-stone-600">
            <Link2 className="size-4" />
            <span className="text-sm font-medium">{addMode === "paste" ? "把链接贴进来" : "分享进来的链接"}</span>
          </div>
          <textarea
            value={inputUrl}
            onChange={(event) => setInputUrl(event.target.value)}
            placeholder={
              addMode === "paste"
                ? "例如 https://www.xiaohongshu.com/... 或 https://www.bilibili.com/..."
                : "如果从别处分享进来，这里会自动带入链接"
            }
            className="min-h-28 w-full resize-none bg-transparent text-sm leading-7 text-stone-700 outline-none placeholder:text-stone-400"
          />
          <div className="mt-4 flex items-center justify-between gap-4">
            <p className="text-xs leading-5 text-stone-400">
              AI 会自动帮你总结重点，并判断这条灵感未来值不值得继续追。
            </p>
            <button
              type="button"
              onClick={onAnalyze}
              disabled={isAnalyzing}
              className="rounded-full bg-[#7bc96f] px-5 py-2.5 text-sm font-semibold text-[#1f3119] shadow-[0_12px_24px_rgba(123,201,111,0.3)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isAnalyzing ? "生成中..." : "开始整理"}
            </button>
          </div>
        </div>
      </section>

      <AnimatePresence mode="wait">
        {isAnalyzing && (
          <motion.section
            key="loading"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="overflow-hidden rounded-[32px] border border-white/80 bg-white/72 p-4 shadow-[0_14px_38px_rgba(215,188,98,0.16)]"
          >
            <div className="rounded-[26px] border border-white/70 bg-[linear-gradient(135deg,rgba(242,226,255,0.88),rgba(255,244,219,0.82))] p-5">
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-full bg-white/80">
                  <Sparkles className="size-5 text-[#8366db]" />
                </div>
                <div>
                  <p className="text-base font-semibold text-stone-900">AI 正在整理这条灵感</p>
                  <p className="text-sm text-stone-500">提取重点、判断方向、生成关键词</p>
                </div>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/70">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "220%" }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.4, ease: "easeInOut" }}
                  className="h-full w-1/3 rounded-full bg-[#886fdf]"
                />
              </div>
            </div>
          </motion.section>
        )}

        {draft && (
          <motion.section
            key={draft.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            className="space-y-4"
          >
            <DraftPreview draft={draft} noteValue={noteValue} onWriteNote={onOpenNote} onSave={onSave} />
          </motion.section>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function DraftPreview({
  draft,
  noteValue,
  onWriteNote,
  onSave,
}: {
  draft: Inspiration;
  noteValue: string;
  onWriteNote: () => void;
  onSave: () => void;
}) {
  const theme = getThemeFromKey(draft.themeKey);

  return (
    <>
      <section
        className="overflow-hidden rounded-[34px] border border-white/80 p-4 shadow-[0_14px_38px_rgba(215,188,98,0.18)]"
        style={{ background: theme.surface }}
      >
        <div className="rounded-[28px] bg-white/64 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-stone-500">{draft.sourceName}</p>
              <p className="mt-2 text-[1.7rem] font-semibold leading-[1.08] tracking-tight text-stone-900">
                {draft.title}
              </p>
            </div>
            <button
              type="button"
              onClick={onWriteNote}
              className="rounded-full bg-white/78 p-3 text-stone-700 shadow-[0_12px_24px_rgba(255,255,255,0.4)]"
            >
              <StickyNote className="size-4" />
            </button>
          </div>

          <div className="mt-4 space-y-3">
            <div className="rounded-[24px] bg-[#2d2720] p-4 text-[#f7f2e8] shadow-[0_18px_28px_rgba(45,39,32,0.18)]">
              <p className="text-xs uppercase tracking-[0.2em] text-[#c8ba9e]">AI 总结</p>
              <p className="mt-3 text-sm leading-7">{draft.summary}</p>
            </div>

            <div className="rounded-[24px] bg-white/82 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-stone-400">未来展望</p>
              <p className="mt-3 text-sm leading-7 text-stone-700">{draft.outlook}</p>
            </div>

            <div className="rounded-[24px] bg-white/76 p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.2em] text-stone-400">我的想法</p>
                <button
                  type="button"
                  onClick={onWriteNote}
                  className="text-sm font-medium"
                  style={{ color: theme.accent }}
                >
                  {noteValue ? "继续编辑" : "写下想法"}
                </button>
              </div>
              <p className="mt-3 text-sm leading-7 text-stone-600">
                {noteValue || "先写下你此刻的判断、担心或下一步想试的东西。"}
              </p>
            </div>
          </div>
        </div>
      </section>

      <button
        type="button"
        onClick={onSave}
        className="w-full rounded-[28px] bg-[#2a2218] px-5 py-4 text-base font-semibold text-white shadow-[0_18px_30px_rgba(42,34,24,0.22)] transition hover:-translate-y-0.5"
      >
        收进我的灵感夹
      </button>
    </>
  );
}
