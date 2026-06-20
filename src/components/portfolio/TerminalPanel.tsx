import { useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { PortelloIconView } from "@/design-system/portello/components";
import type { PortfolioFile } from "@/data/navigation";
import { completeTerminalInput, runTerminalCommand } from "@/lib/terminal";

interface TerminalPanelProps {
  files: PortfolioFile[];
  onOpenFile: (fileId: string) => void;
}

interface TerminalEntry {
  command: string;
  lines: string[];
}

export function TerminalPanel({ files, onOpenFile }: TerminalPanelProps) {
  const [open, setOpen] = useState(false);
  const [entries, setEntries] = useState<TerminalEntry[]>([
    { command: "help", lines: ["help, ls, cat Contact.txt, open <file>, whoami, neofetch, clear"] },
  ]);
  const [command, setCommand] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [, setHistoryIndex] = useState<number | null>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileIds = useMemo(() => new Set(files.map((file) => file.id)), [files]);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const editing =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        Boolean(target?.isContentEditable);
      if (editing || !event.ctrlKey || event.code !== "Backquote") return;

      event.preventDefault();
      setOpen((value) => !value);
    };

    document.addEventListener("keydown", handleShortcut);
    return () => document.removeEventListener("keydown", handleShortcut);
  }, []);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      if (panelRef.current?.contains(target) || launcherRef.current?.contains(target)) return;
      setOpen(false);
    };

    document.addEventListener("keydown", handleKey);
    document.addEventListener("mousedown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, [open]);

  useEffect(() => {
    if (open && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [entries, open]);

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const normalized = command.trim();
    if (!normalized) return;

    const result = runTerminalCommand(normalized);
    setCommand("");
    setHistory((current) => [...current, normalized]);
    setHistoryIndex(null);

    if (result.type === "clear") {
      setEntries([]);
      return;
    }

    if (result.type === "open" && fileIds.has(result.fileId)) {
      onOpenFile(result.fileId);
    }

    setEntries((current) => [...current, { command: normalized, lines: result.lines }]);
  };

  const showHistory = (direction: -1 | 1) => {
    if (history.length === 0) return;
    setHistoryIndex((current) => {
      const next =
        current === null
          ? direction === -1
            ? history.length - 1
            : 0
          : Math.min(history.length - 1, Math.max(0, current + direction));
      setCommand(history[next] ?? "");
      return next;
    });
  };

  const handleInputKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      showHistory(-1);
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      showHistory(1);
      return;
    }

    if (event.key === "Tab") {
      event.preventDefault();
      setCommand((value) => completeTerminalInput(value));
    }
  };

  return (
    <>
      <button
        ref={launcherRef}
        type="button"
        className="terminal-launcher"
        aria-label={open ? "Close terminal" : "Open terminal"}
        aria-expanded={open}
        aria-controls="portfolio-terminal"
        title={open ? "터미널 닫기 (Ctrl+`)" : "터미널 열기 (Ctrl+`)"}
        onClick={() => setOpen((value) => !value)}
      >
        <PortelloIconView icon="terminal" size={20} />
        <span className="terminal-launcher-hint" aria-hidden="true">
          Ctrl+`
        </span>
      </button>

      {open && (
        <section
          ref={panelRef}
          id="portfolio-terminal"
          className="terminal-panel"
          aria-label="Portfolio terminal"
          onClick={() => inputRef.current?.focus()}
        >
          <div className="terminal-header">
            <span className="terminal-header-title">
              <PortelloIconView icon="terminal" size={13} style={{ flex: "none" }} />
              TERMINAL
            </span>
            <span className="terminal-header-meta">portfolio-zsh</span>
            <button
              type="button"
              className="terminal-close"
              aria-label="Close terminal"
              onClick={(event) => {
                event.stopPropagation();
                setOpen(false);
              }}
            >
              <PortelloIconView icon="x" size={15} />
            </button>
          </div>
          <div className="terminal-scroll" aria-live="polite" ref={scrollRef}>
            {entries.map((entry, entryIndex) => (
              <div className="terminal-entry" key={`${entry.command}-${entryIndex}`}>
                <div>
                  <span className="terminal-prompt">minjoon@portfolio</span>
                  <span> $ {entry.command}</span>
                </div>
                {entry.lines.map((line, lineIndex) => (
                  <div className="terminal-output" key={`${line}-${lineIndex}`}>
                    {line}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <form className="terminal-form" onSubmit={handleSubmit}>
            <span className="terminal-prompt">$</span>
            <input
              ref={inputRef}
              className="terminal-input"
              value={command}
              onChange={(event) => {
                setCommand(event.currentTarget.value);
                setHistoryIndex(null);
              }}
              onKeyDown={handleInputKeyDown}
              aria-label="Terminal command"
              autoComplete="off"
              spellCheck={false}
            />
          </form>
        </section>
      )}
    </>
  );
}
