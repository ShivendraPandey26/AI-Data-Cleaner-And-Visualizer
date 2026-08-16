"use client";
import { useRef, useState } from "react";
import type { PdfPayload } from "@/lib/types";

const ACCEPTED = ".csv,.sql,.xlsx,.pdf";

export default function FileUpload({
  onTextReady,
  onPdfReady,
  onError,
}: {
  onTextReady: (text: string, fileName: string) => void;
  onPdfReady: (payload: PdfPayload) => void;
  onError: (message: string) => void;
}) {
  const [fileName, setFileName] = useState("");
  const [parsing, setParsing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const readAsText = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error("Couldn't read file"));
      reader.readAsText(file);
    });

  const readAsBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(",")[1] ?? "");
      };
      reader.onerror = () => reject(new Error("Couldn't read file"));
      reader.readAsDataURL(file);
    });

  const handleFile = async (file: File) => {
    setFileName(file.name);
    setParsing(true);
    const ext = file.name.split(".").pop()?.toLowerCase();

    try {
      if (ext === "csv" || ext === "sql") {
        const text = await readAsText(file);
        onTextReady(text, file.name);
      } else if (ext === "xlsx") {
        const XLSX = await import("xlsx");
        const buffer = await file.arrayBuffer();
        const workbook = XLSX.read(buffer, { type: "array" });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const csv = XLSX.utils.sheet_to_csv(firstSheet);
        onTextReady(csv, file.name);
      } else if (ext === "pdf") {
        const base64 = await readAsBase64(file);
        onPdfReady({
          data: base64,
          mimeType: "application/pdf",
          fileName: file.name,
        });
      } else {
        onError("Unsupported file type — use CSV, SQL, XLSX, or PDF");
        setFileName("");
      }
    } catch (err) {
      onError(err instanceof Error ? err.message : "Failed to read file");
      setFileName("");
    } finally {
      setParsing(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className="cursor-pointer rounded-lg border border-dashed border-[#262B38] bg-[#151822]
                 p-10 text-center hover:border-[#6C6FF5] transition-colors"
    >
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />
      {parsing ? (
        <p className="text-sm text-[#8B90A3]">Reading {fileName}…</p>
      ) : fileName ? (
        <p className="text-sm text-[#2DD4B0]">✓ {fileName} ready</p>
      ) : (
        <>
          <p className="text-sm text-[#C6CAD6]">
            Drop a file here or click to browse
          </p>
          <p className="mt-1 text-xs text-[#4A4F5E]">CSV, SQL, XLSX, or PDF</p>
        </>
      )}
    </div>
  );
}
