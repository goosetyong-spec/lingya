import type { ReactNode } from "react";

export function BottomNav({
  activeTab,
  onChange,
  onAdd,
}: {
  activeTab: "home" | "summary" | "add" | "profile";
  onChange: (tab: "home" | "summary" | "add" | "profile") => void;
  onAdd: () => void;
}) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-4 z-30 flex justify-center">
      <div className="pointer-events-auto relative flex h-16 w-[282px] items-center justify-between rounded-[32px] border border-white/60 bg-white/92 px-7 shadow-[0_10px_24px_rgba(74,56,31,0.12)] backdrop-blur-md">
        <button
          type="button"
          onClick={() => onChange("home")}
          className={`${activeTab === "home" ? "text-[#84d55d]" : "text-[#84d55d]/55"} transition`}
          aria-label="首页"
        >
          <HomeGlyph />
        </button>

        <button
          type="button"
          onClick={onAdd}
          className="absolute left-1/2 top-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#eef9df] shadow-[0_10px_20px_rgba(138,209,92,0.18)]"
          aria-label="新增灵感"
        >
          <span className="text-[26px] leading-none">🌱</span>
        </button>

        <button
          type="button"
          onClick={() => onChange("profile")}
          className={`${activeTab === "profile" ? "text-[#84d55d]" : "text-[#84d55d]/55"} transition`}
          aria-label="我的"
        >
          <ProfileGlyph />
        </button>
      </div>
    </div>
  );
}

export function ScreenTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="pt-6">
      <p className="text-[28px] font-bold tracking-[-0.04em] text-[#333333]">{title}</p>
      <p className="mt-2 text-[14px] leading-6 text-[#7e7268]">{subtitle}</p>
    </div>
  );
}

export function ProfileCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-[28px] border border-white/60 bg-[rgba(250,247,242,0.84)] shadow-[0_8px_18px_rgba(204,176,89,0.08)] ${className ?? ""}`}
    >
      {children}
    </section>
  );
}

function HomeGlyph() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
      <path
        d="M7 16.8L17 8L27 16.8"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 16.5V25.4H23.5V16.5"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M17 25V17.2" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <path
        d="M16.8 18.6C15.3 17 14.3 15.7 14.1 13.9C16.3 14 17.5 15.2 17.9 17"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
      <path
        d="M17.2 18.6C18.7 17 19.7 15.7 19.9 13.9C17.7 14 16.5 15.2 16.1 17"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ProfileGlyph() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
      <circle cx="17" cy="11.6" r="4.8" stroke="currentColor" strokeWidth="2.4" />
      <path
        d="M10.8 25.8C10.8 21.9 13.6 18.9 17 18.9C20.4 18.9 23.2 21.9 23.2 25.8"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M19.5 7.6C20.7 6.2 21.6 5.4 23.1 5.2C22.9 7.2 22 8.3 20.5 8.7"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
      <path
        d="M19.3 7.4C20.7 7.6 21.8 8.2 22.8 9.7C21.1 10 19.9 9.5 19.1 8.4"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
    </svg>
  );
}
