"use client";
import { useState } from "react";
import type {
  CleanedResult,
  InputMode,
  PdfPayload,
  Tab,
  ViewMode,
} from "@/lib/types";
import TabBar from "@/components/TabBar";
import InputModeTabs from "@/components/InputModeTabs";
import InputForm from "@/components/InputForm";
import FileUpload from "@/components/FileUpload";
import OutputPanel from "@/components/OutputPanel";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  const [inputData, setInputData] = useState("");
  const [pdfPayload, setPdfPayload] = useState<PdfPayload | null>(null);
  const [inputMode, setInputMode] = useState<InputMode>("text");
  const [result, setResult] = useState<CleanedResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("input");
  const [viewMode, setViewMode] = useState<ViewMode>("table");

  const runClean = async (body: Record<string, unknown>) => {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/clean-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to clean data");
        return;
      }
      setResult(data);
      setActiveTab("output");
      setViewMode("table");
    } catch {
      setError("Network error — try again");
    } finally {
      setLoading(false);
    }
  };

  const handleTextSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    runClean({ inputData });
  };

  const handleFileClean = () => {
    if (pdfPayload) {
      runClean({ fileData: pdfPayload.data, mimeType: pdfPayload.mimeType });
    } else if (inputData) {
      runClean({ inputData });
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0F14] text-[#E7E9EE] font-['Inter',sans-serif]">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <Header />

        <TabBar
          activeTab={activeTab}
          onChange={setActiveTab}
          hasResult={!!result}
        />

        {activeTab === "input" && (
          <div>
            <InputModeTabs
              mode={inputMode}
              onChange={(m) => {
                setInputMode(m);
                setError("");
              }}
            />

            {inputMode === "text" && (
              <InputForm
                inputData={inputData}
                onChange={setInputData}
                onSubmit={handleTextSubmit}
                loading={loading}
                error={error}
              />
            )}

            {inputMode === "file" && (
              <div className="space-y-4">
                <FileUpload
                  onTextReady={(text) => {
                    setInputData(text);
                    setPdfPayload(null);
                    setError("");
                  }}
                  onPdfReady={(payload) => {
                    setPdfPayload(payload);
                    setInputData("");
                    setError("");
                  }}
                  onError={setError}
                />

                {error && (
                  <p className="text-sm text-[#F5A623] font-['JetBrains_Mono',monospace]">
                    ⚠ {error}
                  </p>
                )}

                <button
                  onClick={handleFileClean}
                  disabled={loading || (!inputData && !pdfPayload)}
                  className="inline-flex items-center gap-2 bg-[#6C6FF5] text-white text-sm font-medium
                             px-5 py-2.5 rounded-lg hover:bg-[#5B5EE8] disabled:opacity-40
                             disabled:cursor-not-allowed transition-colors"
                >
                  {loading && (
                    <span className="h-3.5 w-3.5 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                  )}
                  {loading ? "Cleaning…" : "Clean data"}
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === "output" && (
          <OutputPanel
            result={result}
            viewMode={viewMode}
            onViewChange={setViewMode}
          />
        )}
      </div>

      <Footer />
    </div>
  );
}
