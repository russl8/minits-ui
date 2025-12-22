
import React, { useState } from 'react';
import { CompilationResult } from '../lib/types';
import { CodeContext } from './CodeContext';

export const CodeContextProvider= ({ children } : {children: React.ReactNode}) => {
  const [code, setCode] = useState<string>("class A { \n\ta : int = 4;\n}");

  return (
    <CodeContext.Provider value={{code, setCode}}>
      {children}
    </CodeContext.Provider>
  );
};