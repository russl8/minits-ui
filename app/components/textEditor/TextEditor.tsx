import { Editor } from "@monaco-editor/react";
import { useState } from "react";
import CompileButton from "./CompileButton";
import { useCodeContext } from "../context/CodeContext";

const TextEditor = () => {
  const { code, setCode } = useCodeContext();

  return (
    <div className="flex flex-col h-full w-full rounded-lg lg:w-[70%]">
      <div className="rounded-lg overflow-hidden border border-neutral-700 h-full m-2 p-4 bg-backgroundDark">
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

      {/* <div className="p-4 m-1 rounded-lg flex flex-row justify-end bg-backgroundDark">
        <CompileButton code={code} />
      </div> */}
    </div>
  );
};

export default TextEditor;
