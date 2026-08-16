import CopyButton from "./CopyButton";
import type { CellValue, CleanedResult } from "@/lib/types";

function formatCell(value: CellValue): string {
  if (value === null) return "—";
  if (typeof value === "boolean") return value ? "true" : "false";
  return String(value);
}

function toCsv(result: CleanedResult): string {
  const escape = (val: CellValue) => {
    if (val === null || val === undefined) return "";
    const str = String(val);
    return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
  };
  const header = result.columns.map((c) => c.name).join(",");
  const rows = result.rows.map((row) =>
    result.columns.map((col) => escape(row[col.name])).join(","),
  );
  return [header, ...rows].join("\n");
}

export default function TableView({ result }: { result: CleanedResult }) {
  return (
    <div className="rounded-lg border border-[#262B38] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-[#151822] border-b border-[#262B38]">
        <span className="text-xs font-medium text-[#8B90A3] tracking-wide uppercase">
          Table
        </span>
        <CopyButton text={toCsv(result)} />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm font-['JetBrains_Mono',monospace]">
          <thead>
            <tr className="bg-[#151822] border-b border-[#262B38]">
              {result.columns.map((col) => (
                <th
                  key={col.name}
                  className="text-left px-4 py-3 font-medium text-[#8B90A3] text-xs
                             tracking-wide uppercase whitespace-nowrap"
                >
                  {col.name}
                  <span className="ml-1.5 normal-case text-[#4A4F5E]">
                    {col.type}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {result.rows.map((row, i) => (
              <tr
                key={i}
                className="border-b border-[#1C202B] last:border-0 hover:bg-[#151822] transition-colors"
              >
                {result.columns.map((col) => (
                  <td
                    key={col.name}
                    className="px-4 py-3 text-[#E7E9EE] whitespace-nowrap"
                  >
                    {formatCell(row[col.name])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
