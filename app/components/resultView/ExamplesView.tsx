import { useMemo, useState } from "react";
import { Example, examples } from "../lib/examples";
import { Copy, Check } from "lucide-react";

const ExamplesView = () => {
  const [copiedName, setCopiedName] = useState<string | null>(null);

  const rows = useMemo(() => {
    // skip initialExample
    return examples.slice(1);
  }, []);

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
                </span>
              </td>

              <td className=" pr-4">
                <pre className="text-xs text-foreground whitespace-pre-wrap break-words font-mono  bg-backgroundLight p-2 rounded-lg h-30 w-full overflow-scroll">
                  <div className="overflow-y-scroll">
                  {snippetPreview(ex.snippet)}

                  </div>
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

function snippetPreview(snippet: string, maxLines = 8, maxChars = 260) {
  const lines = snippet.split("\n");
  const sliced = lines.slice(0, maxLines).join("\n");
  return sliced.length > maxChars ? sliced.slice(0, maxChars) + "…" : sliced;
}
export default ExamplesView;
