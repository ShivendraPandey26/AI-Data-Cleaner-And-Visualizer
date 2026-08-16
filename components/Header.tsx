const FEATURES = [
  { label: "Type inference", detail: "INTEGER, FLOAT, BOOLEAN, DATE, TEXT" },
  { label: "Deduplication", detail: "exact-match rows removed & logged" },
  { label: "Multi-format input", detail: "CSV, SQL, XLSX, PDF" },
  { label: "SQL export", detail: "ready-to-run CREATE TABLE + INSERTs" },
];

export default function Header() {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-2 mb-4">
        <span className="flex h-5 w-5 items-center justify-center rounded-[5px] bg-[#6C6FF5]">
          <svg
            viewBox="0 0 12 12"
            fill="none"
            className="h-3 w-3"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 3.5C2 2.67157 2.67157 2 3.5 2H8.5C9.32843 2 10 2.67157 10 3.5V8.5C10 9.32843 9.32843 10 8.5 10H3.5C2.67157 10 2 9.32843 2 8.5V3.5Z"
              stroke="white"
              strokeWidth="1.1"
            />
            <path d="M2 5H10" stroke="white" strokeWidth="1.1" />
            <path d="M5 5V10" stroke="white" strokeWidth="1.1" />
          </svg>
        </span>
        <p className="text-xs font-medium tracking-[0.2em] text-[#6C6FF5] uppercase">
          Data Cleaner
        </p>
      </div>

      <h1 className="text-3xl font-semibold tracking-tight font-['Space_Grotesk',sans-serif]">
        Automated Data Cleaning
      </h1>
      <p className="mt-2 text-sm text-[#8B90A3] max-w-lg">
        Convert unstructured or inconsistent data into a validated, typed
        dataset — with full transparency into every change made.
      </p>

      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-px rounded-lg border border-[#262B38] bg-[#262B38] overflow-hidden">
        {FEATURES.map((f) => (
          <div key={f.label} className="bg-[#0D0F14] px-4 py-3">
            <p className="text-xs font-medium text-[#E7E9EE]">{f.label}</p>
            <p className="mt-0.5 text-[11px] text-[#8B90A3] leading-snug">
              {f.detail}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
