import type { ViewMode } from "@/lib/types";

const VIEWS: { id: ViewMode; label: string }[] = [
  { id: "table", label: "Table" },
  { id: "json", label: "JSON" },
  { id: "sql", label: "SQL" },
];

export default function ViewToggle({
  viewMode,
  onChange,
}: {
  viewMode: ViewMode;
  onChange: (mode: ViewMode) => void;
}) {
  return (
    <div className="flex items-center gap-1 rounded-lg border border-[#262B38] bg-[#151822] p-1">
      {VIEWS.map((view) => (
        <button
          key={view.id}
          onClick={() => onChange(view.id)}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            viewMode === view.id
              ? "bg-[#6C6FF5] text-white"
              : "text-[#8B90A3] hover:text-[#C6CAD6]"
          }`}
        >
          {view.label}
        </button>
      ))}
    </div>
  );
}
