import React, { useState } from "react";
import { CompilationResult } from "../lib/types";
import { LoadingContext } from "./loadingContext";
import { examples } from "../lib/examples";

export const LoadingContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
