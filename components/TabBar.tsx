import type { Tab } from "@/lib/types";

export default function TabBar({
  activeTab,
  onChange,
  hasResult,
}: {
  activeTab: Tab;
  onChange: (tab: Tab) => void;
  hasResult: boolean;
}) {
  const tabs: Tab[] = ["input", "output"];

  return (
    <div className="flex items-center gap-1 border-b border-[#262B38] mb-8">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`relative px-4 py-2.5 text-sm font-medium transition-colors ${
            activeTab === tab
              ? "text-[#E7E9EE]"
              : "text-[#8B90A3] hover:text-[#C6CAD6]"
          }`}
        >
          {tab === "input" ? "Input" : "Output"}
          {tab === "output" && hasResult && (
            <span className="ml-2 inline-block h-1.5 w-1.5 rounded-full bg-[#2DD4B0] align-middle" />
          )}
          {activeTab === tab && (
            <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-[#6C6FF5]" />
          )}
        </button>
      ))}
    </div>
  );
}
