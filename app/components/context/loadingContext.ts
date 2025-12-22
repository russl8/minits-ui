import { createContext, useContext } from "react";

export type LoadingContextType = {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
} ;
export const LoadingContext =
  createContext<LoadingContextType>({isLoading:false,setIsLoading:()=>{}});

export const useLoadingContext= () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error(
      "useLoadingContext must be used within a LoadingContextProvider"
    );
  }
  return context;
};
