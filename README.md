# Data Cleaner

Automated data cleaning and normalization tool. Paste raw, messy data — or upload a file — and get back a validated, typed dataset with full transparency into every change made.

Built with Next.js and the Gemini API, Data Cleaner detects column types, standardizes formatting, removes duplicates, and produces both a structured JSON dataset and ready-to-run SQL — with a full log of anything it dropped and why.

---

## Features

- **Multi-format input** — paste raw text, or upload a **CSV**, **SQL**, **XLSX**, or **PDF** file
- **Type inference** — every column is typed as `INTEGER`, `FLOAT`, `BOOLEAN`, `DATE`, `DATETIME`, or `TEXT`
- **Consistent normalization** — dates standardized to ISO 8601, currency symbols and thousands separators stripped from numbers, inconsistent casing and whitespace cleaned up
- **Explicit null handling** — blanks and placeholder values (`N/A`, `-`, `unknown`, etc.) are converted to real `null` values, never left ambiguous
- **Deduplication with an audit trail** — exact duplicate rows are removed, and every dropped row is logged with a reason, so nothing disappears silently
- **SQL export** — a ready-to-run `CREATE TABLE` statement plus `INSERT` statements for the cleaned data
- **Three output views** — browse results as a table, raw JSON, or generated SQL
- **PDF table extraction** — tabular data inside PDFs is read directly by the model, without lossy client-side text extraction

## Tech Stack

| Layer               | Technology                                            |
| ------------------- | ----------------------------------------------------- |
| Framework           | [Next.js](https://nextjs.org/) (App Router)           |
| Language            | TypeScript                                            |
| Styling             | Tailwind CSS                                          |
| AI / Model          | Google Gemini API (`@google/genai`, Interactions API) |
| Spreadsheet parsing | [SheetJS (`xlsx`)](https://sheetjs.com/)              |

## Getting Started

### Prerequisites

- Node.js 18 or later
- A [Gemini API key](https://ai.google.dev/) from Google AI Studio

### Installation

```bash
git clone https://github.com/ShivendraPandey26/AI-Data-Cleaner-Visualizer.git
cd AI-Data-Cleaner-Visualizer
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```bash
GEMINI_API_KEY=your_api_key_here

# Optional — defaults to gemini-3.5-flash if unset
GEMINI_MODEL=gemini-3.5-flash
```

### Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Open the **Input** tab.
2. Choose **Paste Text** to type or paste raw data directly, or **Upload File** to drop in a `.csv`, `.sql`, `.xlsx`, or `.pdf` file.
3. Click **Clean data**.
4. Review the results in the **Output** tab — toggle between **Table**, **JSON**, and **SQL** views.
5. Copy any view to your clipboard, or check the **Dropped rows** section to see exactly what was removed and why.

## Project Structure

```
├── app/
│   ├── api/
│   │   └── clean-data/
│   │       └── route.ts        # API route — calls the Gemini API
│   └── page.tsx                 # Main page — state and layout
├── components/
│   ├── Header.tsx               # Hero section
│   ├── Footer.tsx                # Footer — about, social links
│   ├── TabBar.tsx                # Input / Output tab switcher
│   ├── InputModeTabs.tsx         # Paste Text / Upload File switcher
│   ├── InputForm.tsx             # Text input form
│   ├── FileUpload.tsx            # File upload + client-side parsing
│   ├── OutputPanel.tsx           # Output container
│   ├── ViewToggle.tsx            # Table / JSON / SQL switcher
│   ├── TableView.tsx             # Table output
│   ├── JsonView.tsx              # JSON output
│   ├── SqlView.tsx               # SQL output
│   ├── DroppedRows.tsx           # Dropped-row audit log
│   └── CopyButton.tsx            # Reusable copy-to-clipboard button
└── lib/
    └── types.ts                  # Shared TypeScript types
```

## How It Works

1. Input (pasted text, or a parsed CSV/SQL/XLSX file) is sent to `/api/clean-data`. PDF files are sent as raw bytes and read natively by the model.
2. The API route calls the Gemini Interactions API with a structured prompt and a strict JSON schema, instructing the model to detect headers, infer types, normalize formatting, deduplicate, and log any removed rows.
3. The response is validated as JSON and returned to the client.
4. The client renders the result across the Table, JSON, and SQL views.

**Data handling:** input is sent to the Gemini API for processing and is not persisted by this application after a response is returned.

## Roadmap

- [ ] Support for multi-sheet XLSX files
- [ ] Configurable target SQL dialect (PostgreSQL, MySQL, SQLite)
- [ ] Downloadable `.sql` / `.json` / `.csv` export files
- [ ] Column-level manual override before finalizing output

## Contributing

Issues and pull requests are welcome. If you're proposing a significant change, please open an issue first to discuss what you'd like to change.

## Author

**Shivendra Kumar Pandey**

- LinkedIn: [linkedin.com/in/shivendrapandey26](https://linkedin.com/in/shivendrapandey26)
