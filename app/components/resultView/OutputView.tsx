import { useCompilationResultContext } from "../context/compilationResultContext";
import { useLoadingContext } from "../context/loadingContext";
import OutputViewFailure from "./OutputViewFailure";
import OutputViewSuccess from "./OutputViewSuccess";

const OutputView = () => {
      const { compilationResult } = useCompilationResultContext();
      const { isLoading } = useLoadingContext();
  return (
    <>
      {compilationResult == null && !isLoading && (
        <div className="h-full flex items-center justify-center text-neutral-500 text-base font-sans">
          Click{" "}
          <span className="mx-1 px-2 py-0.5 rounded bg-backgroundDark font-semibold text-neutral-300">
            Compile
          </span>{" "}
          to see output
        </div>
      )}

      {isLoading && (
        <div className="h-full flex items-center justify-center text-neutral-500 text-base font-sans">
          Loading...
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
