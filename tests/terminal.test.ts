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
        "cat Contact.txt - 연락처",
        "Tab/↑↓/Ctrl+` - 완성/기록/토글",
      ],
    });
  });

  it("lists portfolio root files", () => {
    expect(runTerminalCommand("ls")).toEqual({
      type: "output",
      lines: [
        "Files",
        "  Profile.md",
        "  README.md",
        "  Contact.txt",
        "Folders",
        "  projects/ (ls projects)",
        "Tip: open Profile.md 또는 open hola-climbing.md",
      ],
    });
  });

  it("lists project files with short open examples", () => {
    expect(runTerminalCommand("ls projects")).toEqual({
      type: "output",
      lines: [
        "Projects",
        "  hola-climbing.md",
        "  cafe-gamsugwang.md",
        "  jsonstore.md",
        "  readandshare.md",
        "  the-last-supper.md",
        "Tip: Projects/ 없이 open hola-climbing.md 로 열 수 있습니다.",
      ],
    });
  });

  it("opens README.md", () => {
    expect(runTerminalCommand("open README.md")).toEqual({
      type: "open",
      fileId: "README.md",
      lines: ["opened README.md"],
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

  it("opens markdown files without typing the extension", () => {
    expect(runTerminalCommand("open profile")).toEqual({
      type: "open",
      fileId: "Profile.md",
      lines: ["opened Profile.md"],
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
    expect(getTerminalCompletions("open Pr")).toEqual(["open Profile.md"]);
  });

  it("completes unambiguous prefixes and keeps ambiguous input unchanged", () => {
    expect(completeTerminalInput("open ho")).toBe("open hola-climbing.md");
    expect(completeTerminalInput("open Projects/ho")).toBe("open Projects/hola-climbing.md");
    expect(completeTerminalInput("open ")).toBe("open ");
  });
});
