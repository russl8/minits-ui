import { Editor } from "@monaco-editor/react";
import { useEffect, useRef } from "react";
import { useCodeContext } from "../context/codeContext";
import { useCompile } from "../lib/useCompile";

const TextEditor = () => {
  const { code, setCode, demoRef } = useCodeContext();
  const compile = useCompile();
  // monaco commands are registered once, so keep the latest compile in a ref
  const compileRef = useRef(compile);
  useEffect(() => {
    compileRef.current = compile;
  }, [compile]);

  return (
    <div className="flex flex-col h-full w-full rounded-lg">
      <div className="rounded-lg overflow-hidden lg:border lg:border-neutral-700 h-full m-0 p-1 lg:m-2 lg:p-4 bg-backgroundDark">
        <Editor
          beforeMount={(monaco) => {
            monaco.editor.defineTheme("minits-dark", {
              base: "vs-dark",
              inherit: true,
              rules: [],
              colors: {
                "editor.background": "#0e1116",
              },
            });
          }}
          onMount={(editor, monaco) => {
            // tighter gutter and smaller text on phones
            if (window.matchMedia("(max-width: 1023px)").matches) {
              editor.updateOptions({
                fontSize: 13,
                lineNumbersMinChars: 2,
                lineDecorationsWidth: 4,
                folding: false,
              });
            }

            // any interaction skips the typing demo
            const cancelDemo = () => {
              if (demoRef.current.active) demoRef.current.cancelled = true;
            };
            editor.onKeyDown(cancelDemo);
            editor.onMouseDown(cancelDemo);
            editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () =>
              compileRef.current()
            );
          }}
          theme="minits-dark"
          height="100%"
          language="typescript"
          options={{
            minimap: { enabled: false },
            renderValidationDecorations: "off",
            scrollBeyondLastLine: false,
            fontSize: 16,
            lineNumbers: "on",
            wordWrap: "on",
          }}
          value={code}
          onChange={(v) => setCode(v ?? "")}
        />
      </div>

    </div>
  );
};

export default TextEditor;
