import { useEffect } from "react";
import { Loader2, Play } from "lucide-react";
import { useLoadingContext } from "../context/loadingContext";
import { useCompile } from "../lib/useCompile";

const CompileButton = () => {
  const { isLoading } = useLoadingContext();
  const compile = useCompile();

  // Ctrl/Cmd+Enter outside the editor (the editor registers its own command)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!(e.key === "Enter" && (e.metaKey || e.ctrlKey))) return;
      if ((e.target as HTMLElement | null)?.closest(".monaco-editor")) return;
      e.preventDefault();
      if (!isLoading) compile();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [compile, isLoading]);

  return (
    <button
      onClick={() => compile()}
      disabled={isLoading}
      title="Compile (Ctrl/⌘ + Enter)"
      className="bg-accent text-backgroundDark py-1.5 px-3 text-base lg:py-2 lg:px-4 lg:text-lg rounded-lg font-bold
        flex items-center gap-2 cursor-pointer hover:brightness-110
        disabled:opacity-60 disabled:cursor-wait transition-all duration-200"
    >
      {isLoading ? (
        <Loader2 size={18} className="animate-spin" />
      ) : (
        <Play size={18} className="fill-current" />
      )}
      Compile
      <kbd className="hidden md:inline text-xs font-mono font-semibold opacity-60 ml-1">
        ⌘↵
      </kbd>
    </button>
  );
};

export default CompileButton;
