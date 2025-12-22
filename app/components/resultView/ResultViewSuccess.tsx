import React from "react";
import { CompilationResult } from "../lib/types";

/**
 * Expects a response object of the form:
 * {
 *   success: true,
 *   semanticErrors: [],
 *   classes: [
 *     {
 *       className: string,
 *       evaluatedVars: {
 *         [varName]: { type: string, value: any }
 *       }
 *     }
 *   ]
 * }
 */
interface ResultViewSuccessProps {
    result: CompilationResult;
}
export default function ResultViewSuccess({ result } : ResultViewSuccessProps) {
  if (!result || !result.success) return null;

  return (
    <div>
      {result.classes.map((cls:any) => (
        <div key={cls.className} style={{ marginBottom: "1rem" }}>
          <h3>class {cls.className}</h3>

          <ul>
            {Object.entries(cls.evaluatedVars).map(
              ([varName, valueObj] : any) => (
                <li key={varName}>
                  <strong>{varName}</strong> = {String(valueObj.value)}{" "}
                  <em>({valueObj.type})</em>
                </li>
              )
            )}
          </ul>
        </div>
      ))}
    </div>
  );
}
