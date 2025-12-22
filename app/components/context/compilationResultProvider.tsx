
import React, { useState } from 'react';
import { CompilationResultContext } from './compilationResultContext';
import { CompilationResult } from '../lib/types';

export const CompilationResultProvider= ({ children } : {children: React.ReactNode}) => {
  const [compilationResult, setCompilationResult] = useState<CompilationResult|null>(null);

  return (
    <CompilationResultContext.Provider value={{ compilationResult, setCompilationResult }}>
      {children}
    </CompilationResultContext.Provider>
  );
};