import { useEffect } from "react";
import { useCodeContext } from "../context/codeContext";
import { startWarmup } from "../context/LoadingContextProvider";
import { examples } from "./examples";
import { useCompile } from "./useCompile";

const TYPING_DURATION_MS = 3000;

// types the initial example into the editor, then runs it once the server is awake
export function useAutoDemo() {
  const { setCode, demoRef } = useCodeContext();
  const compile = useCompile();

  useEffect(() => {
    const snippet = examples[0].snippet;
    const demo = demoRef.current;
    // effects run twice in dev strict mode; only one demo should run
    if (demo.active) return;
    demo.active = true;
    demo.cancelled = false;
    demo.replaced = false;

    let stopped = false;
    let frame: number | undefined;
    let startTimer: number | undefined;

    const finish = async () => {
      demo.active = false;
      if (demo.replaced) return;
      setCode(snippet);
      await startWarmup();
      if (!stopped) compile(snippet);
    };

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) {
      finish();
    } else {
      // progress is time-based and driven by animation frames, so it can't be
      // slowed by timer throttling, and it waits until the tab is actually visible
      let start: number | undefined;
      const tick = (now: number) => {
        if (stopped) return;
        start ??= now;
        const i = Math.floor(
          (snippet.length * (now - start)) / TYPING_DURATION_MS
        );
        if (demo.cancelled || i >= snippet.length) {
          finish();
          return;
        }
        setCode(snippet.slice(0, i));
        frame = window.requestAnimationFrame(tick);
      };
      // short pause so the page renders before typing starts
      startTimer = window.setTimeout(
        () => (frame = window.requestAnimationFrame(tick)),
        400
      );
    }

    return () => {
      stopped = true;
      demo.active = false;
      window.clearTimeout(startTimer);
      if (frame !== undefined) window.cancelAnimationFrame(frame);
    };
    // run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
