import { useCompilationResultContext } from "../context/CompilationResultContext";

const ResultView = () => {
  const context = useCompilationResultContext();
  const compilationResult = context.compilationResult;

  return (
    <div>
      <p>{compilationResult?.success}</p>
      <p>{compilationResult?.semanticErrors}</p>
      <p>{compilationResult?.classes.toLocaleString()}</p>
    </div>
  );
};

export default ResultView;
