import { useState } from "react";
import OutputView from "./OutputView";
import ExamplesView from "./ExamplesView";
import CompileToast from "./CompileToast";
import TextEditor from "../textEditor/TextEditor";

type Tab = "Output" | "Examples" | "Code";

const ResultView = ({isSmall}:{isSmall:boolean}) => {
  const [tab, setTab] = useState<Tab>( isSmall? "Code" : "Output");

  return (
    <div className="bg-backgroundDark px-2 py-1 mx-1 mt-2 mb-1 lg:px-4 lg:py-2 lg:mt-5 lg:mb-2 lg:mr-2 lg:ml-0 rounded-md lg:rounded-lg h-full flex-1 min-w-0 border-neutral-700 border-1 overflow-hidden">
      <div className="flex flex-row w-full h-7 mb-2 lg:mb-5">
        {isSmall &&<ResultTabButton setTab={setTab} currentTab={tab} tabName="Code" />}
        <ResultTabButton setTab={setTab} currentTab={tab} tabName="Output" />
        <ResultTabButton setTab={setTab} currentTab={tab} tabName="Examples" />
      </div>

      <div className="overflow-y-scroll text-foreground w-full h-[calc(100%-2.25rem)] lg:h-[calc(100%-2rem)]">
        {isSmall &&  tab === "Code" && <TextEditor />}
        {tab === "Output" && <OutputView />}
        {tab === "Examples" && (
          // on phones the editor is a separate tab, so jump to it after loading
          <ExamplesView onLoad={() => isSmall && setTab("Code")} />
        )}
      </div>

      <CompileToast
        showViewOutput={isSmall && tab !== "Output"}
        onViewOutput={() => setTab("Output")}
      />
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
      className={`text-foreground font-bold text-lg lg:text-2xl cursor-pointer mr-5 lg:mr-8 transition-opacity duration-200 
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
