export type ColumnType = "INTEGER" | "FLOAT" | "BOOLEAN" | "DATE" | "DATETIME" | "TEXT";

export type Column = {
    name: string;
    type: ColumnType;
};

export type CellValue = string | number | boolean | null;

export type DroppedRow = {
    original_row: string;
    reason: string;
};

export type CleanedResult = {
    columns: Column[];
    rows: Record<string, CellValue>[];
    sql: string;
    dropped_rows: DroppedRow[];
};

export type Tab = "input" | "output";
export type ViewMode = "table" | "json" | "sql";


export type InputMode = "text" | "file";

export type PdfPayload = {
    data: string;
    mimeType: string;
    fileName: string;
};