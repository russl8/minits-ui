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
export default function ResultViewSuccess({ result }: ResultViewSuccessProps) {
  if (!result?.success) return null;

  return (
    <div className="text-foreground">
      <p className="text-green-400/60 text-3xl font-bold pb-5">
        Successfully Compiled
      </p>
      {result.classes.map((cls: any) => (
        <section
          key={cls.className}
          className="rounded-md"
        >
          {/* Title */}
          <div className="text-xl">
            <span className="text-muted">class </span>
            <span className="text-accent font-semibold">{cls.className}</span>
          </div>

          {/* Vars */}
          {cls.evaluatedVars && Object.keys(cls.evaluatedVars).length > 0 ? (
            <ul className="text-foreground mb-4">
              {Object.entries(cls.evaluatedVars).map(
                ([varName, valueObj]: any) => (
                  <li key={varName}>
                    <span className="text-foreground font-semibold">
                      {varName}
                    </span>
                    <span className="text-muted">{" = "}</span>
                    <span className="text-foreground">
                      {String(valueObj?.value)}
                    </span>
                    <span className="text-muted">{" ("}</span>
                    <span className="text-muted">{valueObj?.type}</span>
                    <span className="text-muted">{")"}</span>
                  </li>
                )
              )}
            </ul>

          ) : (
            <div className="text-muted">
              No evaluated variables.
            </div>
          )}
        </section>
      ))}
    </div>
  );
}