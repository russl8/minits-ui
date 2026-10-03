"use client";
import TextEditor from "./components/textEditor/TextEditor";
import ResultView from "./components/resultView/ResultView";
import { CompilationResultProvider } from "./components/context/CompilationResultProvider";
import { CodeContextProvider } from "./components/context/CodeContextProvider";
import { LoadingContextProvider } from "./components/context/LoadingContextProvider";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useAutoDemo } from "./components/lib/useAutoDemo";

// lives inside the providers so it can use their contexts
const AutoDemo = () => {
  useAutoDemo();
  return null;
};

export default function Home() {
  return (
    <div className="h-screen flex flex-col">
      <CompilationResultProvider>
        <CodeContextProvider>
          <LoadingContextProvider>
            <AutoDemo />
            <div className="flex-1 min-h-0 flex flex-row">
              {/* LEFT SIDE */}
              <div className="flex flex-col min-w-full max-h-full lg:min-w-[70%]">
                <Header />

                {/* CONTENT AREA: important */}
                <div className="flex-1 min-h-0">
                  <div className="hidden lg:flex lg:h-full h-full">
                    <TextEditor />
                  </div>

                  <div className="lg:hidden flex w-full h-full mb-2">
                    <ResultView isSmall={true}/>
                  </div>
                </div>
              </div>
              {/* RIGHT SIDE */}
              <div className="hidden lg:flex w-full mb-7">
              <ResultView isSmall={false}/>  
              </div>
      
            </div>
          </LoadingContextProvider>
        </CodeContextProvider>
      </CompilationResultProvider>
      <Footer />
    </div>
  );
}
