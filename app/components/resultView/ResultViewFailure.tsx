import React, { useMemo } from "react";
import { CompilationResult } from "../lib/types";
import { parseCompilerError } from "./utils";

interface ResultViewFailureProps {
  result: CompilationResult;
}

export default function ResultViewFailure({ result }: ResultViewFailureProps) {
  if (!result || result.success) return null;

  const errors: string[] = (result as any).errors ?? [];

  const parsed = useMemo(() => {
    const rows = errors.map(parseCompilerError);

    rows.sort((a, b) => {
      const la = a.line ?? Number.POSITIVE_INFINITY;
      const lb = b.line ?? Number.POSITIVE_INFINITY;
      if (la !== lb) return la - lb;

      const ca = a.col ?? Number.POSITIVE_INFINITY;
      const cb = b.col ?? Number.POSITIVE_INFINITY;
      if (ca !== cb) return ca - cb;

      return a.message.localeCompare(b.message);
    });

    return rows;
  }, [errors]);

  return (
    <div className="text-foreground max-h-full overflow-hidden">
      <p className="text-red-400/60 text-3xl font-bold pb-5">Errors found</p>

      {/* Scroll container */}
      <div className="overflow-y-auto max-h-full">
        <table className="w-full text-sm table-fixed">
          <thead className="text-muted text-xl">
            <tr>
              <th className="text-left font-semibold w-16">Line</th>
              <th className="text-left font-semibold w-16">Col</th>
              <th className="text-left font-semibold ">Message</th>
            </tr>
          </thead>

          <tbody>
            {parsed.map((e, idx) => (
              <tr
                key={`${e.line ?? "?"}:${e.col ?? "?"}:${idx}`}
                className="text-lg"
              >
                <td className="text-muted py-2">{e.line ?? "—"}</td>
                <td className="text-muted py-2">{e.col ?? "—"}</td>
                <td className="text-foreground whitespace-normal break-words">
                  {e.message}
                </td>
              </tr>
            ))}

            {parsed.length === 0 && (
              <tr>
                <td colSpan={3} className="text-muted">
                  No errors returned.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
