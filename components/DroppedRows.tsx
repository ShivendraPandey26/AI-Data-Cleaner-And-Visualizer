import type { DroppedRow } from "@/lib/types";

export default function DroppedRows({
  droppedRows,
}: {
  droppedRows: DroppedRow[];
}) {
  if (droppedRows.length === 0) return null;

  return (
    <div>
      <h3 className="text-xs font-medium text-[#8B90A3] tracking-wide uppercase mb-3">
        Dropped rows ({droppedRows.length})
      </h3>
      <ul className="rounded-lg border border-[#262B38] bg-[#151822] divide-y divide-[#1C202B]">
        {droppedRows.map((row, i) => (
          <li
            key={i}
            className="px-4 py-2.5 text-sm font-['JetBrains_Mono',monospace]"
          >
            <p className="text-[#F5A623]">− {row.reason}</p>
            <p className="mt-1 text-[#8B90A3] truncate">{row.original_row}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
