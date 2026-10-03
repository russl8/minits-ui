import React, { useRef, useState } from 'react';
import { CodeContext, DemoState } from './codeContext';

export const CodeContextProvider= ({ children } : {children: React.ReactNode}) => {
  // starts empty: the auto-demo types the initial example in
  const [code, setCode] = useState<string>("");
  const demoRef = useRef<DemoState>({ active: false, cancelled: false, replaced: false });

  return (
    <CodeContext.Provider value={{code, setCode, demoRef}}>
      {children}
    </CodeContext.Provider>
  );
};
