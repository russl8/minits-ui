import { useCallback } from "react";
import { useCompilationResultContext } from "../context/compilationResultContext";
import { useCodeContext } from "../context/codeContext";
import { useLoadingContext } from "../context/loadingContext";

export function useCompile() {
  const { setCompilationResult } = useCompilationResultContext();
  const { code } = useCodeContext();
  const { setIsLoading, setServerStatus } = useLoadingContext();

  // codeOverride lets callers compile code that was just set (state not yet flushed)
  return useCallback(
    async (codeOverride?: string) => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_MINITS_API_URL}/api/compile`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code: codeOverride ?? code }),
          }
        );
        const data = await res.json();
        setCompilationResult(data);
        setServerStatus("ready");
      } catch {
        setServerStatus("down");
        setCompilationResult({
          success: false,
          errors: [
            "Could not reach the miniTS server. It may still be waking up, so try again in a few seconds.",
          ],
          classes: [],
        });
      } finally {
        setIsLoading(false);
      }
    },
    [code, setCompilationResult, setIsLoading, setServerStatus]
  );
}
