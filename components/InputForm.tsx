"use client";

export default function InputForm({
  inputData,
  onChange,
  onSubmit,
  loading,
  error,
}: {
  inputData: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
  error: string;
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <textarea
          id="input-data"
          placeholder="name, email, signup_date&#10;John Doe, JOHN@EXAMPLE.com, 2024-1-5&#10;..."
          className="w-full rounded-lg bg-[#151822] border border-[#262B38] p-4 text-sm
                     font-['JetBrains_Mono',monospace] text-[#E7E9EE] placeholder:text-[#4A4F5E]
                     focus:outline-none focus:border-[#6C6FF5] focus:ring-1 focus:ring-[#6C6FF5]
                     transition-colors resize-none"
          rows={12}
          value={inputData}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>

      {error && (
        <p className="text-sm text-[#F5A623] font-['JetBrains_Mono',monospace]">
          ⚠ {error}
        </p>
      )}

      <button
        disabled={loading || !inputData.trim()}
        className="inline-flex items-center gap-2 bg-[#6C6FF5] text-white text-sm font-medium
                   px-5 py-2.5 rounded-lg hover:bg-[#5B5EE8] disabled:opacity-40
                   disabled:cursor-not-allowed transition-colors"
      >
        {loading && (
          <span className="h-3.5 w-3.5 rounded-full border-2 border-white/40 border-t-white animate-spin" />
        )}
        {loading ? "Cleaning…" : "Clean data"}
      </button>
    </form>
  );
}
