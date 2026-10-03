import { useEffect, useState } from "react";
import { CheckCircle2, Loader2, X, XCircle } from "lucide-react";
import { useCompilationResultContext } from "../context/compilationResultContext";
import { useLoadingContext } from "../context/loadingContext";
import { getErrors } from "../lib/types";

const DISMISS_MS = 5000;

interface CompileToastProps {
  // on phones the output lives in another tab, so offer a shortcut to it
  showViewOutput: boolean;
  onViewOutput: () => void;
}

export default function CompileToast({
  showViewOutput,
  onViewOutput,
}: CompileToastProps) {
  const { compilationResult } = useCompilationResultContext();
  const { isLoading, serverStatus } = useLoadingContext();
  const [open, setOpen] = useState(false);

  // reopen whenever a compile starts or a new result arrives
  const [prevResult, setPrevResult] = useState(compilationResult);
  const [prevLoading, setPrevLoading] = useState(isLoading);
  if (compilationResult !== prevResult || isLoading !== prevLoading) {
    setPrevResult(compilationResult);
    setPrevLoading(isLoading);
    if (isLoading || compilationResult) setOpen(true);
  }

  useEffect(() => {
    if (!open || isLoading) return;
    const timer = window.setTimeout(() => setOpen(false), DISMISS_MS);
    return () => window.clearTimeout(timer);
  }, [open, isLoading, compilationResult]);

  let icon: React.ReactNode;
  let text: string;
  if (isLoading) {
    icon = <Loader2 size={18} className="animate-spin text-accent" />;
    text =
      serverStatus === "waking" ? "Waking up interpreter…" : "Compiling…";
  } else if (compilationResult?.success) {
    icon = <CheckCircle2 size={18} className="text-green-400" />;
    text = "Compiled successfully";
  } else if (compilationResult) {
    icon = <XCircle size={18} className="text-red-400" />;
    const count = getErrors(compilationResult).length;
    text =
      serverStatus === "down"
        ? "Couldn't reach the server"
        : `${count} error${count === 1 ? "" : "s"} found`;
  } else {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed z-50 bottom-4 left-1/2 -translate-x-1/2 lg:left-auto lg:right-6 lg:translate-x-0
        flex items-center gap-3 whitespace-nowrap rounded-lg border border-neutral-700 bg-panel
        px-4 py-2.5 text-sm text-foreground shadow-lg transition-all duration-300
        ${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
    >
      {icon}
      <span>{text}</span>
      {showViewOutput && !isLoading && (
        <button
          onClick={() => {
            onViewOutput();
            setOpen(false);
          }}
          className="rounded-md bg-accent px-2 py-1 text-xs font-bold text-backgroundDark cursor-pointer hover:brightness-110"
        >
          View output
        </button>
      )}
      <button
        onClick={() => setOpen(false)}
        title="Dismiss"
        className="text-muted hover:text-foreground cursor-pointer"
      >
        <X size={16} />
      </button>
    </div>
  );
}
