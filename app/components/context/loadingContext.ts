import { createContext, useContext } from "react";

export type ServerStatus = "waking" | "ready" | "down";

export type LoadingContextType = {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  serverStatus: ServerStatus;
  setServerStatus: React.Dispatch<React.SetStateAction<ServerStatus>>;
};
export const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
  setIsLoading: () => {},
  serverStatus: "waking",
  setServerStatus: () => {},
});

export const useLoadingContext= () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error(
      "useLoadingContext must be used within a LoadingContextProvider"
    );
  }
  return context;
};
