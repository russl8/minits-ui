"use client";
import Image from "next/image";
import { useState } from "react";
import Editor from "@monaco-editor/react";
import TextEditor from "./components/textEditor/TextEditor";
import ResultView from "./components/resultView/ResultView";
import { CompilationResultProvider } from "./components/context/CompilationResultProvider";
import CompileButton from "./components/textEditor/CompileButton";
import { CodeContextProvider } from "./components/context/CodeContextProvider";
import { useCodeContext } from "./components/context/codeContext";
import { LoadingContextProvider } from "./components/context/LoadingContextProvider";

export default function Home() {
  return (
    <div>
      <CompilationResultProvider>
        <CodeContextProvider>
          <LoadingContextProvider>
            <div className="max-h-screen w-screen flex flex-row">
              {/* LEFT SIDE */}
              <div className="flex flex-col min-w-full max-h-full lg:min-w-[70%]">
                {/* HEADER */}
                <div className="m-2 mb-0 p-2 flex items-center">
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

                {/* CONTENT AREA: important */}
                <div className="flex-1 min-h-0">
                  <div className="hidden lg:flex lg:h-full h-screen">
                    <TextEditor />
                  </div>

                  <div className="lg:hidden flex w-full h-full mb-2">
                    <ResultView isSmall={true}/>
                  </div>
                </div>
              </div>
              {/* RIGHT SIDE */}
              <div className="hidden lg:flex w-full mb-7">
              <ResultView isSmall={false}/>  
              </div>
      
            </div>
          </LoadingContextProvider>
        </CodeContextProvider>
      </CompilationResultProvider>
    </div>
  );
}
