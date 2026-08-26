"use client";
import { useEffect, useState } from "react";

const MESSAGES = [
  "Preparing your data...",
  "Analyzing data structure...",
  "Detecting columns...",
  "Inferring data types...",
  "Validating data...",
  "Cleaning inconsistent values...",
  "Standardizing formats...",
  "Handling missing values...",
  "Trimming unnecessary whitespace...",
  "Standardizing dates...",
  "Normalizing numeric values...",
  "Validating email addresses...",
  "Formatting phone numbers...",
  "Detecting duplicate records...",
  "Removing duplicate entries...",
  "Checking for data anomalies...",
  "Applying data quality rules...",
  "Structuring your dataset...",
  "Finalizing cleaned data...",
  "Preparing your results...",
  "Data cleaning complete...",
];

interface LoadingStatusProps {
  intervalMs?: number;
}

export default function LoadingStatus({
  intervalMs = 1800,
}: LoadingStatusProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % MESSAGES.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);

  return (
    <span className="flex items-center gap-2 mt-2 text-sm text-white font-light">
      <span className="h-3.5 w-3.5 rounded-full border-2 border-white/40 border-t-white animate-spin" />
      <p key={index} className="animate-pulse">
        {MESSAGES[index]}
      </p>
    </span>
  );
}
