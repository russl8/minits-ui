import React, { useEffect, useState } from "react";
import { CompilationResultContext } from "./CompilationResultContext";
import { CompilationResult } from "../lib/types";

export const CompilationResultProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [compilationResult, setCompilationResult] =
    useState<CompilationResult | null>(null);
  useEffect(() => {
    console.log("[Provider] compilationResult changed:", compilationResult);
  }, [compilationResult]);
  return (
    <CompilationResultContext.Provider
      value={{ compilationResult, setCompilationResult }}
    >
      {children}
    </CompilationResultContext.Provider>
  );
};
