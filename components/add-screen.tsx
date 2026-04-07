"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Inspiration, getThemeFromKey } from "@/lib/lingya-data";

export function AddScreen({
  addMode,
  setAddMode,
  inputUrl,
  setInputUrl,
  isAnalyzing,
  draft,
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
  onBack: () => void;
  onAnalyze: () => void;
  onOpenNote: () => void;
  onSave: () => void;
}) {
  const isReady = Boolean(inputUrl.trim()) || addMode === "share";

  return (
    <motion.div
      key={`add-${addMode}`}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.35 }}
      className="relative z-10 flex h-full flex-col pt-6"
    >
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onBack}
          className="flex size-[30px] items-center justify-center rounded-full bg-[#6b1a3a] text-white"
          aria-label="关闭新增灵感"
        >
          <X className="size-4" />
        </button>
        <p className="flex-1 text-[18px] font-bold text-[#1e1a17]">
          {addMode === "paste" ? "新增灵感" : "分享进来的灵感"}
        </p>
        <button
          type="button"
          onClick={draft ? onSave : onAnalyze}
          disabled={!draft && !isReady}
          className="text-[16px] font-medium text-[#6b1a3a] disabled:opacity-35"
        >
          {draft ? "保存" : addMode === "paste" ? "继续" : "保存"}
        </button>
      </div>

      <p className="mt-1 text-center text-[10px] tracking-[0.22em] text-[rgba(122,97,66,0.5)]">
        {addMode === "paste" ? "COLLECT A NEW IDEA" : "SHARED TO ARCHIVE"}
      </p>

      {!draft ? (
        <>
          <AnimatePresence mode="wait">
            {addMode === "paste" ? (
              <PasteMode
                key="paste"
                inputUrl={inputUrl}
                setInputUrl={setInputUrl}
                isAnalyzing={isAnalyzing}
                onAnalyze={onAnalyze}
                onSwitch={() => setAddMode("share")}
              />
            ) : (
              <ShareMode
                key="share"
                inputUrl={inputUrl}
                isAnalyzing={isAnalyzing}
                onAnalyze={onAnalyze}
                onSwitch={() => setAddMode("paste")}
              />
            )}
          </AnimatePresence>

          <button
            type="button"
            onClick={onOpenNote}
            className="mt-auto flex h-[62px] items-center justify-between rounded-[20px] border border-white/60 bg-white/82 px-5 shadow-[0_10px_18px_rgba(61,41,20,0.08)]"
          >
            <span className="text-[16px] font-medium text-[#3c2e61]">🗒️ 写下我的想法</span>
            <span className="text-[11px] tracking-[0.15em] text-[rgba(125,89,196,0.88)]">
              SAVE A THOUGHT
            </span>
          </button>
        </>
      ) : (
        <DraftResult draft={draft} onOpenNote={onOpenNote} onSave={onSave} />
      )}
    </motion.div>
  );
}

function PasteMode({
  inputUrl,
  setInputUrl,
  isAnalyzing,
  onAnalyze,
  onSwitch,
}: {
  inputUrl: string;
  setInputUrl: (value: string) => void;
  isAnalyzing: boolean;
  onAnalyze: () => void;
  onSwitch: () => void;
}) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 space-y-4">
      <InfoCard
        accentClass="from-[#f7bbb7] to-[#ffd1b0]"
        eyebrow="STEP 1  PASTE A LINK"
        title="把帖子或视频链接贴进来"
        description="AI 会先帮你抓重点和前景"
        footnote="粘贴 bilibili / 小红书 / 抖音 / 网页链接"
      >
        <textarea
          value={inputUrl}
          onChange={(event) => setInputUrl(event.target.value)}
          placeholder="https://"
          className="h-12 w-full resize-none rounded-[16px] border border-[#ede8fa] bg-white/92 px-4 py-[14px] text-[14px] text-[#7b72a3] outline-none placeholder:text-[#ada3c7]"
        />
      </InfoCard>

      <ActionCard
        title="AI 会生成什么"
        eyebrow="PREVIEW"
        body={[
          "自动提炼这条内容的核心观点",
          "帮你判断它为什么值得留下",
          "给一个未来展望，方便你决定要不要继续深挖",
        ]}
        buttonLabel={isAnalyzing ? "AI 正在生成..." : "粘贴后开始生成"}
        onClick={onAnalyze}
        loading={isAnalyzing}
      />

      <OutlookCard>
        贴入后，AI 会继续补上“为什么值得留”和“未来可能怎么用”，再决定要不要写下自己的判断。
      </OutlookCard>

      <button type="button" onClick={onSwitch} className="w-full text-center text-[13px] text-[#8b7a68] underline-offset-4 hover:underline">
        这是分享进来的内容？切到分享直达
      </button>
    </motion.div>
  );
}

function ShareMode({
  inputUrl,
  isAnalyzing,
  onAnalyze,
  onSwitch,
}: {
  inputUrl: string;
  isAnalyzing: boolean;
  onAnalyze: () => void;
  onSwitch: () => void;
}) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 space-y-4">
      <InfoCard
        accentClass="from-[#c9e4d0] to-[#c9dff4]"
        eyebrow="STEP 1  SHARED IN"
        title="链接已经带进来了"
        description="AI 正在帮你整理重点"
        footnote={inputUrl ? "你可以等它生成，也可以直接开始写想法" : "分享进入后，链接会自动出现在这里"}
      >
        <div className="rounded-[16px] border border-[#ede8fa] bg-white/92 px-4 py-[14px] text-[14px] text-[#4f6d60]">
          {inputUrl || "等待分享进来的链接..."}
        </div>
      </InfoCard>

      <ActionCard
        title="AI 已经开始整理"
        eyebrow="IN PROGRESS"
        body={[
          "正在提炼这条内容到底讲了什么",
          "会补上为什么它值得被你收藏",
          "还会给一个可继续延展的方向，方便你之后写笔记",
        ]}
        buttonLabel={isAnalyzing ? "AI 生成中，你也可以先写" : "立即开始整理"}
        onClick={onAnalyze}
        loading={isAnalyzing}
        showProgress
      />

      <OutlookCard>
        分享进来后，它会先完成摘要与展望；你只需要补上自己的理解，这条灵感就真正属于你了。
      </OutlookCard>

      <button type="button" onClick={onSwitch} className="w-full text-center text-[13px] text-[#8b7a68] underline-offset-4 hover:underline">
        想手动粘贴链接？切到粘贴模式
      </button>
    </motion.div>
  );
}

function InfoCard({
  accentClass,
  eyebrow,
  title,
  description,
  footnote,
  children,
}: {
  accentClass: string;
  eyebrow: string;
  title: string;
  description: string;
  footnote: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[24px] border border-white/60 bg-[#f7eee5] shadow-[0_14px_24px_rgba(66,46,20,0.08)]">
      <div className="flex">
        <div className={`min-h-[174px] w-20 rounded-l-[24px] bg-gradient-to-br ${accentClass}`} />
        <div className="flex min-h-[174px] flex-1 flex-col justify-between p-4">
          <div>
            <p className="text-[12px] text-[rgba(128,112,89,0.8)]">{eyebrow}</p>
            <p className="mt-3 text-[14px] font-bold leading-[21px] text-[#47375f]">{title}</p>
            <p className="text-[14px] font-bold leading-[21px] text-[#47375f]">{description}</p>
          </div>
          <p className="mt-3 text-[12px] text-[rgba(117,102,143,0.86)]">{footnote}</p>
        </div>
      </div>
      <div className="px-4 pb-4">{children}</div>
    </div>
  );
}

function ActionCard({
  title,
  eyebrow,
  body,
  buttonLabel,
  onClick,
  loading,
  showProgress,
}: {
  title: string;
  eyebrow: string;
  body: string[];
  buttonLabel: string;
  onClick: () => void;
  loading: boolean;
  showProgress?: boolean;
}) {
  return (
    <div className="rounded-[24px] bg-[linear-gradient(161deg,#f7bbb7_14%,#ffd1b0_91%)] p-5 shadow-[0_16px_24px_rgba(56,41,20,0.10)]">
      <div className="flex items-center justify-between">
        <p className="text-[16px] font-bold text-[#4b2f34]">{title}</p>
        <p className="text-[11px] tracking-[0.2em] text-[rgba(97,87,128,0.72)]">{eyebrow}</p>
      </div>

      <div className="mt-5 space-y-4 text-[14px] leading-[28px] text-[#523539]">
        {body.map((line) => (
          <p key={line}>· {line}</p>
        ))}
      </div>

      <button
        type="button"
        onClick={onClick}
        className="mt-4 flex h-[49px] w-full items-center rounded-[16px] border border-white/50 bg-white/74 px-4 text-[14px] font-medium text-[#4b2f34]"
      >
        {buttonLabel}
      </button>

      {showProgress && (
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/38">
          <motion.div
            className="h-full rounded-full bg-[linear-gradient(90deg,#bddec7,#abccf0)]"
            animate={loading ? { x: ["-100%", "140%"] } : { width: "68%", x: 0 }}
            transition={loading ? { repeat: Number.POSITIVE_INFINITY, duration: 1.4, ease: "easeInOut" } : { duration: 0.3 }}
            style={{ width: loading ? "42%" : "68%" }}
          />
        </div>
      )}
    </div>
  );
}

function OutlookCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[24px] border border-white/60 bg-[#f8eee5] p-5 shadow-[0_10px_18px_rgba(56,41,20,0.05)]">
      <p className="text-[17px] font-medium text-[#4b3f34]">生成后会看到</p>
      <p className="mt-3 text-[11px] tracking-[0.2em] text-[rgba(148,112,114,0.74)]">OUTLOOK</p>
      <p className="mt-4 text-[14px] leading-[24px] text-[rgba(75,63,52,0.92)]">{children}</p>
    </div>
  );
}

function DraftResult({
  draft,
  onOpenNote,
  onSave,
}: {
  draft: Inspiration;
  onOpenNote: () => void;
  onSave: () => void;
}) {
  const theme = getThemeFromKey(draft.themeKey);

  return (
    <div className="mt-4 flex h-full flex-col">
      <div className="flex-1 overflow-y-auto pb-4">
        <div className="rounded-[34px] border border-white/60 bg-[rgba(255,254,249,0.78)] px-3 py-6 shadow-[0_16px_28px_rgba(77,59,26,0.08)]">
          <SourceCard draft={draft} />

          <div className="relative mt-4 rounded-[24px] p-5 shadow-[0_18px_28px_rgba(46,26,77,0.18)]" style={{ background: theme.surface }}>
            <div className="flex items-center justify-between">
              <p className="text-[18px] font-bold text-[#4a4a4a]">AI 摘录卡</p>
              <p className="text-[11px] tracking-[0.2em] text-[#613c9f]">CURATED NOTES</p>
            </div>
            <p className="mt-4 whitespace-pre-line text-[14px] leading-[30px] text-[rgba(74,74,74,0.94)]">
              {draft.summary}
            </p>
          </div>

          <div className="mt-4 rounded-[24px] bg-[rgba(255,251,247,0.92)] p-5 shadow-[0_12px_20px_rgba(61,41,20,0.06)]">
            <div className="flex items-center justify-between">
              <p className="text-[20px] font-bold text-[#2d1b5e]">可行性展望</p>
              <p className="text-[11px] tracking-[0.2em] text-[rgba(123,91,196,0.8)]">OUTLOOK</p>
            </div>
            <p className="mt-4 text-[14px] leading-[27px] text-[#4a3c31]">{draft.outlook}</p>
          </div>

          <button
            type="button"
            onClick={onOpenNote}
            className="mt-4 flex h-[62px] w-full items-center justify-between rounded-[20px] border border-white/60 bg-white/82 px-5 shadow-[0_10px_18px_rgba(61,41,20,0.08)]"
          >
            <span className="text-[16px] font-bold text-[#3c2e61]">🗒️ 写下我的想法</span>
            <span className="text-[11px] tracking-[0.15em] text-[rgba(125,89,196,0.88)]">
              SAVE A THOUGHT
            </span>
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={onSave}
        className="mt-2 h-14 rounded-[20px] bg-[#2a2218] text-[16px] font-semibold text-white shadow-[0_18px_30px_rgba(42,34,24,0.22)]"
      >
        收进我的灵感夹
      </button>
    </div>
  );
}

export function SourceCard({ draft }: { draft: Inspiration }) {
  return (
    <div className="rounded-[22px] border border-white/60 bg-[rgba(255,251,247,0.88)] p-3 shadow-[0_14px_24px_rgba(61,43,20,0.07)]">
      <p className="mb-2 text-center text-[10px] tracking-[0.22em] text-[rgba(120,97,66,0.48)]">COLLECTED IDEA</p>
      <div className="flex gap-3">
        <div className="relative h-[130px] w-[120px] overflow-hidden rounded-[18px] bg-[linear-gradient(132deg,#424a73,#2e3352)]">
          {draft.thumbnailUrl ? (
            <img src={draft.thumbnailUrl} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-[30px] text-white/70">▶</div>
          )}
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex size-9 items-center justify-center rounded-full bg-white/80 text-[#6c5338]">▶</div>
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-between py-1">
          <div>
            <p className="text-[12px] text-[rgba(117,102,143,0.82)]">📎 {draft.sourceName}</p>
            <p className="mt-3 text-[14px] font-medium leading-[22px] text-[#312552]">
              {draft.sourceTitle || draft.title}
            </p>
          </div>
          <a
            href={draft.url}
            target="_blank"
            rel="noreferrer"
            className="text-[12px] text-[rgba(138,102,204,0.88)]"
          >
            点击查看原帖 ↗
          </a>
        </div>
      </div>
    </div>
  );
}
