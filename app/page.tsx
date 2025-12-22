"use client";
import Image from "next/image";
import { useState } from "react";
import Editor from "@monaco-editor/react";
import TextEditor from "./components/textEditor/TextEditor";
import ResultView from "./components/resultView/ResultView";

export default function Home() {
  
  return (
    <div>
      
      <div className="flex flex-row">
              <TextEditor />
          <ResultView/>
      </div>
      
    </div>
  );
}
