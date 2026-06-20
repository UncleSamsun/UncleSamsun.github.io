export type TerminalResult =
  | { type: "output"; lines: string[] }
  | { type: "open"; fileId: string; lines: string[] }
  | { type: "clear" };

export function runTerminalCommand(command: string): TerminalResult {
  const normalized = command.trim();

  if (normalized === "help") {
    return { type: "output", lines: ["help, ls, cat Contact.txt, open <file>, whoami, neofetch, clear"] };
  }

  if (normalized === "ls") {
    return { type: "output", lines: ["README.md", "Projects/", "Contact.txt"] };
  }

  if (normalized === "cat Contact.txt") {
    return {
      type: "output",
      lines: [
        "Email  : alswns5620@naver.com",
        "GitHub : github.com/UncleSamsun",
        "Role   : Backend Developer",
      ],
    };
  }

  if (normalized === "whoami") {
    return { type: "output", lines: ["김민준 - Backend Developer"] };
  }

  if (normalized === "neofetch") {
    return {
      type: "output",
      lines: [
        "System : portfolio",
        "Stack  : Java / Spring / Redis / AI pipeline",
        "Focus  : reliable backend systems",
      ],
    };
  }

  if (normalized === "clear") {
    return { type: "clear" };
  }

  if (normalized.startsWith("open ")) {
    const fileId = normalized.slice(5);
    return { type: "open", fileId, lines: [`opened ${fileId}`] };
  }

  return { type: "output", lines: [`command not found: ${normalized}`, "try: help"] };
}
