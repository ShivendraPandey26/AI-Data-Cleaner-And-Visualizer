"use client";
import { useState } from "react";

const YOUR_LINKEDIN = "https://linkedin.com/in/shivendrapandey26";
const YOUR_GITHUB = "https://github.com/ShivendraPandey26";

export default function Footer() {
  const [showAbout, setShowAbout] = useState(false);

  return (
    <footer className="mt-16 border-t border-[#262B38]">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="sm:col-span-2">
            <button
              onClick={() => setShowAbout(!showAbout)}
              className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.2em] text-[#6C6FF5] uppercase mb-3 hover:text-[#8b8dff] transition-colors"
            >
              About Project
              <svg
                viewBox="0 0 12 12"
                className={`h-3 w-3 fill-none stroke-current transition-transform ${showAbout ? "rotate-180" : ""}`}
                strokeWidth="1.5"
              >
                <path d="M3 4.5L6 7.5L9 4.5" />
              </svg>
            </button>

            {showAbout && (
              <p className="text-sm text-[#8B90A3] leading-relaxed max-w-md">
                Data Cleaner is a small tool built to turn messy, inconsistent
                data into a validated, typed dataset in seconds. It accepts
                pasted text or uploaded CSV, SQL, XLSX, and PDF files, infers
                column types, standardizes formatting, removes duplicates, and
                logs every change it makes so nothing is silently altered or
                dropped. Useful for prepping data before loading it into a
                database, a spreadsheet, or an analysis pipeline.
              </p>
            )}
          </div>

          <div>
            <p className="text-xs font-medium tracking-[0.2em] text-[#6C6FF5] uppercase mb-3">
              Connect
            </p>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={YOUR_LINKEDIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-[#C6CAD6] hover:text-[#6C6FF5] transition-colors"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 fill-current"
                    aria-hidden="true"
                  >
                    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z" />
                  </svg>
                  <span>LinkedIn</span>
                </a>
              </li>
              <li>
                <a
                  href={YOUR_GITHUB}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-[#C6CAD6] hover:text-[#6C6FF5] transition-colors"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 fill-current"
                    aria-hidden="true"
                  >
                    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.79-.25.79-.55v-2.15c-3.2.7-3.87-1.36-3.87-1.36-.53-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.06.78 2.15v3.19c0 .3.21.66.8.55A10.51 10.51 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5z" />
                  </svg>
                  <span>GitHub</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#1C202B] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <p className="text-xs text-[#4A4F5E]">
            Built for cleaning up real-world messy data — no data is stored
            after processing.
          </p>
          <p className="text-xs text-[#4A4F5E]">
            © {new Date().getFullYear()} Data Cleaner. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
