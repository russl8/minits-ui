import React, { useEffect, useState } from "react";
import { LoadingContext, ServerStatus } from "./loadingContext";

const WARMUP_SNIPPET = "class A { a : int = 1; }";
const WARMUP_TIMEOUT_MS = 90_000;

// the backend sleeps on a free tier, so ping it once as soon as the page loads
let warmupPromise: Promise<boolean> | null = null;
export function startWarmup(): Promise<boolean> {
  if (warmupPromise) return warmupPromise;
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), WARMUP_TIMEOUT_MS);
  warmupPromise = fetch(`${process.env.NEXT_PUBLIC_MINITS_API_URL}/api/compile`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code: WARMUP_SNIPPET }),
    signal: controller.signal,
  })
    .then((res) => res.ok)
    .catch(() => false)
    .finally(() => window.clearTimeout(timeout));
  return warmupPromise;
}

export const LoadingContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [serverStatus, setServerStatus] = useState<ServerStatus>("waking");

  useEffect(() => {
    startWarmup().then((ok) => {
      // a real compile may have already succeeded, so never downgrade "ready"
      setServerStatus((prev) => (prev === "ready" ? prev : ok ? "ready" : "down"));
    });
  }, []);

  return (
    <LoadingContext.Provider
      value={{ isLoading, setIsLoading, serverStatus, setServerStatus }}
    >
      {children}
    </LoadingContext.Provider>
  );
};
