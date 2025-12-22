
import React, { useState } from 'react';
import { CompilationResult } from '../lib/types';
import { CodeContext } from './codeContext';
import { examples } from '../lib/examples';

export const CodeContextProvider= ({ children } : {children: React.ReactNode}) => {
  const [code, setCode] = useState<string>(examples.initialExample);

  return (
    <CodeContext.Provider value={{code, setCode}}>
      {children}
    </CodeContext.Provider>
  );
};