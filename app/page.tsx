"use client";
import Image from "next/image";
import { useState } from "react";
import Editor from "@monaco-editor/react";
import TextEditor from "./components/textEditor/TextEditor";

export default function Home() {
  return (
    <div>
      <div className="flex flex-row">
              <TextEditor />

      </div>
      
    </div>
  );
}
