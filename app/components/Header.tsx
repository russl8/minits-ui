import { Github } from "lucide-react";
import CompileButton from "./textEditor/CompileButton";
import { useLoadingContext } from "./context/loadingContext";

const ServerStatusPill = () => {
  const { serverStatus } = useLoadingContext();
  const styles = {
    waking: { dot: "bg-amber-400 animate-pulse", text: "Waking up interpreter…" },
    ready: { dot: "bg-green-400", text: "Interpreter online" },
    down: { dot: "bg-red-400", text: "Interpreter offline" },
  }[serverStatus];

  return (
    <div className="flex items-center gap-2 rounded-full border border-neutral-700 bg-backgroundDark px-2 py-2 sm:px-3 sm:py-1 text-xs text-muted whitespace-nowrap">
      <span className={`h-2 w-2 rounded-full ${styles.dot}`} />
      <span className="hidden sm:inline">{styles.text}</span>
    </div>
  );
};

export default function Header() {
  return (
    // logo and controls share the first row; the description sits under the
    // logo on desktop and spans the full width on phones
    <div className="m-1 mb-0 p-1 lg:m-2 lg:mb-0 lg:p-2 grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1 lg:gap-x-6 lg:gap-y-2">
      <h1 className="text-white font-bold text-3xl lg:text-5xl font-sans flex items-center">
        mini
        <div className="bg-accent pl-2 pt-2 pb-0.5 pr-0.5 lg:pl-3 lg:pt-3 lg:pb-1 lg:pr-1 ml-1 rounded-md flex items-center">
          <span className="text-xl lg:text-3xl tracking-normal">TS</span>
        </div>
      </h1>

      <div className="flex items-center justify-end gap-2 lg:gap-3 lg:row-span-2">
        <ServerStatusPill />
        <a
          href="https://github.com/russl8/MiniTS"
          target="_blank"
          rel="noopener noreferrer"
          title="View source on GitHub"
          className="flex items-center gap-2 rounded-lg border border-neutral-700 px-2 py-1.5 lg:px-3 lg:py-2 text-foreground hover:border-accent hover:text-accent transition-colors"
        >
          <Github size={18} />
          <span className="hidden sm:inline text-sm font-semibold">Source</span>
        </a>
        <CompileButton />
      </div>

      <p className="col-span-2 lg:col-span-1 text-muted text-xs lg:text-sm max-w-xl">
        A TypeScript-like language with its own interpreter, built from scratch
        in Java.
      </p>
    </div>
  );
}
