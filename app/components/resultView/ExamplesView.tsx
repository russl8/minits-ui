import { useMemo, useState } from "react";
import { Example, examples } from "../lib/examples";
import { Copy, Check, FileInput } from "lucide-react";
import { useCodeContext } from "../context/codeContext";

const ExamplesView = ({ onLoad }: { onLoad?: () => void }) => {
  const { setCode, demoRef } = useCodeContext();
  const [copiedName, setCopiedName] = useState<string | null>(null);

  const rows = useMemo(() => {
    // skip initialExample
    return examples.slice(1);
  }, []);

  function loadSnippet(ex: Example) {
    // stop the typing demo so it doesn't overwrite the loaded example
    if (demoRef.current.active) {
      demoRef.current.cancelled = true;
      demoRef.current.replaced = true;
    }
    setCode(ex.snippet);
    onLoad?.();
  }

  async function copySnippet(ex: Example) {
    try {
      await navigator.clipboard.writeText(ex.snippet);
      setCopiedName(ex.name);
      window.setTimeout(() => setCopiedName(null), 900);
    } catch {
      // fallback (older browsers)
      const ta = document.createElement("textarea");
      ta.value = ex.snippet;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopiedName(ex.name);
      window.setTimeout(() => setCopiedName(null), 900);
    }
  }

  return (
    <div className="">
      <table className="w-full text-sm text-foreground">
        <thead className="text-muted text-base"></thead>

        <tbody>
          {rows.map((ex) => (
            <tr key={ex.name} className="flex flex-col"> 
              <td className="py-3 pr-4">
                <span className="text-accent text-base font-semibold flex flex-row items-center text-wrap">
                  {prettifyName(ex.name)}
                  <button
                    onClick={() => copySnippet(ex)}
                    title="Copy snippet"
                    className="p-1 ml-2 cursor-pointer rounded-md text-muted hover:bg-backgroundLight/70
            transition-colors"
                  >
                    {copiedName === ex.name ? (
                      <Check size={18} className="text-green-400" />
                    ) : (
                      <Copy size={18} />
                    )}
                  </button>
                  <button
                    onClick={() => loadSnippet(ex)}
                    title="Replace the editor's code with this example"
                    className="ml-1 flex items-center gap-1 rounded-md border border-neutral-700 px-1.5 py-0.5
            text-xs font-semibold text-muted cursor-pointer hover:border-accent hover:text-accent transition-colors"
                  >
                    <FileInput size={13} />
                    Load
                  </button>
                </span>
              </td>

              <td className="pr-4">
                <pre className="text-xs text-foreground whitespace-pre-wrap break-words font-mono bg-backgroundLight p-2 rounded-lg w-full">
                  {ex.snippet}
                </pre>
              </td>
            </tr>
          ))}

          {rows.length === 0 && (
            <tr>
              <td className="py-3 text-muted" colSpan={3}>
                No examples.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

function prettifyName(name: string) {
  return name.replaceAll("_", " ").replace(/([a-z])([A-Z])/g, "$1 $2");
}

export default ExamplesView;
