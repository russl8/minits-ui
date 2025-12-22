import { useState } from "react";
import { useCompilationResultContext } from "../context/compilationResultContext";
import { useLoadingContext } from "../context/loadingContext";
import ResultViewFailure from "./OutputViewFailure";
import ResultViewSuccess from "./OutputViewSuccess";

const ResultView = () => {
  const [tab, setTab] = useState<"output" | "examples">("output")  
  
  return (
    <div className=" bg-backgroundDark py-2 px-4 mt-5 mb-2 mr-2 rounded-lg w-full border-neutral-700 border-1">

    </div>
  );
};

export default ResultView;
