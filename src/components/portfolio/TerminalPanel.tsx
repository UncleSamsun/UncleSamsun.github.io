import { useMemo, useRef, useState } from "react";
import type { PortfolioFile } from "@/data/navigation";
import { runTerminalCommand } from "@/lib/terminal";

interface TerminalPanelProps {
  files: PortfolioFile[];
  onOpenFile: (fileId: string) => void;
}

interface TerminalEntry {
  command: string;
  lines: string[];
}

export function TerminalPanel({ files, onOpenFile }: TerminalPanelProps) {
  const [entries, setEntries] = useState<TerminalEntry[]>([
    { command: "help", lines: ["help, ls, cat Contact.txt, open <file>, whoami, neofetch, clear"] },
  ]);
  const [command, setCommand] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const fileIds = useMemo(() => new Set(files.map((file) => file.id)), [files]);

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const normalized = command.trim();
    if (!normalized) return;

    const result = runTerminalCommand(normalized);
    setCommand("");

    if (result.type === "clear") {
      setEntries([]);
      return;
    }

    if (result.type === "open" && fileIds.has(result.fileId)) {
      onOpenFile(result.fileId);
    }

    setEntries((current) => [...current, { command: normalized, lines: result.lines }]);
  };

  return (
    <section className="terminal-panel" aria-label="Portfolio terminal" onClick={() => inputRef.current?.focus()}>
      <div className="terminal-header">
        <span>TERMINAL</span>
        <span>portfolio-zsh</span>
      </div>
      <div className="terminal-scroll" aria-live="polite">
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
          onChange={(event) => setCommand(event.currentTarget.value)}
          aria-label="Terminal command"
          autoComplete="off"
          spellCheck={false}
        />
      </form>
    </section>
  );
}
