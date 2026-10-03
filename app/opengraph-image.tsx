import { ImageResponse } from "next/og";

export const alt = "miniTS: a TypeScript-like language with its own interpreter, built from scratch in Java";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const kw = "#bb9af7";
const ty = "#7dcfff";
const num = "#ff9e64";
const cm = "#565f89";
const fg = "#e6e8eb";

const CODE: Array<Array<[string, string]>> = [
  [["class ", kw], ["B ", fg], ["extends ", kw], ["A {", fg]],
  [["  a = a + ", fg], ["1", num], [";", fg], ["  // 5", cm]],
  [["  function ", kw], ["getA", "#7aa2f7"], ["() : ", fg], ["int", ty], [" {", fg]],
  [["    return ", kw], ["a;", fg]],
  [["  }", fg]],
  [["  f : ", fg], ["int", ty], [" = getA();", fg], ["  // 5", cm]],
  [["}", fg]],
];

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "72px",
          background: "#0e1116",
          color: fg,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", width: 480 }}>
          <div style={{ display: "flex", alignItems: "center", fontSize: 110, fontWeight: 800 }}>
            mini
            <div
              style={{
                display: "flex",
                marginLeft: 10,
                padding: "20px 8px 4px 22px",
                background: "#7aa2f7",
                borderRadius: 14,
                fontSize: 66,
              }}
            >
              TS
            </div>
          </div>
          <div style={{ marginTop: 28, fontSize: 34, color: "#8b949e", lineHeight: 1.3 }}>
            A TypeScript-like language with its own interpreter, built from scratch in Java.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: 540,
            padding: "28px 32px",
            borderRadius: 18,
            border: "2px solid #30363d",
            background: "#0e1116",
            fontFamily: "monospace",
            fontSize: 26,
            lineHeight: 1.6,
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          }}
        >
          {CODE.map((line, i) => (
            <div key={i} style={{ display: "flex", whiteSpace: "pre" }}>
              {line.map(([text, color], j) => (
                <span key={j} style={{ color }}>
                  {text}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
