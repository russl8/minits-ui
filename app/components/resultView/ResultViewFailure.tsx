import React from "react";
import { CompilationResult } from "../lib/types";

/**
 * Expects a response object of the form:
 * {
 *   success: false,
 *   type: "SYNTAX_ERROR" | "SEMANTIC_ERROR" | ...
 *   errors: string[]
 * }
 */

interface ResultViewFailureProps {
  result: CompilationResult;
}
export default function ResultViewFailure({ result }: ResultViewFailureProps) {
  if (!result || result.success) return null;

  return (
    <div>
      <ul>
        {result.errors.map((err: any, idx: any) => (
          <li key={idx}>{err}</li>
        ))}
      </ul>
    </div>
  );
}
