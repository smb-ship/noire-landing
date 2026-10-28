"use client";

import { createContext, type ReactNode, useCallback, useContext, useEffect, useRef, useState } from "react";

type Notify = (message: string) => void;
const DemoContext = createContext<Notify>(() => undefined);

export const useDemoNotice = () => useContext(DemoContext);

/** Shows a small, polite status message. Used wherever a button would need a real backend. */
export function DemoProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState("");
  const timer = useRef<number | undefined>(undefined);

  const notify = useCallback((text: string) => {
    window.clearTimeout(timer.current);
    // Clear first so repeating the same message is announced again.
    setMessage("");
    window.setTimeout(() => setMessage(text), 30);
    timer.current = window.setTimeout(() => setMessage(""), 5200);
  }, []);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return (
    <DemoContext.Provider value={notify}>
      {children}
      <div className="toast-region" role="status" aria-live="polite">
        {message && (
          <p className="toast">
            <span className="toast__tag">Demo</span>
            {message}
          </p>
        )}
      </div>
    </DemoContext.Provider>
  );
}
