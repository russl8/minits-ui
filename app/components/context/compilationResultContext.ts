import { createContext, useContext } from "react";
import { CompilationResult } from "../lib/types";

export type CompilationResultContextType = {
  compilationResult: CompilationResult;
  setCompilationResult: React.Dispatch<React.SetStateAction<CompilationResult>>;
} ;

export const CompilationResultContext =
  createContext<CompilationResultContextType>({
    compilationResult: null,
    setCompilationResult: () => {},
  });

export const useCompilationResultContext = () => {
  const context = useContext(CompilationResultContext);
  if (context === undefined) {
    throw new Error(
      "useCompilationResultContext must be used within a CompilationResultContextProvider"
    );
  }
  return context;
};
