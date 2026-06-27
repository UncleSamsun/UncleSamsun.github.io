import { describe, expect, it } from "vitest";
import { completeTerminalInput, getTerminalCompletions, runTerminalCommand } from "../src/lib/terminal";

describe("terminal commands", () => {
  it("prints help commands", () => {
    expect(runTerminalCommand("help")).toEqual({
      type: "output",
      lines: [
        "Portfolio terminal 사용법",
        "ls - 파일/폴더",
        "ls projects - 프로젝트",
        "open <file> - 파일 열기",
        "open Profile.md - 프로필",
        "cat Contact.md - 연락처",
        "evidence - 핵심 성과/근거 한눈에",
        "Tab/↑↓/Ctrl+` - 완성/기록/토글",
      ],
    });
  });

  it("prints key evidence pointing to project files", () => {
    const result = runTerminalCommand("evidence");
    expect(result.type).toBe("output");
    if (result.type === "output") {
      expect(result.lines[0]).toContain("핵심 성과");
      expect(result.lines.some((line) => line.includes("open hola-climbing.md"))).toBe(true);
    }
  });

  it("lists portfolio root files", () => {
    expect(runTerminalCommand("ls")).toEqual({
      type: "output",
      lines: [
        "Files",
        "  Profile.md",
        "  Contact.md",
        "Folders",
        "  projects/ (ls projects)",
        "Tip: open Profile.md 또는 ls projects",
      ],
    });
  });

  it("lists project files with short open examples", () => {
    expect(runTerminalCommand("ls projects")).toEqual({
      type: "output",
      lines: [
        "Projects",
        "  ProjectSummary.md",
        "  hola-climbing.md",
        "  cafe-gamsugwang.md",
        "  jsonstore.md",
        "  readandshare.md",
        "  the-last-supper.md",
        "Tip: Projects/ 없이 open hola-climbing.md 로 열 수 있습니다.",
      ],
    });
  });

  it("opens the project summary file", () => {
    expect(runTerminalCommand("open ProjectSummary.md")).toEqual({
      type: "open",
      fileId: "Projects/ProjectSummary.md",
      lines: ["opened ProjectSummary.md"],
    });
  });

  it("opens Hola project files", () => {
    expect(runTerminalCommand("open hola-climbing.md")).toEqual({
      type: "open",
      fileId: "Projects/hola-climbing.md",
      lines: ["opened hola-climbing.md"],
    });
  });

  it("keeps full project paths working as a compatibility alias", () => {
    expect(runTerminalCommand("open Projects/hola-climbing.md")).toEqual({
      type: "open",
      fileId: "Projects/hola-climbing.md",
      lines: ["opened hola-climbing.md"],
    });
  });

  it("opens the combined profile file", () => {
    expect(runTerminalCommand("open Profile.md")).toEqual({
      type: "open",
      fileId: "Profile.md",
      lines: ["opened Profile.md"],
    });
  });

  it("prints contact details from Contact.md and keeps Contact.txt as a compatibility alias", () => {
    expect(runTerminalCommand("cat Contact.md")).toEqual({
      type: "output",
      lines: [
        "Email  : alswns5620@naver.com",
        "GitHub : github.com/UncleSamsun",
        "Role   : Backend Developer",
      ],
    });
    expect(runTerminalCommand("cat Contact.txt").type).toBe("output");
  });

  it("opens markdown files without typing the extension", () => {
    expect(runTerminalCommand("open profile")).toEqual({
      type: "open",
      fileId: "Profile.md",
      lines: ["opened Profile.md"],
    });
    expect(runTerminalCommand("open projectsummary")).toEqual({
      type: "open",
      fileId: "Projects/ProjectSummary.md",
      lines: ["opened ProjectSummary.md"],
    });
    expect(runTerminalCommand("open hola-climbing")).toEqual({
      type: "open",
      fileId: "Projects/hola-climbing.md",
      lines: ["opened hola-climbing.md"],
    });
  });

  it("returns output for invalid open targets", () => {
    expect(runTerminalCommand("open missing.md")).toEqual({
      type: "output",
      lines: ["open: missing.md: file not found", "try: ls 또는 ls projects"],
    });
  });

  it("clears terminal output", () => {
    expect(runTerminalCommand("clear")).toEqual({ type: "clear" });
  });

  it("returns a friendly message for unknown commands", () => {
    expect(runTerminalCommand("deploy")).toEqual({
      type: "output",
      lines: ["command not found: deploy", "try: help"],
    });
  });

  it("suggests command and file completions by prefix", () => {
    expect(getTerminalCompletions("op")).toEqual(["open "]);
    expect(getTerminalCompletions("open ho")).toEqual(["open hola-climbing.md"]);
    expect(getTerminalCompletions("open Projects/ho")).toEqual(["open Projects/hola-climbing.md"]);
    expect(getTerminalCompletions("open Prof")).toEqual(["open Profile.md"]);
    expect(getTerminalCompletions("open ProjectS")).toEqual(["open ProjectSummary.md"]);
  });

  it("completes unambiguous prefixes and keeps ambiguous input unchanged", () => {
    expect(completeTerminalInput("open ho")).toBe("open hola-climbing.md");
    expect(completeTerminalInput("open Projects/ho")).toBe("open Projects/hola-climbing.md");
    expect(completeTerminalInput("open ")).toBe("open ");
  });
});
