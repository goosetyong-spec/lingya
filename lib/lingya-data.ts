export type SourceType = "帖子" | "视频" | "网页" | "教程";

export type CardTheme = {
  key: string;
  surface: string;
  glow: string;
  accent: string;
  pill: string;
  ink: string;
};

export type Inspiration = {
  id: string;
  title: string;
  sourceType: SourceType;
  sourceName: string;
  url: string;
  summary: string;
  outlook: string;
  keywords: string[];
  notes: string;
  createdAt: string;
  themeKey: string;
};

export type AddMode = "paste" | "share";

export const cardThemes: CardTheme[] = [
  {
    key: "sage",
    surface:
      "linear-gradient(135deg, rgba(216, 245, 204, 0.96), rgba(244, 249, 223, 0.94))",
    glow: "rgba(165, 223, 151, 0.38)",
    accent: "#7BC96F",
    pill: "rgba(243, 249, 236, 0.92)",
    ink: "#243126",
  },
  {
    key: "peach",
    surface:
      "linear-gradient(135deg, rgba(255, 228, 206, 0.96), rgba(255, 245, 228, 0.94))",
    glow: "rgba(255, 193, 154, 0.34)",
    accent: "#F29A5B",
    pill: "rgba(255, 248, 240, 0.92)",
    ink: "#39261A",
  },
  {
    key: "mist",
    surface:
      "linear-gradient(135deg, rgba(218, 237, 238, 0.96), rgba(239, 248, 244, 0.94))",
    glow: "rgba(150, 203, 202, 0.3)",
    accent: "#5FA8A6",
    pill: "rgba(241, 248, 247, 0.92)",
    ink: "#243236",
  },
  {
    key: "lavender",
    surface:
      "linear-gradient(135deg, rgba(235, 225, 252, 0.96), rgba(246, 239, 255, 0.94))",
    glow: "rgba(189, 169, 232, 0.32)",
    accent: "#8C74D9",
    pill: "rgba(246, 241, 255, 0.92)",
    ink: "#2C2440",
  },
  {
    key: "butter",
    surface:
      "linear-gradient(135deg, rgba(249, 238, 185, 0.96), rgba(254, 248, 221, 0.94))",
    glow: "rgba(233, 205, 108, 0.26)",
    accent: "#C6A43F",
    pill: "rgba(253, 250, 236, 0.94)",
    ink: "#3C321A",
  },
];

export function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function getThemeFromKey(themeKey: string) {
  return cardThemes.find((theme) => theme.key === themeKey) ?? cardThemes[0];
}

export function pickRandomTheme(exclude?: string) {
  const themes = exclude
    ? cardThemes.filter((theme) => theme.key !== exclude)
    : cardThemes;

  return themes[Math.floor(Math.random() * themes.length)] ?? cardThemes[0];
}

function inferSourceType(url: string): SourceType {
  if (url.includes("bilibili") || url.includes("youtube") || url.includes("douyin")) {
    return "视频";
  }

  if (url.includes("xiaohongshu") || url.includes("weibo") || url.includes("x.com")) {
    return "帖子";
  }

  if (url.includes("figma") || url.includes("medium") || url.includes("notion")) {
    return "教程";
  }

  return "网页";
}

function inferSourceName(url: string) {
  try {
    const { hostname } = new URL(url);
    return hostname.replace("www.", "");
  } catch {
    return "灵感来源";
  }
}

export function buildMockInsight(url: string, themeKey?: string): Inspiration {
  const domain = inferSourceName(url);
  const sourceType = inferSourceType(url);
  const theme = pickRandomTheme(themeKey);

  return {
    id: createId(),
    title:
      sourceType === "视频"
        ? "把碎片教程转成可执行的设计方法"
        : sourceType === "教程"
          ? "从收藏教程里提炼自己的界面判断"
          : "值得反复回看的灵感拆解",
    sourceType,
    sourceName: domain,
    url,
    summary:
      "这条内容最有价值的部分不是单个技巧，而是它把信息组织方式、节奏安排和视觉判断放在了一起，适合之后继续拆成自己的工作流。",
    outlook:
      "如果你之后准备做界面、内容产品或个人项目，这条灵感值得保留。建议下一步把其中 1 个可复用方法写成自己的笔记模板，而不是只停留在收藏。",
    keywords:
      sourceType === "视频"
        ? ["vibe coding", "教程", "节奏", "拆解"]
        : sourceType === "教程"
          ? ["原型", "教程", "界面", "方法"]
          : ["收藏", "思路", "沉淀", "灵感"],
    notes: "",
    createdAt: new Date().toISOString(),
    themeKey: theme.key,
  };
}

export const seedInspirations: Inspiration[] = [
  {
    id: "seed-1",
    title: "把教程收藏变成自己的判断体系",
    sourceType: "教程",
    sourceName: "figma.com",
    url: "https://www.figma.com/community/file/example",
    summary:
      "这条教程的亮点在于把界面层级、留白和情绪感讲得很具体，适合作为你之后做产品首页时的参考底稿。",
    outlook:
      "很适合进一步沉淀成自己的首页检查清单，未来可以直接拿来评估灵芽里的核心页面。",
    keywords: ["界面", "原型", "教程", "首页"],
    notes: "我喜欢它处理卡片层级的方式，之后可以试着总结成自己的 3 条标准。",
    createdAt: "2026-04-04T09:32:00.000Z",
    themeKey: "sage",
  },
  {
    id: "seed-2",
    title: "Vibe coding 的核心不是快，而是先抓对骨架",
    sourceType: "视频",
    sourceName: "bilibili.com",
    url: "https://www.bilibili.com/video/example",
    summary:
      "视频里最值得记住的是先确定页面结构和状态流，再去补动效和细节，这会比直接堆提示词更可靠。",
    outlook:
      "如果你要继续做灵芽的线上版本，这条内容能帮你在‘设计感’和‘可实现性’之间更稳地取舍。",
    keywords: ["vibe coding", "编码", "结构", "状态"],
    notes: "",
    createdAt: "2026-04-02T13:18:00.000Z",
    themeKey: "lavender",
  },
  {
    id: "seed-3",
    title: "把产品灵感做成档案感，比普通收藏更有记忆点",
    sourceType: "帖子",
    sourceName: "xiaohongshu.com",
    url: "https://www.xiaohongshu.com/explore/example",
    summary:
      "这条帖子提醒你，收藏型产品不一定要像数据库，也可以像档案夹，让用户觉得自己在认真保存判断和痕迹。",
    outlook:
      "适合继续往灵芽详情页、笔记弹窗和月度总结里延展，形成统一的视觉叙事。",
    keywords: ["档案感", "视觉", "收藏", "叙事"],
    notes: "这个方向和灵芽特别搭。",
    createdAt: "2026-03-29T21:08:00.000Z",
    themeKey: "peach",
  },
];

export function collectTopKeywords(items: Inspiration[]) {
  const map = new Map<string, number>();

  for (const item of items) {
    for (const keyword of item.keywords) {
      map.set(keyword, (map.get(keyword) ?? 0) + 1);
    }
  }

  return [...map.entries()]
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);
}

export function collectContentStats(items: Inspiration[]) {
  const counts = {
    视频: 0,
    帖子: 0,
    教程: 0,
  };

  for (const item of items) {
    if (item.sourceType === "视频") counts.视频 += 1;
    else if (item.sourceType === "帖子") counts.帖子 += 1;
    else counts.教程 += 1;
  }

  return Object.entries(counts).map(([type, count]) => ({ type, count }));
}

export function collectGrowthThemes(items: Inspiration[]) {
  const keywords = collectTopKeywords(items);
  const fallback = [
    { label: "运营", count: 5 },
    { label: "绘画", count: 8 },
    { label: "编码", count: 12 },
    { label: "UI", count: 6 },
  ];

  if (keywords.length < 4) return fallback;

  return keywords.slice(0, 4).map((item, index) => ({
    label: item.label,
    count: item.count + [4, 3, 2, 1][index],
  }));
}
