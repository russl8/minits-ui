import { createContext } from "react";
import { CompilationResult } from "../lib/types";

export interface CompilationResultContextType {
  compilationResult: CompilationResult | null;
  setCompilationResult: React.Dispatch<
    React.SetStateAction<CompilationResult | null>
  >;
}

export const CompilationResultContext = createContext<CompilationResultContextType | null>(
  null
);
