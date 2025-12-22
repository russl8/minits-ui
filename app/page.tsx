"use client";
import Image from "next/image";
import { useState } from "react";
import Editor from "@monaco-editor/react";
import TextEditor from "./components/textEditor/TextEditor";
import ResultView from "./components/resultView/ResultView";
import { CompilationResultProvider } from "./components/context/compilationResultProvider";

export default function Home() {
  return (
    <div>
      <CompilationResultProvider>
        <div className="flex flex-row">
          <TextEditor />
          <ResultView />
        </div>
      </CompilationResultProvider>
    </div>
  );
}
