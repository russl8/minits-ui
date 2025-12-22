import React from "react";
import { CompilationResult } from "../lib/types";

interface OutputViewSuccessProps {
  result: CompilationResult;
}

type MiniTSValueObj = {
  type?: string;
  value?: any;
};


export default function OutputViewSuccess({ result }: OutputViewSuccessProps) {
  if (!result?.success) return null;

  return (
    <div className="text-foreground">
      <p className="text-green-400/60 text-3xl font-bold pb-5">
        Successfully Compiled
      </p>

      {result.classes.map((cls: any) => (
        <section key={cls.className} className="rounded-md">
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
                      {formatValue(valueObj as MiniTSValueObj)}
                    </span>

                    <span className="text-muted">{" ("}</span>
                    <span className="text-muted">{valueObj?.type}</span>
                    <span className="text-muted">{")"}</span>
                  </li>
                )
              )}
            </ul>
          ) : (
            <div className="text-muted">No evaluated variables.</div>
          )}
        </section>
      ))}
    </div>
  );
}


function formatValue(valueObj: MiniTSValueObj): string {
  const t = valueObj?.type;
  const v = valueObj?.value;

  // Handle LIST_* where value looks like { items: [{ val: ... }, ...] }
  const items = v?.items;
  const isListType = typeof t === "string" && t.startsWith("LIST_");
  const hasItemsArray = Array.isArray(items);

  if (isListType && hasItemsArray) {
    const vals = items.map((it: any) => it?.val);

    // LIST_CHAR: join into a string if it looks like characters
    if (t === "LIST_CHAR") {
      // your chars are coming back as "A", "B", "C"
      return `"${vals.map((x: any) => String(x ?? "")).join("")}"`;
    }

    // LIST_BOOL / LIST_INT: show array-like
    return `[${vals.map((x: any) => String(x)).join(", ")}]`;
  }

  if (v === null || v === undefined) return "null";
  if (typeof v === "string") return v; // already a string
  if (typeof v === "number" || typeof v === "boolean") return String(v);

  try {
    return JSON.stringify(v);
  } catch {
    return String(v);
  }
}
