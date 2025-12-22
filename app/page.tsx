"use client";
import Image from "next/image";
import { useState } from "react";
import Editor from "@monaco-editor/react";
import TextEditor from "./components/textEditor/TextEditor";
import ResultView from "./components/resultView/ResultView";
import { CompilationResultProvider } from "./components/context/compilationResultProvider";
import CompileButton from "./components/textEditor/CompileButton";
import { CodeContextProvider } from "./components/context/codeContextProvider";
import { useCodeContext } from "./components/context/CodeContext";

export default function Home() {
  return (
    <div>
      <CompilationResultProvider>
        <CodeContextProvider>
          <div className="flex flex-row w-screen">
            {/* LEFT SIDE */}
            <div className="flex flex-col h-screen lg:min-w-[70%]">
              {/* HEADER */}
              <div className="m-2 mb-0 p-2 flex items-center ">
                <h1 className="text-white font-bold text-5xl font-sans flex items-center">
                  Mini
                  <div className="bg-accent pl-3 pt-3 pb-1 pr-1 ml-1 rounded-md flex items-center">
                    <span className="text-3xl tracking-normal">TS</span>
                  </div>
                </h1>

                {/* pushes button to the right */}
                <div className="ml-auto">
                  <CompileButton />
                </div>
              </div>
              {/* TEXT EDITOR, RESULT VIEW */}
              <div className="flex flex-row h-full">
                <TextEditor />
              </div>
            </div>
            {/* RIGHT SIDE */}
            <ResultView />
          </div>
        </CodeContextProvider>
      </CompilationResultProvider>
    </div>
  );
}
