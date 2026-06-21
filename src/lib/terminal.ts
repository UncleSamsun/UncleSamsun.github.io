import { portfolioFiles } from "../data/navigation";
import type { PortfolioFile } from "../data/navigation";

export type TerminalResult =
  | { type: "output"; lines: string[] }
  | { type: "open"; fileId: string; lines: string[] }
  | { type: "clear" };

const projectFolderFiles = portfolioFiles.filter((file) => file.folder === "PROJECTS");
const rootFiles = portfolioFiles.filter((file) => file.folder !== "PROJECTS");
const commands = ["help", "ls", "ls projects", "cat Contact.md", "whoami", "neofetch", "clear", "open "] as const;

export const terminalHelpLines = [
  "Portfolio terminal 사용법",
  "ls - 파일/폴더",
  "ls projects - 프로젝트",
  "open <file> - 파일 열기",
  "open Profile.md - 프로필",
  "cat Contact.md - 연락처",
  "Tab/↑↓/Ctrl+` - 완성/기록/토글",
];

const rootListLines = [
  "Files",
  ...rootFiles.map((file) => `  ${file.label}`),
  "Folders",
  "  projects/ (ls projects)",
  "Tip: open Profile.md 또는 ls projects",
];

const projectListLines = [
  "Projects",
  ...projectFolderFiles.map((file) => `  ${file.label}`),
  "Tip: Projects/ 없이 open hola-climbing.md 로 열 수 있습니다.",
];

function normalize(value: string) {
  return value.trim().toLowerCase();
}

function stripMarkdownExtension(label: string) {
  return label.endsWith(".md") ? label.slice(0, -3) : label;
}

function aliasesForFile(file: PortfolioFile) {
  const aliases = [file.id, file.label];
  if (file.id === "Projects/ProjectSummary.md") {
    aliases.push("README.md", "readme");
  }
  if (file.id === "Contact.md") {
    aliases.push("Contact.txt");
  }
  if (file.label.endsWith(".md")) {
    aliases.push(stripMarkdownExtension(file.label));
  }

  return aliases;
}

function resolveOpenTarget(input: string) {
  const requested = normalize(input);

  return portfolioFiles.find((file) =>
    aliasesForFile(file).some((alias) => normalize(alias) === requested),
  );
}

function displayOpenTarget(file: PortfolioFile) {
  return file.label;
}

function openCompletionTarget(file: PortfolioFile, prefix: string) {
  return normalize(prefix).startsWith("projects/") ? file.id : file.label;
}

export function getTerminalCompletions(input: string): string[] {
  const normalized = input.trimStart();

  if (normalized.startsWith("open ")) {
    const targetPrefix = normalized.slice(5);
    return portfolioFiles
      .map((file) => openCompletionTarget(file, targetPrefix))
      .filter((target) => normalize(target).startsWith(normalize(targetPrefix)))
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
    return { type: "output", lines: terminalHelpLines };
  }

  if (normalized === "ls") {
    return { type: "output", lines: rootListLines };
  }

  if (normalize(normalized) === "ls projects") {
    return { type: "output", lines: projectListLines };
  }

  if (normalize(normalized) === "cat contact.md" || normalize(normalized) === "cat contact.txt") {
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
    const requested = normalized.slice(5);
    const file = resolveOpenTarget(requested);
    if (!file) {
      return { type: "output", lines: [`open: ${requested}: file not found`, "try: ls 또는 ls projects"] };
    }

    return { type: "open", fileId: file.id, lines: [`opened ${displayOpenTarget(file)}`] };
  }

  return { type: "output", lines: [`command not found: ${normalized}`, "try: help"] };
}
