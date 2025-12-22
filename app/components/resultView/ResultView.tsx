import { useCompilationResultContext } from "../context/CompilationResultContext";
import ResultViewFailure from "./ResultViewFailure";
import ResultViewSuccess from "./ResultViewSuccess";

const ResultView = () => {
  const { compilationResult } = useCompilationResultContext();

  return (
    <div className=" bg-backgroundDark py-2 px-4 mt-5 mb-2 mr-2 rounded-lg w-full border-neutral-700 border-1">
{/* 
      {compilationResult  && (
        <p className="text-2xl font-bold pb-5">
          Result
        </p>
      )} */}

      {compilationResult == null && (
        <div className="h-full flex items-center justify-center text-neutral-500 text-base font-sans">
          Click{" "}
          <span className="mx-1 px-2 py-0.5 rounded bg-backgroundDark font-semibold text-neutral-300">
            Compile
          </span>{" "}
          to see output
        </div>
      )}

      {compilationResult && compilationResult.success && (
        
        <ResultViewSuccess result={compilationResult} />
      )}

      {compilationResult && !compilationResult.success && (
        <ResultViewFailure result={compilationResult} />
      )}
    </div>
  );
};

export default ResultView;
