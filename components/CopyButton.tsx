"use client";
import { useState } from "react";

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setFailed(true);
      setTimeout(() => setFailed(false), 1500);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 text-xs font-medium text-[#8B90A3]
                 hover:text-[#E7E9EE] transition-colors"
    >
      <span
        className={copied ? "text-[#2DD4B0]" : failed ? "text-[#F5A623]" : ""}
      >
        {copied ? "✓ Copied" : failed ? "Couldn't copy" : "Copy"}
      </span>
    </button>
  );
}
