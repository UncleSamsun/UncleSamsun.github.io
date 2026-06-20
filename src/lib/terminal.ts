import { portfolioFiles } from "../data/navigation";

export type TerminalResult =
  | { type: "output"; lines: string[] }
  | { type: "open"; fileId: string; lines: string[] }
  | { type: "clear" };

const validOpenFileIds = new Set(portfolioFiles.map((file) => file.id));
const commands = ["help", "ls", "cat Contact.txt", "whoami", "neofetch", "clear", "open "] as const;
const openTargets = portfolioFiles.map((file) => file.id);

export function getTerminalCompletions(input: string): string[] {
  const normalized = input.trimStart();

  if (normalized.startsWith("open ")) {
    const targetPrefix = normalized.slice(5);
    return openTargets
      .filter((target) => target.startsWith(targetPrefix))
      .map((target) => `open ${target}`);
  }

  return commands.filter((command) => command.startsWith(normalized));
}

export function completeTerminalInput(input: string): string {
  const completions = getTerminalCompletions(input);

  return completions.length === 1 ? completions[0] : input;
}

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
    if (!validOpenFileIds.has(fileId)) {
      return { type: "output", lines: [`open: ${fileId}: file not found`, "try: ls"] };
    }

    return { type: "open", fileId, lines: [`opened ${fileId}`] };
  }

  return { type: "output", lines: [`command not found: ${normalized}`, "try: help"] };
}
