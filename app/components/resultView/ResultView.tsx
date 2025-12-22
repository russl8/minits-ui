import { useCompilationResultContext } from "../context/CompilationResultContext";
import ResultViewFailure from "./ResultViewFailure";
import ResultViewSuccess from "./ResultViewSuccess";

const ResultView = () => {
  const { compilationResult } = useCompilationResultContext();

  return (
    <div>
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
