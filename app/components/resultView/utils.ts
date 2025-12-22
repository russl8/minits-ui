export function parseCompilerError(raw: string): ParsedError {
  // Example:
  // Syntax Error! Token "d" (line 6, column 2): no viable alternative at input 'wd' | Rule Stack: [prog, class_decl, statement]

  const regex =
    /^Syntax Error!\s*Token\s*"([^"]+)"\s*\(line\s*(\d+),\s*column\s*(\d+)\):\s*([^|]*)(?:\s*\|\s*Rule Stack:\s*(.*))?$/;

  const m = raw.match(regex);

  if (!m) {
    // fallback: still show something useful
    return {
      raw,
      line: null,
      col: null,
      token: null,
      message: raw,
      ruleStack: null,
    };
  }

  const [, token, lineStr, colStr, msg, ruleStack] = m;

  return {
    raw,
    token: token ?? null,
    line: Number.isFinite(Number(lineStr)) ? Number(lineStr) : null,
    col: Number.isFinite(Number(colStr)) ? Number(colStr) : null,
    message: (msg ?? "").trim(),
    ruleStack: ruleStack?.trim() ?? null,
  };
}

type ParsedError = {
  raw: string;
  line: number | null;
  col: number | null;
  token: string | null;
  message: string;
  ruleStack?: string | null;
};