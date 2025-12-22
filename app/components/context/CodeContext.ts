import { createContext, useContext } from "react";

export type CodeContextType = {
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
} ;
export const CodeContext =
  createContext<CodeContextType>({code:"",setCode:()=>{}});

export const useCodeContext = () => {
  const context = useContext(CodeContext);
  if (context === undefined) {
    throw new Error(
      "useCodeContext must be used within a CodeContextProvider"
    );
  }
  return context;
};
