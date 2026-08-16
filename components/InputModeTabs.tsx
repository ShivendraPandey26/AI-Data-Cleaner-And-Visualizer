import type { InputMode } from "@/lib/types";

export default function InputModeTabs({
  mode,
  onChange,
}: {
  mode: InputMode;
  onChange: (mode: InputMode) => void;
}) {
  const modes: { id: InputMode; label: string }[] = [
    { id: "text", label: "Paste Text" },
    { id: "file", label: "Upload File" },
  ];

  return (
    <div className="flex items-center gap-1 rounded-lg border border-[#262B38] bg-[#151822] p-1 mb-4 w-fit">
      {modes.map((m) => (
        <button
          key={m.id}
          type="button"
          onClick={() => onChange(m.id)}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            mode === m.id
              ? "bg-[#6C6FF5] text-white"
              : "text-[#8B90A3] hover:text-[#C6CAD6]"
          }`}
        >
          {m.label}
        </button>
      ))}
    </div>
  );
}
