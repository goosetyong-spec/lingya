import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import {
  buildMockInsight,
  createId,
  inferSourceName,
  inferSourceType,
  type AddMode,
  type Inspiration,
  type SourceType,
} from "@/lib/lingya-data";

const defaultModel = process.env.OPENAI_MODEL || "gpt-4.1-mini";

type AnalyzePayload = {
  url?: string;
  mode?: AddMode;
};

type MetadataSnapshot = {
  title: string;
  description: string;
  siteName: string;
  image: string;
  textSnippet: string;
};

type AiInsightPayload = {
  title: string;
  sourceType: SourceType;
  sourceName: string;
  sourceTitle: string;
  sourceDescription: string;
  summary: string;
  outlook: string;
  keywords: string[];
};

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => ({}))) as AnalyzePayload;
  const url = body.url?.trim();

  if (!url) {
    return NextResponse.json({ error: "缺少链接地址" }, { status: 400 });
  }

  if (!isValidUrl(url)) {
    return NextResponse.json({ error: "链接格式不正确" }, { status: 400 });
  }

  const metadata = await fetchPageMetadata(url);

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({
      mode: "mock",
      data: buildMockInsight(url, {
        title: metadata.title,
        sourceName: metadata.siteName,
        description: metadata.description,
        thumbnailUrl: metadata.image,
      }),
    });
  }

  try {
    const insight = await generateInsight(url, body.mode ?? "paste", metadata);

    return NextResponse.json({
      mode: "live",
      data: {
        id: createId(),
        title: insight.title,
        sourceType: insight.sourceType,
        sourceName: insight.sourceName,
        sourceTitle: insight.sourceTitle,
        sourceDescription: insight.sourceDescription,
        thumbnailUrl: metadata.image,
        url,
        summary: insight.summary,
        outlook: insight.outlook,
        keywords: insight.keywords,
        notes: "",
        createdAt: new Date().toISOString(),
        themeKey: "",
      } satisfies Inspiration,
    });
  } catch (error) {
    console.error("analyze-route-error", error);

    return NextResponse.json({
      mode: "mock",
      data: buildMockInsight(url, {
        title: metadata.title,
        sourceName: metadata.siteName,
        description: metadata.description,
        thumbnailUrl: metadata.image,
      }),
      fallbackReason: "OpenAI 调用失败，已自动退回演示分析结果。",
    });
  }
}

async function generateInsight(
  url: string,
  mode: AddMode,
  metadata: MetadataSnapshot,
): Promise<AiInsightPayload> {
  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const response = await client.responses.create({
    model: defaultModel,
    input: [
      {
        role: "system",
        content: [
          {
            type: "input_text",
            text: [
              "你是灵芽的 AI 摘录助手。",
              "用户会把教程、帖子、视频或网页链接分享进来，你要把它整理成一条中文灵感卡片。",
              "输出必须是严格 JSON，不要 markdown，不要解释。",
              "如果内容有限，可以基于标题、描述、正文片段做克制分析，不要编造你没有看到的细节。",
              "语气要像帮用户留下值得回看的判断，而不是写营销文案。",
              'JSON 字段必须包含：title, sourceType, sourceName, sourceTitle, sourceDescription, summary, outlook, keywords。',
              'keywords 必须是 3 到 5 个中文关键词数组；sourceType 只能是 "帖子"、"视频"、"网页"、"教程"。',
            ].join("\n"),
          },
        ],
      },
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: JSON.stringify(
              {
                addMode: mode,
                url,
                pageTitle: metadata.title,
                pageDescription: metadata.description,
                siteName: metadata.siteName,
                textSnippet: metadata.textSnippet,
                inferredSourceType: inferSourceType(url),
                inferredSourceName: inferSourceName(url),
              },
              null,
              2,
            ),
          },
        ],
      },
    ],
  });

  return sanitizeInsightPayload(parseInsightPayload(response.output_text), url, metadata);
}

async function fetchPageMetadata(url: string): Promise<MetadataSnapshot> {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "LingyaBot/1.0 (+https://lingya.app)",
        Accept: "text/html,application/xhtml+xml",
      },
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    });

    const html = await response.text();

    return {
      title:
        findMetaContent(html, "property", "og:title") ||
        findMetaContent(html, "name", "twitter:title") ||
        findTagContent(html, "title"),
      description:
        findMetaContent(html, "property", "og:description") ||
        findMetaContent(html, "name", "description") ||
        findMetaContent(html, "name", "twitter:description"),
      siteName:
        findMetaContent(html, "property", "og:site_name") ||
        findMetaContent(html, "name", "application-name") ||
        inferSourceName(url),
      image:
        absolutizeAssetUrl(
          url,
          findMetaContent(html, "property", "og:image") ||
            findMetaContent(html, "name", "twitter:image"),
        ) || "",
      textSnippet: extractBodyText(html).slice(0, 1200),
    };
  } catch {
    return {
      title: "",
      description: "",
      siteName: inferSourceName(url),
      image: "",
      textSnippet: "",
    };
  }
}

function sanitizeInsightPayload(
  payload: Partial<AiInsightPayload>,
  url: string,
  metadata: MetadataSnapshot,
): AiInsightPayload {
  const sourceType = isSourceType(payload.sourceType) ? payload.sourceType : inferSourceType(url);
  const sourceName = safeText(payload.sourceName) || metadata.siteName || inferSourceName(url);
  const keywords = Array.isArray(payload.keywords)
    ? payload.keywords.map((item) => safeText(item)).filter(Boolean).slice(0, 5)
    : [];

  return {
    title:
      safeText(payload.title) ||
      metadata.title ||
      (sourceType === "视频" ? "值得收进灵感夹的一条视频内容" : "先收好、再慢慢判断的一条灵感"),
    sourceType,
    sourceName,
    sourceTitle: safeText(payload.sourceTitle) || metadata.title || "原文内容",
    sourceDescription:
      safeText(payload.sourceDescription) ||
      metadata.description ||
      "链接已导入，适合先生成一版 AI 摘要，再补上你自己的理解。",
    summary:
      safeText(payload.summary) ||
      "这条内容先提供了一层值得保留的方向感，后续可以结合你的项目场景再拆成真正会反复用到的判断。",
    outlook:
      safeText(payload.outlook) ||
      "建议先记录下你最想复用的一点，再在下次回顾时判断它是短暂心动，还是对你真的有持续价值。",
    keywords: keywords.length > 0 ? keywords : fallbackKeywords(sourceType),
  };
}

function parseInsightPayload(output: string): Partial<AiInsightPayload> {
  const matched = output.match(/\{[\s\S]*\}/);
  if (!matched) {
    throw new Error("No JSON object returned by model");
  }

  return JSON.parse(matched[0]) as Partial<AiInsightPayload>;
}

function extractBodyText(html: string) {
  return decodeHtmlEntities(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " "),
  ).trim();
}

function absolutizeAssetUrl(baseUrl: string, assetUrl: string) {
  if (!assetUrl) return "";

  try {
    return new URL(assetUrl, baseUrl).toString();
  } catch {
    return assetUrl;
  }
}

function isValidUrl(value: string) {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

function isSourceType(value: unknown): value is SourceType {
  return value === "帖子" || value === "视频" || value === "网页" || value === "教程";
}

function fallbackKeywords(sourceType: SourceType) {
  if (sourceType === "视频") return ["视频", "拆解", "方法", "节奏"];
  if (sourceType === "教程") return ["教程", "原理", "方法", "复用"];
  if (sourceType === "帖子") return ["帖子", "灵感", "判断", "收藏"];
  return ["网页", "摘要", "记录", "灵感"];
}

function safeText(value: unknown) {
  return typeof value === "string" ? value.trim().replace(/\s+/g, " ") : "";
}

function findMetaContent(html: string, attrName: "name" | "property", attrValue: string) {
  const first = new RegExp(
    `<meta[^>]*${attrName}=["']${escapeForRegExp(attrValue)}["'][^>]*content=["']([^"']+)["'][^>]*>`,
    "i",
  );
  const second = new RegExp(
    `<meta[^>]*content=["']([^"']+)["'][^>]*${attrName}=["']${escapeForRegExp(attrValue)}["'][^>]*>`,
    "i",
  );

  return decodeHtmlEntities(html.match(first)?.[1] ?? html.match(second)?.[1] ?? "");
}

function findTagContent(html: string, tagName: string) {
  const regex = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, "i");
  return decodeHtmlEntities(html.match(regex)?.[1] ?? "").trim();
}

function escapeForRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function decodeHtmlEntities(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}
