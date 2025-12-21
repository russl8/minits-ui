import { Editor } from "@monaco-editor/react";
import { useState } from "react";
import CompileButton from "./CompileButton";

const TextEditor = () => {
  const [code, setCode] = useState("class A { \n\ta : int = 4;\n}");
  return (
    <div className="flex flex-col">
      <Editor
        className="min-h-80 min-w-md border-4"
        language="typescript"
        options={{
          renderValidationDecorations: "off",
        }}
        value={code}
        onChange={(v) => setCode(v ?? "")}
      />
      <CompileButton code={code} />
    </div>
  );
};

export default TextEditor;
