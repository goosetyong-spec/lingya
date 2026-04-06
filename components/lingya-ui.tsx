export function StatusBar() {
  return (
    <div className="flex items-center justify-between px-7 pt-5 text-sm font-medium text-stone-700">
      <span>9:41</span>
      <div className="flex items-center gap-2">
        <span className="block h-2.5 w-4 rounded-sm border border-current" />
        <span className="block h-2.5 w-2 rounded-sm bg-current" />
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
    <div className="pt-1">
      <p className="text-[2rem] font-semibold leading-none tracking-tight text-stone-900">{title}</p>
      <p className="mt-2 text-sm leading-6 text-stone-500">{subtitle}</p>
    </div>
  );
}

export function TopBar({
  title,
  subtitle,
  left,
  right,
}: {
  title: string;
  subtitle: string;
  left: React.ReactNode;
  right: React.ReactNode;
}) {
  return (
    <section className="flex items-center justify-between gap-4">
      {left}
      <div className="mr-auto">
        <p className="text-[2rem] font-semibold leading-none tracking-tight text-stone-900">{title}</p>
        <p className="mt-2 text-sm leading-6 text-stone-500">{subtitle}</p>
      </div>
      {right}
    </section>
  );
}

export function ProfileCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-[30px] border border-white/70 bg-white/65 shadow-[0_14px_38px_rgba(215,188,98,0.16)] ${className ?? ""}`}
    >
      {children}
    </section>
  );
}

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
    <div className="pointer-events-none absolute inset-x-0 bottom-4 z-20 flex justify-center">
      <div className="pointer-events-auto flex w-[282px] items-center justify-between rounded-full border border-white/70 bg-white/90 px-7 py-4 shadow-[0_18px_36px_rgba(215,188,98,0.18)] backdrop-blur-md">
        <button type="button" onClick={() => onChange("home")} className="text-[#8ad15c]">
          <HomeGlyph active={activeTab === "home"} />
        </button>
        <button
          type="button"
          onClick={onAdd}
          className="flex size-14 items-center justify-center rounded-full bg-[#ecf8dc] shadow-[0_10px_20px_rgba(138,209,92,0.2)]"
        >
          <SproutGlyph />
        </button>
        <button type="button" onClick={() => onChange("profile")} className="text-[#8ad15c]">
          <ProfileGlyph active={activeTab === "profile"} />
        </button>
      </div>
    </div>
  );
}

function HomeGlyph({ active }: { active: boolean }) {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" className={active ? "opacity-100" : "opacity-55"}>
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

function ProfileGlyph({ active }: { active: boolean }) {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" className={active ? "opacity-100" : "opacity-55"}>
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

function SproutGlyph() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M14 22.5V10.8" stroke="#7DCB62" strokeWidth="2.4" strokeLinecap="round" />
      <path
        d="M13.8 12.4C11.9 10.2 10.6 8.4 10.4 5.9C13.5 6.1 15.2 7.6 15.7 10.2"
        stroke="#7DCB62"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M14.2 12.4C16.1 10.2 17.4 8.4 17.6 5.9C14.5 6.1 12.8 7.6 12.3 10.2"
        stroke="#7DCB62"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="14" cy="22.8" r="1.8" fill="#7DCB62" />
    </svg>
  );
}
