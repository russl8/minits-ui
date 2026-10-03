import { createContext, useContext } from "react";

// replaced: the user loaded other code mid-demo, so the demo must not overwrite or run it
export type DemoState = { active: boolean; cancelled: boolean; replaced: boolean };

export type CodeContextType = {
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  // shared between the auto-demo and the editor so user input can interrupt typing
  demoRef: React.RefObject<DemoState>;
} ;
export const CodeContext =
  createContext<CodeContextType>({
    code: "",
    setCode: () => {},
    demoRef: { current: { active: false, cancelled: false, replaced: false } },
  });

export const useCodeContext = () => {
  const context = useContext(CodeContext);
  if (context === undefined) {
    throw new Error(
      "useCodeContext must be used within a CodeContextProvider"
    );
  }
  return context;
};
