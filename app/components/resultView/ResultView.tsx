import { useState } from "react";
import { useCompilationResultContext } from "../context/compilationResultContext";
import { useLoadingContext } from "../context/loadingContext";
import ResultViewFailure from "./OutputViewFailure";
import ResultViewSuccess from "./OutputViewSuccess";
import OutputView from "./OutputView";
import ExamplesView from "./ExamplesView";
import TextEditor from "../textEditor/TextEditor";

type Tab = "Output" | "Examples" | "Code";

const ResultView = ({isSmall}:{isSmall:boolean}) => {
  const [tab, setTab] = useState<Tab>( isSmall? "Code" : "Output");

  return (
    <div className="bg-backgroundDark py-2 px-4 mt-5 mb-2 mr-2 rounded-lg h-full w-full border-neutral-700 border-1 overflow-hidden ml-2 lg:ml-0">
      <div className="flex flex-row  w-full h-7 mb-5">
        {isSmall &&<ResultTabButton setTab={setTab} currentTab={tab} tabName="Code" />}
        <ResultTabButton setTab={setTab} currentTab={tab} tabName="Output" />
        <ResultTabButton setTab={setTab} currentTab={tab} tabName="Examples" />
      </div>

      <div className="overflow-y-scroll text-foreground w-full h-screen">
        {isSmall &&  tab === "Code" && <TextEditor />}
        {tab === "Output" && <OutputView />}
        {tab === "Examples" && <ExamplesView />}
      </div>
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
