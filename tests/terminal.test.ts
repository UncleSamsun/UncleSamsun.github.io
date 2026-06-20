import { describe, expect, it } from "vitest";
import { completeTerminalInput, getTerminalCompletions, runTerminalCommand } from "../src/lib/terminal";

describe("terminal commands", () => {
  it("prints help commands", () => {
    expect(runTerminalCommand("help")).toEqual({
      type: "output",
      lines: ["help, ls, cat Contact.txt, open <file>, whoami, neofetch, clear"],
    });
  });

  it("lists portfolio root files", () => {
    expect(runTerminalCommand("ls")).toEqual({
      type: "output",
      lines: ["README.md", "Projects/", "Contact.txt"],
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
    expect(runTerminalCommand("open Projects/hola-climbing.md")).toEqual({
      type: "open",
      fileId: "Projects/hola-climbing.md",
      lines: ["opened Projects/hola-climbing.md"],
    });
  });

  it("returns output for invalid open targets", () => {
    expect(runTerminalCommand("open missing.md")).toEqual({
      type: "output",
      lines: ["open: missing.md: file not found", "try: ls"],
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
    expect(getTerminalCompletions("open Projects/ho")).toEqual(["open Projects/hola-climbing.md"]);
  });

  it("completes unambiguous prefixes and keeps ambiguous input unchanged", () => {
    expect(completeTerminalInput("open Projects/ho")).toBe("open Projects/hola-climbing.md");
    expect(completeTerminalInput("open Projects/")).toBe("open Projects/");
  });
});
