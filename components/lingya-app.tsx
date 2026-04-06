"use client";

import { AnimatePresence } from "framer-motion";
import { startTransition, useDeferredValue, useEffect, useState } from "react";
import { AddScreen } from "@/components/add-screen";
import { HomeScreen } from "@/components/home-screen";
import { DetailOverlay, NoteOverlay } from "@/components/overlays";
import { ProfileScreen } from "@/components/profile-screen";
import { SummaryScreen } from "@/components/summary-screen";
import { BottomNav, StatusBar } from "@/components/lingya-ui";
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

  const [activeTab, setActiveTab] = useState<TabKey>(initialSharedUrl ? "add" : "home");
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
  const deferredQuery = useDeferredValue(searchQuery);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(inspirations));
  }, [inspirations]);

  const visibleInspirations = inspirations.filter((item) => {
    const haystack = [
      item.title,
      item.sourceName,
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

  function switchTab(tab: TabKey) {
    startTransition(() => {
      setActiveTab(tab);
      if (tab !== "add") {
        setDraft(null);
        setInputUrl("");
        setIsAnalyzing(false);
      }
    });
  }

  function beginAddFlow(mode: AddMode) {
    startTransition(() => {
      setAddMode(mode);
      setDraft(null);
      setInputUrl("");
      setIsAnalyzing(false);
      setActiveTab("add");
    });
  }

  function handleAnalyze() {
    const sourceUrl =
      inputUrl.trim() ||
      (addMode === "share"
        ? "https://www.xiaohongshu.com/explore/demo-share-link"
        : "https://www.figma.com/community/file/demo-link");

    setDraft(null);
    setIsAnalyzing(true);

    window.setTimeout(() => {
      setDraft(buildMockInsight(sourceUrl));
      setNoteValue("");
      setIsAnalyzing(false);
    }, 1350);
  }

  function openDetail(item: Inspiration) {
    setSelectedId(item.id);
    setNoteValue(item.notes);
    setDetailOpen(true);
  }

  function openNoteModal() {
    setNoteValue(draft?.notes ?? selectedInspiration?.notes ?? "");
    setNoteOpen(true);
  }

  function saveDraft() {
    if (!draft) return;

    const theme = draft.themeKey || pickRandomTheme().key;
    const item = { ...draft, themeKey: theme, notes: noteValue.trim() };
    setInspirations([item, ...inspirations]);
    setSelectedId(item.id);
    setNoteOpen(false);
    setDraft(null);
    setInputUrl("");
    setDetailOpen(true);
    startTransition(() => setActiveTab("home"));
  }

  function saveExistingNote() {
    if (!selectedInspiration) return;
    setInspirations(
      inspirations.map((item) =>
        item.id === selectedInspiration.id ? { ...item, notes: noteValue.trim() } : item,
      ),
    );
    setNoteOpen(false);
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,244,189,0.7),_transparent_42%),linear-gradient(180deg,#fff6db_0%,#fff8ee_58%,#fff6dc_100%)] px-4 py-6 text-stone-800">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-[430px] flex-col overflow-hidden rounded-[36px] border border-white/60 bg-[rgba(255,250,239,0.72)] shadow-[0_24px_80px_rgba(215,180,85,0.22)] backdrop-blur-xl">
        <StatusBar />
        <div className="relative flex-1 overflow-hidden px-5 pb-28">
          <div className="pointer-events-none absolute inset-x-8 top-3 h-44 rounded-full bg-[radial-gradient(circle,_rgba(255,235,145,0.6),_transparent_66%)] blur-2xl" />

          <AnimatePresence mode="wait">
            {activeTab === "home" && (
              <HomeScreen
                inspirations={visibleInspirations}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onOpenDetail={openDetail}
                onOpenSummary={() => switchTab("summary")}
                onOpenAdd={() => beginAddFlow("paste")}
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
                noteValue={noteValue}
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

          <BottomNav activeTab={activeTab} onChange={switchTab} onAdd={() => beginAddFlow("paste")} />
        </div>
      </div>

      <DetailOverlay
        open={detailOpen}
        inspiration={selectedInspiration}
        onClose={() => setDetailOpen(false)}
        onWriteNote={openNoteModal}
      />

      <NoteOverlay
        open={noteOpen}
        theme={noteTheme}
        value={noteValue}
        onChange={setNoteValue}
        onClose={() => setNoteOpen(false)}
        onSave={draft ? saveDraft : saveExistingNote}
        title={draft ? "写下你现在的想法" : "补一条自己的理解"}
        subtitle={draft ? "把这条灵感真正收进你的判断里" : "让这条收藏变成你自己的判断"}
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
