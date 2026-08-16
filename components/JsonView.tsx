import CopyButton from "./CopyButton";
import type { CleanedResult } from "@/lib/types";

export default function JsonView({ result }: { result: CleanedResult }) {
  const jsonString = JSON.stringify(result, null, 2);

  return (
    <div className="rounded-lg border border-[#262B38] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-[#151822] border-b border-[#262B38]">
        <span className="text-xs font-medium text-[#8B90A3] tracking-wide uppercase">
          JSON
        </span>
        <CopyButton text={jsonString} />
      </div>
      <pre className="p-4 text-sm font-['JetBrains_Mono',monospace] text-[#C6CAD6] overflow-x-auto">
        {jsonString}
      </pre>
    </div>
  );
}
