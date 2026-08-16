import type { CleanedResult, ViewMode } from "@/lib/types";
import ViewToggle from "./ViewToggle";
import TableView from "./TableView";
import JsonView from "./JsonView";
import DroppedRows from "./DroppedRows";
import SqlView from "./SqlView";

export default function OutputPanel({
  result,
  viewMode,
  onViewChange,
}: {
  result: CleanedResult | null;
  viewMode: ViewMode;
  onViewChange: (mode: ViewMode) => void;
}) {
  if (!result) {
    return (
      <p className="text-sm text-[#8B90A3]">
        No output yet — clean some data from the Input tab first.
      </p>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#2DD4B0]" />
          <p className="text-sm text-[#8B90A3]">
            <span className="text-[#E7E9EE] font-medium">
              {result.rows.length} rows
            </span>{" "}
            cleaned
            {result.dropped_rows.length > 0 && (
              <>
                {" "}
                ·{" "}
                <span className="text-[#F5A623]">
                  {result.dropped_rows.length} dropped
                </span>
              </>
            )}
          </p>
        </div>
        <ViewToggle viewMode={viewMode} onChange={onViewChange} />
      </div>

      {viewMode === "table" && <TableView result={result} />}
      {viewMode === "json" && <JsonView result={result} />}
      {viewMode === "sql" && <SqlView result={result} />}

      <DroppedRows droppedRows={result.dropped_rows} />
    </div>
  );
}
