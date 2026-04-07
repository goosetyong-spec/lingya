"use client";

import { AnimatePresence, motion } from "framer-motion";
import { startTransition, useDeferredValue, useEffect, useEffectEvent, useRef, useState } from "react";
import { AddScreen } from "@/components/add-screen";
import { HomeScreen } from "@/components/home-screen";
import { BottomNav } from "@/components/lingya-ui";
import { DetailOverlay, NoteOverlay } from "@/components/overlays";
import { ProfileScreen } from "@/components/profile-screen";
import { SplashScreen } from "@/components/splash-screen";
import { SummaryScreen } from "@/components/summary-screen";
import {
  buildMockInsight,
  collectContentStats,
  collectGrowthThemes,
  collectTopKeywords,
  getThemeFromKey,
  Inspiration,
  pickRandomTheme,
  seedInspirations,
} from "@/lib/lingya-data";

type TabKey = "home" | "summary" | "add" | "profile";
type AddMode = "paste" | "share";

const storageKey = "lingya-pwa-demo";

export function LingyaApp() {
  const initialSharedUrl =
    typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("url") : null;
  const initialInspirations =
    typeof window !== "undefined" ? readStoredInspirations() : seedInspirations;

  const [stage, setStage] = useState<"splash" | "app">("splash");
  const [activeTab, setActiveTab] = useState<TabKey>("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [inspirations, setInspirations] = useState<Inspiration[]>(initialInspirations);
  const [selectedId, setSelectedId] = useState<string | null>(initialInspirations[0]?.id ?? null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [noteOpen, setNoteOpen] = useState(false);
  const [draft, setDraft] = useState<Inspiration | null>(null);
  const [noteValue, setNoteValue] = useState("");
  const [addMode, setAddMode] = useState<AddMode>(initialSharedUrl ? "share" : "paste");
  const [inputUrl, setInputUrl] = useState(initialSharedUrl ?? "");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [lastError, setLastError] = useState("");
  const sharedBootstrapped = useRef(false);
  const deferredQuery = useDeferredValue(searchQuery);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(inspirations));
  }, [inspirations]);

  const handleAutoAnalyze = useEffectEvent(async () => {
    await analyzeInspiration();
  });

  useEffect(() => {
    if (
      stage === "app" &&
      activeTab === "add" &&
      addMode === "share" &&
      inputUrl &&
      !draft &&
      !isAnalyzing &&
      !sharedBootstrapped.current
    ) {
      sharedBootstrapped.current = true;
      void handleAutoAnalyze();
    }
  }, [stage, activeTab, addMode, inputUrl, draft, isAnalyzing]);

  const visibleInspirations = inspirations.filter((item) => {
    const haystack = [
      item.title,
      item.sourceName,
      item.sourceTitle,
      item.summary,
      item.outlook,
      item.notes,
      item.keywords.join(" "),
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(deferredQuery.trim().toLowerCase());
  });

  const selectedInspiration =
    inspirations.find((item) => item.id === selectedId) ?? inspirations[0] ?? null;
  const noteTheme = getThemeFromKey(
    draft?.themeKey ?? selectedInspiration?.themeKey ?? seedInspirations[0].themeKey,
  );

  function openNotebook() {
    startTransition(() => {
      setStage("app");
      if (initialSharedUrl) {
        setActiveTab("add");
        setAddMode("share");
        setInputUrl(initialSharedUrl);
      } else {
        setActiveTab("home");
      }
    });
  }

  function switchTab(tab: TabKey) {
    startTransition(() => {
      setActiveTab(tab);
      if (tab !== "add") {
        setDraft(null);
        setInputUrl("");
        setIsAnalyzing(false);
        setLastError("");
      }
    });
  }

  function beginAddFlow(mode: AddMode) {
    startTransition(() => {
      setActiveTab("add");
      setAddMode(mode);
      setDraft(null);
      setInputUrl(mode === "share" ? initialSharedUrl ?? "" : "");
      setIsAnalyzing(false);
      setLastError("");
      sharedBootstrapped.current = mode === "share" && Boolean(initialSharedUrl);
    });
  }

  function handleAnalyze() {
    void analyzeInspiration();
  }

  async function analyzeInspiration() {
    const sourceUrl =
      inputUrl.trim() ||
      (addMode === "share"
        ? "https://www.xiaohongshu.com/explore/demo-share-link"
        : "https://www.figma.com/community/file/demo-link");

    setDraft(null);
    setIsAnalyzing(true);
    setLastError("");

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: sourceUrl,
          mode: addMode,
        }),
      });

      if (!response.ok) {
        throw new Error(`Analyze request failed: ${response.status}`);
      }

      const result = (await response.json()) as {
        data?: Inspiration;
        fallbackReason?: string;
      };

      const nextDraft = result.data ?? buildMockInsight(sourceUrl);
      const theme = pickRandomTheme(selectedInspiration?.themeKey).key;
      setDraft({ ...nextDraft, themeKey: nextDraft.themeKey || theme });
      setNoteValue("");
      setLastError(result.fallbackReason ?? "");
    } catch (error) {
      console.error("client-analyze-error", error);
      const fallback = buildMockInsight(sourceUrl, {
        themeKey: pickRandomTheme(selectedInspiration?.themeKey).key,
      });
      setDraft(fallback);
      setNoteValue("");
      setLastError("AI 暂时没有读到完整内容，先生成了一版预览。");
    } finally {
      setIsAnalyzing(false);
    }
  }

  function openDetail(item: Inspiration) {
    setSelectedId(item.id);
    setNoteValue(item.notes);
    setDetailOpen(true);
  }

  function openNoteModal() {
    if (activeTab === "add" && !draft) {
      setNoteValue("");
    } else {
      setNoteValue(draft?.notes ?? selectedInspiration?.notes ?? "");
    }
    setNoteOpen(true);
  }

  function saveDraft() {
    if (!draft) return;

    const item = { ...draft, notes: noteValue.trim() };
    setInspirations((current) => [item, ...current]);
    setSelectedId(item.id);
    setNoteOpen(false);
    setDraft(null);
    setInputUrl("");
    setDetailOpen(true);
    startTransition(() => setActiveTab("home"));
  }

  function saveExistingNote() {
    if (!selectedInspiration) return;

    setInspirations((current) =>
      current.map((item) =>
        item.id === selectedInspiration.id ? { ...item, notes: noteValue.trim() } : item,
      ),
    );
    setNoteOpen(false);
  }

  function savePendingNote() {
    setNoteOpen(false);
  }

  async function shareInspiration(item: Inspiration) {
    const shareData = {
      title: item.title,
      text: `${item.title}\n${item.summary}`,
      url: item.url,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }

      await navigator.clipboard.writeText(item.url);
    } catch (error) {
      console.error("share-inspiration-error", error);
    }
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,244,189,0.7),_transparent_42%),linear-gradient(180deg,#fff6db_0%,#fff8ee_58%,#fff6dc_100%)] px-4 py-6 text-stone-800">
      <div className="mx-auto flex h-[calc(100vh-3rem)] min-h-[760px] max-h-[844px] w-full max-w-[430px] flex-col overflow-hidden rounded-[36px] border border-white/60 bg-[rgba(255,250,239,0.72)] shadow-[0_24px_80px_rgba(215,180,85,0.22)] backdrop-blur-xl">
        <div className="relative flex-1 overflow-hidden px-5 pb-24">
          <div className="pointer-events-none absolute inset-x-8 top-3 h-44 rounded-full bg-[radial-gradient(circle,_rgba(255,235,145,0.6),_transparent_66%)] blur-2xl" />

          <AnimatePresence mode="wait">
            {stage === "splash" ? (
              <SplashScreen key="splash-screen" onOpen={openNotebook} />
            ) : (
              <motion.div
                key="app-stage"
                initial={false}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative h-full"
              >
                <AnimatePresence mode="wait">
                  {activeTab === "home" && (
                    <HomeScreen
                      inspirations={visibleInspirations}
                      searchQuery={searchQuery}
                      setSearchQuery={setSearchQuery}
                      onOpenDetail={openDetail}
                      onOpenSummary={() => switchTab("summary")}
                      onOpenAdd={() => beginAddFlow("paste")}
                      onShare={shareInspiration}
                    />
                  )}

                  {activeTab === "add" && (
                    <AddScreen
                      addMode={addMode}
                      setAddMode={setAddMode}
                      inputUrl={inputUrl}
                      setInputUrl={setInputUrl}
                      isAnalyzing={isAnalyzing}
                      draft={draft}
                      onBack={() => switchTab("home")}
                      onAnalyze={handleAnalyze}
                      onOpenNote={openNoteModal}
                      onSave={saveDraft}
                    />
                  )}

                  {activeTab === "summary" && (
                    <SummaryScreen
                      highlightedKeywords={collectTopKeywords(inspirations)}
                      contentStats={collectContentStats(inspirations)}
                      summaryThemes={collectGrowthThemes(inspirations)}
                      totalCount={inspirations.length}
                    />
                  )}

                  {activeTab === "profile" && (
                    <ProfileScreen inspirations={inspirations} onOpenSummary={() => switchTab("summary")} />
                  )}
                </AnimatePresence>

                {lastError && activeTab === "add" && (
                  <div className="absolute inset-x-0 bottom-24 z-20 rounded-[16px] border border-white/60 bg-[rgba(255,251,247,0.82)] px-4 py-3 text-[12px] leading-5 text-[#7f6456] shadow-[0_10px_16px_rgba(61,41,20,0.08)]">
                    {lastError}
                  </div>
                )}

                <BottomNav activeTab={activeTab} onChange={switchTab} onAdd={() => beginAddFlow("paste")} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <DetailOverlay
        open={detailOpen}
        inspiration={selectedInspiration}
        onClose={() => setDetailOpen(false)}
        onWriteNote={openNoteModal}
        onShare={shareInspiration}
      />

      <NoteOverlay
        open={noteOpen}
        theme={noteTheme}
        value={noteValue}
        onChange={setNoteValue}
        onClose={() => setNoteOpen(false)}
        onSave={draft ? saveDraft : activeTab === "add" ? savePendingNote : saveExistingNote}
        title={draft ? "写下你现在的想法" : "补一条自己的理解"}
        subtitle={
          draft
            ? "把这条灵感真正收进你的判断里。"
            : "让这条收藏慢慢长成你自己的理解，而不是只停留在看过。"
        }
      />
    </main>
  );
}

function readStoredInspirations() {
  const raw = window.localStorage.getItem(storageKey);
  if (!raw) return seedInspirations;

  try {
    const parsed = JSON.parse(raw) as Inspiration[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : seedInspirations;
  } catch {
    window.localStorage.removeItem(storageKey);
    return seedInspirations;
  }
}
