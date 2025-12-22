"use client";
import Image from "next/image";
import { useState } from "react";
import Editor from "@monaco-editor/react";
import TextEditor from "./components/textEditor/TextEditor";
import ResultView from "./components/resultView/ResultView";
import { CompilationResultProvider } from "./components/context/compilationResultProvider";
import CompileButton from "./components/textEditor/CompileButton";
import { CodeContextProvider } from "./components/context/codeContextProvider";

export default function Home() {
  return (
    <div>
      <CodeContextProvider>
        <CompilationResultProvider>
          <div className="flex flex-col h-screen">
            {/* HEADER */}
            <div className="m-2 p-2 flex flex-row bg-amber-400">
              <h1 className="text-white font-bold text-5xl font-sans flex items-center">
                Mini
                <div className="bg-accent pl-3 pt-3 pb-1 pr-1 ml-1 rounded-md flex items-center">
                  <span className="text-3xl leading-non tracking-normal">
                    TS
                  </span>
                </div>
              </h1>

              {/* <CompileButton /> */}
            </div>
            {/* TEXT EDITOR, RESULT VIEW */}
            <div className="flex flex-row h-full">
              <TextEditor />
              <ResultView />
            </div>
          </div>
        </CompilationResultProvider>
      </CodeContextProvider>
    </div>
  );
}
