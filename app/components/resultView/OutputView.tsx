import { useCompilationResultContext } from "../context/compilationResultContext";
import { useLoadingContext } from "../context/loadingContext";
import { Loader2 } from "lucide-react";
import OutputViewFailure from "./OutputViewFailure";
import OutputViewSuccess from "./OutputViewSuccess";

const OutputView = () => {
  const { compilationResult } = useCompilationResultContext();
  const { isLoading, serverStatus } = useLoadingContext();
  return (
    <>
      {compilationResult == null && !isLoading && (
        <div className="h-full flex flex-col items-center justify-center text-neutral-500 text-base font-sans">
          <div>
            Click{" "}
            <span className="rounded bg-backgroundDark font-semibold text-neutral-300">
              Compile
            </span>{" "}
            to see output.
          </div>
          <div>Refer to the Examples tab to get started!</div>
        </div>
      )}

      {isLoading && (
        <div className="h-full flex flex-col items-center justify-center gap-3 text-neutral-500 text-base font-sans text-center px-4">
          <Loader2 size={28} className="animate-spin text-accent" />
          {serverStatus === "waking" ? (
            <>
              <div>Waking up the interpreter…</div>
              <div className="text-sm text-neutral-600">
                It runs on a free-tier server, so the first run can take ~30s.
              </div>
            </>
          ) : (
            <div>Compiling…</div>
          )}
        </div>
      )}

      {!isLoading && compilationResult && compilationResult.success && (
        <OutputViewSuccess result={compilationResult} />
      )}

      {!isLoading && compilationResult && !compilationResult.success && (
        <OutputViewFailure result={compilationResult} />
      )}
    </>
  );
};

export default OutputView;
