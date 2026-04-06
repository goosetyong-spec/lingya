import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "灵芽 Lingya",
    short_name: "灵芽",
    description: "把你看到的教程、帖子和灵感，慢慢养成自己的判断。",
    start_url: "/",
    display: "standalone",
    background_color: "#fff8ec",
    theme_color: "#fff6db",
    lang: "zh-CN",
    icons: [
      {
        src: "/globe.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
