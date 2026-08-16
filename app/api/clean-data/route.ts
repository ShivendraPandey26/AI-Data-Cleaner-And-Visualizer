import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

const cleanedDataSchema = {
    type: "object",
    properties: {
        columns: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    name: { type: "string" },
                    type: {
                        type: "string",
                        enum: ["INTEGER", "FLOAT", "BOOLEAN", "DATE", "DATETIME", "TEXT"],
                    },
                },
                required: ["name", "type"],
            },
        },
        rows: {
            type: "array",
            items: {
                type: "object",
                additionalProperties: {
                    anyOf: [
                        { type: "string" },
                        { type: "number" },
                        { type: "boolean" },
                        { type: "null" },
                    ],
                },
            },
        },
        sql: { type: "string" },
        dropped_rows: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    original_row: { type: "string" },
                    reason: { type: "string" },
                },
                required: ["original_row", "reason"],
            },
        },
    },
    required: ["columns", "rows", "sql", "dropped_rows"],
};

const RULES = `
## Rules

1. **Header detection**
   - If the first row looks like column headers, use them (converted to snake_case).
   - If no header row exists, infer concise snake_case field names from the data's content.

2. **Type inference**
   - Every column gets exactly one type: "INTEGER", "FLOAT", "BOOLEAN", "DATE", "DATETIME", or "TEXT".
   - Values in the output JSON must use NATIVE JSON types matching that column type — numbers as numbers, booleans as true/false, never as strings like "24" or "true".
   - If a value conflicts with the column's dominant type (e.g. "N/A" in a numeric column), set that single value to null — do not downgrade the whole column to TEXT.
   - Dates → ISO 8601 ("YYYY-MM-DD" or "YYYY-MM-DDTHH:MM:SS"), regardless of input format.
   - Booleans: normalize "Y/N", "yes/no", "TRUE/FALSE", "1/0" → true/false. If a value isn't a recognizable boolean (e.g. "maybe"), it becomes null, not false.
   - Numbers: strip currency symbols and thousands separators (e.g. "$1,200.50" → 1200.50).

3. **Whitespace & casing**
   - Trim leading/trailing whitespace; collapse internal multiple spaces to one.
   - Normalize casing sensibly (proper-case names, lowercase emails) without changing meaning.

4. **Missing values**
   - Empty strings, whitespace-only values, and placeholders ("N/A", "NULL", "-", "none", "unknown", "???") all become JSON null.
   - A row with some fields missing is NOT the same as a corrupted row — null the missing fields but KEEP the row, unless the row is structurally broken.

5. **Duplicates & corrupted rows**
   - Remove exact duplicates (after normalization) — do not silently drop anything else.
   - Only remove a row as "corrupted" if it's structurally unparseable.
   - Every removed row MUST appear in "dropped_rows" with the reason. If nothing was removed, return an empty array.
   - The row count in "rows" plus "dropped_rows" must equal the number of real input rows (excluding header).

6. **SQL output**
   - "sql" must be one string: a CREATE TABLE statement (table name "cleaned_data") followed by one INSERT statement per row, using the SQL keyword NULL (unquoted) for missing values.
`;

export async function POST(req: NextRequest) {
    try {
        const { inputData, fileData, mimeType } = await req.json();

        const hasText = typeof inputData === "string" && inputData.trim().length > 0;
        const hasFile = typeof fileData === "string" && fileData.length > 0;

        if (!hasText && !hasFile) {
            return NextResponse.json({ error: "No input data or file provided" }, { status: 400 });
        }

        const responseFormat = {
            type: "text" as const,
            mime_type: "application/json",
            schema: cleanedDataSchema,
        };

        let interaction;

        if (hasFile) {

            interaction = await ai.interactions.create({
                model: process.env.GEMINI_MODEL || "gemini-3.5-flash",
                input: [
                    {
                        type: "document",
                        data: fileData,
                        mime_type: mimeType || "application/pdf",
                    },
                    {
                        type: "text",
                        text: `You are a meticulous data cleaning and normalization assistant. The attached document contains raw, messy tabular data. Extract it and convert it into clean, structured, database-ready output.\n${RULES}`,
                    },
                ],
                response_format: responseFormat,
            });
        } else {
            const prompt = `
You are a meticulous data cleaning and normalization assistant. Convert the raw input below into clean, structured, database-ready output.
${RULES}
## Raw input
"""
${inputData}
"""
`;
            interaction = await ai.interactions.create({
                model: process.env.GEMINI_MODEL || "gemini-3.5-flash",
                input: prompt,
                response_format: responseFormat,
            });
        }

        const outputText = interaction.output_text;

        if (!outputText) {
            return NextResponse.json({ error: "Model returned an empty response" }, { status: 502 });
        }

        let parsed;
        try {
            parsed = JSON.parse(outputText);
        } catch (e) {
            console.error("JSON parse failed. Raw text was:", outputText);
            return NextResponse.json(
                { error: "Model returned invalid JSON", raw: outputText },
                { status: 502 }
            );
        }

        return NextResponse.json(parsed, { status: 200 });
    } catch (err) {
        console.error("Clean-data error:", err);
        return NextResponse.json({ error: "Something went wrong processing your data" }, { status: 500 });
    }
}