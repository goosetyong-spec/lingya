export type SourceType = "帖子" | "视频" | "网页" | "教程";

export type CardTheme = {
  key: string;
  surface: string;
  panel: string;
  accent: string;
  badge: string;
  ink: string;
  deepInk: string;
};

export type Inspiration = {
  id: string;
  title: string;
  sourceType: SourceType;
  sourceName: string;
  sourceTitle: string;
  sourceDescription: string;
  thumbnailUrl: string;
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
    key: "lavender",
    surface:
      "linear-gradient(174deg, rgba(206, 189, 255, 0.98) 14%, rgba(244, 238, 255, 0.95) 88%)",
    panel: "rgba(255, 250, 245, 0.9)",
    accent: "#6e54c8",
    badge: "rgba(255, 255, 255, 0.5)",
    ink: "#4a4a4a",
    deepInk: "#312552",
  },
  {
    key: "navy",
    surface:
      "linear-gradient(175deg, rgba(23, 63, 108, 0.98) 14%, rgba(183, 205, 219, 0.92) 100%)",
    panel: "rgba(255, 255, 255, 0.18)",
    accent: "#224f82",
    badge: "rgba(255, 255, 255, 0.18)",
    ink: "#eef4f6",
    deepInk: "#ffffff",
  },
  {
    key: "peach",
    surface:
      "linear-gradient(171deg, rgba(255, 214, 196, 0.98) 18%, rgba(255, 245, 238, 0.94) 90%)",
    panel: "rgba(255, 255, 255, 0.82)",
    accent: "#b86e53",
    badge: "rgba(255, 255, 255, 0.56)",
    ink: "#4b3f34",
    deepInk: "#4b2f34",
  },
  {
    key: "mist",
    surface:
      "linear-gradient(155deg, rgba(189, 222, 199, 0.98) 14%, rgba(232, 243, 255, 0.94) 100%)",
    panel: "rgba(255, 255, 255, 0.86)",
    accent: "#5b8d76",
    badge: "rgba(255, 255, 255, 0.58)",
    ink: "#365548",
    deepInk: "#314a40",
  },
];

export function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function getThemeFromKey(themeKey: string) {
  return cardThemes.find((theme) => theme.key === themeKey) ?? cardThemes[0];
}

export function pickRandomTheme(exclude?: string) {
  const candidates = exclude ? cardThemes.filter((theme) => theme.key !== exclude) : cardThemes;
  return candidates[Math.floor(Math.random() * candidates.length)] ?? cardThemes[0];
}

export function inferSourceType(url: string): SourceType {
  const normalized = url.toLowerCase();

  if (
    normalized.includes("bilibili") ||
    normalized.includes("youtube") ||
    normalized.includes("youtu.be") ||
    normalized.includes("douyin")
  ) {
    return "视频";
  }

  if (
    normalized.includes("xiaohongshu") ||
    normalized.includes("xhslink") ||
    normalized.includes("weibo") ||
    normalized.includes("twitter") ||
    normalized.includes("x.com")
  ) {
    return "帖子";
  }

  if (
    normalized.includes("figma") ||
    normalized.includes("notion") ||
    normalized.includes("medium") ||
    normalized.includes("substack")
  ) {
    return "教程";
  }

  return "网页";
}

export function inferSourceName(url: string) {
  try {
    const { hostname } = new URL(url);
    return hostname.replace(/^www\./, "");
  } catch {
    return "灵感来源";
  }
}

export function buildMockInsight(
  url: string,
  options?: {
    themeKey?: string;
    title?: string;
    sourceName?: string;
    description?: string;
    thumbnailUrl?: string;
  },
): Inspiration {
  const sourceType = inferSourceType(url);
  const theme = pickRandomTheme(options?.themeKey);
  const sourceName = options?.sourceName || inferSourceName(url);
  const sourceTitle = options?.title || mockSourceTitle(sourceType);
  const sourceDescription =
    options?.description ||
    "这是先基于链接元信息生成的一版预览，你后面接入更完整的内容抓取后，分析会更像真正的 AI 阅读结果。";

  return {
    id: createId(),
    title: mockCardTitle(sourceType),
    sourceType,
    sourceName,
    sourceTitle,
    sourceDescription,
    thumbnailUrl: options?.thumbnailUrl || "",
    url,
    summary: mockSummary(sourceType),
    outlook: mockOutlook(sourceType),
    keywords: mockKeywords(sourceType),
    notes: "",
    createdAt: new Date().toISOString(),
    themeKey: theme.key,
  };
}

function mockCardTitle(sourceType: SourceType) {
  if (sourceType === "视频") return "把碎片教程收成自己的方法库";
  if (sourceType === "教程") return "从教程里提炼能反复复用的判断";
  if (sourceType === "帖子") return "这条帖子里藏着一个值得留下的思路";
  return "先收进灵感夹，再决定值不值得深挖";
}

function mockSourceTitle(sourceType: SourceType) {
  if (sourceType === "视频") return "设计/开发相关视频内容";
  if (sourceType === "教程") return "教程或案例拆解";
  if (sourceType === "帖子") return "社交平台里的灵感帖子";
  return "值得稍后回看的网页内容";
}

function mockSummary(sourceType: SourceType) {
  if (sourceType === "视频") {
    return "这条内容最值得留下来的不是某个单独技巧，而是它如何把零散步骤整理成能直接照着走的执行节奏。你之后回看时，可以重点抓“结构、顺序、落地感”这三个层面。";
  }

  if (sourceType === "教程") {
    return "这条教程更像一个完整思路，而不只是好看的结果展示。它提供了一种从参考到转化的方式，适合慢慢沉淀成你自己的设计判断或项目做法。";
  }

  if (sourceType === "帖子") {
    return "这条帖子之所以值得收，不是因为它一句话点醒你，而是它把一个模糊灵感说成了可继续延展的方向。适合以后拿出来和你自己的项目场景对照。";
  }

  return "这条网页内容目前先提供了一层方向感，值得先收藏后回看。等你补上自己的想法，它就会从“看过”变成真正属于你的判断。";
}

function mockOutlook(sourceType: SourceType) {
  if (sourceType === "视频") {
    return "建议先把其中一个最想复用的步骤记下来，下次做相关内容时直接试一遍。只要它能帮你缩短思考路径，这条灵感就值得继续留。";
  }

  if (sourceType === "教程") {
    return "它比较适合沉淀成“以后做类似页面时先检查什么”的清单，而不是一次性消费完。这样你后面再回看，会更有复用价值。";
  }

  if (sourceType === "帖子") {
    return "这条灵感更像一个起点，适合你先收好，再决定是否展开成自己的笔记、方向判断，甚至某个可尝试的小项目。";
  }

  return "先把它收进档案里是值得的，下一步关键是补上你自己的想法，判断它是不是只是“好看”，还是对你真的有用。";
}

function mockKeywords(sourceType: SourceType) {
  if (sourceType === "视频") return ["vibe coding", "教程", "拆解", "流程"];
  if (sourceType === "教程") return ["原型", "界面", "方法", "设计"];
  if (sourceType === "帖子") return ["收藏", "灵感", "思路", "判断"];
  return ["网页", "灵感", "总结", "记录"];
}

export const seedInspirations: Inspiration[] = [
  {
    id: "seed-1",
    title: "交互设计原理",
    sourceType: "教程",
    sourceName: "figma.com",
    sourceTitle: "交互设计课程笔记与底层逻辑",
    sourceDescription: "一条关于交互设计底层方法的教程内容，适合整理成自己的判断体系。",
    thumbnailUrl: "",
    url: "https://www.figma.com/community/file/example",
    summary:
      "交互设计不只关乎界面的好看，更关乎使用的流畅。它真正值得留下来的地方，是让用户可以凭直觉完成任务，而不是一直被界面教育。",
    outlook:
      "这条内容很适合以后拿来反复检查自己的产品页面，尤其适合作为首页、详情页和流程设计时的判断标准。",
    keywords: ["基础原理", "交互", "流程"],
    notes: "我想把这种“像档案夹一样的层次感”继续留在灵芽里。",
    createdAt: "2026-04-04T09:32:00.000Z",
    themeKey: "lavender",
  },
  {
    id: "seed-2",
    title: "色彩心理学",
    sourceType: "视频",
    sourceName: "bilibili.com",
    sourceTitle: "色彩与品牌感知的案例分析",
    sourceDescription: "冷色和暖色如何影响用户感知，以及品牌场景里的具体选择。",
    thumbnailUrl: "",
    url: "https://www.bilibili.com/video/example",
    summary:
      "冷色带给人宁静和科技感，暖色则更有活力和情绪张力。对产品来说，颜色不是装饰，而是品牌和使用感知的一部分。",
    outlook:
      "之后你做灵芽的页面或品牌延展时，可以继续沿着“情绪感知”和“信息层级”两条线去判断，而不是只看颜色漂不漂亮。",
    keywords: ["颜色搭配", "情绪", "品牌"],
    notes: "",
    createdAt: "2026-04-02T13:18:00.000Z",
    themeKey: "navy",
  },
  {
    id: "seed-3",
    title: "时间管理心得",
    sourceType: "帖子",
    sourceName: "xiaohongshu.com",
    sourceTitle: "关于精力管理的个人经验帖",
    sourceDescription: "围绕 MIT、节奏感和优先级的分享内容。",
    thumbnailUrl: "",
    url: "https://www.xiaohongshu.com/explore/example",
    summary:
      "每天睡前先写下第二天最重要的三件事，比把行程排满更重要。真正有效的是先照顾精力，再安排任务。",
    outlook:
      "这类内容适合以后反复回看，因为它更像做事方式，而不是一次性技巧。你完全可以把它转成自己的工作习惯清单。",
    keywords: ["效率提升", "精力", "习惯"],
    notes: "",
    createdAt: "2026-03-29T21:08:00.000Z",
    themeKey: "peach",
  },
];

export function collectTopKeywords(items: Inspiration[]) {
  const counts = new Map<string, number>();

  for (const item of items) {
    for (const keyword of item.keywords) {
      counts.set(keyword, (counts.get(keyword) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);
}

export function collectContentStats(items: Inspiration[]) {
  const counts = {
    帖子: 0,
    视频: 0,
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
