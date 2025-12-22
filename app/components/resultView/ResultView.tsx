import { useState } from "react";
import { useCompilationResultContext } from "../context/compilationResultContext";
import { useLoadingContext } from "../context/loadingContext";
import ResultViewFailure from "./OutputViewFailure";
import ResultViewSuccess from "./OutputViewSuccess";
import OutputView from "./OutputView";

type Tab = "Output" | "Examples";

const ResultView = () => {
  const [tab, setTab] = useState<Tab>("Output");

  return (
    <div className=" bg-backgroundDark py-2 px-4 mt-5 mb-2 mr-2 rounded-lg w-full border-neutral-700 border-1">
      <div className="flex flex-row  w-full h-7 mb-5">
        <ResultTabButton setTab={setTab} currentTab={tab} tabName="Output" />
        <ResultTabButton setTab={setTab} currentTab={tab} tabName="Examples" />
      </div>

      {tab === "Output" && <OutputView/>}
    </div>
  );
};

export default ResultView;

const ResultTabButton = ({
  currentTab,
  tabName,
  setTab,
}: {
  currentTab: Tab;
  tabName: Tab;
  setTab: (tab: Tab) => void;
}) => {
  return (
    <button
      className={`text-foreground font-bold text-2xl cursor-pointer mr-8 transition-opacity duration-200 
        ${
          currentTab === tabName
            ? " underline "
            : " opacity-40 hover:opacity-100"
        }`}
      onClick={() => {
        setTab(tabName);
      }}
    >
      <p>{tabName}</p>
    </button>
  );
};
